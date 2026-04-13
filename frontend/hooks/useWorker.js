"use client";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { collectBrowserLocationSignals } from "@/lib/browserLocationSignals";

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
  const telemetrySentRef = useRef(false);

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
          let mergedWorker = profileData;
          let mergedPolicy = normalizePolicy(policyData);

          // --- DEMO PERSISTENCE ---
          // Use localStorage to reflect user-entered data without a database.
          try {
            const localUser = localStorage.getItem("trigr_user");
            if (localUser) {
              const parsed = JSON.parse(localUser);
              mergedWorker = { ...profileData, ...parsed };
              
              // Ensure policy matches what was quoted
              if (mergedPolicy && parsed.weekly_premium) {
                mergedPolicy.premiumPaid = parsed.weekly_premium;
                mergedPolicy.maxPayout = parsed.max_payout;
                mergedPolicy.riskTier = parsed.risk_tier;
              }
            }
          } catch (e) {
            console.error("Failed to load local user data", e);
          }

          if (mergedWorker) {
            setWorker(mergedWorker);
          }
          if (mergedPolicy) {
            setPolicy(mergedPolicy);
          }
          if (claimsData?.claims) {
            setClaims(normalizeClaims(claimsData.claims));
          }
          hasLoadedRef.current = true;

          if (!telemetrySentRef.current && mergedWorker?.id) {
            telemetrySentRef.current = true;

            collectBrowserLocationSignals(mergedWorker.city, mergedWorker.zone)
              .then((attestation) => api.submitLocationAttestation(mergedWorker.id, attestation))
              .catch((telemetryError) => {
                console.warn("Telemetry capture skipped:", telemetryError);
              });
          }
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
