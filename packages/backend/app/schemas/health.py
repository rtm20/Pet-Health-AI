from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class AnalysisType(str, Enum):
    GENERAL = "general"
    SKIN = "skin"
    EYES = "eyes"
    EARS = "ears"
    MOUTH = "mouth"

class Condition(BaseModel):
    condition: str
    confidence: float = Field(..., ge=0.0, le=1.0)

class AnalysisResult(BaseModel):
    health_status: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    conditions_detected: List[Condition] = []
    recommendations: List[str]

class AnalysisResponse(BaseModel):
    status: str
    pet_id: Optional[str]
    analysis_type: AnalysisType
    results: AnalysisResult

class AnalysisTypeInfo(BaseModel):
    id: str
    name: str
    description: str

class AnalysisTypesResponse(BaseModel):
    analysis_types: List[AnalysisTypeInfo]
