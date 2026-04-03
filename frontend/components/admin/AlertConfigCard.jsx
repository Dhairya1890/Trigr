import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AlertConfigCard({ config }) {
  const data = config || {
    fraudThreshold: 75,
    payoutCap: 5000,
    channels: ["Slack", "Email"],
    lastUpdated: "Apr 12, 2026",
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-error" />
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-error" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm">Alert Rules</h3>
              <p className="text-xs text-outline">Real-time fraud triggers</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
            <span className="text-xs text-outline font-bold uppercase tracking-wider">Fraud Threshold</span>
            <span className="font-headline font-bold text-error">{data.fraudThreshold}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
            <span className="text-xs text-outline font-bold uppercase tracking-wider">Cap Auto-Hold</span>
            <span className="font-headline font-bold font-currency">₹{data.payoutCap.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-outline font-bold uppercase tracking-wider">Channels</span>
            <div className="flex gap-1">
              {data.channels.map(c => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full text-xs h-8">
          Manage Rules <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
