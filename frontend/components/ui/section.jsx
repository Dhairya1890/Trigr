import { cn } from "@/components/ui/button";

export function Section({ className, alt, children, ...props }) {
  return (
    <section
      className={cn(
        "py-20 md:py-24 px-6",
        alt ? "bg-surface-container-low" : "bg-surface",
        className
      )}
      {...props}
    >
      <div className="max-w-shell mx-auto">{children}</div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, className, center = true }) {
  return (
    <div className={cn("space-y-4 mb-12", center && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageShell({ className, children }) {
  return (
    <main className={cn("pt-20 min-h-screen", className)}>
      {children}
    </main>
  );
}

import { DataTable } from "./data-table";
import { MetricCard } from "./metric-card";

export { DataTable, MetricCard };
