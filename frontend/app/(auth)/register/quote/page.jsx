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
import { ShieldCheck, ArrowRight, CircleCheckBig } from "lucide-react";

export default function RegisterQuotePage() {
  const router = useRouter();
  const [regData, setRegData] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("trigr_reg");
    if (!saved) { router.push("/register"); return; }
    const data = JSON.parse(saved);
    setRegData(data);
    setQuote(calculatePremiumPreview(data));
  }, [router]);

  function handlePurchase() {
    localStorage.setItem("trigr_role", "worker");
    router.push("/worker/dashboard");
  }

  if (!regData || !quote) return null;

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          <StepIndicator current={4} total={4} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-extrabold">Your Coverage Quote</h1>
            <p className="text-on-surface-variant font-medium">Weekly Premium - ₹{quote.weeklyPremium}</p>
            <p className="text-on-surface-variant">Review your personalized premium and payout details.</p>
          </div>

          {/* Quote Card */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary-container" />
            <CardContent className="p-8 space-y-6">
              {/* Premium headline */}
              <div className="text-center space-y-2">
                <p className="text-sm text-outline uppercase tracking-wider font-bold">Weekly Premium</p>
                <p className="text-5xl font-headline font-extrabold text-primary-container font-currency">
                  ₹{quote.weeklyPremium}
                </p>
                <p className="text-sm text-on-surface-variant">per week</p>
              </div>

              {/* Detail rows */}
              <div className="space-y-3 pt-4 border-t border-outline-variant/10">
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
                  <div key={row.label} className="flex justify-between text-sm py-2 border-b border-outline-variant/10 last:border-0">
                    <span className="text-outline">{row.label}</span>
                    <span className="font-semibold text-on-surface">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* UPI status */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
                <CircleCheckBig className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">
                  {regData.upiVerified ? "UPI Verified" : "UPI pending verification"} — {regData.upi}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button size="xl" className="w-full" onClick={handlePurchase}>
            <ShieldCheck className="w-5 h-5" />
            Buy Coverage — ₹{quote.weeklyPremium}/week
          </Button>

          <p className="text-center text-xs text-outline">
            Coverage starts immediately and renews weekly. Cancel anytime.
          </p>
        </div>
      </PageShell>
    </>
  );
}
