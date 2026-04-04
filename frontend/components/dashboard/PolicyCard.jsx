import { Calendar, ShieldCheck } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDateRange } from "@/lib/formatters";

export default function PolicyCard({ policy }) {
  const data = policy || {
    status: "ACTIVE",
    weekStart: "2026-04-07",
    weekEnd: "2026-04-13",
    premiumPaid: 131,
    maxPayout: 3600,
    coveragePct: 80,
    verificationTier: 2,
  };

  return (
    <Card hover className="border-none bg-surface-container-low/50 shadow-elevated">
      <CardContent className="space-y-6 p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-base font-black text-on-surface">Active Policy</h3>
              <StatusBadge status={data.status} className="mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="font-currency font-headline text-2xl font-black leading-none text-primary md:text-3xl">
              {formatCurrency(data.premiumPaid)}
            </p>
            <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-outline">
              Weekly Premium
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-6">
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-outline">
              <Calendar className="h-3 w-3" /> Coverage
            </span>
            <p className="text-sm font-bold text-on-surface">
              {formatDateRange(data.weekStart, data.weekEnd)}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Max Payout</span>
            <p className="font-currency text-sm font-bold text-on-surface">
              {formatCurrency(data.maxPayout)}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Tier</span>
            <p className="text-sm font-bold text-on-surface">Verification {data.verificationTier}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Protection</span>
            <p className="text-sm font-bold text-on-surface">{data.coveragePct}% Income</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
