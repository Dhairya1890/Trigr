from datetime import datetime
from fastapi import APIRouter

from backend.models import PremiumCalculationRequest, PremiumCalculationResponse
from backend.services.premium_calculator import calculate_weekly_premium

router = APIRouter()


@router.post("/calculate", response_model=PremiumCalculationResponse)
def calculate_premium(payload: PremiumCalculationRequest):
    # We use current month to provide seasonally-aware quotes
    # The payload month is used if provided, but the router ensures current context is considered
    calc_payload = payload.model_dump()
    if not calc_payload.get("month"):
        calc_payload["month"] = datetime.now().month

    quote = calculate_weekly_premium(calc_payload)

    return PremiumCalculationResponse(
        weekly_premium=quote["weekly_premium"],
        risk_score=quote["risk_score"],
        risk_tier=quote["risk_tier"],
        coverage_pct=quote["coverage_pct"],
        max_payout=quote["max_payout"],
        base_rate=quote["base_rate"],
        risk_multiplier=quote["risk_multiplier"],
        season_multiplier=quote["season_multiplier"],
    )
