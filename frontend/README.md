# Frontend Implementation Guide

This document covers the implementation details for the Trigr frontend (Next.js 14 App Router).

## Architecture & Route Structure

```text
frontend/
|-- app/                  # Next.js App Router
|   |-- (auth)/           # Authentication & Onboarding (Login, Register, Quote)
|   |-- admin/            # Admin Dashboards (Fraud Queue, Analytics, Settings)
|   |-- insurer/          # Insurer Dashboards (Live Monitoring, Pool Health, Payouts)
|   |-- worker/           # Worker Application (Dashboard, Active Policy, Claims History)
|   |-- layout.jsx        # Root Layout with AuthProvider & ThemeProvider
|-- components/           # Reusable React Components
|   |-- ui/               # Base primitives (Buttons, Cards, Badges)
|   |-- shared/           # Cross-cutting UI (Navbar, RoleGuard, Footer)
|   |-- onboarding/       # Registration forms natively triggering API validation
|-- context/              # Global React Context (AuthContext.jsx)
|-- lib/                  # Shared utilities and core API fetcher (`api.js`)
|-- hooks/                # Data extraction & polling hooks
```

The application is accessible at [http://localhost:3000](http://localhost:3000).

---

## Auth & RoleGuard Behavior

We currently use a **frontend-only, cookie-simulated context** via `AuthContext.jsx`. 

> [!WARNING]
> **Production Status: Demo Auth Only**
> - There is NO backend-validated session yet.
> - `user`, `role`, and `isAuthenticated` states are managed entirely in the browser.
> - **RoleGuard.jsx** provides client-side navigation protection only. It does not replace server-side authorization.

## API Client & Data Hooks (`lib/api.js`)

All network logic flows through `frontend/lib/api.js`. This allows the application to remain decoupled from backend volatility.

### Fallback Behavior (`IS_DEMO_MODE`)

- **Fetch-First Strategy**: The frontend strictly attempts to `fetch()` from the FastAPI backend first.
- **Defensive Fallbacks**: If the backend is unreachable (e.g. `Connection Refused`) or an endpoint returns a `404`, `api.js` intercepts the failure and returns a stable static JSON payload.
- **Demo Mode Indicators**: UI components may show "Demo Mode" badges or warnings when these fallbacks are active.

## Commands

Ensure the root `package.json` workspace structure is respected:

```bash
# Start the dev server
npm run dev

# Build the production bundle
npm run build

# Lint codebase
npm run lint
```

## Current Limitations

- **Fake Authentication**: The current auth layer uses LocalStorage/Cookies for rapid prototyping. It is **insecure** and should be replaced with Supabase Auth or a dedicated Auth provider.
- **Demo Fallbacks**: While the app is "Persistence-Ready," it currently serves static payloads if the backend team has not yet activated the real Supabase client in `backend/db/`.
