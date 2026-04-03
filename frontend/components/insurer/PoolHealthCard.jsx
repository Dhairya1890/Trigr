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
    <Card className="overflow-hidden">
      <div className="h-2 bg-primary-container" />
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-container" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">Pool Health</h3>
              <p className="text-xs text-outline">Real-time solvency</p>
            </div>
          </div>
          <Badge variant="success">HEALTHY</Badge>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-outline uppercase tracking-wider font-bold">Total Pool Value</p>
            <p className="text-3xl font-headline font-extrabold text-primary-container font-currency">
              ₹{data.totalPool.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10">
            <div>
              <p className="text-xs text-outline mb-1">Active Policies</p>
              <p className="font-headline font-bold text-lg">{data.activePolicies}</p>
            </div>
            <div>
              <p className="text-xs text-outline mb-1">Loss Ratio</p>
              <div className="flex items-center gap-2">
                <p className="font-headline font-bold text-lg">{data.lossRatio}%</p>
                {data.trend === "improving" ? (
                  <TrendingDown className="w-4 h-4 text-success" title="Lower is better" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-error" title="Higher is concerning" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
