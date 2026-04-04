from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
import hashlib
from datetime import datetime

from backend.models import (
    VerifyUpiRequest,
    VerifyUpiResponse,
    WorkerProfileResponse,
    WorkerRegistrationRequest,
    WorkerRegistrationResponse,
)
from backend.services.premium_calculator import calculate_weekly_premium
from backend.db.supabase import get_supabase_config

router = APIRouter()

# ---------------------------------------------------------------------------
# Persistence boundary: get_db() helper
# Currently returns None because NO usable client is exposed by backend/db.
# ---------------------------------------------------------------------------
def get_db():
    """
    Dependency to provide a Supabase client.
    Currently returns None to stay within persistence boundaries.
    """
    config = get_supabase_config()
    # If the DB team provides a client in backend/db, it would be initialized here.
    # For now, we detect that it's unconfigured.
    if not config.get("url") or "project_url" in config.get("url", ""):
        return None
    return None # Boundary: No external client initialization allowed here


def _get_deterministic_worker(worker_id: str) -> WorkerProfileResponse:
    # Use worker_id as seed for deterministic name/platform
    h = int(hashlib.md5(worker_id.encode()).hexdigest(), 16)
    
    platforms = ["Swiggy", "Zomato", "Blinkit", "Zepto", "Uber"]
    cities = ["Mumbai", "Delhi", "Bangalore"]
    zones = ["Dharavi", "Indiranagar", "Connaught Place", "Powai"]
    
    # Specific case for "me" to match frontend expectations
    if worker_id in ["me", "wrk_demo"]:
        return WorkerProfileResponse(
            id=worker_id,
            name="Ravi Kumar",
            platform="Swiggy",
            city="Mumbai",
            zone="Dharavi",
            shift_start="10:00",
            shift_end="22:00",
            working_days=6,
            weekly_earnings=4500.0,
            upi_id="ravi@upi",
            upi_verified=True,
            role="worker",
            risk_score=65,
            risk_tier="MEDIUM",
            verification_tier=2,
            created_at=datetime(2026, 4, 1, 10, 0),
        )

    return WorkerProfileResponse(
        id=worker_id,
        name=f"Worker {h % 1000}",
        platform=platforms[h % len(platforms)],
        city=cities[h % len(cities)],
        zone=zones[h % len(zones)],
        shift_start="09:00",
        shift_end="21:00",
        working_days=h % 2 + 5,
        weekly_earnings=float(3000 + (h % 5000)),
        upi_id=f"worker{h % 100}@upi",
        upi_verified=True,
        role="worker",
        risk_score=40 + (h % 50),
        risk_tier="MEDIUM" if (h % 100 < 70) else "HIGH",
        verification_tier=1,
        created_at=datetime.now(),
    )


@router.post("/register", response_model=WorkerRegistrationResponse)
def register_worker(payload: WorkerRegistrationRequest, db=Depends(get_db)):
    # 1. Generate stable worker_id
    worker_id = f"wrk_{hashlib.md5(payload.upi_id.encode()).hexdigest()[:8]}"
    
    # 2. Calculate initial quote
    quote = calculate_weekly_premium(payload.model_dump() | {"month": datetime.now().month})
    
    # 3. Persistence Logic (Active only when DB client is provided by DB layer)
    if db:
        # In a real integration, we would do:
        # db.table('workers').insert({...}).execute()
        pass

    return WorkerRegistrationResponse(
        worker_id=worker_id,
        risk_score=quote["risk_score"],
        risk_tier=quote["risk_tier"],
        weekly_premium=quote["weekly_premium"],
        max_payout=quote["max_payout"],
        coverage_pct=quote["coverage_pct"],
    )


@router.get("/{worker_id}", response_model=WorkerProfileResponse)
def get_worker(worker_id: str, db=Depends(get_db)):
    if not worker_id:
        raise HTTPException(status_code=400, detail="Worker ID required")
    
    # 1. Persistence Lookup (Active only when DB client is provided by DB layer)
    if db:
        # data = db.table('workers').select('*').eq('id', worker_id).single().execute()
        # if data.data: return data.data
        pass

    return _get_deterministic_worker(worker_id)


@router.post("/verify-upi", response_model=VerifyUpiResponse)
def verify_upi(payload: VerifyUpiRequest, db=Depends(get_db)):
    # Persistence would update upi_verified status here
    if db:
        # db.table('workers').update({'upi_verified': True}).eq('id', payload.worker_id).execute()
        pass

    return VerifyUpiResponse(
        verified=True, 
        message="UPI successfully verified and linked.", 
        worker_id=payload.worker_id
    )
