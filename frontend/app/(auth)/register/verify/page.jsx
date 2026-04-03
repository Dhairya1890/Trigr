"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import UPIVerifyCard from "@/components/onboarding/UPIVerifyCard";
import { PageShell } from "@/components/ui/section";
import StepIndicator from "@/components/onboarding/StepIndicator";

export default function RegisterVerifyPage() {
  const router = useRouter();
  const [regData, setRegData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("trigr_reg");
    if (!saved) { router.push("/register"); return; }
    setRegData(JSON.parse(saved));
  }, [router]);

  function handleVerified() {
    const updated = { ...regData, upiVerified: true, verificationTier: 2 };
    localStorage.setItem("trigr_reg", JSON.stringify(updated));
    router.push("/register/quote");
  }

  function handleSkip() {
    const updated = { ...regData, upiVerified: false, verificationTier: 1 };
    localStorage.setItem("trigr_reg", JSON.stringify(updated));
    router.push("/register/quote");
  }

  if (!regData) return null;

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          <StepIndicator current={3} total={4} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-extrabold">Verify Your UPI</h1>
            <p className="text-on-surface-variant">We&apos;ll send ₹1 to confirm your account. It&apos;s a gift, not a charge.</p>
          </div>

          <UPIVerifyCard upi={regData.upi} onVerified={handleVerified} onSkip={handleSkip} />
        </div>
      </PageShell>
    </>
  );
}
