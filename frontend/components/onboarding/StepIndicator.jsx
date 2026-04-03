import { cn } from "@/components/ui/button";

export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                isDone
                  ? "bg-primary-container text-white"
                  : isActive
                  ? "bg-primary-container text-white ring-4 ring-primary-container/20"
                  : "bg-surface-container text-outline"
              )}
            >
              {isDone ? "✓" : step}
            </div>
            {step < total && (
              <div
                className={cn(
                  "w-8 md:w-16 h-0.5",
                  isDone ? "bg-primary-container" : "bg-outline-variant/30"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
