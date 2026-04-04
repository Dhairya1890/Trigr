"use client";

import { useState, useEffect } from "react";

export default function useWeather(city = "Mumbai") {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.getWeather(city);
        if (data) {
          setWeather(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  return { weather, loading, error };
}
