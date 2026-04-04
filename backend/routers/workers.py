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
    # Calls Razorpay penny drop and returns status
    p_drop = send_penny_drop(payload.upi_id)

    return VerifyUpiResponse(
        verified=p_drop.get("success", False),
        message="UPI verified successfully via Penny Drop" if p_drop.get("success") else "Failed to verify UPI",
        worker_id=payload.worker_id,
    )


@router.get("/{worker_id}", response_model=WorkerProfileResponse)
def get_worker(worker_id: str):
    # Scaffolding: return deterministic stable payload for the frontend
    # Support 'me' as a deterministic demo alias
    resolved_id = "wrk_demo_88A1" if worker_id == "me" else worker_id
    
    return WorkerProfileResponse(
        id=resolved_id,
        name="Ravi Kumar" if worker_id == "me" else "Demo Worker",
        phone="+919876543210",
        platform="Swiggy",
        city="Mumbai",
        zone="Dharavi",
        shift_start="08:00",
        shift_end="20:00",
        working_days=6,
        weekly_earnings=4500.0,
        upi_id="ravi@okhdfc",
        upi_verified=True,
        role="worker",
        risk_score=42,
        risk_tier="LOW",
        verification_tier=2,
        created_at=datetime.utcnow()
    )
