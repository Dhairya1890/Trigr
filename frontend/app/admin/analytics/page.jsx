"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/section";
import LossRatioChart from "@/components/insurer/LossRatioChart";
import PoolHealthBar from "@/components/insurer/PoolHealthBar";
import TriggerMap from "@/components/insurer/TriggerMap";
import { ShieldCheck, Users, Activity, AlertTriangle, TrendingUp, Landmark } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface uppercase tracking-tight">Ecosystem Intelligence</h1>
          <p className="text-sm text-on-surface-variant">Global platform risk aggregation and pool solvency monitoring.</p>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Global Insured" value="4.2k" icon={Users} trend="+12% WoW" />
        <MetricCard label="Total Pool Value" value="₹88.5L" icon={Landmark} sub="Verified Reserves" />
        <MetricCard label="Loss Ratio" value="12.4%" icon={Activity} trend="-1.2%" />
        <MetricCard label="Active Triggers" value="3" icon={AlertTriangle} trend="Critical" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-outline-variant/10 shadow-sm">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-container" />
                  Monthly Loss Ratio Performance
                </h3>
                <span className="text-xs font-bold text-outline">Vs Target 15%</span>
              </div>
              <LossRatioChart />
            </CardContent>
          </Card>

          <Card className="border-outline-variant/10 shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" />
                Pool Distribution & Solvency
              </h3>
              <PoolHealthBar stats={{ claims: 15, reserves: 55, surplus: 30 }} />
              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div>
                  <div className="text-xs text-outline font-bold uppercase">Surplus</div>
                  <div className="text-lg font-extrabold text-success font-currency">₹26.5L</div>
                </div>
                <div className="border-x border-outline-variant/10 px-4">
                  <div className="text-xs text-outline font-bold uppercase">Reserves</div>
                  <div className="text-lg font-extrabold text-primary-container font-currency">₹48.7L</div>
                </div>
                <div>
                  <div className="text-xs text-outline font-bold uppercase">Pending</div>
                  <div className="text-lg font-extrabold text-error font-currency">₹13.3L</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Alerts & Map */}
        <div className="space-y-8">
          <Card className="border-outline-variant/10 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-container" />
                <h3 className="font-headline font-bold">Zone Status Grid</h3>
              </div>
              <TriggerMap />
            </CardContent>
          </Card>

          <Card className="bg-primary-container/5 border-primary-container/20 border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-headline font-bold flex items-center gap-2">
                <LandingCardIcon className="w-5 h-5 text-primary-container" />
                AI Risk Assessment
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                The Trigr Risk Oracle is forecasting a 15% increase in disruption frequency for West Mumbai (Dharavi/Kurla) over the next 72 hours due to monsoon build-up.
              </p>
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs pb-2">
                  <span className="font-bold text-outline">Anomaly Detection</span>
                  <span className="text-success font-bold">Stable</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-outline">Claim Velocity</span>
                  <span className="text-warning font-bold">Increasing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LandingCardIcon({ className }) {
  return (
    <div className={className}>
      <Activity className="w-inherit h-inherit" />
    </div>
  );
}
