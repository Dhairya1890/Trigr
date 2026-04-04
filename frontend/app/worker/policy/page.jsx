"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, AlertCircle, Loader2, History } from "lucide-react";
import useWorker from "@/hooks/useWorker";

const exclusions = [
  "Health, life, or accidental injury",
  "Vehicle repairs or maintenance",
  "Disruption events shorter than 60 minutes",
  "Events outside registered city/zone",
  "Self-inflicted work stoppages",
];

export default function WorkerPolicyPage() {
  const { policy, loading } = useWorker();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
      </div>
    );
  }

  // Derive history safely from current policy if backend lacks complete history endpoint
  const policyHistory = policy ? [{
    week: `${policy.week_start} - ${policy.week_end}`,
    premium: policy.premium_paid,
    claims: 0,
    status: policy.status
  }] : [];

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">My Policy</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Review your coverage details, history, and active protections.
          </p>
        </div>
      </div>

      {/* Active Policy */}
      <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
        <div className="h-2 bg-primary" />
        <CardContent className="p-8 md:p-10 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-headline font-black text-2xl text-on-surface">Parametric Income Shield</h2>
                <p className="text-sm font-bold text-on-surface-variant mt-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Weekly renewable coverage
                </p>
              </div>
            </div>
            <StatusBadge status={policy?.status || "INACTIVE"} className="px-5 py-2 text-xs rounded-xl shadow-sm" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Premium", value: `₹${policy?.premium_paid || 0}/wk` },
              { label: "Max Payout", value: "₹3,600/wk" },
              { label: "Coverage", value: "80%" },
              { label: "Tier", value: "Tier 2" },
            ].map(item => (
              <div key={item.label} className="p-6 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/10 space-y-2 text-center group hover:border-primary/20 transition-colors">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-outline">{item.label}</p>
                <p className="text-2xl font-headline font-black text-primary tracking-tight font-currency">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* History */}
        <Card hover className="border-none shadow-elevated bg-surface-container-low/30 h-full">
          <CardContent className="p-8 md:p-10 space-y-8">
            <h3 className="font-headline font-black text-xl text-on-surface flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" /> Premium History
            </h3>
            <div className="space-y-4">
              {policyHistory.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8 text-outline/30" />
                  </div>
                  <p className="text-sm font-bold text-on-surface-variant">No history found yet.</p>
                </div>
              ) : policyHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest/50 border border-outline-variant/5 hover:border-primary/10 transition-colors group">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-on-surface">{h.week}</p>
                    <p className="text-[10px] uppercase font-black text-outline tracking-widest">{h.claims} claim(s)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-currency font-black text-lg text-primary">₹{h.premium}</span>
                    <StatusBadge status={h.status} className="scale-90" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exclusions */}
        <Card hover className="border-none shadow-elevated bg-surface-container-low/30 h-full">
          <CardContent className="p-8 md:p-10 space-y-8">
            <h3 className="font-headline font-black text-xl text-on-surface flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-outline" /> Policy Exclusions
            </h3>
            <div className="space-y-3">
              {exclusions.map((e, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest/30 border border-outline-variant/5">
                  <div className="mt-1 w-5 h-5 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                    <span className="text-error font-black text-xs">×</span>
                  </div>
                  <p className="text-sm font-bold text-on-surface-variant leading-relaxed">
                    {e}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-outline font-medium italic pt-4">
              * Refer to the full policy documentation for detailed terms and conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
