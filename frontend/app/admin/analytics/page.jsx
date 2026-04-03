"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import LossRatioChart from "@/components/insurer/LossRatioChart";
import PoolHealthBar from "@/components/insurer/PoolHealthBar";
import TriggerMap from "@/components/insurer/TriggerMap";
import { ShieldCheck, Users, Activity, AlertTriangle, TrendingUp, Landmark, Loader2, BrainCircuit } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [pool, triggers] = await Promise.all([
          api.getPoolHealth(),
          api.getActiveTriggers(),
        ]);
        setStats({ pool, triggers });
      } catch (err) {
        console.error("Failed to load admin analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary-container opacity-20" />
      </div>
    );
  }

  const { pool, triggers } = stats || {};

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface uppercase tracking-tight">Ecosystem Intelligence</h1>
          <p className="text-sm text-on-surface-variant font-medium">Global platform risk aggregation and pool solvency monitoring.</p>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          label="Global Insured" 
          value={pool?.active_workers?.toLocaleString() || "4,200"} 
          icon={Users} 
          trend="+12% WoW" 
        />
        <MetricCard 
          label="Total Pool Value" 
          value={`₹${(pool?.premium_collected / 100000).toFixed(1)}L`} 
          icon={Landmark} 
          sub="Verified Reserves" 
        />
        <MetricCard 
          label="Loss Ratio" 
          value={`${pool?.loss_ratio}%`} 
          icon={Activity} 
          trend="-1.2%" 
        />
        <MetricCard 
          label="Active Triggers" 
          value={triggers?.events?.length || "0"} 
          icon={AlertTriangle} 
          trend={triggers?.events?.length > 0 ? "Critical" : "None"}
          className={triggers?.events?.length > 0 ? "border-error/20 bg-error/5" : ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-outline-variant/10 shadow-sm bg-surface-container-lowest">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-lg flex items-center gap-2 text-on-surface">
                  <Activity className="w-5 h-5 text-primary-container" />
                  Monthly Loss Ratio Performance
                </h3>
                <span className="text-[10px] font-extrabold text-outline uppercase tracking-widest bg-surface-container px-2 py-1 rounded-md">Vs Target 15%</span>
              </div>
              <LossRatioChart />
            </CardContent>
          </Card>

          <Card className="border-outline-variant/10 shadow-sm bg-surface-container-lowest">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2 text-on-surface">
                <ShieldCheck className="w-5 h-5 text-success" />
                Pool Distribution & Solvency
              </h3>
              <PoolHealthBar stats={{ claims: 15, reserves: 55, surplus: 30 }} />
              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div>
                  <div className="text-[10px] text-outline font-extrabold uppercase tracking-widest mb-1">Surplus</div>
                  <div className="text-xl font-extrabold text-success font-currency">₹26.5L</div>
                </div>
                <div className="border-x border-outline-variant/10 px-4">
                  <div className="text-[10px] text-outline font-extrabold uppercase tracking-widest mb-1">Reserves</div>
                  <div className="text-xl font-extrabold text-primary-container font-currency">₹48.7L</div>
                </div>
                <div>
                  <div className="text-[10px] text-outline font-extrabold uppercase tracking-widest mb-1">Pending</div>
                  <div className="text-xl font-extrabold text-error font-currency">₹13.3L</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Alerts & Map */}
        <div className="space-y-8">
          <Card className="border-outline-variant/10 shadow-sm bg-surface-container-lowest overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline font-bold text-on-surface">Zone Status Grid</h3>
              </div>
              <TriggerMap zones={triggers?.events} />
            </CardContent>
          </Card>

          <Card className="bg-primary-container text-white border-none shadow-elevated relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <CardContent className="p-6 space-y-4 relative">
              <h3 className="font-headline font-extrabold flex items-center gap-2 uppercase tracking-widest text-xs">
                <BrainCircuit className="w-5 h-5" />
                AI Risk Oracle
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                The Trigr Risk Oracle is forecasting a 15% increase in disruption frequency for West Mumbai (Dharavi/Kurla) over the next 72 hours due to monsoon build-up.
              </p>
              <div className="pt-2 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest opacity-70">
                    <span>Anomaly Detection</span>
                    <span className="text-white">Stable</span>
                  </div>
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest opacity-70">
                    <span>Claim Velocity</span>
                    <span className="text-error font-bold bg-white px-1 rounded-sm">Increasing</span>
                  </div>
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-error transition-all duration-1000" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
