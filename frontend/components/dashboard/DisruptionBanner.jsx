import { AlertTriangle, CloudRain, Wind } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";

export default function DisruptionBanner({ event }) {
  if (!event) return null;

  const icons = {
    "Heavy Rain": CloudRain,
    "Flood Alert": AlertTriangle,
    Cyclone: Wind,
    "Severe Aqi": AlertTriangle,
    "Local Curfew": AlertTriangle,
  };
  const Icon = icons[event.type] || AlertTriangle;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-warning/20 bg-warning/8 p-4 shadow-sm dark:border-warning/20 dark:bg-surface-container-high/80">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/15 text-warning dark:bg-warning/10">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-headline text-sm font-bold text-on-surface">
          {event.type} in {event.zone || event.city}
        </p>
        <p className="truncate text-xs text-on-surface-variant">
          {event.zone || "Affected zones updating"} · Since{" "}
          {event.timestamp ? new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "now"}
        </p>
      </div>
      <StatusBadge status="ACTIVE" className="shrink-0" />
    </div>
  );
}
