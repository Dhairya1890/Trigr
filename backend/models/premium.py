"""Premium calculation models aligned to API contract."""

from __future__ import annotations

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------
class PremiumCalculationRequest(BaseModel):
    """Payload accepted by POST /api/premium/calculate."""

    platform: str
    city: str
    zone: str
    weekly_earnings: float = Field(gt=0)
    shift_hours: float = Field(gt=0)
    working_days: int = Field(ge=1, le=7)
    month: int = Field(ge=1, le=12)


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------
class PremiumCalculationResponse(BaseModel):
    """Response returned after premium calculation."""

    weekly_premium: float
    risk_score: int
    risk_tier: str
    coverage_pct: float
    max_payout: float
    base_rate: float
    risk_multiplier: float
    season_multiplier: float
