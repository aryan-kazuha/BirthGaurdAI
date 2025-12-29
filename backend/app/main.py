from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .model import predict
from .rag_client import ask_rag_service
from .autofill import parse_data

app = FastAPI()

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

# Routes 
@app.get("/stat")
def stat():
    return {"status": "running"}

@app.post("/predict")
def pred_api(data: InputData):
    try:
        result = predict(data.features)
        return {"prediction": result}
    except Exception as e:
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
