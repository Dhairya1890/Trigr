# Trigr Frontend — Parametric Insurance Platform

This directory contains the Next.js 14 frontend for the Trigr platform, a parametric insurance solution for India's gig worker ecosystem.

## 🚀 Quick Start

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
4. Run linter: `npm run lint`

## 🎨 Design System

The UI is built with a Material 3-inspired design system, emphasizing clarity, accessibility, and high visual impact.

- **Theme**: Controlled via `ThemeProvider.jsx` and `globals.css`. Supports full dark/light mode switching using HSL CSS variables.
- **Tokens**:
  - `primary`: Material 3 Primary (#006591)
  - `surface`: Off-white background (#F9F9F9) / Deep black-blue in dark mode.
  - `error`: High-visibility Red (#BA1A1A).
- **Typography**: Uses **Plus Jakarta Sans** for headlines and standard sans-serif for body text.

## 📂 Architecture & File Map

```text
frontend/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication flows (Login, Registration, Quote)
│   ├── admin/            # Admin-only dashboards (Analytics, Fraud Management)
│   ├── insurer/          # Insurer-only dashboards (Events, Workers, Payouts)
│   ├── worker/           # Worker-facing dashboard (Policy, Claims, Support)
│   └── layout.jsx        # Global layout with ThemeProvider and RoleGuard
├── components/           # React Components
│   ├── ui/               # Standardized UI Primitives (Button, Badge, DataTable, MetricCard)
│   ├── shared/           # Cross-cutting components (Navbar, ThemeToggle, RoleGuard)
│   ├── premium/          # Premium calculation and quote components
│   ├── insurer/          # Insurer-specific visualizations (LossRatioChart, TriggerMap)
│   └── admin/            # Admin-specific components (FraudSignalBadge)
├── hooks/                # Custom React Hooks
│   ├── useWorker.js      # Fetch and manage worker/policy/claims state
│   ├── useWeather.js     # Unified weather data interface
│   └── useDisruptions.js # Active trigger monitoring
├── lib/                  # Utilities & API Client
│   ├── api.js            # Unified API layer with demo fallbacks
│   └── utils.js          # Tailwind Merge and formatting helpers
└── tailwind.config.js    # Design system configuration (HSL-mapped)
```

## 🛠 Features

- **Parametric Triggers**: Real-time monitoring of rainfall, AQI, and other disruption vectors.
- **Smart Payouts**: Automated disbursement via UPI rails upon trigger verification.
- **AI Fraud Shield**: Anomaly detection logic to prevent "ghost" worker fraud.
- **Simulator**: Built-in event simulator for testing trigger/payout cycles.

## 🔐 Role-Based Access

The application uses `RoleGuard.jsx` to enforce access control based on user roles (`worker`, `insurer`, `admin`). Role state is managed via `localStorage` for demo simplicity.

---
Built by Antigravity @ Google DeepMind
