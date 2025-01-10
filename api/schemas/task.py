from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TarefaCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = Field(..., regex="^(pendente|em andamento|concluída)$")


class TarefaResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
