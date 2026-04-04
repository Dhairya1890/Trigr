"""Policy models aligned to backend/db/schema.sql and API contract."""

from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Database / response model – represents a full row from the policies table
# ---------------------------------------------------------------------------
class Policy(BaseModel):
    """Full policy record as stored in the database."""

    id: str
    worker_id: str
    week_start: date
    week_end: date
    premium_paid: float
    max_payout: float
    coverage_pct: float
    verification_tier: int
    status: str = "ACTIVE"
    created_at: datetime | None = None


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------
class PurchasePolicyRequest(BaseModel):
    """Payload accepted by POST /api/policies/purchase."""

    worker_id: str
    weeks: int = Field(default=1, ge=1, le=4)


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------
class PurchasePolicyResponse(BaseModel):
    """Response returned after purchasing a policy."""

    policy_id: str
    week_start: str
    week_end: str
    premium_paid: float
    max_payout: float
    coverage_pct: float
    verification_tier: int
    status: str


class PolicyLookupResponse(BaseModel):
    """Response returned by GET /api/policies/{worker_id}."""

    worker_id: str
    policy: Policy | None = None
    history: list[Policy] = Field(default_factory=list)
