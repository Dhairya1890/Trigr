from fastapi import APIRouter

from backend.models import PremiumCalculationRequest, PremiumCalculationResponse
from backend.services.premium_calculator import calculate_weekly_premium

router = APIRouter()


@router.post("/calculate", response_model=PremiumCalculationResponse)
def calculate_premium(payload: PremiumCalculationRequest):
    from datetime import datetime

    # We use current month to provide seasonally-aware quotes
    quote = calculate_weekly_premium(payload.model_dump() | {"month": datetime.now().month})

    return PremiumCalculationResponse(
        weekly_premium=quote["weekly_premium"],
        risk_score=quote["risk_score"],
        risk_tier=quote["risk_tier"],
        coverage_pct=quote["coverage_pct"],
        max_payout=quote["max_payout"],
        base_rate=quote["base_premium"],
        risk_multiplier=quote["risk_multiplier"],
        season_multiplier=quote["season_factor"],
    )
