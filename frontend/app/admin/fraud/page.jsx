"use client";

import { useState } from "react";
import { MetricCard } from "@/components/ui/section";
import FraudQueueTable from "@/components/admin/FraudQueueTable";
import AlertConfigCard from "@/components/admin/AlertConfigCard";
import { ShieldAlert, Fingerprint, Activity, Clock } from "lucide-react";

const initialQueue = [
  { id: "CLM-901", workerName: "Ravi Kumar", type: "Location Spoofer", score: 85, signals: ["VPN used", "Inconsistent speed"], status: "UNDER_REVIEW" },
  { id: "CLM-902", workerName: "Sunita Singh", type: "Double Claim", score: 65, signals: ["Duplicate zones", "Overlapping times"], status: "UNDER_REVIEW" },
  { id: "CLM-903", workerName: "Amit Patel", type: "Manual Trigger", score: 12, signals: ["Clean history", "Valid GPS"], status: "UNDER_REVIEW" },
  { id: "CLM-904", workerName: "Vikram Das", type: "Location Spoofer", score: 92, signals: ["High-speed transit", "No carrier match"], status: "UNDER_REVIEW" },
];

export default function AdminFraudPage() {
  const [queue, setQueue] = useState(initialQueue);

  const handleAction = (id, type) => {
    if (type === 'approve' || type === 'reject') {
      setQueue(prev => prev.filter(c => c.id !== id));
    }
    console.log(`Action: ${type} on ${id}`);
  };

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-headline font-extrabold text-on-surface">Fraud &amp; Integrity Queue</h1>
        <p className="text-sm text-on-surface-variant">Review flagged claims and maintain pool integrity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Pending Review" value={queue.length} icon={Clock} trend="-2 since 1h ago" />
        <MetricCard label="Fraud Intercepted" value="142" icon={ShieldAlert} trend="+5 today" />
        <MetricCard label="Avg Risk Score" value="42/100" icon={Fingerprint} trend="Stable" />
        <MetricCard label="Accuracy" value="98.5%" icon={Activity} trend="+0.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-headline font-bold">Review Queue</h2>
          <FraudQueueTable data={queue} onAction={handleAction} />
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-headline font-bold">Alert Configuration</h2>
          <AlertConfigCard />
        </div>
      </div>
    </div>
  );
}
