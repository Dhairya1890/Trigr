import { Card, CardContent } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, AlertCircle } from "lucide-react";

const policyHistory = [
  { week: "Mar 31 – Apr 6", premium: 131, claims: 0, status: "EXPIRED" },
  { week: "Apr 7 – Apr 13", premium: 131, claims: 1, status: "ACTIVE" },
];

const exclusions = [
  "Health, life, or accidental injury",
  "Vehicle repairs or maintenance",
  "Disruption events shorter than 60 minutes",
  "Events outside registered city/zone",
  "Self-inflicted work stoppages",
];

export default function WorkerPolicyPage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-headline font-extrabold">My Policy</h1>

      {/* Active Policy */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-primary-container" />
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary-container" />
              <div>
                <h2 className="font-headline font-bold text-lg">Parametric Income Shield</h2>
                <p className="text-sm text-on-surface-variant">Weekly renewable coverage</p>
              </div>
            </div>
            <StatusBadge status="ACTIVE" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Premium", value: "₹131/wk" },
              { label: "Max Payout", value: "₹3,600/wk" },
              { label: "Coverage", value: "80%" },
              { label: "Tier", value: "Tier 2" },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-lg bg-surface-container-low text-center">
                <p className="text-xs text-outline uppercase tracking-wider">{item.label}</p>
                <p className="text-xl font-headline font-bold text-primary-container mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardContent className="p-8 space-y-4">
          <h3 className="font-headline font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-container" /> Premium History
          </h3>
          {policyHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0">
              <div>
                <p className="text-sm font-medium">{h.week}</p>
                <p className="text-xs text-outline">{h.claims} claim(s)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-currency font-bold">₹{h.premium}</span>
                <StatusBadge status={h.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card>
        <CardContent className="p-8 space-y-4">
          <h3 className="font-headline font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-outline" /> What Trigr Does NOT Cover
          </h3>
          <ul className="space-y-2">
            {exclusions.map((e, i) => (
              <li key={i} className="text-sm text-on-surface-variant flex items-start gap-2">
                <span className="text-outline mt-0.5">×</span>
                {e}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
