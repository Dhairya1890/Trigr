import { cn } from "@/components/ui/button";
import { Inbox } from "lucide-react";

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-outline" />
      </div>
      <h3 className="text-lg font-headline font-bold text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
