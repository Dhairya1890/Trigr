import hashlib
from datetime import UTC, datetime

from fastapi import APIRouter

from backend.models.disruption import (
    ActiveTriggersResponse,
    ActiveTriggerSummary,
    PoolHealthResponse,
    SimulateTriggerRequest,
    SimulateTriggerResponse,
    WeatherResponse,
)
from backend.services.fraud_detector import evaluate_fraud
from backend.services.payout_engine import calculate_payout
from backend.services.trigger_monitor import run_trigger_monitor

router = APIRouter()


@router.get("/active", response_model=ActiveTriggersResponse)
def get_active_triggers():
    # Poll the monitor service for the latest analyzed triggers
    monitor_state = run_trigger_monitor()
    
    events = []
    # Fixed base time for stable demo timestamps
    base_time = "2026-04-14T10:30:00Z"
    
    for ev in monitor_state.get("active_events", []):
        event_id = f"evt_{hashlib.md5(ev['type'].encode() + ev['city'].encode()).hexdigest()[:6].upper()}"
        events.append(
            ActiveTriggerSummary(
                id=event_id,
                type=ev["type"],
                zone=ev.get("zone", "Dharavi"),
                severity=ev["severity"],
                timestamp=base_time,
            )
        )
    
    # Fallback to a default stable event if nothing detected
    if not events:
        events.append(
            ActiveTriggerSummary(
                id="EVT_STABLE_001",
                type="Heavy Rain",
                zone="Dharavi",
                severity="MEDIUM",
                timestamp=base_time,
            )
        )
        
    return ActiveTriggersResponse(events=events)


@router.get("/weather", response_model=WeatherResponse)
def get_weather(city: str = "Mumbai"):
    # Deterministic high-fidelity weather based on city name
    h = int(hashlib.md5(city.encode()).hexdigest(), 16)
    
    return WeatherResponse(
        city=city,
        temp=f"{25 + (h % 10)}°C",
        humidity=f"{70 + (h % 20)}%",
        windSpeed=f"{10 + (h % 15)} km/h",
        condition="Partly Cloudy" if h % 2 == 0 else "Overcast",
        aqi=50 + (h % 100),
        aqiLabel="Moderate" if (h % 100 < 50) else "Poor",
        rainfall3h=f"{(h % 50) / 10}mm",
        last_updated="10:30 AM",
    )


@router.post("/simulate", response_model=SimulateTriggerResponse)
def simulate_trigger(payload: SimulateTriggerRequest):
    # Deterministic simulation results
    mock_worker_baseline = {
        "shift_start": "10:00",
        "shift_end": "22:00",
        "weekly_earnings": 4500.0,
        "working_days": 6,
        "coverage_pct": 0.8,
        "max_payout": 3600.0,
        "current_week_payouts_total": 0.0,
    }

    disruption_params = {"disruption_start": "14:00", "disruption_end": "19:00"}

    fraud_result = evaluate_fraud({
        "gps_matches_zone": True,
        "app_active_before": True,
        "worker_moving": True,
        "account_age_days": 45,
        "device_has_duplicate_accounts": False,
        "recent_claims_count": 1,
    })

    payout_result = calculate_payout({**mock_worker_baseline, **disruption_params})
    
    return SimulateTriggerResponse(
        status="processed",
        message=f"Trigger simulated successfully. Generated payout of Rs {payout_result['payout']}.",
        event={
            "payload": payload.model_dump(),
            "fraud_evaluation": fraud_result,
            "payout_calculation": payout_result
        },
    )


@router.get("/insurer/pool-health", response_model=PoolHealthResponse)
def get_pool_health():
    # Stable aggregated metrics for insurer platform
    return PoolHealthResponse(
        premium_collected=8850000.0,
        payouts_issued=1120000.0,
        loss_ratio=12.6,
        reserve_buffer=5500000.0,
        active_workers=4200,
        solvent=True,
    )
