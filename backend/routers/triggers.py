from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SimulateTriggerRequest(BaseModel):
    event_type: str
    city: str
    zones: list[str]
    severity: str


@router.get("/active")
def get_active_triggers():
    return {"events": []}


@router.post("/simulate")
def simulate_trigger(payload: SimulateTriggerRequest):
    return {
        "status": "queued",
        "event": payload.model_dump()
    }


@router.get("/insurer/pool-health")
def get_pool_health():
    return {
        "premium_collected": 0,
        "payouts_issued": 0,
        "loss_ratio": 0,
        "reserve_buffer": 0
    }

