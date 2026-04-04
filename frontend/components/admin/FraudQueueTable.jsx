"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

const columns = (onAction) => [
  { header: "Claim ID", accessor: (row) => <span className="font-bold text-on-surface">{row.id}</span> },
  { header: "Worker", accessor: (row) => <span className="font-medium text-on-surface-variant">{row.workerName}</span> },
  { header: "Type", accessor: (row) => <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-surface-container-low">{row.type}</Badge> },
  { 
    header: "Risk Score", 
    accessor: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-20 h-2 bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full transition-all duration-1000 ${row.score > 80 ? 'bg-error' : row.score > 60 ? 'bg-warning' : 'bg-success'}`}
            style={{ width: `${row.score}%` }}
          />
        </div>
        <span className={`text-xs font-black ${row.score > 80 ? 'text-error' : row.score > 60 ? 'text-warning' : 'text-success'}`}>
          {row.score}%
        </span>
      </div>
    )
  },
  { 
    header: "Signals", 
    accessor: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.signals && row.signals.length > 0 ? (
          row.signals.map((s, i) => (
            <span key={i} className="text-[10px] font-bold text-outline bg-surface-container-high/50 px-2 py-0.5 rounded-md border border-outline-variant/10">
              {s}
            </span>
          ))
        ) : (
          <span className="text-xs text-outline italic">None</span>
        )}
      </div>
    )
  },
  {
    header: "Actions",
    accessor: (row) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-success hover:bg-success/10 transition-colors" onClick={() => onAction(row.id, 'approve')}>
          <Check className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-error hover:bg-error/10 transition-colors" onClick={() => onAction(row.id, 'reject')}>
          <X className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-primary hover:bg-primary/10 transition-colors" onClick={() => onAction(row.id, 'view')}>
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    )
  }
];

export default function FraudQueueTable({ data, onAction }) {
  return <DataTable columns={columns(onAction)} data={data} />;
}
