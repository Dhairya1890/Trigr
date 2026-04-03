"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/section";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { ArrowRight, IndianRupee, Info } from "lucide-react";

export default function RegisterEarningsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [earnings, setEarnings] = useState("");
  const [upi, setUpi] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("trigr_reg");
    if (!saved) router.push("/register");
  }, [router]);

  function handleContinue() {
    const prev = JSON.parse(localStorage.getItem("trigr_reg") || "{}");
    localStorage.setItem("trigr_reg", JSON.stringify({ ...prev, name, phone, earnings: Number(earnings), upi }));
    router.push("/register/verify");
  }

  const canContinue = name && phone && earnings && upi;

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          <StepIndicator current={2} total={4} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-extrabold">Your Earnings &amp; UPI</h1>
            <p className="text-on-surface-variant">This helps us calculate your premium and set your payout destination.</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Ravi Kumar" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Weekly Earnings (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input type="number" value={earnings} onChange={e => setEarnings(e.target.value)} placeholder="4500" className="w-full pl-9 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">UPI ID</label>
                <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="ravi.kumar@okaxis" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface" />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border-l-4 border-primary-container">
                <Info className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface-variant">
                  Your UPI ID will be used for all future payouts. In the next step, we&apos;ll verify it with a ₹1 penny drop &mdash; that rupee is yours to keep.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full" disabled={!canContinue} onClick={handleContinue}>
            Continue to Verification <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </PageShell>
    </>
  );
}
