"use client";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

function normalizePolicy(payload) {
  const policy = payload?.policy || payload;
  if (!policy) {
    return null;
  }

  return {
    ...policy,
    weekStart: policy.weekStart || policy.week_start,
    weekEnd: policy.weekEnd || policy.week_end,
    premiumPaid: policy.premiumPaid || policy.premium_paid,
    maxPayout: policy.maxPayout || policy.max_payout,
    coveragePct: policy.coveragePct || Math.round((policy.coverage_pct || 0) * 100),
    verificationTier: policy.verificationTier || policy.verification_tier,
  };
}

function normalizeClaims(claims = []) {
  return claims.map((claim) => ({
    ...claim,
    event: claim.event || claim.type,
    amount: claim.amount ?? claim.payout ?? claim.payout_amount ?? 0,
    date: claim.date || claim.created_at,
  }));
}

export default function useWorker() {
  const { user, loading: authLoading } = useAuth();
  const [worker, setWorker] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    let cancelled = false;
    const workerId = user?.id || "me";

    async function load({ silent = false } = {}) {
      try {
        if (!silent && !hasLoadedRef.current) {
          setLoading(true);
        }
        const [profileData, policyData, claimsData] = await Promise.all([
          api.getWorkerProfile(workerId),
          api.getPolicy(workerId),
          api.getClaims(workerId),
        ]);

        if (!cancelled) {
          if (profileData) {
            setWorker(profileData);
          }
          if (policyData) {
            setPolicy(normalizePolicy(policyData));
          }
          if (claimsData?.claims) {
            setClaims(normalizeClaims(claimsData.claims));
          }
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
  }, [authLoading, user?.id]);

  return { worker, policy, claims, loading, error };
}
