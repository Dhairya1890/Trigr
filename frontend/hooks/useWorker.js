"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function useWorker() {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // In demo mode, we might not have a real worker_id, so we use fallback
        const data = await api.getWorkerProfile();
        if (data) {
          setWorker(data);
        } else {
          // Mock fallback for demo
          setWorker({
            id: "WRK-001",
            name: "Ravi Kumar",
            platform: "Swiggy",
            city: "Mumbai",
            zone: "Dharavi",
            tier: 2,
            upi: "ravi.kumar@okaxis",
            joined_at: "2026-01-15",
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { worker, loading, error };
}
