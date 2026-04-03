"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/ui/section";
import { Zap, ShieldCheck, Bike, Building2, Settings } from "lucide-react";

const demoAccounts = [
  { role: "worker", label: "Demo Worker", icon: Bike, desc: "Ravi Kumar · Swiggy, Dharavi", href: "/worker/dashboard" },
  { role: "insurer", label: "Demo Insurer", icon: Building2, desc: "demo@insurer.trigr", href: "/insurer/dashboard" },
  { role: "admin", label: "Demo Admin", icon: Settings, desc: "demo@admin.trigr", href: "/admin/fraud" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    router.push("/worker/dashboard");
  }

  function handleDemoLogin(href, role) {
    if (typeof window !== "undefined") {
      localStorage.setItem("trigr_role", role);
    }
    router.push(href);
  }

  return (
    <>
      <Navbar />
      <PageShell className="bg-surface-container-low">
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
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
            <Card>
              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ravi.kumar@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-on-surface">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm"
                    />
                  </div>
                  <Button className="w-full" size="lg" type="submit">
                    Sign In
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
              <p className="text-center text-xs font-bold text-outline uppercase tracking-widest">
                Quick Demo Access
              </p>
              {demoAccounts.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.role}
                    onClick={() => handleDemoLogin(d.href, d.role)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/30 hover:shadow-card transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-container" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-sm">{d.label}</div>
                      <div className="text-xs text-on-surface-variant">{d.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Trust */}
            <div className="flex items-center justify-center gap-2 text-xs text-outline">
              <ShieldCheck className="w-4 h-4" />
              <span>Secured with end-to-end encryption</span>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
