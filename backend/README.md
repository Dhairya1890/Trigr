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

## 🚧 DB Ownership & Persistence-Ready Status

The database connection pipelines and Supabase persistence schemas reside inside `backend/db/**/*`.
**This boundary is owned by a separate team.**

### Current State: Persistence-Ready
The backend has been refactored to be **Persistence-Ready**. All routers (`workers`, `policies`, `claims`, `triggers`) and services now use a dependency structure aligned with `schema.sql`.

- **Internal UUID Ready**: Internal logic is prepared to handle UUIDs.
- **External Contract Stability**: Public API IDs remain strings (e.g. `wrk_...`) to ensure 100% compatibility with the current frontend.
- **Dependency Pattern**: Routes use a `get_db` dependency. When the DB Team provides a usable client, it can be plugged into `get_db` to immediately activate real persistence across the entire API.

## ⚙️ Development & Seeding

Ensure commands are executed from the root of the monorepo.

```bash
# Boot the FastAPI uvicorn daemon
npm run backend:dev

# Run seeding (Dry-run by default)
python seed.py

# Attempt real DB seeding (Requires real .env keys)
python seed.py --no-dry-run
```

### 🛑 Persistence Blockers

- **Missing Runtime Client**: `backend/db/supabase.py` currently only provides configuration; no Supabase client instance is initialized.
- **Credential Placeholders**: `.env` contains placeholders. Real persistence will fail with `[BLOCKED]` logs until valid `SUPABASE_URL` and `SUPABASE_KEY` are provided.
- **Team Handover**: The "DB Team" must initialize the `supabase-py` client in `backend/db/supabase.py` to enable the "Persistence-Ready" routes.
