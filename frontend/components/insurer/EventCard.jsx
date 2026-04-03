import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CloudRain, AlertTriangle, Wind, Gauge } from "lucide-react";

const icons = { "Heavy Rain": CloudRain, "Flood Alert": AlertTriangle, "Cyclone": Wind, "AQI Hazard": Gauge };

export default function EventCard({ event }) {
  const Icon = icons[event?.type] || AlertTriangle;

  return (
    <Card className="hover:shadow-elevated transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-tertiary-container" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">{event?.type}</h3>
              <p className="text-xs text-outline">{event?.city} · {event?.zones?.join(", ")}</p>
            </div>
          </div>
          <StatusBadge status={event?.status || "ACTIVE"} />
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-xs text-outline block">Workers</span>
            <span className="font-headline font-bold">{event?.workersAffected || 0}</span>
          </div>
          <div>
            <span className="text-xs text-outline block">Total Payout</span>
            <span className="font-headline font-bold font-currency">₹{(event?.totalPayout || 0).toLocaleString("en-IN")}</span>
          </div>
          <div>
            <span className="text-xs text-outline block">Confidence</span>
            <span className="font-headline font-bold">{event?.confidence || 95}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
