"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";

const publicLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#platforms", label: "For Platforms" },
  { href: "#workers", label: "For Workers" },
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

function getNavLinks(pathname) {
  if (pathname.startsWith("/worker")) return workerLinks;
  if (pathname.startsWith("/insurer")) return insurerLinks;
  if (pathname.startsWith("/admin")) return adminLinks;
  return publicLinks;
}

function isInternal(pathname) {
  return (
    pathname.startsWith("/worker") ||
    pathname.startsWith("/insurer") ||
    pathname.startsWith("/admin")
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const links = getNavLinks(pathname);
  const internal = isInternal(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center font-headline font-medium text-sm text-on-surface-variant">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary transition-colors",
                pathname === link.href && "text-primary font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!internal && (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Coverage</Link>
              </Button>
            </>
          )}

          {internal && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Sign Out</Link>
            </Button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden w-9 h-9 flex items-center justify-center"
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
        <div className="md:hidden border-t border-outline-variant/20 bg-surface-container-lowest px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-headline font-medium text-on-surface-variant hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
