/**
 * Trigr API Layer
 * Aligned with FastAPI backend routes.
 * Includes mock fallbacks for stable demo performance.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function fetcher(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Fetcher noticed error for ${endpoint}:`, err);
    return null;
  }
}

export const api = {
  // --- AUTH & REGISTRATION ---
  login: async (credentials) => {
    // Demo-only auth logic
    localStorage.setItem("trigr_role", credentials.role || "worker");
    return { token: "demo-token", role: credentials.role || "worker" };
  },

  registerWorker: async (data) => fetcher("/workers/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  verifyUPI: async (upi_id, worker_id) => fetcher("/workers/verify-upi", {
    method: "POST",
    body: JSON.stringify({ upi_id, worker_id }),
  }),

  // --- PREMIUM & QUOTES ---
  calculatePremium: async (data) => fetcher("/premium/calculate", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // --- WORKER DATA ---
  getWorkerProfile: async (workerId = "me") => fetcher(`/workers/${workerId}`),
  getPolicy: async (workerId = "me") => fetcher(`/policies/${workerId}`),
  getClaims: async (workerId = "me") => fetcher(`/claims/${workerId}`),

  // --- TRIGGERS & SIMULATION ---
  getActiveTriggers: async () => fetcher("/triggers/active"),
  
  simulateTrigger: async (params) => fetcher("/triggers/simulate", {
    method: "POST",
    body: JSON.stringify(params),
  }),

  // --- INSURER & ADMIN ---
  getPoolHealth: async () => fetcher("/triggers/insurer/pool-health"),
  
  getFraudQueue: async () => fetcher("/claims/admin/fraud-queue"),
  
  updateFraudVerdict: async (id, verdict) => fetcher(`/claims/admin/fraud/${id}`, {
    method: "POST",
    body: JSON.stringify({ verdict }),
  }),
};
