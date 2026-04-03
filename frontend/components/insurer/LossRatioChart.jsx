/**
 * LossRatioChart — CSS-based bar chart for pool health trends.
 * High-fidelity, consistent with insurer dashboard layout.
 */
import { cn } from "@/components/ui/button";

export default function LossRatioChart({ data }) {
  const chartData = data || [
    { label: "Jan", ratio: 12, target: 15 },
    { label: "Feb", ratio: 18, target: 15 },
    { label: "Mar", ratio: 14, target: 15 },
    { label: "Apr", ratio: 22, target: 15 },
    { label: "May", ratio: 11, target: 15 },
    { label: "Jun", ratio: 9,  target: 15 },
  ];

  const maxVal = Math.max(...chartData.map(d => Math.max(d.ratio, d.target))) * 1.2;

  return (
    <div className="space-y-6">
      <div className="h-44 flex items-end justify-between gap-3 px-2">
        {chartData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            {/* Tooltip */}
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-white text-[10px] py-1 px-2 rounded-md font-bold z-10 whitespace-nowrap">
              Ratio: {d.ratio}%
            </div>
            
            {/* Target Line (Dashed) */}
            <div 
              className="absolute w-full border-t border-dashed border-outline-variant/30 transition-all pointer-events-none"
              style={{ bottom: `${(d.target / maxVal) * 100}%` }}
            />

            {/* Bar */}
            <div 
              className={cn(
                "w-full rounded-t-sm transition-all duration-500",
                d.ratio > d.target ? "bg-error/30" : "bg-primary-container/30",
                "group-hover:opacity-80"
              )}
              style={{ height: `${(d.ratio / maxVal) * 100}%` }}
            >
              <div 
                className={cn(
                  "w-full h-full bg-primary-container rounded-t-sm",
                  d.ratio > d.target && "bg-error"
                )}
                style={{ height: "100%" }}
              />
            </div>
            
            <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">
              {d.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-outline">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-container" />
          <span>Loss Ratio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border border-dashed border-outline-variant" />
          <span>Target (15%)</span>
        </div>
      </div>
    </div>
  );
}
