"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function useDisruptions(city = "Mumbai") {
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api.getActiveTriggers();
        if (data && data.length > 0) {
          setActiveEvents(data);
        } else {
          // Demo fallback: Active disruption in Mumbai
          setActiveEvents([
            {
              id: "EVT-889",
              type: "Heavy Rain",
              city: "Mumbai",
              zones: ["Dharavi", "Kurla", "Sion"],
              since: "2:00 PM",
              status: "ACTIVE",
              intensity: "High"
            }
          ]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  return { activeEvents, loading, error };
}
