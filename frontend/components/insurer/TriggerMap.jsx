/**
 * TriggerMap — Simple zone-based status visualizer for insurers.
 * High-fidelity, consistent with insurer dashboard layout.
 */
import { cn } from "@/components/ui/button";

export default function TriggerMap({ city = "Mumbai", zones }) {
  const mockZones = zones || [
    { name: "Dharavi", status: "ACTIVE", alert: "Heavy Rain" },
    { name: "Kurla", status: "ACTIVE", alert: "Flood Alert" },
    { name: "Sion", status: "CLEAN" },
    { name: "Andheri", status: "CLEAN" },
    { name: "Dadar", status: "PENDING" },
    { name: "Bandra", status: "CLEAN" },
    { name: "Chembur", status: "CLEAN" },
    { name: "Worli", status: "PENDING" },
    { name: "Colaba", status: "CLEAN" },
  ];

  const statusColors = {
    ACTIVE: "bg-error text-white",
    PENDING: "bg-warning text-on-surface",
    CLEAN: "bg-success/5 text-success border border-success/20",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-outline uppercase tracking-widest">{city} Monitoring Grid</h4>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {mockZones.map((z, i) => (
          <div 
            key={i} 
            className={cn(
              "p-3 rounded-xl text-center transition-all cursor-default hover:scale-[1.02]",
              statusColors[z.status] || statusColors.CLEAN
            )}
          >
            <div className="text-[10px] font-extrabold truncate uppercase tracking-tighter">
              {z.name}
            </div>
            {z.alert && (
              <div className="text-[8px] font-bold opacity-80 mt-1 uppercase animate-pulse">
                {z.alert}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 justify-center pt-2">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("w-2 h-2 rounded-full", color.split(' ')[0])} />
            <span className="text-[10px] font-bold text-outline uppercase">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
