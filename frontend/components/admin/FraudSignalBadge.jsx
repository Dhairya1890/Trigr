/**
 * FraudSignalBadge — Distinctive badge for AI-detected anomalies.
 * High-fidelity, consistent with admin dashboard layout.
 */
import { cn } from "@/components/ui/button";
import { AlertTriangle, Fingerprint, Zap, ShieldAlert } from "lucide-react";

export default function FraudSignalBadge({ signal, className }) {
  const signalMap = {
    VPN_USED: { label: "VPN Detected", icon: Zap, color: "text-error", bg: "bg-error/10", border: "border-error/20" },
    INCONSISTENT_SPEED: { label: "Erratic Speed", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
    DUPLICATE_ZONE: { label: "Duplicate Zone", icon: Fingerprint, color: "text-error", bg: "bg-error/10", border: "border-error/20" },
    GPS_SPOOFED: { label: "GPS Spoofed", icon: ShieldAlert, color: "text-error", bg: "bg-error/10", border: "border-error/20" },
    OFF_SHIFT_ACTIVITY: { label: "Off-Shift Work", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  };

  const data = signalMap[signal] || { label: signal, icon: AlertTriangle, color: "text-outline", bg: "bg-surface-container-high", border: "border-outline-variant" };
  const Icon = data.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all hover:scale-[1.02] cursor-default",
      data.bg,
      data.border,
      className
    )}>
      <Icon className={cn("w-3 h-3", data.color)} />
      <span className={cn("text-[10px] font-extrabold uppercase tracking-tight", data.color)}>
        {data.label}
      </span>
    </div>
  );
}
