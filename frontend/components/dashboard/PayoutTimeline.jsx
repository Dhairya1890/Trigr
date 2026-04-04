import { Clock } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatShortDate } from "@/lib/formatters";

function getMockTimeline() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  
  return [
    { id: "1", date: yesterday.toISOString().split('T')[0], event: "Heavy Rain", zone: "Dharavi", amount: 250, status: "PAID" },
    { id: "2", date: threeDaysAgo.toISOString().split('T')[0], event: "Flood Alert", zone: "Kurla", amount: 420, status: "PAID" },
  ];
}

export default function PayoutTimeline({ claims }) {
  const data = claims?.length ? claims : getMockTimeline();

  return (
    <Card hover className="border-none bg-surface-container-low/50 shadow-elevated">
      <CardContent className="space-y-6 p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary-container" />
          <h3 className="font-headline text-sm font-bold">Recent Payouts</h3>
        </div>

        {data.length === 0 ? (
          <p className="py-4 text-center text-sm text-on-surface-variant">
            No payouts yet. Stay protected.
          </p>
        ) : (
          <div className="space-y-3">
            {data.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between border-b border-outline-variant/10 py-2 last:border-0"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{claim.event || claim.type}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-outline">
                    {formatShortDate(claim.date)} · {claim.zone || claim.city || "Mumbai"}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="font-currency text-sm font-bold">{formatCurrency(claim.amount)}</span>
                  <StatusBadge status={claim.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
