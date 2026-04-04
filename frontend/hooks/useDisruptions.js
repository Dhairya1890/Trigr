"use client";

import { useEffect, useRef, useState } from "react";

import { api } from "@/lib/api";

export default function useDisruptions(city = "Mumbai") {
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load({ silent = false } = {}) {
      try {
        if (!silent && !hasLoadedRef.current) {
          setLoading(true);
        }
        const data = await api.getActiveTriggers();
        const events = data?.events || [];
        const filteredEvents =
          city === "all"
            ? events
            : events.filter((event) => event.city === city);

        if (!cancelled) {
          setActiveEvents(filteredEvents);
          hasLoadedRef.current = true;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    const onSimulation = () => load({ silent: true });
    window.addEventListener("trigr:simulation", onSimulation);
    const intervalId = window.setInterval(() => load({ silent: true }), 5000);

    return () => {
      cancelled = true;
      window.removeEventListener("trigr:simulation", onSimulation);
      window.clearInterval(intervalId);
    };
  }, [city]);

  return { activeEvents, loading, error };
}
