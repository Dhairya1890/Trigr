"use client";

import { useEffect, useRef, useState } from "react";

import { api } from "@/lib/api";

export default function useWeather(city = "Mumbai") {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load({ silent = false } = {}) {
      if (!silent && !hasLoadedRef.current) {
        setLoading(true);
      }
      try {
        const data = await api.getWeather(city);
        if (!cancelled && data) {
          setWeather(data);
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
    const intervalId = window.setInterval(() => load({ silent: true }), 30000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [city]);

  return { weather, loading, error };
}
