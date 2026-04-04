"""Disruption event models aligned to backend/db/schema.sql and API contract."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Database / response model – represents a full disruption_events row
# ---------------------------------------------------------------------------
class DisruptionEvent(BaseModel):
    """Full disruption event record as stored in the database."""

    id: str
    event_type: str
    city: str
    zones: list[str] = Field(default_factory=list)
    trigger_value: float | None = None
    trigger_source: str = ""
    started_at: datetime | None = None
    ended_at: datetime | None = None
    workers_affected: int = 0
    total_payout: float = 0
    status: str = "ACTIVE"


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------
class SimulateTriggerRequest(BaseModel):
    """Payload accepted by POST /api/triggers/simulate."""

    event_type: str
    city: str
    zones: list[str]
    severity: str


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------
class ActiveTriggerSummary(BaseModel):
    """Single active trigger event as shown on the dashboard."""

    id: str
    type: str
    zone: str
    severity: str
    timestamp: str


class ActiveTriggersResponse(BaseModel):
    """Response returned by GET /api/triggers/active."""

    events: list[ActiveTriggerSummary] = Field(default_factory=list)


class SimulateTriggerResponse(BaseModel):
    """Response returned after trigger simulation."""

    status: str
    message: str = ""
    event: dict | None = None


class PoolHealthResponse(BaseModel):
    """Response returned by GET /api/triggers/insurer/pool-health."""

    premium_collected: float
    payouts_issued: float
    loss_ratio: float
    reserve_buffer: float
    active_workers: int = 0
    solvent: bool = True


class WeatherResponse(BaseModel):
    """Response returned by GET /api/triggers/weather."""

    city: str
    temp: str
    humidity: str
    windSpeed: str
    condition: str
    aqi: int
    aqiLabel: str
    rainfall3h: str
    last_updated: str
