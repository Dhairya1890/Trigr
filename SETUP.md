# Trigr Setup Guide

Welcome to the Trigr monorepo. This project consists of a **Next.js 14** frontend and a **FastAPI** backend.

## Prerequisites

- **Node.js**: 22+
- **Python**: 3.13+
- **Docker**: Optional (for containerized development)

## Environment Configuration

Copy the following templates to initialize your local environment:

```bash
# Root / Backend environment
cp .env.example .env

# Frontend environment
cp .env.local.example frontend/.env.local
```

## Installation

### 1. Frontend Dependencies
```bash
npm install
```

### 2. Backend Dependencies
```bash
# Via npm script
npm run backend:install

# Or directly via pip
python -m pip install -r backend/requirements.txt
```

## Local Development

### Run Services Independently
Open two terminal windows:

1. **Frontend** (:3000): `npm run dev`
2. **Backend** (:8000): `npm run backend:dev`

### Run via Docker
```bash
docker compose up
```

## Quality & Linting

We enforce strict linting for both environments. Use the following commands to verify your changes before pushing:

```bash
# Run all checks (Frontend + Backend)
npm run lint:all

# Backend-specific checks
npm run backend:lint        # Ruff lint
npm run backend:format      # Ruff auto-format
```

## Seeding Demo Data

The backend uses a deterministic seeding script to populate the UI with realistic worker profiles and policy history.

```bash
# Dry-run (prints summary only)
npm run seed

# Export to JSON
npm run seed:export
```

---

## 🚫 Current Production Gaps

This repository is currently in a **Release-Ready Demo** state. The following architectural components are not yet production-secure:

1. **Authentication**: Auth is entirely **client-side/simulated**. There is no backend session validation or password hashing.
2. **Persistence**: The backend is **Persistence-Ready** but currently relies on **Deterministic Mocks**. Real Supabase integration is pending DB client initialization in `backend/db/`.
3. **Secrets Management**: `.env.example` contains placeholders. Production keys for RazorPay and Weather APIs are required for live data.
4. **Encryption**: PPI (Personally Identifiable Information) is handled in plain text for demo purposes.

## Project Structure

```text
Trigr/
|-- frontend/          Next.js 14 App (Tailwind, shadcn/ui)
|-- backend/           FastAPI Python API
|   |-- main.py        Entry point & Scheduler
|   |-- models/        Pydantic schemas (aligned to schema.sql)
|   |-- routers/       API route handlers
|   |-- services/      Logic (Fraud, Payout, Premium)
|   |-- integrations/  External API adapters
|   |-- db/            DB connection (Separate Ownership)
|-- seed.py            Deterministic data generator
|-- docker-compose.yml 
|-- package.json       Monorepo scripts
```
