import { cn } from "@/components/ui/button";

const platforms = [
  { id: "swiggy", name: "Swiggy", color: "bg-orange-500" },
  { id: "zomato", name: "Zomato", color: "bg-red-500" },
  { id: "blinkit", name: "Blinkit", color: "bg-yellow-500" },
  { id: "zepto", name: "Zepto", color: "bg-purple-500" },
  { id: "instamart", name: "Instamart", color: "bg-green-500" },
];

export default function PlatformSelector({ selected, onSelect }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Delivery Platform</label>
      <div className="flex flex-wrap gap-3">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className={cn(
              "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all flex items-center gap-2",
              selected === p.id
                ? "border-primary-container bg-primary-container/10 text-primary-container bg-surface"
                : "border-outline-variant/20 text-on-surface-variant hover:border-outline-variant"
            )}
          >
            <div className={cn("w-3 h-3 rounded-full", p.color)} />
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
