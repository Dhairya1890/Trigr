import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const mockTimeline = [
  { id: "1", date: "Jul 17", event: "Heavy Rain", zone: "Dharavi", amount: 250, status: "PAID" },
  { id: "2", date: "Jul 22", event: "Flood Alert", zone: "Kurla", amount: 420, status: "PAID" },
  { id: "3", date: "Aug 3", event: "AQI Hazard", zone: "Dharavi", amount: 180, status: "PROCESSING" },
];

export default function PayoutTimeline({ claims }) {
  const data = claims || mockTimeline;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-container" />
          <h3 className="font-headline font-bold text-sm">Recent Payouts</h3>
        </div>

        {data.length === 0 ? (
          <p className="text-sm text-on-surface-variant py-4 text-center">No payouts yet — stay protected!</p>
        ) : (
          <div className="space-y-3">
            {data.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{c.event}</p>
                  <p className="text-xs text-outline">{c.date} · {c.zone}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-headline font-bold text-sm font-currency">₹{c.amount}</span>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
