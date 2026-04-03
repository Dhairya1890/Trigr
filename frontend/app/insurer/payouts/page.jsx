"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, MetricCard } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";
import { Search, Download, Filter, IndianRupee, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  { header: "Payout ID", accessor: "id" },
  { header: "Worker ID", accessor: "workerId" },
  { header: "Event", accessor: "eventType" },
  { header: "Amount", accessor: (row) => <span className="font-currency font-bold text-primary-container">₹{row.amount.toLocaleString("en-IN")}</span> },
  { header: "UTR Number", accessor: (row) => <code className="text-[10px] bg-surface-container px-1 rounded">{row.utr}</code> },
  { header: "Date", accessor: "date" },
  { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
];

const mockPayouts = [
  { id: "PAY-9011", workerId: "WRK-001", eventType: "Heavy Rain", amount: 250, utr: "9021445120XP", date: "Apr 14, 2026", status: "PAID" },
  { id: "PAY-9012", workerId: "WRK-142", eventType: "Flood Alert", amount: 1500, utr: "9021445121XP", date: "Apr 14, 2026", status: "PROCESSING" },
  { id: "PAY-9013", workerId: "WRK-882", eventType: "Cyclone", amount: 3200, utr: "9021445122XP", date: "Apr 13, 2026", status: "PAID" },
  { id: "PAY-9014", workerId: "WRK-044", eventType: "Heavy Rain", amount: 450, utr: "9021445123XP", date: "Apr 13, 2026", status: "PAID" },
  { id: "PAY-9015", workerId: "WRK-109", eventType: "AQI Hazard", amount: 180, utr: "9021445124XP", date: "Apr 12, 2026", status: "PAID" },
];

export default function InsurerPayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockPayouts.filter(p => 
    p.workerId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.utr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface uppercase tracking-tight">Disbursement Ledger</h1>
          <p className="text-sm text-on-surface-variant">Monitor and verify all triggered income secondary payouts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="w-4 h-4 mr-2" />
            Report
          </Button>
          <Button size="sm" className="rounded-full">
            <IndianRupee className="w-4 h-4 mr-2" />
            Manual Payout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Total Disbursed" value="₹14.2L" trend="+₹12k today" icon={IndianRupee} />
        <MetricCard label="Pending Approval" value="12" sub="₹4,200 total value" icon={Filter} />
        <MetricCard label="Avg Payout Time" value="4.2m" sub="Via IMPS/UPI" icon={ArrowUpRight} />
      </div>

      <Card className="border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant/10 bg-surface-container-lowest flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary-container transition-colors" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Payout, Worker, or UTR..."
              className="w-full pl-9 pr-4 py-2 bg-transparent border-none focus:outline-none text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-outline">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <DataTable columns={columns} data={filtered} />
      </Card>
    </div>
  );
}
