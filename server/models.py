from pydantic import BaseModel
from typing import Optional


class Task(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None