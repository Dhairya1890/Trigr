"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  X,
  Zap,
} from "lucide-react";

import { Button, cn } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { CITY_ZONES, SIMULATOR_EVENT_TYPES } from "@/lib/simulatorConfig";

export default function SimulatorButton({ defaultCity = "Mumbai", defaultZone = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedZone, setSelectedZone] = useState(defaultZone || CITY_ZONES[defaultCity]?.[0] || "");
  const [selectedType, setSelectedType] = useState("HEAVY_RAIN");

  const zones = CITY_ZONES[selectedCity] || [];

  useEffect(() => {
    setSelectedCity(defaultCity);
    setSelectedZone(defaultZone || CITY_ZONES[defaultCity]?.[0] || "");
  }, [defaultCity, defaultZone]);

  async function handleTrigger() {
    setLoading(true);
    try {
      const response = await api.simulateTrigger({
        city: selectedCity,
        event_type: selectedType,
        zones: [selectedZone],
        severity: "HIGH",
      });

      if (response) {
        setSuccessMessage(response.message || "Simulation completed.");
        window.dispatchEvent(new CustomEvent("trigr:simulation", { detail: response }));
        window.setTimeout(() => {
          setSuccessMessage("");
          setIsOpen(false);
        }, 2200);
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
          isOpen
            ? "border-primary-container bg-primary-container text-white"
            : "border-primary-container/30 text-primary-container hover:bg-primary/5"
        )}
      >
        <Zap className={cn("h-4 w-4 fill-current", isOpen && "animate-pulse")} />
        Simulator
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-4 w-80 animate-in fade-in slide-in-from-top-2 duration-200">
          <Card className="overflow-hidden border-primary-container/20 shadow-elevated">
            <div className="h-1 bg-primary-container" />
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-sm font-bold">Disruption Simulator</h3>
                <button onClick={() => setIsOpen(false)} className="text-outline hover:text-on-surface">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {SIMULATOR_EVENT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isActive = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border p-3 transition-all",
                          isActive
                            ? "border-primary-container bg-primary-container/5 ring-1 ring-primary-container"
                            : "border-outline-variant/30 hover:bg-surface-container"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", type.color)} />
                        <span className="text-[10px] font-bold uppercase tracking-tight text-on-surface">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-[10px] font-bold uppercase text-outline">
                    <MapPin className="h-3 w-3" /> City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(event) => {
                      const nextCity = event.target.value;
                      setSelectedCity(nextCity);
                      setSelectedZone(CITY_ZONES[nextCity]?.[0] || "");
                    }}
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface p-2 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    {Object.keys(CITY_ZONES).map((city) => (
                      <option key={city} value={city} className="bg-surface text-on-surface">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-[10px] font-bold uppercase text-outline">
                    <MapPin className="h-3 w-3" /> Target Zone ({selectedCity})
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(event) => setSelectedZone(event.target.value)}
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface p-2 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    {zones.map((zone) => (
                      <option key={zone} value={zone} className="bg-surface text-on-surface">
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>

                <Button className="h-10 w-full text-xs font-bold" disabled={loading || !selectedZone} onClick={handleTrigger}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Trigger Event"}
                </Button>

                {successMessage && (
                  <p className="flex items-center justify-center gap-2 text-center text-[11px] font-bold text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {successMessage}
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
