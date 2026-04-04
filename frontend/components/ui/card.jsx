import { cn } from "@/components/ui/button";

export function Card({ className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-2xl shadow-card border border-outline-variant/10 transition-all duration-300",
        hover && "hover:shadow-elevated hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("px-6 py-5 md:px-8 md:py-6 border-b border-outline-variant/5", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("p-6 md:p-8", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-lg md:text-xl font-headline font-extrabold text-on-surface tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-on-surface-variant mt-1.5 font-medium leading-relaxed", className)}
      {...props}
    />
  );
}
