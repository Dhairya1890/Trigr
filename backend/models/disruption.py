from pydantic import BaseModel


class Disruption(BaseModel):
    id: str
    event_type: str
    city: str

