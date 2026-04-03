"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RoleGuard({ children, requiredRole }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Demo-friendly role check from localStorage
    const storedRole = localStorage.getItem("trigr_role") || "guest";
    
    // Auto-detect role from path if requiredRole is not provided
    let expectedRole = requiredRole;
    if (!expectedRole) {
      if (pathname.startsWith("/worker")) expectedRole = "worker";
      if (pathname.startsWith("/insurer")) expectedRole = "insurer";
      if (pathname.startsWith("/admin")) expectedRole = "admin";
    }

    if (storedRole !== expectedRole && expectedRole) {
      console.warn(`Unauthorized access attempt. Role: ${storedRole}, Required: ${expectedRole}`);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router, pathname, requiredRole]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary-container mx-auto" />
          <p className="text-sm font-medium text-outline uppercase tracking-widest">
            Verifying Identity...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
