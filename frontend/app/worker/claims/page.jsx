"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/components/ui/button";
import { FileText } from "lucide-react";

const mockClaims = [
  { id: "CLM-0041", date: "Jul 17, 2025", event: "Heavy Rain", zone: "Dharavi", overlap: "5h", lost: 312.50, payout: 250, fraudScore: 0, verdict: "CLEAN", status: "PAID" },
  { id: "CLM-0042", date: "Jul 22, 2025", event: "Flood Alert", zone: "Kurla", overlap: "8h", lost: 500, payout: 420, fraudScore: 12, verdict: "CLEAN", status: "PAID" },
  { id: "CLM-0043", date: "Aug 3, 2025", event: "AQI Hazard", zone: "Dharavi", overlap: "4h", lost: 250, payout: 180, fraudScore: 5, verdict: "CLEAN", status: "PROCESSING" },
];

const filters = ["All", "PAID", "PROCESSING", "UNDER_REVIEW", "REJECTED"];

export default function WorkerClaimsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? mockClaims : mockClaims.filter(c => c.status === filter);

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-headline font-extrabold">My Claims</h1>
        <span className="text-sm text-on-surface-variant">{mockClaims.length} total claims</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
              filter === f
                ? "bg-primary-container text-white"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            {f === "All" ? "All" : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Claims */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-on-surface-variant">No claims match this filter.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(c => (
            <Card key={c.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline font-bold text-sm">{c.id}</h3>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="text-xs text-outline">{c.date} · {c.event} · {c.zone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-headline font-bold font-currency text-primary-container">₹{c.payout}</p>
                    <p className="text-xs text-outline">from ₹{c.lost} lost</p>
                  </div>
                </div>
                {/* Expandable detail */}
                <div className="mt-4 pt-4 border-t border-outline-variant/10 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-outline block">Overlap</span>
                    <span className="font-medium">{c.overlap}</span>
                  </div>
                  <div>
                    <span className="text-xs text-outline block">Fraud Score</span>
                    <span className="font-medium">{c.fraudScore}/100</span>
                  </div>
                  <div>
                    <span className="text-xs text-outline block">Verdict</span>
                    <StatusBadge status={c.verdict} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
