"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/section";
import { Zap, ShieldCheck, Bike, Building2, Settings, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const demoAccounts = [
  { role: "worker", label: "Demo Worker", icon: Bike, desc: "Ravi Kumar · Swiggy, Dharavi" },
  { role: "insurer", label: "Demo Insurer", icon: Building2, desc: "demo@insurer.trigr" },
  { role: "admin", label: "Demo Admin", icon: Settings, desc: "demo@admin.trigr" },
];

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await login({ email, password, role: "worker" });
    if (!res.success) {
      setError(res.error);
    }
  }

  async function handleDemoLogin(role) {
    setError("");
    const res = await login({ email: `demo@${role}.trigr`, password: "password", role });
    if (!res.success) {
      setError(res.error);
    }
  }

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low min-h-screen">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold font-headline text-on-surface">
                <Zap className="w-8 h-8 text-primary-container fill-primary-container" />
                Trigr
              </div>
              <p className="text-on-surface-variant">
                Sign in to your account
              </p>
            </div>

            {/* Login Form */}
            <Card className="border-outline-variant/10 shadow-xl overflow-hidden bg-surface">
              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ravi.kumar@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface"
                    />
                  </div>
                  
                  {error && (
                    <p className="text-xs text-error font-medium bg-error/10 p-3 rounded-lg border border-error/20">
                      {error}
                    </p>
                  )}

                  <Button className="w-full" size="lg" type="submit" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                  </Button>
                </form>

                <p className="text-center text-sm text-on-surface-variant">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary-container font-semibold hover:underline">
                    Get Coverage
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Demo Access */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-outline-variant/20" />
                <p className="text-center text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
                  Quick Demo Access
                </p>
                <div className="h-px flex-1 bg-outline-variant/20" />
              </div>
              {demoAccounts.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.role}
                    disabled={loading}
                    onClick={() => handleDemoLogin(d.role)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/30 hover:shadow-card transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary-container" />
                    </div>
                    <div className="flex-1">
                      <div className="font-headline font-bold text-sm text-on-surface">{d.label}</div>
                      <div className="text-xs text-on-surface-variant/80">{d.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Trust footer */}
            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="flex items-center gap-2 text-[10px] text-outline font-medium tracking-wide uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>Demo Environment Enabled</span>
              </div>
              <p className="text-[10px] text-on-surface-variant/70 text-center leading-relaxed">
                Authentication is simulated frontend-only for demo purposes. Do not enter real credentials.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
