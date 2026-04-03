"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/section";
import StepIndicator from "@/components/onboarding/StepIndicator";
import RoleSelector from "@/components/onboarding/RoleSelector";
import PlatformSelector from "@/components/onboarding/PlatformSelector";
import ZonePicker from "@/components/onboarding/ZonePicker";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [shiftStart, setShiftStart] = useState("10:00");
  const [shiftEnd, setShiftEnd] = useState("22:00");
  const [workingDays, setWorkingDays] = useState(6);

  function handleContinue() {
    if (role === "insurer") {
      localStorage.setItem("trigr_role", "insurer");
      router.push("/insurer/dashboard");
      return;
    }
    if (role === "admin") {
      localStorage.setItem("trigr_role", "admin");
      router.push("/admin/fraud");
      return;
    }
    const data = { role, platform, city, zone, shiftStart, shiftEnd, workingDays };
    localStorage.setItem("trigr_role", "worker");
    localStorage.setItem("trigr_reg", JSON.stringify(data));
    router.push("/register/earnings");
  }

  const canContinue = role === "worker"
    ? platform && city && zone
    : role !== null;

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          <StepIndicator current={1} total={4} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-extrabold">Get Started with Trigr</h1>
            <p className="text-on-surface-variant">Choose your role and tell us about yourself.</p>
          </div>

          {/* Role Selection */}
          <RoleSelector selected={role} onSelect={setRole} />

          {/* Worker-specific fields */}
          {role === "worker" && (
            <Card>
              <CardContent className="p-8 space-y-6">
                <PlatformSelector selected={platform} onSelect={setPlatform} />

                <ZonePicker city={city} zone={zone} onCityChange={setCity} onZoneChange={setZone} />

                {/* Shift */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Shift Start</label>
                    <input type="time" value={shiftStart} onChange={e => setShiftStart(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Shift End</label>
                    <input type="time" value={shiftEnd} onChange={e => setShiftEnd(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm" />
                  </div>
                </div>

                {/* Working days */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Working Days / Week: <span className="text-primary-container font-bold">{workingDays}</span></label>
                  <input type="range" min={4} max={7} value={workingDays} onChange={e => setWorkingDays(Number(e.target.value))} className="w-full accent-primary-container" />
                  <div className="flex justify-between text-xs text-outline"><span>4 days</span><span>7 days</span></div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            size="lg"
            className="w-full"
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </PageShell>
    </>
  );
}
