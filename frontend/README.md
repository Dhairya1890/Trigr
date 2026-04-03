# Trigr Frontend — Parametric Income Protection

This directory contains the **Next.js 14** frontend for the Trigr platform, a state-of-the-art parametric insurance solution tailored for India's gig worker ecosystem.

## 🚀 Quick Start

### 1. Prerequisite: Backend

Ensure the FastAPI backend is running first.

```bash
# In the project root
npm run backend:dev
```

### 2. Frontend Setup

```bash
# In the frontend directory
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Authentication & Security

The platform implements a centralized **Authentication & Authorization** system to ensure secure, role-based access.

### Centralized Auth Flow

- **AuthContext**: Managed via `frontend/context/AuthContext.jsx`. It handles session initialization, persistence across refreshes, and role-based redirection.
- **AuthProvider**: Wraps the entire application in `layout.jsx`, providing a unified state for `user`, `role`, and `isAuthenticated`.
- **useAuth Hook**: Any client component can easily access the current user and authentication methods:

```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### Role-Based Access Control (RBAC)

We use a robust `RoleGuard.jsx` component to protect sensitive dashboard routes:

- **Worker Dashboard** (`/worker`): Requires `role === "worker"`
- **Insurer Dashboard** (`/insurer`): Requires `role === "insurer"`
- **Admin Dashboard** (`/admin`): Requires `role === "admin"`

Unauthorized access attempts are automatically intercepted and redirected to either the login page or the user's appropriate dashboard.

---

## 🛠 Features & Architecture

### Key Features

- **Parametric Trigger Monitoring**: Real-time visualization of rainfall, AQI, and noise disruptions.
- **Automated Payouts**: Logic for immediate UPI-based disbursement when thresholds are met.
- **AI Fraud Shield**: Anomaly detection signals to prevent "ghost" worker activity.
- **Interactive Simulator**: Test trigger events and payout cycles in a sandbox environment.

### Project Structure

```text
frontend/
├── app/                  # Next.js App Router (File-based Routing)
│   ├── (auth)/           # Auth Routes (Login, Register, Quote)
│   ├── admin/            # Admin Dashboards & Analytics
│   ├── insurer/          # Insurer Dashboards & Risk Monitoring
│   ├── worker/           # Worker Dashboards & Policy Management
│   └── layout.jsx        # Root Layout with AuthProvider & ThemeProvider
├── components/           # React Components
│   ├── ui/               # Standardized Fintech Primitives (Badges, MetricCards)
│   ├── shared/           # Cross-cutting UI (Navbar, RoleGuard, Footer)
│   └── ...               # Domain-specific components (Admin, Insurer, Worker)
├── context/              # Global State (AuthContext.jsx)
├── lib/                  # Utilities & API client (api.js)
└── hooks/                # Custom React hooks (useWorker, useAuth)
```

---

## 🎨 Design System

Built with a **Premium Fintech Aesthetic** using Tailwind CSS and HSL-mapped variables.

- **Dual-Theme Stability**: Full support for Dark and Light modes with high-contrast stabilization for critical data surfaces.
- **Resonant Typography**: Uses **Plus Jakarta Sans** for professional, modern headlines.
- **Extension Resilience**: Includes built-in suppression for external browser extension errors (e.g., MetaMask, MetaMask inpage.js) that can interfere with the development overlay.

---

## 🏗 Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement. |
| `npm run build` | Compiles the production-optimized application. |
| `npm run lint` | Runs ESLint to ensure code quality and consistency. |
| `npm run start` | Runs the built production server locally. |

---

> **Note on Demo Mode**: The application currently operates in "Demo Mode" with a unified API client that handles backend communication while providing intelligent fallbacks if the server is unreachable. Production deployments will require live Supabase and Razorpay API keys.
