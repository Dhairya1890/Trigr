import { AlertTriangle, CloudRain, ShieldAlert } from "lucide-react";

import { CITY_ZONES } from "@/lib/locations";

export const SIMULATOR_EVENT_TYPES = [
  { id: "HEAVY_RAIN", label: "Heavy Rain", icon: CloudRain, color: "text-primary-container" },
  { id: "SEVERE_AQI", label: "Severe AQI", icon: ShieldAlert, color: "text-warning" },
  { id: "LOCAL_CURFEW", label: "Local Curfew", icon: AlertTriangle, color: "text-error" },
];

export { CITY_ZONES };
