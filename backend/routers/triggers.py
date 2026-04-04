import hashlib

from fastapi import APIRouter, Depends

from backend.db.demo_store import get_active_events, simulate_event
from backend.db.demo_store import get_pool_health as get_demo_pool_health
from backend.integrations.openweather import get_weather as get_weather_snapshot
from backend.models.disruption import (
    ActiveTriggersResponse,
    ActiveTriggerSummary,
    PoolHealthResponse,
    SimulateTriggerRequest,
    SimulateTriggerResponse,
    WeatherResponse,
)
from backend.routers.workers import get_db
from backend.services.trigger_monitor import run_trigger_monitor

router = APIRouter()


@router.get("/active", response_model=ActiveTriggersResponse)
def get_active_triggers(db=Depends(get_db)):
    demo_events = get_active_events()
    if demo_events:
        return ActiveTriggersResponse(
            events=[
                ActiveTriggerSummary(
                    id=event["id"],
                    type=event["event_type"].replace("_", " ").title(),
                    city=event["city"],
                    zone=", ".join(event["zones"]),
                    zones=event["zones"],
                    severity=event.get("severity", event["status"]),
                    timestamp=event["started_at"],
                    status=event["status"],
                    totalPayout=event.get("total_payout", 0),
                    workersAffected=event.get("workers_affected", 0),
                )
                for event in demo_events
            ]
        )

    if db:
        pass

    monitor_state = run_trigger_monitor()
    events = []
    base_time = "2026-04-14T10:30:00Z"
    for ev in monitor_state.get("active_events", []):
        event_id = f"evt_{hashlib.md5(ev['type'].encode() + ev['city'].encode()).hexdigest()[:6].upper()}"
        events.append(
            ActiveTriggerSummary(
                id=event_id,
                type=ev["type"],
                city=ev["city"],
                zone=ev.get("zone", "Dharavi"),
                zones=[ev.get("zone", "Dharavi")],
                severity=ev["severity"],
                timestamp=base_time,
                status="ACTIVE",
                totalPayout=0,
                workersAffected=0,
            )
        )
    return ActiveTriggersResponse(events=events)


@router.get("/weather", response_model=WeatherResponse)
def get_weather(city: str = "Mumbai"):
    snapshot = get_weather_snapshot(city)
    return WeatherResponse(
        city=city,
        temp=f"{snapshot['temp_c']}\u00b0C",
        humidity=f"{snapshot['humidity']}%",
        windSpeed=f"{snapshot['wind_speed']} km/h",
        condition=snapshot["description"].title(),
        aqi=180,
        aqiLabel="Moderate",
        rainfall3h=f"{snapshot['rainfall_3h']} mm",
        last_updated="Updated just now",
    )


@router.post("/simulate", response_model=SimulateTriggerResponse)
def simulate_trigger(payload: SimulateTriggerRequest, db=Depends(get_db)):
    return SimulateTriggerResponse(**simulate_event(payload.event_type, payload.city, payload.zones, payload.severity))


@router.get("/insurer/pool-health", response_model=PoolHealthResponse)
def get_pool_health(db=Depends(get_db)):
    demo_pool = get_demo_pool_health()
    if demo_pool:
        return PoolHealthResponse(**demo_pool)

    if db:
        pass

    return PoolHealthResponse(
        premium_collected=8850000.0,
        payouts_issued=1120000.0,
        loss_ratio=12.6,
        reserve_buffer=5500000.0,
        active_workers=4200,
        solvent=True,
    )
