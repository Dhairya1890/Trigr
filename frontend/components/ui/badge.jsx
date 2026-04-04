import { cn } from "@/components/ui/button";

const variants = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger:  "bg-error/10 text-error border-error/20",
  muted:   "bg-surface-container text-outline border-outline/20",
  outline: "bg-transparent border border-outline text-outline",
};

export function Badge({ variant = "default", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* Common status badge presets */
export function StatusBadge({ status, className }) {
  const map = {
    ACTIVE:       { variant: "success", label: "Active" },
    PAID:         { variant: "success", label: "Paid" },
    PROCESSING:   { variant: "default", label: "Processing" },
    PENDING:      { variant: "warning", label: "Pending" },
    UNDER_REVIEW: { variant: "warning", label: "Under Review" },
    SOFT_FLAG:    { variant: "warning", label: "Soft Flag" },
    HARD_FLAG:    { variant: "danger",  label: "Hard Flag" },
    REJECTED:     { variant: "danger",  label: "Rejected" },
    AUTO_REJECT:  { variant: "danger",  label: "Auto Reject" },
    EXPIRED:      { variant: "muted",   label: "Expired" },
    RESOLVED:     { variant: "muted",   label: "Resolved" },
    CLEAN:        { variant: "success", label: "Clean" },
  };

  const entry = map[status] || { variant: "muted", label: status };
  return <Badge variant={entry.variant} className={className}>{entry.label}</Badge>;
}
