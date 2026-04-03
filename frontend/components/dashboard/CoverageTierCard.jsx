import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/components/ui/button";
import { ShieldCheck, CircleCheckBig, Landmark } from "lucide-react";

const tiers = [
  { tier: 1, name: "Self-Declaration", cap: "₹2,000", method: "Self-reported earnings", icon: ShieldCheck },
  { tier: 2, name: "UPI Verified", cap: "₹3,500", method: "₹1 Penny Drop", icon: CircleCheckBig },
  { tier: 3, name: "AA Consent", cap: "₹5,000", method: "RBI Account Aggregator", icon: Landmark },
];

export default function CoverageTierCard({ currentTier = 2 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tiers.map((t) => {
        const Icon = t.icon;
        const isCurrent = t.tier === currentTier;
        const isLocked = t.tier > currentTier;
        return (
          <Card
            key={t.tier}
            className={cn(
              "relative overflow-hidden transition-all",
              isCurrent && "ring-2 ring-primary-container shadow-elevated",
              isLocked && "opacity-60"
            )}
          >
            {isCurrent && (
              <div className="absolute top-0 right-0 bg-primary-container text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                CURRENT
              </div>
            )}
            <CardContent className="p-6 space-y-3 text-center">
              <div className={cn(
                "w-12 h-12 rounded-full mx-auto flex items-center justify-center",
                isCurrent ? "bg-primary-container text-white" : "bg-surface-container text-outline"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-outline uppercase tracking-wider font-bold">Tier {t.tier}</p>
                <h4 className="font-headline font-bold mt-1">{t.name}</h4>
              </div>
              <p className="text-2xl font-headline font-extrabold text-primary-container font-currency">{t.cap}</p>
              <p className="text-xs text-outline">{t.method}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
