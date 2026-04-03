import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

export default function PremiumBadge({ premium }) {
  const data = premium || { weeklyPremium: 131, riskTier: "HIGH", nextRenewal: "Apr 14" };

  return (
    <Card>
      <CardContent className="p-6 text-center space-y-3">
        <p className="text-xs text-outline uppercase tracking-wider font-bold">This Week&apos;s Premium</p>
        <div className="flex items-center justify-center gap-1">
          <IndianRupee className="w-6 h-6 text-primary-container" />
          <span className="text-4xl font-headline font-extrabold text-primary-container font-currency">
            {data.weeklyPremium}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-on-surface-variant">
            Risk Tier: <span className="font-bold text-on-surface">{data.riskTier}</span>
          </p>
          <p className="text-xs text-on-surface-variant">
            Next renewal: <span className="font-bold text-on-surface">{data.nextRenewal}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
