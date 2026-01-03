from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from app.model import predict
from app.rag_client import ask_rag_service
from app.autofill import parse_data
from typing import List, Dict, Any
from postgrest.exceptions import APIError
from dotenv import load_dotenv
import os
app = FastAPI()
load_dotenv() 
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")  # service role for server
supabase: Client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Supabase connected")
    except Exception as e:
        print(f"❌ Supabase init failed: {e}")
        supabase = None
else:
    print("⚠️ No Supabase env vars - DB disabled")
# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://maternalai.netlify.app",
    "https://www.maternalai.netlify.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schemas 
class InputData(BaseModel):
    features: list[float]

class RAGRequest(BaseModel):
    question: str

class ParseTextRequest(BaseModel):
    text: str

class PredictRequest(BaseModel):
    patient_id: str          # human ID like "ANM123-001"
    features: List[float]
    form_data: Dict[str, Any]
class HistoryRequest(BaseModel):
    patient_id: str


# Routes 
@app.get("/stat")
def stat():
    return {"status": "running"}

@app.post("/predict")
def pred_api(payload: PredictRequest):
    if not supabase:
        raise HTTPException(
            status_code=503,
            detail="Database not initialized"
        )
    try:
        # 1) Run ML prediction
        result = predict(payload.features)  # e.g. {"risk": "high", "score": 0.78}

        # 2) Upsert patient by patient_id (text)
        patient_resp = supabase.table("patients") \
            .upsert(
                {
                    "patient_id": payload.patient_id,
                    "name": payload.form_data.get("name"),
                },
                on_conflict="patient_id",
            ) \
            .select("id, patient_id, name") \
            .execute()

        if patient_resp.error:
            raise HTTPException(status_code=500, detail=str(patient_resp.error))

        patient_row = patient_resp.data[0]
        patient_db_id = patient_row["id"]

        # 3) Insert visit row
        visit_resp = supabase.table("visits") \
            .insert(
                {
                    "patient_id": patient_db_id,
                    "form_data": payload.form_data,
                    "prediction": result,
                }
            ) \
            .execute()

        if visit_resp.error:
            raise HTTPException(status_code=500, detail=str(visit_resp.error))

        # 4) Return prediction
        return {"prediction": result}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/patient/history")
def patient_history(req: HistoryRequest):
    if not supabase:
        # DB not available → return safe empty history
        return {
            "patient": None,
            "visits": []
        }
    try:
        # 1) Find patient by external patient_id
        patient_resp = supabase.table("patients") \
            .select("id, patient_id, name") \
            .eq("patient_id", req.patient_id) \
            .maybe_single() \
            .execute()

        if not patient_resp.data:
            return {"patient": None, "visits": []}


        patient = patient_resp.data
        patient_db_id = patient["id"]

        # 2) Fetch visits ordered by latest first
        visits_resp = supabase.table("visits") \
            .select("id, visit_time, form_data, prediction") \
            .eq("patient_id", patient_db_id) \
            .order("visit_time", desc=True) \
            .execute()

        if visits_resp.error:
            raise HTTPException(status_code=500, detail=str(visits_resp.error))

        return {
            "patient": patient,
            "visits": visits_resp.data or [],
        }

    except HTTPException:
        raise
    except Exception as e:
        print("❌ HISTORY ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/rag/ask")
def ask_rag(request: RAGRequest):
    try:
        return ask_rag_service(request.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/parse-text")
def parse_text(payload: ParseTextRequest):
    parsed = parse_data(payload.text)
    return {"parsed_fields": parsed}
