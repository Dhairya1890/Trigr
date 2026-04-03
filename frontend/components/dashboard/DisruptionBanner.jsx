import { AlertTriangle, CloudRain, Wind } from "lucide-react";

export default function DisruptionBanner({ event }) {
  if (!event) return null;

  const icons = {
    "Heavy Rain": CloudRain,
    "Flood Alert": AlertTriangle,
    "Cyclone": Wind,
  };
  const Icon = icons[event.type] || AlertTriangle;

  return (
    <div className="bg-tertiary-container/10 border border-tertiary-container/30 rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-tertiary-container" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-headline font-bold text-sm text-on-surface">
          {event.type} — {event.city}
        </p>
        <p className="text-xs text-on-surface-variant truncate">
          {event.zones?.join(", ")} · Since {event.since || "2:00 PM"}
        </p>
      </div>
      <span className="shrink-0 px-3 py-1 rounded-full bg-tertiary-container text-white text-xs font-bold">
        ACTIVE
      </span>
    </div>
  );
}
