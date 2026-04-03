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
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-bold text-sm">{data.city} Weather</h3>
            <p className="text-xs text-on-surface-variant">{data.condition}</p>
          </div>
          <CloudRain className="w-6 h-6 text-primary-container" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-surface-container-low space-y-1">
            <div className="flex items-center gap-1 text-xs text-outline">
              <Thermometer className="w-3 h-3" /> Temperature
            </div>
            <p className="font-headline font-bold text-lg">{data.temp}</p>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low space-y-1">
            <div className="flex items-center gap-1 text-xs text-outline">
              <Wind className="w-3 h-3" /> Wind
            </div>
            <p className="font-headline font-bold text-lg">{data.windSpeed}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
          <div className="text-xs text-outline">AQI</div>
          <div className={`font-headline font-bold ${aqiColor}`}>
            {data.aqi} <span className="text-xs font-normal text-on-surface-variant">({data.aqiLabel})</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-outline">Rainfall (3h)</div>
          <div className="font-headline font-bold text-sm">{data.rainfall3h}</div>
        </div>
      </CardContent>
    </Card>
  );
}
