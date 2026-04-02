from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class PurchasePolicyRequest(BaseModel):
    worker_id: str
    weeks: int = 1


@router.post("/purchase")
def purchase_policy(payload: PurchasePolicyRequest):
    return {
        "policy_id": "policy_scaffold",
        "week_start": "2026-04-06",
        "week_end": "2026-04-12",
        "premium_paid": 131,
        "status": "ACTIVE",
        "payload": payload.model_dump()
    }


@router.get("/{worker_id}")
def get_policy(worker_id: str):
    return {
        "worker_id": worker_id,
        "policy": None,
        "history": []
    }

