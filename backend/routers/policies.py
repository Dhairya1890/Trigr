import hashlib
from datetime import date, timedelta

from fastapi import APIRouter, Depends

from backend.db.demo_store import get_policy_lookup
from backend.models import Policy, PolicyLookupResponse, PurchasePolicyRequest, PurchasePolicyResponse
from backend.routers.workers import get_db

router = APIRouter()


def _get_deterministic_policy(worker_id: str) -> Policy:
    h = int(hashlib.md5(worker_id.encode()).hexdigest(), 16)
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    policy_id = f"pol_{hashlib.md5(worker_id.encode()).hexdigest()[:8].upper()}"

    return Policy(
        id=policy_id,
        worker_id=worker_id,
        week_start=week_start,
        week_end=week_end,
        premium_paid=131.0 + (h % 50),
        max_payout=3500.0,
        coverage_pct=0.75,
        verification_tier=1 + (h % 2),
        status="ACTIVE",
    )


@router.post("/purchase", response_model=PurchasePolicyResponse)
def purchase_policy(payload: PurchasePolicyRequest, db=Depends(get_db)):
    policy = _get_deterministic_policy(payload.worker_id)
    if db:
        pass

    return PurchasePolicyResponse(
        policy_id=policy.id,
        week_start=policy.week_start.isoformat(),
        week_end=policy.week_end.isoformat(),
        premium_paid=policy.premium_paid,
        max_payout=policy.max_payout,
        coverage_pct=policy.coverage_pct,
        verification_tier=policy.verification_tier,
        status=policy.status,
    )


@router.get("/{worker_id}", response_model=PolicyLookupResponse)
def get_policy(worker_id: str, db=Depends(get_db)):
    demo_lookup = get_policy_lookup(worker_id)
    if demo_lookup["policy"]:
        return PolicyLookupResponse(
            worker_id=demo_lookup["worker_id"],
            policy=Policy(**demo_lookup["policy"]),
            history=[Policy(**item) for item in demo_lookup["history"]],
        )

    if db:
        pass

    policy = _get_deterministic_policy(worker_id)
    return PolicyLookupResponse(worker_id=worker_id, policy=policy, history=[policy])
