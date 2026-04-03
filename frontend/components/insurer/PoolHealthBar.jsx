/**
 * PoolHealthBar — Multi-segment bar showing portions of the pool.
 * High-fidelity, consistent with insurer dashboard layout.
 */
import { cn } from "@/components/ui/button";

export default function PoolHealthBar({ stats }) {
  const data = stats || {
    claims: 12,
    reserves: 45,
    surplus: 43,
  };

  const segments = [
    { label: "Claims", value: data.claims, color: "bg-error" },
    { label: "Reserves", value: data.reserves, color: "bg-primary-container" },
    { label: "Surplus", value: data.surplus, color: "bg-success" },
  ];

  return (
    <div className="space-y-4">
      <div className="h-4 w-full flex rounded-full overflow-hidden bg-surface-container shadow-inner">
        {segments.map((s, i) => (
          <div 
            key={i} 
            className={cn("h-full transition-all duration-500", s.color)}
            style={{ width: `${s.value}%` }}
            title={`${s.label}: ${s.value}%`}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center px-1">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={cn("w-2 h-2 rounded-full", s.color)} />
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
              {s.label} ({s.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
