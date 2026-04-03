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
        if (data && data.events) {
          setActiveEvents(data.events);
        } else {
          setActiveEvents([]);
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
