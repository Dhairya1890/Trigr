"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import DisruptionBanner from "@/components/dashboard/DisruptionBanner";
import PolicyCard from "@/components/dashboard/PolicyCard";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import PremiumBadge from "@/components/dashboard/PremiumBadge";
import PayoutTimeline from "@/components/dashboard/PayoutTimeline";
import SimulatorButton from "@/components/shared/SimulatorButton";
import { ArrowRight } from "lucide-react";

export default function WorkerDashboardPage() {
  const activeEvent = {
    type: "Heavy Rain",
    city: "Mumbai",
    zones: ["Dharavi", "Kurla", "Sion"],
    since: "2:00 PM",
  };

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold">Dashboard</h1>
          <p className="text-sm text-on-surface-variant">Welcome back, Ravi. Your coverage is active.</p>
        </div>
        <div className="flex items-center gap-3">
          <SimulatorButton />
          <Button size="sm" asChild>
            <Link href="/worker/coverage">Upgrade Coverage <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>

      {/* Disruption Banner */}
      <DisruptionBanner event={activeEvent} />

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PolicyCard />
        <WeatherWidget />
        <PremiumBadge />
      </div>

      {/* Payout timeline */}
      <PayoutTimeline />
    </div>
  );
}
