from fastapi import FastAPI
from pydantic import BaseModel
from model import predict

app = FastAPI()

class InputData(BaseModel):
    features : list[float]

@app.post("/predict")
def pred_api(data : InputData):
    return predict(data.features)

@app.get("/stat")
def stat():
    return {"status":"running"}

