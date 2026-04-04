"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/components/ui/button";
import { FileText, Loader2, Search, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import useWorker from "@/hooks/useWorker";

const filters = ["All", "PAID", "PROCESSING", "UNDER_REVIEW", "REJECTED"];

export default function WorkerClaimsPage() {
  const { claims, loading } = useWorker();
  const [filter, setFilter] = useState("All");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
      </div>
    );
  }

  const safeClaims = claims || [];
  const filtered = filter === "All" ? safeClaims : safeClaims.filter(c => c.status === filter);

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">My Claims</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Monitor your parametric payouts and active claim evaluations.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-2xl border border-outline-variant/5">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest">{safeClaims.length} Total Claims</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border",
              filter === f
                ? "bg-primary text-white border-primary shadow-elevated scale-105"
                : "bg-surface-container-low text-on-surface-variant border-outline-variant/10 hover:bg-surface-container-high hover:scale-[1.02] active:scale-95"
            )}
          >
            {f === "All" ? "All" : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Claims */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-surface-container-low/30 rounded-3xl border border-dashed border-outline-variant/20">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto opacity-50">
            <FileText className="w-8 h-8 text-outline" />
          </div>
          <p className="text-sm font-bold text-on-surface-variant">No claims match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((c, i) => (
            <Card hover key={c.id || i} className="border-none shadow-elevated bg-surface-container-low/50 overflow-hidden group">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm border border-outline-variant/5">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1.5 focus-ring">
                      <div className="flex items-center gap-3">
                        <h3 className="font-headline font-black text-lg text-on-surface tracking-tight">{c.id}</h3>
                        <StatusBadge status={c.status} className="scale-90" />
                      </div>
                      <p className="text-xs font-bold text-on-surface-variant flex items-center gap-2">
                        <span className="text-outline uppercase tracking-widest text-[10px] font-black">{c.date}</span>
                        <span className="w-1 h-1 rounded-full bg-outline/20"></span>
                        <span className="text-primary font-black uppercase tracking-widest text-[10px]">{c.type || c.event}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-2xl font-headline font-black font-currency text-primary tracking-tighter">
                      ₹{c.amount || c.payout}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-black text-outline">Payout Amount</p>
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
