import uuid
from datetime import UTC, datetime

from fastapi import APIRouter

from backend.models.disruption import (
    ActiveTriggersResponse,
    ActiveTriggerSummary,
    PoolHealthResponse,
    SimulateTriggerRequest,
    SimulateTriggerResponse,
)
from backend.services.fraud_detector import evaluate_fraud
from backend.services.payout_engine import calculate_payout
from backend.services.trigger_monitor import run_trigger_monitor

router = APIRouter()

# ---------------------------------------------------------------------------
# Mock data definitions to support stable frontend/demo functionality
# ---------------------------------------------------------------------------
_MOCK_TIME = datetime.now(UTC)


@router.get("/active", response_model=ActiveTriggersResponse)
def get_active_triggers():
    # Poll the monitor service for the latest analyzed triggers
    monitor_state = run_trigger_monitor()
    
    events = []
    for ev in monitor_state.get("active_events", []):
        events.append(
            ActiveTriggerSummary(
                id=f"evt_{uuid.uuid4().hex[:6].upper()}",
                type=ev["type"],
                zone=ev.get("zone", "Dharavi"), # Default for demo
                severity=ev["severity"],
                timestamp=_MOCK_TIME.isoformat(),
            )
        )
    
    # Fallback to a default if nothing detected in live integrations
    if not events:
        events.append(
            ActiveTriggerSummary(
                id=f"evt_DEF_{uuid.uuid4().hex[:4].upper()}",
                type="Heavy Rain",
                zone="Dharavi",
                severity="MEDIUM",
                timestamp=_MOCK_TIME.isoformat(),
            )
        )
        
    return ActiveTriggersResponse(events=events)


@router.post("/simulate", response_model=SimulateTriggerResponse)
def simulate_trigger(payload: SimulateTriggerRequest):
    # 1. Event creation (mocked by payload)

    # 2. Affected worker/policy lookup (simulate a worker)
    # Using fallback dummy policy parameters
    mock_worker_baseline = {
        "shift_start": "10:00",
        "shift_end": "22:00",
        "weekly_earnings": 4500.0,
        "working_days": 6,
        "coverage_pct": 0.8,
        "max_payout": 3600.0,
        "current_week_payouts_total": 0.0,
    }

    # Simulate a disruption window of 5 hours
    disruption_params = {"disruption_start": "14:00", "disruption_end": "19:00"}

    # 3. Fraud evaluation
    # To keep the demo reliable, assume a CLEAN verdict for a simple simulation
    fraud_result = evaluate_fraud(
        {
            "gps_matches_zone": True,
            "app_active_before": True,
            "worker_moving": True,
            "account_age_days": 45,
            "device_has_duplicate_accounts": False,
            "recent_claims_count": 1,
        }
    )

    # 4. Payout calculation
    if fraud_result["verdict"] in ["CLEAN", "SOFT_FLAG"]:
        payout_result = calculate_payout({**mock_worker_baseline, **disruption_params})
        status_msg = (
            f"Trigger simulated successfully. "
            f"Generated payout of Rs {payout_result['payout']} ({fraud_result['verdict']})."
        )
    else:
        payout_result = {}
        status_msg = f"Trigger simulated successfully. Claim held/rejected ({fraud_result['verdict']})."

    return SimulateTriggerResponse(
        status="processed",
        message=status_msg,
        event={"payload": payload.model_dump(), "fraud_evaluation": fraud_result, "payout_calculation": payout_result},
    )


@router.get("/insurer/pool-health", response_model=PoolHealthResponse)
def get_pool_health():
    # Simulate aggregated statistics for the insurer platform.
    # We provide stable positive numbers to assure frontend dashboard rendering
    return PoolHealthResponse(
        premium_collected=8850000.0,
        payouts_issued=1120000.0,
        loss_ratio=12.6,
        reserve_buffer=5500000.0,
        active_workers=4200,
        solvent=True,
    )
