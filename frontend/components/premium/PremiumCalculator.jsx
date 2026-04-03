"use client";

import { useState, useMemo } from "react";
import { calculatePremiumPreview } from "@/lib/premiumCalc";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ZonePicker from "@/components/onboarding/ZonePicker";
import PlatformSelector from "@/components/onboarding/PlatformSelector";
import { IndianRupee, ShieldCheck, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PremiumCalculator() {
  const [data, setData] = useState({
    city: "Mumbai",
    zone: "Dharavi",
    platform: "swiggy",
    earnings: 4500,
    shiftStart: "10:00",
    shiftEnd: "22:00",
    verificationTier: 1,
  });

  const quote = useMemo(() => calculatePremiumPreview(data), [data]);

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <Card className="border-outline-variant/10 shadow-sm">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-lg flex items-center gap-2">
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
                <label className="text-sm font-medium">Estimated Weekly Earnings (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input 
                    type="number" 
                    value={data.earnings}
                    onChange={(e) => update("earnings", Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Shift Start</label>
                  <input 
                    type="time" 
                    value={data.shiftStart}
                    onChange={(e) => update("shiftStart", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Shift End</label>
                  <input 
                    type="time" 
                    value={data.shiftEnd}
                    onChange={(e) => update("shiftEnd", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-primary-container text-white border-none shadow-elevated">
        <CardContent className="p-8 md:p-10 space-y-8">
          <div className="space-y-2 text-center">
            <Badge className="bg-white/20 text-white border-none mb-4">ESTIMATED QUOTE</Badge>
            <h3 className="font-headline font-extrabold text-4xl font-currency flex items-center justify-center gap-1">
              <span className="text-2xl mt-1">₹</span>
              {quote.weeklyPremium}
              <span className="text-xl font-normal opacity-70 ml-1">/ week</span>
            </h3>
            <p className="text-white/70 text-sm">Cancel anytime, no strings attached.</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Risk Assessment</span>
              <Badge variant={quote.riskTier === "HIGH" ? "danger" : "success"} className="bg-white text-primary-container">
                {quote.riskTier} RISK
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Coverage Percentage</span>
              <span className="font-bold">{quote.coveragePct}% of earnings</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Maximum Weekly Payout</span>
              <span className="font-bold font-currency">₹{quote.maxPayout.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button size="xl" className="w-full bg-white text-primary-container hover:bg-white/90" asChild>
              <Link href="/register">
                Get Protected Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-[10px] text-center opacity-60 uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3 h-3 inline mr-1 -mt-0.5" /> 
              Instant Activation upon purchase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
