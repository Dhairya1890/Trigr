"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import EventCard from "@/components/insurer/EventCard";
import PoolHealthCard from "@/components/insurer/PoolHealthCard";
import SimulatorButton from "@/components/shared/SimulatorButton";
import { Users, ShieldCheck, Activity, AlertTriangle, Loader2 } from "lucide-react";
import useDisruptions from "@/hooks/useDisruptions";
import { api } from "@/lib/api";

export default function InsurerDashboardPage() {
  const { activeEvents, loading: eventsLoading } = useDisruptions("all");
  const [poolStats, setPoolStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getPoolHealth();
        setPoolStats(data);
      } finally {
        setStatsLoading(false);
      }
    }
    loadStats();
  }, []);

  const loading = eventsLoading || statsLoading;

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary-container" />
      </div>
    );
  }

  const safeEvents = activeEvents || [];

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">Insurer Overview</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Real-time risk monitoring, pool health, and active disruption events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SimulatorButton />
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Active Policies" value={poolStats?.active_workers?.toLocaleString() || "0"} icon={ShieldCheck} trend="+12% this week" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Total Payouts" value={`₹${((poolStats?.payouts_issued || 0)/100000).toFixed(1)}L`} icon={Activity} trend="+₹45k today" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Active Triggers" value={safeEvents.length} icon={AlertTriangle} trend={safeEvents.length > 0 ? "Elevated" : "Stable"} className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Reserve Buffer" value={`₹${((poolStats?.reserve_buffer || 0)/100000).toFixed(1)}L`} icon={Users} trend="Solvent" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Events Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-black text-on-surface flex items-center gap-3">
              <span className="w-2 h-8 bg-tertiary-container rounded-full"></span>
              Active Disruption Events
            </h2>
          </div>
          {safeEvents.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-surface-container-low/30 rounded-3xl border border-dashed border-outline-variant/20">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto opacity-50">
                <AlertTriangle className="w-8 h-8 text-outline" />
              </div>
              <p className="text-sm font-bold text-on-surface-variant">No active disruption events right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safeEvents.map((ev, i) => (
                <EventCard key={i} event={ev} />
              ))}
            </div>
          )}
        </div>

        {/* Financial Stability Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-headline font-black text-on-surface flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Financial Stability
          </h2>
          <PoolHealthCard stats={poolStats ? {
            totalPool: poolStats.premium_collected,
            activePolicies: poolStats.active_workers,
            lossRatio: poolStats.loss_ratio,
            trend: poolStats.solvent ? "improving" : "worsening"
          } : undefined} />
        </div>
      </div>
    </div>
  );
}
