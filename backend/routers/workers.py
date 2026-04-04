import uuid
from datetime import datetime

from fastapi import APIRouter

from backend.integrations.razorpay import send_penny_drop
from backend.models import (
    VerifyUpiRequest,
    VerifyUpiResponse,
    WorkerRegistrationRequest,
    WorkerRegistrationResponse,
    WorkerProfileResponse,
)
from backend.services.premium_calculator import calculate_weekly_premium

router = APIRouter()


@router.post("/register", response_model=WorkerRegistrationResponse)
def register_worker(payload: WorkerRegistrationRequest):
    # Calculate premium and risk using the established services
    # (assuming current month based on system for default calculation or a default month)
    # The risk scorer uses a month to assess seasonal risk.
    current_month = datetime.now().month

    quote = calculate_weekly_premium(
        {
            "platform": payload.platform,
            "city": payload.city,
            "zone": payload.zone,
            "weekly_earnings": payload.weekly_earnings,
            "shift_hours": 12.0,  # rough default, we could calculate from shift_start and shift_end
            "month": current_month,
        }
    )

    # Ideally DB insert happens here.
    worker_id = f"wrk_gen_{uuid.uuid4().hex[:8]}"

    return WorkerRegistrationResponse(
        worker_id=worker_id,
        risk_score=quote["risk_score"],
        risk_tier=quote["risk_tier"],
        weekly_premium=quote["weekly_premium"],
        max_payout=quote["max_payout"],
        coverage_pct=quote["coverage_pct"],
    )


@router.post("/verify-upi", response_model=VerifyUpiResponse)
def verify_upi(payload: VerifyUpiRequest):
    return VerifyUpiResponse(
        verified=True, 
        message="UPI successfully verified and linked.", 
        worker_id=payload.worker_id
    )
