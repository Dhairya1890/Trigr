# Backend Implementation Guide

This document captures the implementation details for the Trigr Backend (FastAPI).
The backend handles algorithmic premium calculation, deterministic mock generation, and trigger integrations.

## 📁 FastAPI Structure

```text
backend/
├── db/                   # Database schemas and Supabase interfaces (OWNED SEPARATELY)
├── integrations/         # External real-world service bindings (NewsAPI, OpenWeather, OpenAQ, RazorPay)
├── models/               # Pydantic schemas (Data Contracts)
├── routers/              # Controller layer mapping out HTTP API paths
├── services/             # Core business logic (Fraud Evaluation, Payout Calculus, Premium Logic)
└── main.py               # Application entrypoint & scheduler execution
```

## 🌐 Active API Endpoints

### Workers & Auth

- `POST /api/workers/register`: Calculate initial risk scores and provisions a worker alias.
- `POST /api/workers/verify-upi`: Issues a standard penny-drop RazorPay command.
- `GET /api/workers/{worker_id}`: Serves stable Worker Profiles satisfying the primary frontend load payload.

### Claims & Payouts

- `GET /api/claims/{worker_id}`: Locates historical claims made by a targeted worker.
- `GET /api/claims/payout-ledger`: Administrative ledger resolving ledger tables for insurers.
- `GET /api/claims/admin/fraud-queue`: Administrative route feeding the live fraud detector interception logs.
- `POST /api/claims/admin/fraud/{id}`: Submits final manual verdicts (`CLEAN`, `HARD_FLAG`).

### Premium & Policies

- `POST /api/premium/calculate`: Resolves dynamic weekly premium quotes relative to a worker's shift overlap.
- `GET /api/policies/{worker_id}`: Surfaces active risk policies.

### Triggers & Simulation

- `GET /api/triggers/active`: Maps currently running geographical disruptions.
- `POST /api/triggers/simulate`: Sandbox route triggering deterministic payouts or fraud intercepts to demonstrate engine resilience.
- `GET /api/triggers/insurer/pool-health`: Metrics stream detailing reserve balances and logic parameters.

## 🛠 Services & Business Logic

- **`premium_calculator.py`**: Executes strict mathematical risk analysis based on external seasonal multipliers without relying on ambiguous machine-learning pipelines.
- **`fraud_detector.py`**: A deterministic engine returning logical verdicts (`CLEAN`, `SOFT_FLAG`, `HARD_FLAG`, `AUTO_REJECT`) generated off specific metric permutations (e.g. `GPS_ZONE_MISMATCH`).
- **`payout_engine.py`**: Implements basic chronological algebra to deduce hour overlap between shifts and environmental triggers, preventing breaches on maximum weekly payout caps.
- **`trigger_monitor.py`**: Schedules routine integrations queries (`get_weather`) synthesizing live alerts safely translated for the frontend components.

## 🚧 DB Ownership Boundary & Mock-First Behavior

The database connection pipelines and Supabase persistence schemas reside inside `backend/db/**/*`.
**This boundary is owned by a separate internal team.**

To ensure the frontend does not block waiting for the DB team, the current generation of backend routers rely on **Mock-First logic**.

- If a route asks for historical data, the backend injects deterministic synthetic Python dictionaries parsed correctly into Pydantic models.
- These representations behave precisely as database payloads do, guaranteeing that when the DB layer finally binds to Supabase, the endpoints will not structurally deviate.

## ⚙️ Development Commands

Ensure commands are executed from the root of the monorepo to guarantee correct dependency mapping.

```bash
# Boot the FastAPI uvicorn daemon
npm run backend:dev

# Run specific Python test routines (if defined)
pytest backend/
```

### Current Limitations

- Persistence is currently entirely transient. Any interaction resetting the backend process will obliterate modified "state".
- External APIs (OpenWeather, RazorPay) may currently run on stubbed bypass logic until the environment `.env` pipeline is correctly bound with live keys by operations.
