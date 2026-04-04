"""Claim models aligned to backend/db/schema.sql and API contract."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Database / response model – represents a full row from the claims table
# ---------------------------------------------------------------------------
class Claim(BaseModel):
    """Full claim record as stored in the database."""

    id: str
    worker_id: str
    policy_id: str
    disruption_id: str
    shift_overlap_hours: float | None = None
    lost_income: float | None = None
    payout_amount: float | None = None
    fraud_score: int | None = None
    fraud_signals: list[str] = Field(default_factory=list)
    fraud_verdict: str | None = None
    status: str = "PROCESSING"
    reviewer_action: str | None = None
    created_at: datetime | None = None
    paid_at: datetime | None = None


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------
class ClaimSummary(BaseModel):
    """Lightweight claim object returned in list endpoints."""

    id: str
    date: str
    type: str
    amount: float
    status: str


class ClaimsListResponse(BaseModel):
    """Response returned by GET /api/claims/{worker_id}."""

    worker_id: str
    claims: list[ClaimSummary] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Fraud queue models (admin)
# ---------------------------------------------------------------------------
class FraudQueueItem(BaseModel):
    """Single entry in the admin fraud review queue."""

    id: str
    workerId: str  # noqa: N815 – camelCase to match frontend API contract
    workerName: str = "Demo Worker"
    type: str
    score: int = 0
    signals: list[str] = Field(default_factory=list)
    confidence: float
    status: str


class FraudQueueResponse(BaseModel):
    """Response returned by GET /api/claims/admin/fraud-queue."""

    claims: list[FraudQueueItem] = Field(default_factory=list)


class FraudVerdictRequest(BaseModel):
    """Payload accepted by POST /api/claims/admin/fraud/{id}."""

    verdict: str  # APPROVE | REJECT | SUSPEND


class FraudVerdictResponse(BaseModel):
    """Response after updating a fraud verdict."""

    success: bool
    id: str
    verdict: str
