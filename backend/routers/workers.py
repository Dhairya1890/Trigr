from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class WorkerRegistrationRequest(BaseModel):
    name: str
    phone: str | None = None
    platform: str
    city: str
    zone: str
    shift_start: str
    shift_end: str
    working_days: int
    weekly_earnings: float
    upi_id: str
    role: str = "worker"


class VerifyUpiRequest(BaseModel):
    upi_id: str
    worker_id: str


@router.post("/register")
def register_worker(payload: WorkerRegistrationRequest):
    return {
        "worker_id": "worker_scaffold",
        "risk_score": 72,
        "risk_tier": "HIGH",
        "weekly_premium": 131,
        "max_payout": 3375,
        "coverage_pct": 0.75,
        "payload": payload.model_dump()
    }


@router.post("/verify-upi")
async def verify_upi(payload: VerifyUpiRequest):
    return {
        "verified": True,
        "message": "Scaffold response pending full Razorpay mock integration",
        "worker_id": payload.worker_id
    }

