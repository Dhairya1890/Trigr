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
    <Card className="overflow-hidden">
      <div className="h-1.5 bg-primary-container" />
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary-container" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">Active Policy</h3>
              <StatusBadge status={data.status} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-headline font-extrabold text-primary-container font-currency">
              ₹{data.premiumPaid}
            </p>
            <p className="text-xs text-outline">paid this week</p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-outline-variant/10">
          <div className="flex justify-between text-sm">
            <span className="text-outline flex items-center gap-1"><Calendar className="w-3 h-3" /> Coverage Period</span>
            <span className="font-medium">{data.weekStart} – {data.weekEnd}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-outline">Max Payout</span>
            <span className="font-medium font-currency">₹{data.maxPayout?.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-outline">Coverage</span>
            <span className="font-medium">{data.coveragePct}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-outline">Verification</span>
            <span className="font-medium">Tier {data.verificationTier}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
