"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const publicLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#platforms", label: "For Platforms" },
  { href: "/#workers", label: "For Workers" },
];

const workerLinks = [
  { href: "/worker/dashboard", label: "Dashboard" },
  { href: "/worker/policy", label: "My Policy" },
  { href: "/worker/claims", label: "Claims" },
  { href: "/worker/coverage", label: "Coverage" },
];

const insurerLinks = [
  { href: "/insurer/dashboard", label: "Dashboard" },
  { href: "/insurer/events", label: "Events" },
  { href: "/insurer/payouts", label: "Payouts" },
];

const adminLinks = [
  { href: "/admin/fraud", label: "Fraud Queue" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = isAuthenticated 
    ? (role === "admin" ? adminLinks : role === "insurer" ? insurerLinks : workerLinks)
    : publicLinks;

  return (
    <header className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant/20 shadow-sm">
      <nav className="flex justify-between items-center h-20 px-6 md:px-12 max-w-shell mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold font-headline text-on-primary-fixed"
        >
          <Zap className="w-6 h-6 text-primary-container fill-primary-container" />
          <span>Trigr</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-headline font-medium text-sm text-on-surface-variant">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 hover:text-primary transition-colors group",
                  isActive && "text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  isActive && "scale-x-100"
                )} />
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Coverage</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10">
                <User className="w-3.5 h-3.5 text-primary-container" />
                <span className="text-xs font-bold text-on-surface truncate max-w-[100px]">
                  {user?.name || "User"}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-outline hover:text-error transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Sign Out</span>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden w-9 h-9 flex items-center justify-center text-on-surface-variant"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-surface-container-lowest px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-headline font-medium text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10">
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="w-full">
                <Link href="/register">Get Coverage</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
