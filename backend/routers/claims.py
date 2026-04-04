import uuid
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
# Mock data definitions to support stable frontend/demo functionality
# ---------------------------------------------------------------------------
_MOCK_TIME = datetime.now(UTC)


def _generate_mock_claims(worker_id: str) -> list[ClaimSummary]:
    # Returns some mock baseline data to populate the frontend claims dashboard
    return [
        ClaimSummary(
            id=f"CLM_GEN_{uuid.uuid4().hex[:6].upper()}",
            date=(_MOCK_TIME - timedelta(days=5)).strftime("%Y-%m-%d"),
            type="Heavy Rain",
            amount=450.0,
            status="PAID",
        ),
        ClaimSummary(
            id=f"CLM_GEN_{uuid.uuid4().hex[:6].upper()}",
            date=(_MOCK_TIME - timedelta(days=12)).strftime("%Y-%m-%d"),
            type="AQI Hazard",
            amount=180.0,
            status="PAID",
        ),
    ]


def _generate_mock_fraud_queue() -> list[FraudQueueItem]:
    # Support admin surfaces
    return [
        FraudQueueItem(
            id=f"CLM_GEN_{uuid.uuid4().hex[:6].upper()}",
            workerId=f"WRK_{uuid.uuid4().hex[:4].upper()}",
            workerName="Ravi Kumar",
            type="GPS_SPOOFED",
            score=88,
            signals=["Location Mismatch", "High Velocity"],
            confidence=0.88,
            status="PENDING",
        ),
        FraudQueueItem(
            id=f"CLM_GEN_{uuid.uuid4().hex[:6].upper()}",
            workerId=f"WRK_{uuid.uuid4().hex[:4].upper()}",
            workerName="Sunita Singh",
            type="INCONSISTENT_SPEED",
            score=72,
            signals=["Rapid movement"],
            confidence=0.72,
            status="PENDING",
        ),
    ]


@router.get("/{worker_id}", response_model=ClaimsListResponse)
def get_claims(worker_id: str):
    return ClaimsListResponse(worker_id=worker_id, claims=_generate_mock_claims(worker_id))


@router.get("/admin/fraud-queue", response_model=FraudQueueResponse)
def get_fraud_queue():
    return FraudQueueResponse(claims=_generate_mock_fraud_queue())


@router.post("/admin/fraud/{id}", response_model=FraudVerdictResponse)
def update_fraud_verdict(id: str, payload: FraudVerdictRequest):
    return FraudVerdictResponse(success=True, id=id, verdict=payload.verdict)


@router.get("/payout-ledger", response_model=PayoutLedgerResponse)
def get_payout_ledger():
    return PayoutLedgerResponse(
        payouts=[
            PayoutLedgerItem(
                id=f"PAYGEN{uuid.uuid4().hex[:6].upper()}",
                workerId=f"WRK-{uuid.uuid4().hex[:4].upper()}",
                eventType="Heavy Rain",
                amount=250.0,
                utr=f"9021445{uuid.uuid4().hex[:4].upper()}XP",
                date=(_MOCK_TIME - timedelta(days=1)).strftime("%Y-%m-%d"),
                status="PAID"
            ),
            PayoutLedgerItem(
                id=f"PAYGEN{uuid.uuid4().hex[:6].upper()}",
                workerId=f"WRK-{uuid.uuid4().hex[:4].upper()}",
                eventType="Flood Alert",
                amount=1500.0,
                utr=f"9021445{uuid.uuid4().hex[:4].upper()}XP",
                date=(_MOCK_TIME - timedelta(days=2)).strftime("%Y-%m-%d"),
                status="PROCESSING"
            )
        ]
    )
