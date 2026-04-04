"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Search, Download, Filter, IndianRupee, ArrowUpRight, Loader2, Plus, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const columns = [
  { header: "Payout ID", accessor: "id" },
  { header: "Worker ID", accessor: "workerId" },
  { header: "Event", accessor: "eventType" },
  { header: "Amount", accessor: (row) => <span className="font-currency font-extrabold text-primary-container">₹{row.amount.toLocaleString("en-IN")}</span> },
  { header: "UTR Number", accessor: (row) => <code className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-mono font-bold text-outline">{row.utr}</code> },
  { header: "Date", accessor: "date" },
  { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
];

export default function InsurerPayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getPayoutLedger();
        if (data?.payouts) {
          setPayouts(data.payouts);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = payouts.filter(p => 
    p.workerId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.utr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-shell mx-auto px-6 py-10 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-outline-variant/10">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight text-on-surface uppercase">Disbursement Ledger</h1>
          <p className="text-sm md:text-base text-on-surface-variant font-medium">
            Monitor and verify all triggered parametric income payouts.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="default" className="rounded-2xl px-6 bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high transition-all">
            <Download className="w-4 h-4 mr-2 text-primary" /> Export Ledger
          </Button>
          <Button size="default" className="rounded-2xl px-6 shadow-cta transition-all hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4 mr-2" /> Manual Batch
          </Button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard label="Total Disbursed" value="₹14.2L" trend="+₹12k today" icon={IndianRupee} className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Pending Approval" value="12" sub="₹4,200 total value" icon={Clock} className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
        <MetricCard label="Avg Payout Time" value="4.2m" sub="Via IMPS/UPI" icon={ArrowUpRight} className="bg-surface-container-low/50 border-none shadow-card hover:shadow-elevated transition-all" />
      </div>

      {/* Table Section */}
      <Card hover className="border-none shadow-elevated bg-surface-container-low/50 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-outline-variant/5 bg-surface-container-low flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="relative flex-1 w-full max-w-lg group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, Worker, or UTR..."
              className="w-full pl-12 pr-6 py-3.5 bg-surface-container-lowest/50 border border-outline-variant/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold placeholder:text-outline/50"
            />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none py-6 px-6 rounded-2xl bg-surface-container-lowest border-outline-variant/10 text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-high transition-all">
              <Calendar className="w-4 h-4 mr-3 text-primary" />
              This Billing Cycle
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-surface-container-lowest border-outline-variant/10 hover:bg-surface-container-high transition-all">
              <Filter className="w-4 h-4 text-outline" />
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary opacity-50" />
            <p className="text-sm font-bold text-outline animate-pulse">Loading disbursement ledger...</p>
          </div>
        ) : (
          <div className="animate-fade-up">
            <DataTable columns={columns} data={filtered} className="border-none" />
          </div>
        )}
      </Card>
    </div>
  );
}
