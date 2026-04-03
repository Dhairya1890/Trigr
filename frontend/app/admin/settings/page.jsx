"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Shield, Database, Webhook, Info } from "lucide-react";

const sections = [
  {
    title: "System Parameters",
    icon: Settings,
    items: [
      { label: "Base Loss Factor", value: "0.15", type: "number" },
      { label: "Reserve Ratio Target", value: "25%", type: "number" },
      { label: "Max Weekly Payout Cap", value: "₹5,000", type: "number" },
    ]
  },
  {
    title: "Data Connectors",
    icon: Database,
    items: [
      { label: "Weather OpenAPI", status: "CONNECTED", type: "status" },
      { label: "UPI Payout Gateway", status: "CONNECTED", type: "status" },
      { label: "RBI Account Aggregator", status: "PENDING", type: "status" },
    ]
  },
  {
    title: "Webhooks & Alerts",
    icon: Webhook,
    items: [
      { label: "Slack Fraud Channel", value: "#trigr-fraud-alerts", type: "text" },
      { label: "Admin Email Group", value: "dev-ops@trigr.ai", type: "text" },
    ]
  }
];

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-headline font-extrabold text-on-surface">System Configuration</h1>
        <p className="text-sm text-on-surface-variant">Global platform parameters and integration endpoints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={idx}>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-headline font-bold flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary-container" /> {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                        <span className="text-sm text-outline font-medium">{item.label}</span>
                        {item.type === "status" ? (
                          <Badge variant={item.status === 'CONNECTED' ? 'success' : 'warning'}>{item.status}</Badge>
                        ) : (
                          <span className="font-bold text-sm text-on-surface">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-headline font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-error" /> Security Overrides
              </h3>
              <p className="text-xs text-on-surface-variant">Emergency controls for platform stability.</p>
              <div className="space-y-4 pt-2">
                <Button variant="outline" className="w-full text-error border-error/30 hover:bg-error/5 text-xs">
                  PAUSE ALL PAYOUTS
                </Button>
                <Button variant="outline" className="w-full text-warning border-warning/30 hover:bg-warning/5 text-xs">
                  RESET API KEYS
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-headline font-bold flex items-center gap-2 text-primary-container">
                <Info className="w-5 h-5" /> Platform Health
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-outline">API Uptime</span>
                  <span className="font-bold">99.98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-outline">Database Load</span>
                  <span className="font-bold">14%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-outline">Queue Latency</span>
                  <span className="font-bold">142ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
