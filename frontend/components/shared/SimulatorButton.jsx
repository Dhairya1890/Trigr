"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  CloudRain, 
  Wind, 
  AlertTriangle, 
  X, 
  Loader2, 
  CheckCircle2,
  MapPin
} from "lucide-react";
import { cn } from "@/components/ui/button";

const zones = ["Dharavi", "Kurla", "Sion", "Andheri East", "Dadar", "Bandra"];
const eventTypes = [
  { id: "rain", label: "Heavy Rain", icon: CloudRain, color: "text-primary-container" },
  { id: "flood", label: "Flood Alert", icon: AlertTriangle, color: "text-error" },
  { id: "cyclone", label: "Cyclone", icon: Wind, color: "text-tertiary-container" },
];

export default function SimulatorButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedZone, setSelectedZone] = useState("Dharavi");
  const [selectedType, setSelectedType] = useState("rain");

  async function handleTrigger() {
    setLoading(true);
    try {
      const res = await api.simulateTrigger({
        city: "Mumbai",
        zone: selectedZone,
        type: selectedType,
      });
      if (res) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "gap-2 font-bold transition-all",
          isOpen ? "bg-primary-container text-white border-primary-container" : "border-primary-container/30 text-primary-container hover:bg-primary/5"
        )}
      >
        <Zap className={cn("w-4 h-4 fill-current", isOpen && "animate-pulse")} />
        Simulator
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <Card className="shadow-elevated border-primary-container/20 overflow-hidden">
            <div className="h-1 bg-primary-container" />
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-sm">Disruption Simulator</h3>
                <button onClick={() => setIsOpen(false)} className="text-outline hover:text-on-surface">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Event Type */}
                <div className="grid grid-cols-3 gap-2">
                  {eventTypes.map(type => {
                    const Icon = type.icon;
                    const isActive = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "p-3 rounded-lg border flex flex-col items-center gap-2 transition-all",
                          isActive 
                            ? "border-primary-container bg-primary-container/5 ring-1 ring-primary-container" 
                            : "border-outline-variant/30 hover:bg-surface-container"
                        )}
                      >
                        <Icon className={cn("w-5 h-5", type.color)} />
                        <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">{type.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Zone Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-outline uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Target Zone (Mumbai)
                  </label>
                  <select 
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    {zones.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>

                <Button 
                  className="w-full h-10 font-bold text-xs" 
                  disabled={loading || success}
                  onClick={handleTrigger}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                   success ? <CheckCircle2 className="w-4 h-4" /> : 
                   "Trigger Event"}
                </Button>

                {success && (
                  <p className="text-center text-[10px] text-success font-bold animate-bounce">
                    EVENT BROADCASTED TO ORACLE
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
