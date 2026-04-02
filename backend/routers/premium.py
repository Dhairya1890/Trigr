from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.premium_calculator import calculate_weekly_premium

router = APIRouter()


class PremiumCalculationRequest(BaseModel):
    platform: str
    city: str
    zone: str
    weekly_earnings: float
    shift_hours: float
    working_days: int
    month: int


@router.post("/calculate")
def calculate_premium(payload: PremiumCalculationRequest):
    return calculate_weekly_premium(payload.model_dump())

