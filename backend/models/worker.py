"""Worker models aligned to backend/db/schema.sql and API contract."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Database / response model – represents a full row from the workers table
# ---------------------------------------------------------------------------
class Worker(BaseModel):
    """Full worker record as stored in the database."""

    id: str
    name: str
    phone: str | None = None
    platform: str
    city: str
    zone: str
    shift_start: str  # stored as HH:MM in the API layer
    shift_end: str
    working_days: int = 6
    weekly_earnings: float
    upi_id: str
    upi_verified: bool = False
    role: str = "worker"
    risk_score: int | None = None
    risk_tier: str | None = None
    verification_tier: int = 1
    device_id: str | None = None
    created_at: datetime | None = None


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------
class WorkerRegistrationRequest(BaseModel):
    """Payload accepted by POST /api/workers/register."""

    name: str
    phone: str | None = None
    platform: str
    city: str
    zone: str
    shift_start: str
    shift_end: str
    working_days: int = Field(default=6, ge=1, le=7)
    weekly_earnings: float = Field(gt=0)
    upi_id: str
    role: str = "worker"


class VerifyUpiRequest(BaseModel):
    """Payload accepted by POST /api/workers/verify-upi."""

    upi_id: str
    worker_id: str


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------
class WorkerRegistrationResponse(BaseModel):
    """Response returned after successful worker registration."""

    worker_id: str
    risk_score: int
    risk_tier: str
    weekly_premium: float
    max_payout: float
    coverage_pct: float


class VerifyUpiResponse(BaseModel):
    """Response returned after UPI verification."""

    verified: bool
    message: str
    worker_id: str


class WorkerProfileResponse(BaseModel):
    """Response returned by GET /api/workers/{worker_id}."""

    id: str
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
    upi_verified: bool
    role: str
    risk_score: int | None = None
    risk_tier: str | None = None
    verification_tier: int
    created_at: datetime | None = None
