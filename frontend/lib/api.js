/**
 * Trigr API Layer
 * Aligned with FastAPI backend routes.
 * Includes robust mock fallbacks for stable demo performance.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const IS_DEMO_MODE = true; // When true, static data is used as a fallback if the backend is unreachable.

async function fetcher(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.warn(`[API] Backend returned error ${res.status} for ${endpoint}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    if (IS_DEMO_MODE) {
      console.info(`[API] Backend unreachable at ${endpoint}. Cascading to demo fallback payload.`);
    } else {
      console.error(`[API] Connection failed for ${endpoint}:`, err.message);
    }
    return null;
  }
}

export const api = {
  // --- AUTH & REGISTRATION ---
  login: async (credentials) => {
    // Demo-only auth logic
    localStorage.setItem("trigr_role", credentials.role || "worker");
    localStorage.setItem("trigr_user", JSON.stringify({ name: "Demo User", id: "wrk_demo" }));
    return { token: "demo-token", role: credentials.role || "worker" };
  },

  registerWorker: async (data) => {
    const res = await fetcher("/workers/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res || !IS_DEMO_MODE) return res;
    
    // Fallback
    return {
      worker_id: "wrk_demo_" + Math.random().toString(36).substr(2, 5),
      risk_score: 65,
      risk_tier: "MEDIUM",
      weekly_premium: 145,
      max_payout: 3500,
    };
  },

  verifyUPI: async (upi_id, worker_id) => {
    const res = await fetcher("/workers/verify-upi", {
      method: "POST",
      body: JSON.stringify({ upi_id, worker_id }),
    });
    if (res !== null || !IS_DEMO_MODE) return res;
    return { verified: true, message: "UPI verified (Demo Mode)" };
  },

  // --- PREMIUM & QUOTES ---
  calculatePremium: async (data) => {
    const res = await fetcher("/premium/calculate", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res || !IS_DEMO_MODE) return res;
    
    // Fallback logic matching lib/premiumCalc.js
    return {
      weekly_premium: 131,
      risk_tier: "LOW",
      coverage_pct: 75,
      max_payout: 4500,
    };
  },

  // --- WORKER DATA ---
  getWorkerProfile: async (workerId = "me") => {
    const res = await fetcher(`/workers/${workerId}`);
    if (res || !IS_DEMO_MODE) return res;
    return { id: workerId, name: "Ravi Kumar", platform: "Swiggy", zone: "Dharavi", city: "Mumbai" };
  },

  getPolicy: async (workerId = "me") => {
    const res = await fetcher(`/policies/${workerId}`);
    if (res || !IS_DEMO_MODE) return res;
    return {
      policy_id: "POL-88219",
      status: "ACTIVE",
      week_start: "2026-04-14",
      week_end: "2026-04-20",
      premium_paid: 131,
      coverage_type: "Heavy Rain & Flood",
    };
  },

  getClaims: async (workerId = "me") => {
    const res = await fetcher(`/claims/${workerId}`);
    if (res || !IS_DEMO_MODE) return res;
    return {
      claims: [
        { id: "CLM-001", date: "2026-04-12", type: "Heavy Rain", amount: 450, status: "PAID" },
        { id: "CLM-002", date: "2026-04-05", type: "AQI Hazard", amount: 180, status: "PAID" },
      ]
    };
  },

  // --- TRIGGERS & SIMULATION ---
  getActiveTriggers: async () => {
    const res = await fetcher("/triggers/active");
    if (res || !IS_DEMO_MODE) return res;
    return {
      events: [
        { id: "evt_1", type: "Heavy Rain", zone: "Dharavi", severity: "HIGH", timestamp: new Date().toISOString() }
      ]
    };
  },
  
  simulateTrigger: async (params) => {
    const res = await fetcher("/triggers/simulate", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (res || !IS_DEMO_MODE) return res;
    return { status: "queued", message: "Simulation triggered successfully (Demo Mode)" };
  },

  // --- INSURER & ADMIN ---
  getPoolHealth: async () => {
    const res = await fetcher("/triggers/insurer/pool-health");
    if (res || !IS_DEMO_MODE) return res;
    return {
      premium_collected: 8850000,
      payouts_issued: 1120000,
      loss_ratio: 12.6,
      reserve_buffer: 5500000,
      active_workers: 4200,
      solvent: true
    };
  },
  
  getPayoutLedger: async () => {
    const res = await fetcher("/claims/payout-ledger");
    if (res || !IS_DEMO_MODE) return res;
    return {
      payouts: [
        { id: "PAY-9011", workerId: "WRK-001", eventType: "Heavy Rain", amount: 250, utr: "9021445120XP", date: "Apr 14, 2026", status: "PAID" },
        { id: "PAY-9012", workerId: "WRK-142", eventType: "Flood Alert", amount: 1500, utr: "9021445121XP", date: "Apr 14, 2026", status: "PROCESSING" },
        { id: "PAY-9013", workerId: "WRK-882", eventType: "Cyclone", amount: 3200, utr: "9021445122XP", date: "Apr 13, 2026", status: "PAID" },
        { id: "PAY-9014", workerId: "WRK-044", eventType: "Heavy Rain", amount: 450, utr: "9021445123XP", date: "Apr 13, 2026", status: "PAID" },
        { id: "PAY-9015", workerId: "WRK-109", eventType: "AQI Hazard", amount: 180, utr: "9021445124XP", date: "Apr 12, 2026", status: "PAID" },
      ]
    };
  },

  getFraudQueue: async () => {
    const res = await fetcher("/claims/admin/fraud-queue");
    if (res || !IS_DEMO_MODE) return res;
    return {
      claims: [
        { 
          id: "CLM-901", 
          workerId: "WRK-442", 
          workerName: "Ravi Kumar",
          type: "GPS_SPOOFED", 
          score: 88,
          signals: ["Location Mismatch", "High Velocity"],
          confidence: 0.88, 
          status: "PENDING" 
        },
        { 
          id: "CLM-902", 
          workerId: "WRK-109", 
          workerName: "Sunita Singh",
          type: "INCONSISTENT_SPEED", 
          score: 72,
          signals: ["Rapid movement"],
          confidence: 0.72, 
          status: "PENDING" 
        },
      ]
    };
  },
  
  updateFraudVerdict: async (id, verdict) => {
    const res = await fetcher(`/claims/admin/fraud/${id}`, {
      method: "POST",
      body: JSON.stringify({ verdict }),
    });
    if (res || !IS_DEMO_MODE) return res;
    return { success: true, id, verdict };
  },
};
