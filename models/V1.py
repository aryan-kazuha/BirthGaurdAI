from lightgbm import LGBMClassifier
import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split

df = pd.read_csv("data.csv")
df.dropna(inplace=True)

X = df.drop(columns= ["Risk Level"])
y = df['Risk Level']

lgbm = LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=8,
    subsample=0.8,
    colsample_bytree=0.8
)

lgbm.fit(X,y)
joblib.dump(lgbm,"model_V1.pkl")

