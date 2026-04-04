import hashlib
from datetime import UTC, datetime, timedelta

from fastapi import APIRouter, Depends

from backend.db.demo_store import (
    get_claims as get_demo_claims,
)
from backend.db.demo_store import (
    get_fraud_queue as get_demo_fraud_queue,
)
from backend.db.demo_store import (
    get_payout_ledger as get_demo_payout_ledger,
)
from backend.db.demo_store import (
    update_fraud_verdict as update_demo_fraud_verdict,
)
from backend.models.claim import (
    ClaimsListResponse,
    ClaimSummary,
    FraudQueueItem,
    FraudQueueResponse,
    FraudVerdictRequest,
    FraudVerdictResponse,
)
from backend.models.payout import PayoutLedgerItem, PayoutLedgerResponse
from backend.routers.workers import get_db

router = APIRouter()


def _get_stable_id(prefix: str, seed: str, salt: str = "") -> str:
    combined = f"{seed}{salt}"
    return f"{prefix}_{hashlib.md5(combined.encode()).hexdigest()[:6].upper()}"


def _generate_mock_claims(worker_id: str) -> list[ClaimSummary]:
    h = int(hashlib.md5(worker_id.encode()).hexdigest(), 16)
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


@router.get("/admin/fraud-queue", response_model=FraudQueueResponse)
def get_fraud_queue(db=Depends(get_db)):
    demo_items = get_demo_fraud_queue()
    if demo_items:
        return FraudQueueResponse(claims=[FraudQueueItem(**item) for item in demo_items])

    if db:
        pass

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
def update_fraud_verdict(id: str, payload: FraudVerdictRequest, db=Depends(get_db)):
    update_demo_fraud_verdict(id, payload.verdict)
    if db:
        pass
    return FraudVerdictResponse(success=True, id=id, verdict=payload.verdict)


@router.get("/payout-ledger", response_model=PayoutLedgerResponse)
def get_payout_ledger(db=Depends(get_db)):
    demo_items = get_demo_payout_ledger()
    if demo_items:
        return PayoutLedgerResponse(payouts=[PayoutLedgerItem(**item) for item in demo_items])

    if db:
        pass

    return PayoutLedgerResponse(
        payouts=[
            PayoutLedgerItem(
                id="PAY_9011_STABLE",
                workerId="WRK_001",
                eventType="Heavy Rain",
                amount=250.0,
                utr="9021445120XP",
                date="2026-04-14",
                status="PAID",
            ),
            PayoutLedgerItem(
                id="PAY_9012_STABLE",
                workerId="WRK_142",
                eventType="Flood Alert",
                amount=1500.0,
                utr="9021445121XP",
                date="2026-04-14",
                status="PROCESSING",
            ),
            PayoutLedgerItem(
                id="PAY_9013_STABLE",
                workerId="WRK_882",
                eventType="Cyclone",
                amount=3200.0,
                utr="9021445122XP",
                date="2026-04-13",
                status="PAID",
            ),
        ]
    )


@router.get("/{worker_id}", response_model=ClaimsListResponse)
def get_claims(worker_id: str, db=Depends(get_db)):
    demo_claims = get_demo_claims(worker_id)
    if demo_claims:
        return ClaimsListResponse(
            worker_id=worker_id,
            claims=[
                ClaimSummary(
                    id=claim["id"],
                    date=claim.get("date") or claim.get("created_at", "")[:10],
                    type=claim.get("type", "Disruption"),
                    amount=claim.get("amount", claim.get("payout_amount", 0.0)),
                    status=claim["status"],
                )
                for claim in demo_claims
            ],
        )

    if db:
        pass

    return ClaimsListResponse(worker_id=worker_id, claims=_generate_mock_claims(worker_id))
