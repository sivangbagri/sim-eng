from pydantic import BaseModel
from typing import List, Dict

class Question(BaseModel):
    id: str
    text: str
    options: List[str]

class SimulationRequest(BaseModel):
    persona: Dict
    questions: List[Question]
