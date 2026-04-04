"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import FraudQueueTable from "@/components/admin/FraudQueueTable";
import AlertConfigCard from "@/components/admin/AlertConfigCard";
import { ShieldAlert, Fingerprint, Activity, Clock, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminFraudPage() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getFraudQueue();
        if (data?.claims) {
          setQueue(data.claims);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAction = async (id, type) => {
    if (type === 'approve' || type === 'reject') {
      const newVerdict = type === 'approve' ? 'CLEAN' : 'REJECTED';
      await api.updateFraudVerdict(id, newVerdict);
      setQueue(prev => prev.filter(c => c.id !== id));
    }
    console.log(`Action: ${type} on ${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary-container" />
      </div>
    );
  }

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface">Fraud & Integrity</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Review flagged claims, maintain pool integrity, and manage alert thresholds.
          </p>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Pending Review" value={queue.length} icon={Clock} trend={queue.length > 5 ? "Action Required" : "Stable"} className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Fraud Intercepted" value="14" icon={ShieldAlert} trend="+2 this week" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Avg Risk Score" value="42/100" icon={Fingerprint} trend="Stable" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Accuracy" value="98.5%" icon={Activity} trend="+0.2%" className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Queue Section */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-xl font-headline font-black text-on-surface flex items-center gap-3">
            <span className="w-2 h-8 bg-error rounded-full"></span>
            Review Queue
          </h2>
          {queue.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-surface-container-low/30 rounded-3xl border border-dashed border-outline-variant/20">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto opacity-50">
                <ShieldAlert className="w-8 h-8 text-outline" />
              </div>
              <p className="text-sm font-bold text-on-surface-variant">No pending fraud alerts to review.</p>
            </div>
          ) : (
            <Card hover className="border-none shadow-elevated bg-surface-container-low/50 overflow-hidden">
              <FraudQueueTable data={queue} onAction={handleAction} />
            </Card>
          )}
        </div>

        {/* Configuration Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-headline font-black text-on-surface flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Alert Configuration
          </h2>
          <AlertConfigCard />
        </div>
      </div>
    </div>
  );
}
