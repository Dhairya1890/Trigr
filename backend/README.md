# Backend Implementation Guide

This document captures the implementation details for the Trigr Backend (FastAPI).

## Architecture

```text
backend/
|-- db/                   # Database schemas (OWNED SEPARATELY)
|-- integrations/         # External service bindings (Weather, News, RazorPay)
|-- models/               # Pydantic schemas (Data Contracts)
|-- routers/              # Controller layer mapping out HTTP API paths
|-- services/             # Business logic (Fraud, Payout, Premium Logic)
|-- main.py               # Application entrypoint & scheduler
```

## Active API Endpoints

### Workers & Auth

- `POST /api/workers/register`: Calculates initial risk and provisions a worker alias.
- `POST /api/workers/verify-upi`: Penny-drop RazorPay command.
- `GET /api/workers/{worker_id}`: Retrieves worker profile.

### Claims & Payouts

- `GET /api/claims/{worker_id}`: Claims history.
- `GET /api/claims/payout-ledger`: Admin payout view.
- `GET /api/claims/admin/fraud-queue`: Live fraud interception queue.
- `POST /api/claims/admin/fraud/{id}`: Submit manual verdicts (`CLEAN`, `HARD_FLAG`).

### Premium & Policies

- `POST /api/premium/calculate`: Dynamic weekly premium quotes.
- `GET /api/policies/{worker_id}`: Surfacing active risk policies.

### Triggers & Simulation

- `GET /api/triggers/active`: Currently running disruptions.
- `POST /api/triggers/simulate`: Sandbox route for engine testing.
- `GET /api/triggers/insurer/pool-health`: Metrics for insurers.

## DB Ownership & Persistence-Ready Status

The database connection pipelines and Supabase persistence schemas reside inside `backend/db/**/*`.
**This boundary is owned by a separate team.**

### Current State: Persistence-Ready

The backend is currently **Persistence-Ready**. All routers and services use a `get_db` dependency pattern.

> [!CAUTION]
> **Production Status: Deterministic Demo Mode**
>
> - **Missing Client**: `backend/db/supabase.py` does not yet expose an initialized client.
> - **Mock Fallback**: High-fidelity, deterministic logic is used instead of real DB calls.
> - **Seeding**: `seed.py` is ready but will report `[BLOCKED]` until real .env keys are provided.

## Development & Seeding

```bash
# Boot the FastAPI uvicorn daemon
npm run backend:dev

# Run seeding (Dry-run by default)
python seed.py

# Attempt real DB seeding (Requires real .env keys)
python seed.py --no-dry-run
```

## Production Readiness Blockers

- **Backend Auth**: There is no `/api/auth/login` endpoint. Auth is currently simulated on the frontend.
- **Persistence Activation**: The DB team must initialize the `supabase-py` client in `backend/db/` to enable the "Persistence-Ready" routes.
- **Environment**: `.env` requires valid `SUPABASE_URL` and `SUPABASE_KEY`.
