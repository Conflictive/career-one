from pydantic import BaseModel, field_validator, Field
from typing import Literal, Optional
from datetime import date


class Job(BaseModel):
    id: Optional[int] = None
    role: str
    company: str
    status: Literal["applied", "interviewing", "rejected", "offer"] = "applied"
    salary: str
    creation_date: date = Field(default_factory=date.today)

    @field_validator("status", mode="before")
    @classmethod
    def normalise_status(cls, v: str) -> str:
        return v.lower()
    
    model_config = {
        "from_attributes": True
    }
