import joblib
from pathlib import Path
import numpy as np

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR.parent / "models" / "model_V1.pkl"

if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)

def predict(features : list[float]):
    x = np.array(features).reshape(1,-1)

    pred = model.predict(x)[0]
    prob = model.predict_proba(x)[0].max()

    return {
    "prediction": str(pred[0]) if isinstance(pred, (list, tuple, np.ndarray)) else str(pred),
    "confidence score": float(prob)
    }