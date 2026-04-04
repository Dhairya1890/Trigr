import uuid
from datetime import date, timedelta

from fastapi import APIRouter

from backend.models import Policy, PolicyLookupResponse, PurchasePolicyRequest, PurchasePolicyResponse

router = APIRouter()


@router.post("/purchase", response_model=PurchasePolicyResponse)
def purchase_policy(payload: PurchasePolicyRequest):
    # This is scaffolding. We don't have DB persistence yet, but we mock the dates
    # and provide a stable response so the frontend flow completes.

    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)

    # Calculate mock premium/coverage directly if needed, or assume stable fallback defaults
    policy_id = f"pol_gen_{uuid.uuid4().hex[:8]}"

    return PurchasePolicyResponse(
        policy_id=policy_id,
        week_start=week_start.isoformat(),
        week_end=week_end.isoformat(),
        premium_paid=131.0,  # Faked fallback
        max_payout=3500.0,
        coverage_pct=0.75,
        verification_tier=1,
        status="ACTIVE",
    )


@router.get("/{worker_id}", response_model=PolicyLookupResponse)
def get_policy(worker_id: str):
    # Scaffolding: Mock a valid current policy to let frontend display dashboard.
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)

    active_policy = Policy(
        id=f"pol_gen_{uuid.uuid4().hex[:8]}",
        worker_id=worker_id,
        week_start=week_start,
        week_end=week_end,
        premium_paid=131.0,
        max_payout=3500.0,
        coverage_pct=0.75,
        verification_tier=1,
        status="ACTIVE",
    )

    return PolicyLookupResponse(
        worker_id=worker_id,
        policy=active_policy,
        history=[active_policy],  # One record for history mock too
    )
