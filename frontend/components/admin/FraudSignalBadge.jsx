/**
 * FraudSignalBadge — Distinctive badge for AI-detected anomalies.
 * High-fidelity, consistent with admin dashboard layout.
 */
import { cn } from "@/components/ui/button";
import { AlertTriangle, Fingerprint, Zap } from "lucide-react";

export default function FraudSignalBadge({ signal, className }) {
  const signalMap = {
    VPN_USED: { label: "VPN Detected", icon: Zap, color: "text-error" },
    INCONSISTENT_SPEED: { label: "Inconsistent Speed", icon: AlertTriangle, color: "text-warning" },
    DUPLICATE_ZONE: { label: "Duplicate Zone", icon: Fingerprint, color: "text-error" },
    GPS_SPOOFED: { label: "GPS Spoofed", icon: Zap, color: "text-error" },
    OFF_SHIFT_ACTIVITY: { label: "Off-Shift Activity", icon: AlertTriangle, color: "text-warning" },
  };

  const data = signalMap[signal] || { label: signal, icon: AlertTriangle, color: "text-outline" };
  const Icon = data.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant transition-all hover:bg-surface-container",
      className
    )}>
      <Icon className={cn("w-3 h-3", data.color)} />
      <span className="text-[10px] font-extrabold uppercase tracking-tight text-on-surface">
        {data.label}
      </span>
    </div>
  );
}
