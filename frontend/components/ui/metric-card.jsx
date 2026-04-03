import { cn } from "@/components/ui/button";

export function MetricCard({ label, value, icon: Icon, trend, sub, className, children }) {
  return (
    <div className={cn(
      "bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 space-y-4 hover:shadow-card transition-all",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-outline uppercase tracking-wider font-headline">
          {label}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-container" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-extrabold text-on-surface font-headline">
          {value}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-bold flex items-center gap-1",
            trend.startsWith("+") ? "text-success" : trend.startsWith("-") ? "text-error" : "text-outline"
          )}>
            {trend}
          </div>
        )}
        {sub && <div className="text-xs text-on-surface-variant">{sub}</div>}
      </div>
      
      {children}
    </div>
  );
}
