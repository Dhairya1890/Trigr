import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

export default function PoolHealthCard({ stats }) {
  const data = stats || {
    totalPool: 1240500,
    activePolicies: 842,
    lossRatio: 12.4,
    trend: "improving",
  };

  return (
    <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
      <div className="h-2 bg-primary" />
      <CardContent className="p-8 md:p-10 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-headline font-black text-2xl text-on-surface tracking-tight">Pool Health</h3>
              <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Real-time solvency status
              </p>
            </div>
          </div>
          <Badge variant="success" className="px-5 py-2 text-xs rounded-xl shadow-sm">HEALTHY</Badge>
        </div>

        <div className="space-y-6 bg-surface-container-lowest/50 p-8 rounded-3xl border border-outline-variant/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-outline">Total Pool Value</p>
            <p className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter mt-2 font-currency">
              ₹{data.totalPool.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/10">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest font-black text-outline">Active Policies</p>
              <p className="font-headline font-black text-2xl text-on-surface tracking-tight">{data.activePolicies}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest font-black text-outline">Loss Ratio</p>
              <div className="flex items-center gap-3">
                <p className="font-headline font-black text-2xl text-on-surface tracking-tight">{data.lossRatio}%</p>
                {data.trend === "improving" ? (
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-success" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-error" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
