"use client";

import { cn } from "@/components/ui/button";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

/**
 * TriggerMap — Premium heat-map representation of city zones.
 */
export default function TriggerMap({ city = "Mumbai", zones }) {
  const [hovered, setHovered] = useState(null);

  const mockZones = zones || [
    { id: "z1", name: "Dharavi", status: "ACTIVE", alert: "Heavy Rain", x: 40, y: 50, size: 60 },
    { id: "z2", name: "Kurla", status: "ACTIVE", alert: "Flood Alert", x: 120, y: 70, size: 55 },
    { id: "z3", name: "Sion", status: "CLEAN", x: 190, y: 90, size: 45 },
    { id: "z4", name: "Andheri", status: "CLEAN", x: 60, y: 130, size: 70 },
    { id: "z5", name: "Dadar", status: "PENDING", x: 140, y: 160, size: 50 },
    { id: "z6", name: "Bandra", status: "CLEAN", x: 220, y: 150, size: 55 },
    { id: "z7", name: "Chembur", status: "CLEAN", x: 80, y: 210, size: 50 },
    { id: "z8", name: "Worli", status: "PENDING", x: 170, y: 220, size: 65 },
    { id: "z9", name: "Colaba", status: "CLEAN", x: 240, y: 230, size: 40 },
  ];

  const statusColors = {
    ACTIVE: "fill-error stroke-error",
    PENDING: "fill-warning stroke-warning",
    CLEAN: "fill-success stroke-success",
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-surface-container rounded-2xl p-4 overflow-hidden h-[300px] border border-outline-variant/10">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <svg viewBox="0 0 320 300" className="w-full h-full drop-shadow-2xl">
          {mockZones.map((z) => (
            <g 
              key={z.id}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHovered(z)}
              onMouseLeave={() => setHovered(null)}
              opacity={hovered && hovered.id !== z.id ? 0.4 : 1}
            >
              {/* Pulsing effect for active zones */}
              {z.status === "ACTIVE" && (
                <circle 
                  cx={z.x} cy={z.y} r={z.size / 2 + 10} 
                  className="fill-error/20 animate-ping"
                />
              )}
              
              <circle 
                cx={z.x} cy={z.y} r={z.size / 2} 
                className={cn(
                  "opacity-30 stroke-2",
                  statusColors[z.status]
                )}
              />
              <circle 
                cx={z.x} cy={z.y} r={z.size / 4} 
                className={cn(
                  "opacity-80",
                  statusColors[z.status]
                )}
              />
              
              <text 
                x={z.x} y={z.y + 5} 
                textAnchor="middle" 
                className="fill-on-surface font-headline font-extrabold text-[8px] uppercase tracking-tighter"
              >
                {z.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hovered && (
          <div className="absolute bottom-4 right-4 bg-surface-container-highest border border-outline-variant rounded-xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 min-w-[140px]">
            <div className="flex items-center gap-2 mb-1">
              {hovered.status === "ACTIVE" ? <AlertCircle className="w-3 h-3 text-error" /> : 
               hovered.status === "PENDING" ? <Clock className="w-3 h-3 text-warning" /> : 
               <CheckCircle2 className="w-3 h-3 text-success" />}
              <span className="text-[10px] font-extrabold text-on-surface uppercase tracking-widest">{hovered.name}</span>
            </div>
            <p className="text-[12px] font-bold text-on-surface">
              {hovered.status === "CLEAN" ? "No Active Threat" : hovered.alert || "Elevated Risk"}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error" />
          <span className="text-[10px] font-extrabold text-outline uppercase tracking-widest">Active Trigger</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-[10px] font-extrabold text-outline uppercase tracking-widest">Pending Alert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-[10px] font-extrabold text-outline uppercase tracking-widest">Stable</span>
        </div>
      </div>
    </div>
  );
}
