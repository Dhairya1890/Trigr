"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RoleGuard({ children, requiredRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const { role, isAuthenticated, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Wait for AuthProvider to finish restoring from localStorage
    if (loading) return;

    if (!isAuthenticated) {
      console.log("[RoleGuard] Not authenticated, redirecting to login");
      router.replace("/login");
      return;
    }

    // Auto-detect role from path if requiredRole is not provided
    let expectedRole = requiredRole;
    if (!expectedRole) {
      if (pathname.startsWith("/worker")) expectedRole = "worker";
      else if (pathname.startsWith("/insurer")) expectedRole = "insurer";
      else if (pathname.startsWith("/admin")) expectedRole = "admin";
    }

    if (expectedRole && role !== expectedRole) {
      console.warn(`[RoleGuard] Unauthorized access attempt. Role: ${role}, Expected: ${expectedRole}`);
      // Redirect to correct dashboard based on actual role to prevent "locked" state
      if (role === "admin") router.replace("/admin/analytics");
      else if (role === "insurer") router.replace("/insurer/dashboard");
      else router.replace("/worker/dashboard");
    } else {
      setAuthorized(true);
    }
  }, [loading, isAuthenticated, role, requiredRole, pathname, router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary-container mx-auto" />
          <p className="text-sm font-medium text-outline uppercase tracking-widest animate-pulse">
            Verifying Identity...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
