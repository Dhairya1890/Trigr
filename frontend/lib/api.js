/**
 * Trigr API Layer
 * Aligned with FastAPI backend routes.
 * Includes robust mock fallbacks for stable demo performance.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const IS_DEMO_MODE = true; // When true, static data is used as a fallback if the backend is unreachable.

function normalizeWorkerPayload(data) {
  return {
    name: data.name,
    phone: data.phone,
    platform: data.platform,
    city: data.city,
    zone: data.zone,
    shift_start: data.shift_start || data.shiftStart,
    shift_end: data.shift_end || data.shiftEnd,
    working_days: data.working_days || data.workingDays,
    weekly_earnings: data.weekly_earnings || data.earnings || data.weeklyEarnings,
    upi_id: data.upi_id || data.upi,
    role: data.role || "worker",
  };
}

function normalizePremiumPayload(data) {
  const shiftStart = data.shift_start || data.shiftStart || "10:00";
  const shiftEnd = data.shift_end || data.shiftEnd || "22:00";
  
  // Handle overnight shifts correctly
  const startH = Number(shiftStart.split(":")[0]);
  const endH = Number(shiftEnd.split(":")[0]);
  let diff = endH - startH;
  if (diff <= 0) diff += 24;
  const shiftHours = diff;

  return {
    platform: data.platform,
    city: data.city,
    zone: data.zone,
    weekly_earnings: Number(data.weekly_earnings || data.earnings || data.weeklyEarnings || 0),
    shift_hours: Number(data.shift_hours || shiftHours),
    working_days: Number(data.working_days || data.workingDays || 6),
    month: data.month || new Date().getMonth() + 1,
  };
}

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
  // Auth is handled locally in AuthContext for this demo phase.
  // We include these here for future backend connectivity.
  login: async (credentials) => {
    // Attempt real fetch first if backend ever adds an auth route
    const res = await fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (res || !IS_DEMO_MODE) return res;
    
    // Explicit demo fallback
    return { token: "demo-token", role: credentials.role || "worker" };
  },

  registerWorker: async (data) => {
    const res = await fetcher("/workers/register", {
      method: "POST",
      body: JSON.stringify(normalizeWorkerPayload(data)),
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

  verifyUPI: async (upiId, workerId) => {
    const res = await fetcher("/workers/verify-upi", {
      method: "POST",
      body: JSON.stringify({ upi_id: upiId, worker_id: workerId }),
    });
    if (res !== null || !IS_DEMO_MODE) return res;
    return { verified: true, message: "UPI verified (Demo Mode)" };
  },

  // --- PREMIUM & QUOTES ---
  calculatePremium: async (data) => {
    const res = await fetcher("/premium/calculate", {
      method: "POST",
      body: JSON.stringify(normalizePremiumPayload(data)),
    });
    if (res || !IS_DEMO_MODE) return res;
    
    // Fallback logic
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
    return { 
      id: workerId, 
      name: "Ravi Kumar", 
      platform: "Swiggy", 
      zone: "Dharavi", 
      city: "Mumbai",
      weekly_earnings: 4500,
      weeklyEarnings: 4500,
      risk_tier: "MEDIUM",
      riskTier: "MEDIUM",
      verification_tier: 2,
      verificationTier: 2,
      upi_verified: true,
      shift_start: "10:00",
      shift_end: "22:00",
      working_days: 6,
    };
  },

  getPolicy: async (workerId = "me") => {
    const res = await fetcher(`/policies/${workerId}`);
    if (res || !IS_DEMO_MODE) return res;
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return {
      policy_id: "POL-88219",
      status: "ACTIVE",
      week_start: weekStart.toISOString().split('T')[0],
      week_end: weekEnd.toISOString().split('T')[0],
      premium_paid: 131,
      max_payout: 3600,
      maxPayout: 3600,
      coverage_pct: 0.80,
      coveragePct: 80,
      verification_tier: 2,
      verificationTier: 2,
      coverage_type: "Heavy Rain & Flood",
    };
  },

  getClaims: async (workerId = "me") => {
    const res = await fetcher(`/claims/${workerId}`);
    if (res || !IS_DEMO_MODE) return res;

    // --- LIVE DEMO CLAIMS ---
    // Merge simulated claims from localStorage
    let simulatedClaims = [];
    try {
      const saved = localStorage.getItem("trigr_simulated_claims");
      if (saved) simulatedClaims = JSON.parse(saved);
    } catch (e) {}

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    return {
      claims: [
        ...simulatedClaims,
        { id: "CLM-001", date: yesterday.toISOString().split('T')[0], type: "Heavy Rain", amount: 450, status: "PAID", event: "Heavy Rain", zone: "Dharavi" },
        { id: "CLM-002", date: lastWeek.toISOString().split('T')[0], type: "AQI Hazard", amount: 180, status: "PAID", event: "AQI Hazard", zone: "Dharavi" },
      ]
    };
  },

  // --- WEATHER & TRIGGERS ---
  getWeather: async (city = "Mumbai") => {
    const res = await fetcher(`/triggers/weather?city=${city}`);
    if (res || !IS_DEMO_MODE) return res;
    
    // Centralized high-fidelity weather fallback
    return {
      city: city,
      temp: "29°C",
      humidity: "82%",
      windSpeed: "18 km/h",
      condition: "Partly Cloudy",
      aqi: 85,
      aqiLabel: "Moderate",
      rainfall3h: "2.4mm",
      last_updated: new Date().toLocaleTimeString(),
    };
  },

  getActiveTriggers: async () => {
    const res = await fetcher("/triggers/active");
    if (res || !IS_DEMO_MODE) return res;
    return {
      events: [
        {
          id: "evt_1",
          type: "Heavy Rain",
          city: "Mumbai",
          zone: "Dharavi",
          zones: ["Dharavi"],
          severity: "HIGH",
          status: "ACTIVE",
          totalPayout: 250,
          workersAffected: 1,
          timestamp: new Date().toISOString(),
        }
      ]
    };
  },
  
  simulateTrigger: async (params) => {
    const res = await fetcher("/triggers/simulate", {
      method: "POST",
      body: JSON.stringify(params),
    });
    
    if (IS_DEMO_MODE) {
      // Create a reactive demo claim
      const newClaim = {
        id: "CLM-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        type: params.type || "Weather Alert",
        event: params.type || "Weather Alert",
        amount: Math.floor(Math.random() * (1200 - 250 + 1)) + 250,
        status: "PAID",
        zone: params.zone || "Active Zone",
        isSimulated: true
      };

      try {
        const existing = JSON.parse(localStorage.getItem("trigr_simulated_claims") || "[]");
        localStorage.setItem("trigr_simulated_claims", JSON.stringify([newClaim, ...existing]));
        
        // Notify the dashboard to refresh
        window.dispatchEvent(new CustomEvent("trigr:simulation"));
      } catch (e) {}

      if (!res) return { status: "queued", message: "Simulation triggered successfully (Demo Mode)", claim: newClaim };
    }
    
    return res;
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
