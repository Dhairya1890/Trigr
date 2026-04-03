import { cn } from "@/components/ui/button";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("px-8 pt-8 pb-4", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("px-8 pb-8", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-xl font-headline font-bold text-on-surface",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-on-surface-variant mt-1", className)}
      {...props}
    />
  );
}
