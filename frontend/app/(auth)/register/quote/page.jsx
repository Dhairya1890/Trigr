"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/ui/section";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { calculatePremiumPreview } from "@/lib/premiumCalc";
import { ShieldCheck, Loader2, CircleCheckBig } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterQuotePage() {
  const router = useRouter();
  const { signup, loading: authLoading } = useAuth();
  const [regData, setRegData] = useState(null);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("trigr_reg");
    if (!saved) { router.push("/register"); return; }
    try {
      const data = JSON.parse(saved);
      setRegData(data);
      setQuote(calculatePremiumPreview(data));
    } catch (e) {
      router.push("/register");
    }
  }, [router]);

  async function handlePurchase() {
    setError("");
    const res = await signup({
      ...regData,
      weekly_premium: quote.weeklyPremium,
      risk_tier: quote.riskTier,
      coverage_pct: quote.coveragePct,
      max_payout: quote.maxPayout
    });
    
    if (res.success) {
      localStorage.removeItem("trigr_reg");
      router.push("/worker/dashboard");
    } else {
      setError(res.error || "Failed to finalize coverage. Please try again.");
    }
  }

  if (!regData || !quote) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
    </div>
  );

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          <StepIndicator current={4} total={4} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Your Coverage Quote</h1>
            <p className="text-on-surface-variant font-medium">Weekly Premium - ₹{quote.weeklyPremium}</p>
            <p className="text-on-surface-variant">Review your personalized premium and payout details.</p>
          </div>

          {/* Quote Card */}
          <Card className="overflow-hidden border-outline-variant/10 shadow-xl bg-surface">
            <div className="h-2 bg-primary-container" />
            <CardContent className="p-8 space-y-6">
              {/* Premium headline */}
              <div className="text-center space-y-2">
                <p className="text-sm text-outline uppercase tracking-wider font-bold">Weekly Premium</p>
                <p className="text-5xl font-headline font-extrabold text-primary-container font-currency">
                  ₹{quote.weeklyPremium}
                </p>
                <p className="text-sm text-on-surface-variant font-medium">per week</p>
              </div>

              {/* Detail rows */}
              <div className="space-y-1 pt-4 border-t border-outline-variant/10">
                {[
                  { label: "Name", value: regData.name },
                  { label: "Platform", value: regData.platform },
                  { label: "City · Zone", value: `${regData.city} · ${regData.zone}` },
                  { label: "Weekly Earnings", value: `₹${regData.earnings?.toLocaleString("en-IN")}` },
                  { label: "Risk Tier", value: <Badge variant={quote.riskTier === "HIGH" ? "danger" : quote.riskTier === "MEDIUM" ? "warning" : "success"}>{quote.riskTier}</Badge> },
                  { label: "Verification Tier", value: `Tier ${regData.verificationTier || 1}` },
                  { label: "Coverage", value: `${quote.coveragePct || 75}%` },
                  { label: "Max Weekly Payout", value: <span className="font-currency font-bold text-primary">₹{quote.maxPayout?.toLocaleString("en-IN")}</span> },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm py-2.5 border-b border-outline-variant/5 last:border-0">
                    <span className="text-on-surface-variant">{row.label}</span>
                    <span className="font-semibold text-on-surface">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* UPI status */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <CircleCheckBig className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs font-bold text-success uppercase tracking-wider">Verified Payout Target</p>
                  <p className="text-sm text-on-surface font-medium">{regData.upi}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <p className="text-sm text-error font-medium bg-error/10 p-4 rounded-xl border border-error/20">
              {error}
            </p>
          )}

          <Button 
            size="xl" 
            className="w-full shadow-lg h-14 text-lg" 
            onClick={handlePurchase} 
            disabled={authLoading}
          >
            {authLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Buy Coverage — ₹{quote.weeklyPremium}/week
              </>
            )}
          </Button>

          <p className="text-center text-xs text-outline font-medium">
            Coverage starts immediately and renews weekly. Cancel anytime.
          </p>
        </div>
      </PageShell>
    </>
  );
}
