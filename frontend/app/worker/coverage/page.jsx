import CoverageTierCard from "@/components/dashboard/CoverageTierCard";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function WorkerCoveragePage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-extrabold">Coverage Tiers</h1>
        <p className="text-sm text-on-surface-variant">Higher verification = higher coverage cap.</p>
      </div>

      <div className="p-4 rounded-xl bg-primary-container/10 border border-primary-container/20 flex gap-4 items-start shadow-sm">
        <Info className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary-container tracking-tight">Regulatory Phase: Pilot</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Trigr is currently in an active pilot phase. Full production rollout depends on local licensing 
            and regulatory enablement in your specific jurisdiction. This platform is for demonstration 
            purposes as part of the Guidewire DEVTrails hackathon.
          </p>
        </div>
      </div>

      <CoverageTierCard currentTier={2} />

      <Card>
        <CardContent className="p-8 space-y-4">
          <h3 className="font-headline font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-container" />
            About RBI Account Aggregator (Tier 3)
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The RBI-regulated Account Aggregator framework lets you securely share your bank transaction history with Trigr —
            without uploading documents or sharing your login credentials. Your bank sends only the data you consent to share.
          </p>
          <div className="space-y-2 pt-4 border-t border-outline-variant/10">
            <p className="text-xs text-outline font-bold uppercase tracking-wider">How it works</p>
            {[
              "You opt into AA consent during upgrade (completely voluntary)",
              "Trigr sends a consent request via your Account Aggregator to your bank",
              "You approve on your bank's app — one tap, no credentials shared",
              "Bank sends 3 months of transaction history to Trigr",
              "Trigr verifies your platform earnings from actual bank credits",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="w-5 h-5 rounded-full bg-primary-container text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
