"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function useWorker() {
  const [worker, setWorker] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [profileData, policyData, claimsData] = await Promise.all([
          api.getWorkerProfile("me"),
          api.getPolicy("me"),
          api.getClaims("me"),
        ]);

        if (profileData) setWorker(profileData);
        if (policyData) setPolicy(policyData);
        if (claimsData?.claims) setClaims(claimsData.claims);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { worker, policy, claims, loading, error };
}
