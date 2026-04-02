from pydantic import BaseModel


class Policy(BaseModel):
    id: str
    worker_id: str
    status: str = "ACTIVE"

