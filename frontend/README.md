# Frontend Implementation Guide

This document covers the implementation details for the Trigr frontend (Next.js 14 App Router).

## 📁 Architecture & Route Structure

```text
frontend/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication & Onboarding (Login, Register, Quote)
│   ├── admin/            # Admin Dashboards (Fraud Queue, Analytics, Settings)
│   ├── insurer/          # Insurer Dashboards (Live Monitoring, Pool Health, Payouts)
│   ├── worker/           # Worker Application (Dashboard, Active Policy, Claims History)
│   └── layout.jsx        # Root Layout with AuthProvider & ThemeProvider
├── components/           # Reusable React Components
│   ├── ui/               # Base primitives (Buttons, Cards, Badges)
│   ├── shared/           # Cross-cutting UI (Navbar, RoleGuard, Footer, SimulatorButton)
│   ├── onboarding/       # Registration forms natively triggering API validation
│   └── ...               # Domain-specific modules (Admin, Insurer, Worker logic)
├── context/              # Global React Context (AuthContext.jsx)
├── lib/                  # Shared utilities and core API fetcher (`api.js`)
└── hooks/                # Data extraction & polling hooks (`useWorker`, `useDisruptions`, `useWeather`)
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Auth & RoleGuard Behavior

We use a local, cookie-simulated context via `AuthContext.jsx`. In production, this will natively connect to Supabase Auth.

- **Provider**: Standardizes `user`, `role`, and `isAuthenticated` states application-wide.
- **RoleGuard.jsx**: Client-side interception layout wrapper.
  - Generates immediate client-side redirects if an unauthorized agent tries accessing protected scopes.
  - Automatically sends `/worker/*` visitors to login if they are missing standard bearer tokens.

## 🔌 API Client & Data Hooks (`lib/api.js`)

All standard network logic pushes through `frontend/lib/api.js`. This allows the application to remain decoupled from underlying backend refactorings.

### Fallback Behavior (`IS_DEMO_MODE`)

- **Fetch-First Strategy**: The frontend strictly executes `fetch()` towards the active FastAPI backend first.
- **Defensive Fallbacks**: If the backend is unreachable (e.g. `Connection Refused`) or an endpoint explicitly throws a `404`, `api.js` gracefully intercepts the `null` response and cascades to a static JSON payload natively fulfilling the UI's typing requirements. This guarantees presentation stability.

### Primary Hooks

1. **`useWorker`**: Fetches active worker profile (`/api/workers/{id}`), active policies (`/api/policies/{id}`), and historical claims (`/api/claims/{id}`).
2. **`useDisruptions`**: Connects to the event engine (`/api/triggers/active`) to hydrate incident timelines.
3. **`useWeather`**: Binds to weather monitoring models directly feeding `WeatherWidget`.

## 🛠 Commands

Ensure the root `package.json` workspace structure is respected when issuing commands:

```bash
# Build the production bundle
npm run build --workspace frontend

# Start the dev server
npm run dev --workspace frontend

# Lint codebase (ensures strict compliance)
npm run lint --workspace frontend
```

## ⚠️ Current Limitations

- **Fake Authentication**: The current authentication layer uses `localStorage` for rapid prototyping. It is entirely insecure for production.
- **Demo Fallbacks**: Because the database integration is actively decoupled, some routes will deliberately return static default payloads (like `IS_DEMO_MODE=true` failsafes) if the FastAPI Python router is offline. Ensure `npm run backend:dev` is running first to consume dynamic contracts.
