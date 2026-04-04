"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CircleCheckBig, Send, SkipForward, XCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function UPIVerifyCard({ upi, onVerified, onSkip }) {
  const [state, setState] = useState("idle"); // idle | sending | success | error

  async function handleVerify() {
    setState("sending");
    try {
      // Use a temporary onboarding ID if no worker ID is provided
      const targetId = upi.split("@")[0] || "onboarding_user";
      const res = await api.verifyUPI(upi, targetId);
      
      // Simulate penny drop delay for premium UI feel
      await new Promise((r) => setTimeout(r, 1500));
      
      if (res?.verified) {
        setState("success");
        setTimeout(() => onVerified(), 1500);
      } else {
        setState("error");
      }
    } catch (err) {
      setState("error");
    }
  }

  return (
    <Card hover className="overflow-hidden border-none shadow-elevated bg-surface-container-low/50">
      <div className="h-2 bg-primary-container" />
      <CardContent className="p-8 space-y-6 text-center">
        {state === "idle" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-container/10 flex items-center justify-center">
              <Send className="w-8 h-8 text-primary-container" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-headline font-bold">₹1 Penny Drop</h3>
              <p className="text-sm text-on-surface-variant">
                We&apos;ll send ₹1 to <span className="font-semibold text-on-surface">{upi}</span> to verify your bank account.
                This amount is yours to keep.
              </p>
            </div>
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleVerify}>
                Send ₹1 to verify
              </Button>
              <button
                onClick={onSkip}
                className="text-sm text-on-surface-variant hover:text-primary flex items-center justify-center gap-1 mx-auto"
              >
                <SkipForward className="w-4 h-4" />
                Skip — stay on Tier 1 coverage
              </button>
            </div>
          </>
        )}

        {state === "sending" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-container/10 flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-primary-container animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-headline font-bold">Processing Transfer</h3>
              <p className="text-sm text-on-surface-variant">
                Sending ₹1 via Razorpay to {upi}...
              </p>
            </div>
          </>
        )}

        {state === "success" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <CircleCheckBig className="w-8 h-8 text-success" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-headline font-bold text-success">Verified!</h3>
              <p className="text-sm text-on-surface-variant">
                ₹1 sent successfully. Your coverage cap is now <span className="font-bold text-on-surface">₹3,500/week</span> (Tier 2).
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
