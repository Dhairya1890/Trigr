"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

const columns = (onAction) => [
  { header: "Claim ID", accessor: "id" },
  { header: "Worker", accessor: "workerName" },
  { header: "Type", accessor: (row) => <Badge variant="outline">{row.type}</Badge> },
  { 
    header: "Fraud Score", 
    accessor: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
          <div 
            className={`h-full ${row.score > 80 ? 'bg-error' : row.score > 60 ? 'bg-warning' : 'bg-success'}`}
            style={{ width: `${row.score}%` }}
          />
        </div>
        <span className={`text-xs font-bold ${row.score > 80 ? 'text-error' : row.score > 60 ? 'text-warning' : 'text-success'}`}>
          {row.score}/100
        </span>
      </div>
    )
  },
  { header: "Signals", accessor: (row) => row.signals.join(", ") },
  {
    header: "Actions",
    accessor: (row) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:bg-success/5" onClick={() => onAction(row.id, 'approve')}>
          <Check className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-error hover:bg-error/5" onClick={() => onAction(row.id, 'reject')}>
          <X className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-container" onClick={() => onAction(row.id, 'view')}>
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    )
  }
];

export default function FraudQueueTable({ data, onAction }) {
  return <DataTable columns={columns(onAction)} data={data} />;
}
