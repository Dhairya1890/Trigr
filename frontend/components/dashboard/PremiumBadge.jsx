import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";

export default function PremiumBadge({ premium, policy }) {
  const data = premium || { weeklyPremium: 131, riskTier: "MEDIUM", nextRenewal: "Next Week" };
  const maxPayout = policy?.maxPayout || policy?.max_payout || 3600;
  const coveragePct = policy?.coveragePct || policy?.coverage_pct || 80;

  return (
    <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
      <CardContent className="p-6 md:p-8 text-center space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-outline">Current Premium</p>
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="text-4xl md:text-5xl font-headline font-black text-primary font-currency tracking-tighter">
              {formatCurrency(data.weeklyPremium)}
            </span>
          </div>
        </div>
        
        <div className="space-y-3 pt-6 border-t border-outline-variant/10">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Risk Profile</span>
            <span className="text-xs font-black text-on-surface bg-surface-container-highest px-3 py-1 rounded-lg border border-outline-variant/10">
              {data.riskTier}
            </span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Max Payout</span>
            <span className="text-xs font-black text-on-surface font-currency">{formatCurrency(maxPayout)}</span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Coverage</span>
            <span className="text-xs font-black text-on-surface">{coveragePct}%</span>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline">Renewal</span>
            <span className="text-xs font-black text-on-surface">{data.nextRenewal}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest py-5 rounded-2xl bg-surface-container-lowest/50">
            View Statement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
