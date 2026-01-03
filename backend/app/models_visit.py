from pydantic import BaseModel
from typing import List, Dict, Any

class FullAssessment(BaseModel):
  patient_id: str       # human ID typed in form
  form_data: Dict[str, Any]
  features: List[float]

class VisitOut(BaseModel):
  id: str
  visit_time: str
  form_data: Dict[str, Any]
  prediction: Dict[str, Any]

class HistoryOut(BaseModel):
  patient_id: str
  visits: List[VisitOut]
