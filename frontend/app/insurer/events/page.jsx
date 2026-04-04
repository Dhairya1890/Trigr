"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { TrendingUp, Plus, Filter, Loader2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDisruptions from "@/hooks/useDisruptions";

const columns = [
  { header: "Event ID", accessor: "id" },
  { header: "Event Type", accessor: "type" },
  { header: "City", accessor: "city" },
  { header: "Status", accessor: (row) => <StatusBadge status={row.status || "ACTIVE"} /> },
  { header: "Payouts", accessor: (row) => <span className="font-currency font-bold">₹{(row.totalPayout || row.payouts || 0).toLocaleString("en-IN")}</span> },
  { header: "Date", accessor: (row) => row.timestamp ? new Date(row.timestamp).toLocaleDateString("en-IN") : "Unknown" },
];

export default function InsurerEventsPage() {
  const { activeEvents, loading } = useDisruptions("all");

  const safeEvents = activeEvents || [];

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">Disruption Events</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Manage and monitor trigger events across zones.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="default" className="rounded-2xl px-6 bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high transition-all">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button size="default" className="rounded-2xl px-6 shadow-cta transition-all hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4 mr-2" /> New Event
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
        </div>
      ) : (
        <Card className="border-none shadow-elevated bg-surface-container-low/50 overflow-hidden">
          <DataTable columns={columns} data={safeEvents} className="border-none" />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card hover className="border-none shadow-elevated bg-surface-container-low/30 h-full">
          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-black text-xl text-on-surface flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" /> Top Trigger Hotspots
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { zone: "Mumbai: Dharavi", count: 12, trend: "+2" },
                { zone: "Delhi: Karol Bagh", count: 8, trend: "Stable" },
                { zone: "Chennai: T. Nagar", count: 7, trend: "+1" },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest/50 border border-outline-variant/5 hover:border-primary/10 transition-colors group">
                  <span className="text-sm font-black text-on-surface">{h.zone}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-on-surface-variant group-hover:text-primary transition-colors">{h.count} events</span>
                    <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-lg ${h.trend === 'Stable' ? 'bg-surface-container-highest text-outline' : 'bg-success/10 text-success'}`}>
                      {h.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card hover className="border-none shadow-elevated bg-surface-container-low/30 h-full">
          <CardContent className="p-8 md:p-10 space-y-8">
            <h3 className="font-headline font-black text-xl text-on-surface flex items-center gap-3">
              <Activity className="w-6 h-6 text-tertiary" /> Historical Payout Ratios
            </h3>
            <div className="h-48 flex items-end gap-3 pb-8 relative group">
              {/* Background Reference Lines */}
              <div className="absolute inset-x-0 top-0 h-px bg-outline-variant/5" />
              <div className="absolute inset-x-0 top-1/4 h-px bg-outline-variant/5" />
              <div className="absolute inset-x-0 top-2/4 h-px bg-outline-variant/5" />
              <div className="absolute inset-x-0 top-3/4 h-px bg-outline-variant/5" />

              {[45, 62, 38, 85, 42, 55, 68].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-xl relative group h-full">
                  <div 
                    className="absolute bottom-0 w-full bg-primary/20 rounded-t-xl transition-all group-hover:bg-primary/40"
                    style={{ height: `${h}%` }}
                  />
                  <div 
                    className="absolute bottom-0 w-full bg-primary/40 rounded-t-xl transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-bottom"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-outline px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
