"""Payout models aligned to backend/db/schema.sql."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Database / response model – represents a full row from the payouts table
# ---------------------------------------------------------------------------
class Payout(BaseModel):
    """Full payout record as stored in the database."""

    id: str
    claim_id: str
    worker_id: str
    upi_id: str
    amount: float
    razorpay_ref: str | None = None
    status: str = "PENDING"
    initiated_at: datetime | None = None
    completed_at: datetime | None = None


# ---------------------------------------------------------------------------
# Frontend Dashboard Responses
# ---------------------------------------------------------------------------
class PayoutLedgerItem(BaseModel):
    """A payout item tailored for the admin/insurer ledger dashboard."""

    id: str
    workerId: str
    eventType: str
    amount: float
    utr: str
    date: str
    status: str


class PayoutLedgerResponse(BaseModel):
    """Response returned by GET /api/claims/payout-ledger."""

    payouts: list[PayoutLedgerItem]
