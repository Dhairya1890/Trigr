from pydantic import BaseModel


class Claim(BaseModel):
    id: str
    worker_id: str
    status: str = "PROCESSING"

