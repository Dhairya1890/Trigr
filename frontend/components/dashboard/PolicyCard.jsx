import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { ShieldCheck, Calendar } from "lucide-react";

export default function PolicyCard({ policy }) {
  const data = policy || {
    status: "ACTIVE",
    weekStart: "Apr 7",
    weekEnd: "Apr 13",
    premiumPaid: 131,
    maxPayout: 3600,
    coveragePct: 80,
    verificationTier: 2,
  };

  return (
    <Card hover className="border-none shadow-elevated bg-surface-container-low/50">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline font-black text-base text-on-surface">Active Policy</h3>
              <StatusBadge status={data.status} className="mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-headline font-black text-primary font-currency leading-none">
              ₹{data.premiumPaid}
            </p>
            <p className="text-[10px] uppercase tracking-widest font-black text-outline mt-1.5">Weekly Premium</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Coverage
            </span>
            <p className="text-sm font-bold text-on-surface">{data.weekStart} - {data.weekEnd}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Max Payout</span>
            <p className="text-sm font-bold text-on-surface font-currency">₹{data.maxPayout?.toLocaleString("en-IN")}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Tier</span>
            <p className="text-sm font-bold text-on-surface">Verification {data.verificationTier}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Protection</span>
            <p className="text-sm font-bold text-on-surface">{data.coveragePct}% Income</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
