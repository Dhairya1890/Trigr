"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  { header: "Worker ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Platform", accessor: (row) => <Badge variant="outline">{row.platform}</Badge> },
  { header: "City", accessor: "city" },
  { header: "Tier", accessor: (row) => <span className="font-bold">Tier {row.tier}</span> },
  { header: "Last Premium", accessor: (row) => <span className="font-currency">₹{row.lastPremium}</span> },
  { header: "Total Payouts", accessor: (row) => <span className="font-currency font-bold">₹{row.totalPayouts.toLocaleString("en-IN")}</span> },
];

const mockWorkers = [
  { id: "WRK-001", name: "Ravi Kumar", platform: "Swiggy", city: "Mumbai", tier: 2, lastPremium: 131, totalPayouts: 35500 },
  { id: "WRK-002", name: "Sunita Singh", platform: "Zomato", city: "Delhi", tier: 3, lastPremium: 185, totalPayouts: 12000 },
  { id: "WRK-003", name: "Amit Patel", platform: "Blinkit", city: "Bangalore", tier: 1, lastPremium: 85, totalPayouts: 4500 },
  { id: "WRK-004", name: "Vikram Das", platform: "Zepto", city: "Mumbai", tier: 2, lastPremium: 142, totalPayouts: 18000 },
  { id: "WRK-005", name: "Priya Rao", platform: "Swiggy", city: "Chennai", tier: 3, lastPremium: 190, totalPayouts: 0 },
];

export default function InsurerWorkersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockWorkers.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-extrabold text-on-surface">Insured Base</h1>
          <p className="text-sm text-on-surface-variant">Manage policyholders and their coverage tiers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search worker name or ID..."
            className="w-full pl-9 pr-4 py-2 bg-surface-container rounded-full border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="rounded-full"><Filter className="w-4 h-4" /> Advanced Filter</Button>
      </div>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
