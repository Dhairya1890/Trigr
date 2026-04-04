import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CloudRain, AlertTriangle, Wind, Gauge } from "lucide-react";

const icons = { "Heavy Rain": CloudRain, "Flood Alert": AlertTriangle, "Cyclone": Wind, "AQI Hazard": Gauge };

export default function EventCard({ event }) {
  const Icon = icons[event?.type] || AlertTriangle;

  return (
    <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 flex items-center justify-center shadow-inner">
              <Icon className="w-6 h-6 text-tertiary-container" />
            </div>
            <div>
              <h3 className="font-headline font-black text-base text-on-surface">{event?.type}</h3>
              <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                {event?.city} · {event?.zones?.join(", ")}
              </p>
            </div>
          </div>
          <StatusBadge status={event?.status || "ACTIVE"} className="scale-90" />
        </div>
        
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-outline-variant/10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline block">Affected</span>
            <span className="font-headline font-black text-lg text-on-surface">{event?.workersAffected || 0}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline block">Est. Payout</span>
            <span className="font-headline font-black text-lg text-primary font-currency">₹{(event?.totalPayout || 0).toLocaleString("en-IN")}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-black text-outline block">Confidence</span>
            <span className="font-headline font-black text-lg text-success">{event?.confidence || 95}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
