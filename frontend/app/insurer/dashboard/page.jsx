"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/section";
import EventCard from "@/components/insurer/EventCard";
import PoolHealthCard from "@/components/insurer/PoolHealthCard";
import SimulatorButton from "@/components/shared/SimulatorButton";
import { Users, ShieldCheck, Activity, AlertTriangle } from "lucide-react";

export default function InsurerDashboardPage() {
  const activeEvents = [
    { type: "Heavy Rain", city: "Mumbai", zones: ["Dharavi", "Kurla"], status: "ACTIVE", workersAffected: 142, totalPayout: 35500, confidence: 98 },
    { type: "AQI Hazard", city: "Delhi", zones: ["Dwarka", "Rohini"], status: "ACTIVE", workersAffected: 89, totalPayout: 16000, confidence: 92 },
  ];

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface">Insurer Overview</h1>
          <p className="text-sm text-on-surface-variant">Real-time risk monitoring &amp; pool health.</p>
        </div>
        <SimulatorButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Active Policies" value="842" icon={ShieldCheck} trend="+12% this week" />
        <MetricCard label="Total Payouts" value="₹12.4L" icon={Activity} trend="+₹45k today" />
        <MetricCard label="Active Triggers" value="2" icon={AlertTriangle} trend="Stable" />
        <MetricCard label="Insured Workers" value="1,150" icon={Users} trend="+34 today" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-headline font-bold flex items-center gap-2">
            Active Disruption Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeEvents.map((ev, i) => (
              <EventCard key={i} event={ev} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-headline font-bold">Financial Stability</h2>
          <PoolHealthCard />
        </div>
      </div>
    </div>
  );
}
