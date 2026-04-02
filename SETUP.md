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

Frontend:

```powershell
npm install
```

Backend:

```powershell
python -m pip install --user -r backend/requirements.txt
```

## Run locally

Frontend:

```powershell
npm run dev
```

Backend:

```powershell
npm run backend:dev
```

## Helpful commands

```powershell
npm run lint
npm run build
python seed.py
```

## Notes

- `README.md` and `img/` are preserved from the original project brief.
- The current scaffold includes placeholder routes and mocked integrations so teammates can start building by stage.
