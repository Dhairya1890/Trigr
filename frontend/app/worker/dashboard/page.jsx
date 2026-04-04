"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import DisruptionBanner from "@/components/dashboard/DisruptionBanner";
import PolicyCard from "@/components/dashboard/PolicyCard";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import PremiumBadge from "@/components/dashboard/PremiumBadge";
import PayoutTimeline from "@/components/dashboard/PayoutTimeline";
import SimulatorButton from "@/components/shared/SimulatorButton";
import { ArrowRight, Loader2 } from "lucide-react";
import useWorker from "@/hooks/useWorker";
import useDisruptions from "@/hooks/useDisruptions";
import useWeather from "@/hooks/useWeather";
import { StatusBadge } from "@/components/ui/badge";

export default function WorkerDashboardPage() {
  const { worker, policy, claims, loading } = useWorker();
  const { activeEvents } = useDisruptions(worker?.city || "Mumbai");
  const { weather } = useWeather(worker?.city || "Mumbai");

  const activeEvent = activeEvents?.[0] || null;

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary-container" />
        <p className="text-sm text-outline animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  const premiumData = policy
    ? {
        weeklyPremium: policy.premiumPaid,
        riskTier: worker?.risk_tier || worker?.riskTier || "MEDIUM",
        nextRenewal: policy.weekEnd || "Next Week",
      }
    : null;

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">Dashboard</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Welcome back, <span className="text-primary font-bold">{worker?.name?.split(" ")[0] || "Worker"}</span>. 
            Your coverage is <StatusBadge status={policy?.status || "PENDING"} className="ml-2" />
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SimulatorButton defaultCity={worker?.city || "Mumbai"} defaultZone={worker?.zone || ""} />
          <Button size="default" className="shadow-cta px-6" asChild>
            <Link href="/worker/policy">Manage Policy <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>

      {/* Disruption Banner */}
      {activeEvent && <DisruptionBanner event={activeEvent} />}

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PolicyCard policy={policy} worker={worker} />
        <WeatherWidget weather={weather} />
        <PremiumBadge premium={premiumData} policy={policy} />
      </div>

      {/* Payout timeline */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-headline font-black text-on-surface flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Recent Payouts & Claims
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/worker/claims">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
        <PayoutTimeline claims={claims} />
      </div>
    </div>
  );
}
