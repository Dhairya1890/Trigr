# Trigr Setup

This repo is scaffolded as a monorepo with:

- `frontend/` for the Next.js 14 app
- `backend/` for the FastAPI API

## Prerequisites

- Node.js 22+
- Python 3.13+

## Environment files

Copy the templates before running locally:

```powershell
Copy-Item .env.example .env
Copy-Item .env.local.example frontend/.env.local
```

## Install

### Frontend

```powershell
npm install
```

### Backend

```powershell
npm run backend:install
# or directly:
python -m pip install --user -r backend/requirements.txt
```

## Run locally

### Frontend (Next.js dev server on :3000)

```powershell
npm run dev
```

### Backend (FastAPI dev server on :8000)

```powershell
npm run backend:dev
```

### Docker (both services)

```powershell
docker compose up
```

## Lint & Format

### Frontend only

```powershell
npm run lint
```

### Backend only

```powershell
npm run backend:lint        # ruff lint check
npm run backend:format      # ruff auto-format
npm run backend:format:check  # format dry-run (CI-friendly)
```

### All (frontend + backend)

```powershell
npm run lint:all
```

## Seed data

```powershell
npm run seed               # dry-run: prints seed summary
npm run seed:export        # exports seed_data.json for inspection
python seed.py --help      # full CLI options
```

## Project structure

```
Trigr/
├── frontend/          Next.js 14 app (Vercel)
├── backend/
│   ├── main.py        FastAPI entry point
│   ├── models/        Pydantic schemas (aligned to db/schema.sql)
│   ├── routers/       API route handlers
│   ├── services/      Business logic (premium calc, risk scorer, etc.)
│   ├── integrations/  External API adapters (weather, news, razorpay)
│   ├── ml/            ML model scaffolds (future)
│   ├── db/            Database schema and connection (separate ownership)
│   └── requirements.txt
├── seed.py            Demo seed data generator
├── pyproject.toml     Backend lint/format config (ruff, black)
├── docker-compose.yml Docker dev environment
├── .env.example       Backend env template
└── package.json       Monorepo scripts (frontend + backend)
```

## Notes

- `README.md` and `img/` are preserved from the original project brief.
- The current scaffold includes placeholder routes and mocked integrations so teammates can start building by stage.
- DB connection and Supabase integration are handled separately — see `backend/db/`.
- Backend models in `backend/models/` are Pydantic schemas aligned to `backend/db/schema.sql` but do NOT include persistence logic.
