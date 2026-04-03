import { cn } from "@/components/ui/button";
import { Bike, Building2, Settings } from "lucide-react";

const roles = [
  { id: "worker", icon: Bike, title: "Delivery Worker", desc: "Get income protection for your shifts" },
  { id: "insurer", icon: Building2, title: "Insurer / Platform", desc: "Monitor triggers, payouts, and pool health" },
  { id: "admin", icon: Settings, title: "Administrator", desc: "Review flagged claims and fraud signals" },
];

export default function RoleSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = selected === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            className={cn(
              "p-6 rounded-xl border-2 transition-all text-left space-y-3 hover:shadow-card",
              isActive
                ? "border-primary-container bg-primary-container/5 shadow-card"
                : "border-outline-variant/20 bg-surface-container-lowest"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                isActive ? "bg-primary-container text-white" : "bg-surface-container text-on-surface-variant"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-headline font-bold text-sm">{r.title}</div>
              <div className="text-xs text-on-surface-variant">{r.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
