"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";
import { TrendingUp, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  { header: "Event ID", accessor: "id" },
  { header: "Event Type", accessor: "type" },
  { header: "City", accessor: "city" },
  { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
  { header: "Payouts", accessor: (row) => <span className="font-currency font-bold">₹{row.payouts.toLocaleString("en-IN")}</span> },
  { header: "Date", accessor: "date" },
];

const mockEvents = [
  { id: "EVT-889", type: "Heavy Rain", city: "Mumbai", status: "ACTIVE", payouts: 35500, date: "Apr 14, 2026" },
  { id: "EVT-890", type: "AQI Hazard", city: "Delhi", status: "ACTIVE", payouts: 16000, date: "Apr 14, 2026" },
  { id: "EVT-887", type: "Cyclone", city: "Chennai", status: "PAID", payouts: 142000, date: "Apr 8, 2026" },
  { id: "EVT-885", type: "Flood Alert", city: "Mumbai", status: "PAID", payouts: 88000, date: "Apr 2, 2026" },
];

export default function InsurerEventsPage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface">Disruption Events</h1>
          <p className="text-sm text-on-surface-variant">Manage and monitor trigger events across zones.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
          <Button size="sm"><Plus className="w-4 h-4" /> New Event</Button>
        </div>
      </div>

      <DataTable columns={columns} data={mockEvents} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-headline font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-container" /> Top Trigger Hotspots
            </h3>
            <div className="space-y-4">
              {[
                { zone: "Mumbai: Dharavi", count: 12, trend: "+2" },
                { zone: "Delhi: Karol Bagh", count: 8, trend: "Stable" },
                { zone: "Chennai: T. Nagar", count: 7, trend: "+1" },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                  <span className="text-sm font-medium">{h.zone}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{h.count} events</span>
                    <span className="text-xs text-success">{h.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-headline font-bold">Historical Payout Ratios</h3>
            <div className="h-40 flex items-end gap-2 pb-6 border-b border-outline-variant/10">
              {[45, 62, 38, 85, 42, 55, 68].map((h, i) => (
                <div key={i} className="flex-1 bg-primary-container/20 rounded-t-sm relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-primary-container rounded-t-sm transition-all group-hover:bg-primary"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-outline">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
