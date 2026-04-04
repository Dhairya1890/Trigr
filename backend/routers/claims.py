import hashlib
from datetime import UTC, datetime, timedelta

from fastapi import APIRouter

from backend.models.claim import (
    ClaimsListResponse,
    ClaimSummary,
    FraudQueueItem,
    FraudQueueResponse,
    FraudVerdictRequest,
    FraudVerdictResponse,
)
from backend.models.payout import PayoutLedgerItem, PayoutLedgerResponse

router = APIRouter()

# ---------------------------------------------------------------------------
# Deterministic mock data generation
# ---------------------------------------------------------------------------
def _get_stable_id(prefix: str, seed: str, salt: str = "") -> str:
    combined = f"{seed}{salt}"
    return f"{prefix}_{hashlib.md5(combined.encode()).hexdigest()[:6].upper()}"


def _generate_mock_claims(worker_id: str) -> list[ClaimSummary]:
    h = int(hashlib.md5(worker_id.encode()).hexdigest(), 16)
    
    # Static base date to ensure stability across reloads (use a fixed recent date)
    base_time = datetime(2026, 4, 15, tzinfo=UTC)
    
    return [
        ClaimSummary(
            id=_get_stable_id("CLM", worker_id, "1"),
            date=(base_time - timedelta(days=h % 5 + 2)).strftime("%Y-%m-%d"),
            type="Heavy Rain",
            amount=450.0 + (h % 50),
            status="PAID",
        ),
        ClaimSummary(
            id=_get_stable_id("CLM", worker_id, "2"),
            date=(base_time - timedelta(days=h % 10 + 10)).strftime("%Y-%m-%d"),
            type="AQI Hazard",
            amount=180.0 + (h % 20),
            status="PAID",
        ),
    ]


@router.get("/{worker_id}", response_model=ClaimsListResponse)
def get_claims(worker_id: str):
    return ClaimsListResponse(worker_id=worker_id, claims=_generate_mock_claims(worker_id))


@router.get("/admin/fraud-queue", response_model=FraudQueueResponse)
def get_fraud_queue():
    # Return a stable set of demo fraud items
    return FraudQueueResponse(
        claims=[
            FraudQueueItem(
                id="CLM_FRAUD_882",
                workerId="WRK_9912",
                workerName="Ravi Kumar",
                type="GPS_SPOOFED",
                score=88,
                signals=["Location Mismatch", "High Velocity"],
                confidence=0.88,
                status="PENDING",
            ),
            FraudQueueItem(
                id="CLM_FRAUD_721",
                workerId="WRK_1042",
                workerName="Sunita Singh",
                type="INCONSISTENT_SPEED",
                score=72,
                signals=["Rapid movement"],
                confidence=0.72,
                status="PENDING",
            ),
        ]
    )


@router.post("/admin/fraud/{id}", response_model=FraudVerdictResponse)
def update_fraud_verdict(id: str, payload: FraudVerdictRequest):
    return FraudVerdictResponse(success=True, id=id, verdict=payload.verdict)


@router.get("/payout-ledger", response_model=PayoutLedgerResponse)
def get_payout_ledger():
    return PayoutLedgerResponse(
        payouts=[
            PayoutLedgerItem(
                id="PAY_9011_STABLE",
                workerId="WRK_001",
                eventType="Heavy Rain",
                amount=250.0,
                utr="9021445120XP",
                date="2026-04-14",
                status="PAID"
            ),
            PayoutLedgerItem(
                id="PAY_9012_STABLE",
                workerId="WRK_142",
                eventType="Flood Alert",
                amount=1500.0,
                utr="9021445121XP",
                date="2026-04-14",
                status="PROCESSING"
            ),
            PayoutLedgerItem(
                id="PAY_9013_STABLE",
                workerId="WRK_882",
                eventType="Cyclone",
                amount=3200.0,
                utr="9021445122XP",
                date="2026-04-13",
                status="PAID"
            )
        ]
    )
