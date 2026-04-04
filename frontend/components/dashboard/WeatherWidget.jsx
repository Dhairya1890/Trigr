import { Card, CardContent } from "@/components/ui/card";
import { CloudRain, Wind, Thermometer } from "lucide-react";

export default function WeatherWidget({ weather }) {
  const data = weather || {
    city: "Mumbai",
    temp: "29°C",
    humidity: "82%",
    windSpeed: "18 km/h",
    condition: "Partly Cloudy",
    aqi: 85,
    aqiLabel: "Moderate",
    rainfall3h: "2.4mm",
  };

  const aqiColor =
    data.aqi > 300 ? "text-error" :
    data.aqi > 200 ? "text-tertiary-container" :
    data.aqi > 100 ? "text-warning" : "text-success";

  return (
    <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-black text-base text-on-surface">{data.city} Weather</h3>
            <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {data.condition}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
            <CloudRain className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/10 space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-outline">
              <Thermometer className="w-3.5 h-3.5" /> Temp
            </div>
            <p className="font-headline font-black text-xl text-on-surface">{data.temp}</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/10 space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-outline">
              <Wind className="w-3.5 h-3.5" /> Wind
            </div>
            <p className="font-headline font-black text-xl text-on-surface">{data.windSpeed}</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant/10">
          <div className="flex justify-between items-center px-1">
            <div className="text-[10px] uppercase tracking-widest font-black text-outline">Air Quality</div>
            <div className={`text-sm font-black flex items-center gap-2 ${aqiColor}`}>
              <span className={`w-2 h-2 rounded-full ${aqiColor.replace('text-', 'bg-')}`}></span>
              {data.aqi} <span className="text-[10px] font-bold opacity-80">({data.aqiLabel})</span>
            </div>
          </div>
          <div className="flex justify-between items-center px-1">
            <div className="text-[10px] uppercase tracking-widest font-black text-outline">Rainfall (3h)</div>
            <div className="text-sm font-black text-on-surface">{data.rainfall3h}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
