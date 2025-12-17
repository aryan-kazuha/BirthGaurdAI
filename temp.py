import numpy as np
from model import model

X_dummy = np.random.rand(1, model.n_features_in_)

print("Pred:", model.predict(X_dummy))
print("Proba:", model.predict_proba(X_dummy))
