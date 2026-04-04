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
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface uppercase">Ecosystem Intelligence</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Global platform risk aggregation and pool solvency monitoring.
          </p>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Global Insured" 
          value={pool?.active_workers?.toLocaleString() || "4,200"} 
          icon={Users} 
          trend="+12% WoW" 
          className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all"
        />
        <MetricCard 
          label="Total Pool Value" 
          value={`₹${(pool?.premium_collected / 100000).toFixed(1)}L`} 
          icon={Landmark} 
          sub="Verified Reserves" 
          className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all"
        />
        <MetricCard 
          label="Loss Ratio" 
          value={`${pool?.loss_ratio}%`} 
          icon={Activity} 
          trend="-1.2%" 
          className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all"
        />
        <MetricCard 
          label="Active Triggers" 
          value={triggers?.events?.length || "0"} 
          icon={AlertTriangle} 
          trend={triggers?.events?.length > 0 ? "Critical" : "None"}
          className={`bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all ${triggers?.events?.length > 0 ? " ring-2 ring-error/20 bg-error/5" : ""}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-10">
          <Card hover className="border-none shadow-elevated bg-surface-container-low/30">
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-black text-xl flex items-center gap-3 text-on-surface">
                  <Activity className="w-6 h-6 text-primary" />
                  Performance Analytics
                </h3>
                <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] bg-surface-container-highest px-3 py-1.5 rounded-xl border border-outline-variant/10">Vs Target 15%</span>
              </div>
              <div className="pt-4">
                <LossRatioChart />
              </div>
            </CardContent>
          </Card>

          <Card hover className="border-none shadow-elevated bg-surface-container-low/30">
            <CardContent className="p-8 md:p-10 space-y-10">
              <h3 className="font-headline font-black text-xl flex items-center gap-3 text-on-surface">
                <ShieldCheck className="w-6 h-6 text-success" />
                Pool Solvency & Distribution
              </h3>
              <div className="space-y-8">
                <PoolHealthBar stats={{ claims: 15, reserves: 55, surplus: 30 }} />
                <div className="grid grid-cols-3 gap-6 pt-6 text-center">
                  <div className="space-y-1">
                    <div className="text-[10px] text-outline font-black uppercase tracking-widest">Surplus</div>
                    <div className="text-2xl font-black text-success font-currency tracking-tight">₹26.5L</div>
                  </div>
                  <div className="space-y-1 border-x border-outline-variant/10 px-6">
                    <div className="text-[10px] text-outline font-black uppercase tracking-widest">Reserves</div>
                    <div className="text-2xl font-black text-primary font-currency tracking-tight">₹48.7L</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-outline font-black uppercase tracking-widest">Pending</div>
                    <div className="text-2xl font-black text-error font-currency tracking-tight">₹13.3L</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI & Grid */}
        <div className="space-y-10">
          <Card hover className="border-none shadow-elevated bg-surface-container-low/30 overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="font-headline font-black text-xl text-on-surface">Zone Status</h3>
              </div>
              <div className="rounded-2xl overflow-hidden border border-outline-variant/10">
                <TriggerMap zones={triggers?.events} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary hover:bg-on-primary-fixed-variant text-white border-none shadow-cta relative overflow-hidden group transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl transition-transform group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-container/20 rounded-full -ml-24 -mb-24 blur-3xl" />
            
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-black flex items-center gap-2 uppercase tracking-[0.2em] text-xs opacity-90">
                  <BrainCircuit className="w-5 h-5" />
                  AI Risk Oracle
                </h3>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed font-bold">
                Forecast: 15% increase in disruption frequency for West Mumbai (Dharavi) over next 72 hours. Monsoon build-up detected.
              </p>
              <div className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-70">
                    <span>Anomaly Detection</span>
                    <span className="text-white">85% Stable</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-70">
                    <span>Claim Velocity</span>
                    <span className="text-white font-bold bg-error/40 px-2 py-0.5 rounded-md">Increasing</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
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
