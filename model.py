import joblib 
import numpy as np

model_path = "models/model_V1.pkl"

model = joblib.load(model_path)

def predict(features : list[float]):
    x = np.array(features).reshape(1,-1)

    pred = model.predict(x)[0]
    prob = model.predict_proba(x)[0].max()

    return {
        "prediction" : pred,
        "confidence score" : float(prob)
    }
