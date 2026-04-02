from pydantic import BaseModel


class Worker(BaseModel):
    id: str
    name: str
    role: str = "worker"

