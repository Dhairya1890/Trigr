"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ZonePicker from "@/components/onboarding/ZonePicker";
import PlatformSelector from "@/components/onboarding/PlatformSelector";
import { IndianRupee, ShieldCheck, Info, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PremiumCalculator() {
  const [data, setData] = useState({
    city: "Mumbai",
    zone: "Dharavi",
    platform: "swiggy",
    weekly_earnings: 4500,
    shift_hours: 12,
    working_days: 6,
    month: new Date().getMonth() + 1,
  });

  const [quote, setQuote] = useState({
    weekly_premium: 131,
    risk_tier: "LOW",
    coverage_pct: 75,
    max_payout: 4500,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.calculatePremium(data);
        if (res) {
          setQuote(res);
        }
      } catch (err) {
        console.error("Failed to calculate premium:", err);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <Card className="border-outline-variant/10 shadow-sm bg-surface-container-lowest">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-lg flex items-center gap-2 text-on-surface">
              <Info className="w-5 h-5 text-primary-container" />
              Enter Your Work Details
            </h3>
            
            <div className="space-y-4">
              <PlatformSelector 
                selected={data.platform} 
                onSelect={(val) => update("platform", val)} 
              />
              
              <ZonePicker 
                city={data.city} 
                zone={data.zone}
                onCityChange={(val) => update("city", val)}
                onZoneChange={(val) => update("zone", val)}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface-variant uppercase tracking-widest text-[10px] font-bold">Weekly Earnings (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    type="number" 
                    value={data.weekly_earnings}
                    onChange={(e) => update("weekly_earnings", Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant uppercase tracking-widest text-[10px] font-bold">Shift Hours</label>
                  <input 
                    type="number" 
                    value={data.shift_hours}
                    onChange={(e) => update("shift_hours", Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant uppercase tracking-widest text-[10px] font-bold">Work Days</label>
                  <input 
                    type="number" 
                    value={data.working_days}
                    onChange={(e) => update("working_days", Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-primary-container text-white border-none shadow-elevated relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        <CardContent className="p-8 md:p-10 space-y-8 relative">
          <div className="space-y-2 text-center">
            <Badge className="bg-white/20 text-white border-none mb-4 uppercase tracking-[0.2em] px-4 font-extrabold text-[10px]">ESTIMATED QUOTE</Badge>
            <h3 className="font-headline font-extrabold text-5xl font-currency flex items-center justify-center gap-1 transition-all">
              <span className="text-2xl mt-1 opacity-70">₹</span>
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : quote.weekly_premium}
              <span className="text-xl font-normal opacity-70 ml-1">/ week</span>
            </h3>
            <p className="text-white/70 text-sm font-medium">Cancel anytime, no strings attached.</p>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Risk Assessment</span>
              <Badge variant={quote.risk_tier === "HIGH" ? "danger" : "success"} className="bg-white text-primary-container border-none font-extrabold">
                {quote.risk_tier} RISK
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Coverage Percentage</span>
              <span className="font-extrabold">{quote.coverage_pct}% of earnings</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Maximum Weekly Payout</span>
              <span className="font-extrabold font-currency">₹{quote.max_payout?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button size="xl" className="w-full bg-white text-primary-container hover:bg-white/90 shadow-2xl shadow-black/20" asChild>
              <Link href="/register">
                Get Protected Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-[10px] text-center opacity-60 uppercase tracking-[0.2em] font-extrabold">
              <ShieldCheck className="w-3 h-3 inline mr-1 -mt-0.5" /> 
              Instant Activation upon purchase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
