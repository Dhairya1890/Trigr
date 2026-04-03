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
        // Mock weather data with high-fidelity attributes
        // In a real app, this would fetch from a weather oracle or API
        await new Promise(r => setTimeout(r, 800));
        setWeather({
          city: city,
          temp: "29°C",
          humidity: "82%",
          windSpeed: "18 km/h",
          condition: "Partly Cloudy",
          aqi: 85,
          aqiLabel: "Moderate",
          rainfall3h: "2.4mm",
          last_updated: new Date().toLocaleTimeString(),
        });
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
