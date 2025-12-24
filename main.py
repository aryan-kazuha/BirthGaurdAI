from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict

# NEW: Import the RAG service from your RAG.py file
from RAG import rag_service 

# --- 1. Lifespan Manager ---
# This loads the RAG index *once* when the app starts.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load the index
    rag_service.load_index()
    yield
    # Shutdown: (Optional cleanup goes here)

# --- 2. App Initialization ---
# Pass the lifespan manager here
app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # CRA default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. Data Models ---
class InputData(BaseModel):
    features: list[float]

class RAGRequest(BaseModel):
    question: str

# --- 4. Endpoints ---

@app.post("/predict")
def pred_api(data: InputData):
    return predict(data.features)

@app.get("/stat")
def stat():
    return {"status": "running"}

@app.post("/rag/ask")
async def ask_rag(request: RAGRequest):
    """
    New endpoint for RAG queries.
    Expects JSON: { "question": "your question here" }
    """
    try:
        # Call the ask method from RAG.py
        result = rag_service.ask(request.question)
        
        if "error" in result:
             raise HTTPException(status_code=500, detail=result["error"])
             
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))