"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Section, SectionHeader, PageShell } from "@/components/ui/section";
import {
  Zap,
  Bot,
  CalendarDays,
  Landmark,
  Smartphone,
  Calculator,
  ShieldCheck,
  CircleCheckBig,
  ArrowRight,
  Bike,
  Building2,
  BarChart4,
  ShoppingBasket,
} from "lucide-react";

/* ── Persona tab data ── */
const personas = [
  {
    id: "partner",
    icon: Bike,
    label: "Delivery Partner",
    text: (
      <>
        Pay as little as{" "}
        <span className="font-bold text-primary">₹131/week</span>. When your
        zone is hit by rain, smog, or a curfew, your payout reaches your UPI
        automatically — before you even open the app.
      </>
    ),
    cta: "See how coverage works",
  },
  {
    id: "platform",
    icon: Building2,
    label: "Insurer / Platform",
    text: (
      <>
        Real-time disruption triggers, ML fraud detection, role-based
        dashboards, and UPI payout rails — all in one{" "}
        <span className="font-bold text-primary">API-ready stack</span>.
      </>
    ),
    cta: "View the architecture",
  },
  {
    id: "investor",
    icon: BarChart4,
    label: "Investor",
    text: (
      <>
        12M uninsured workers.{" "}
        <span className="font-bold text-primary">₹2,800 Cr</span> addressable
        market. UPI + RBI Account Aggregator + parametric = India&apos;s missing
        insurance layer.
      </>
    ),
    cta: "Read the full breakdown",
  },
];

/* ── Feature cards ── */
const features = [
  {
    icon: Zap,
    title: "Auto-Triggered Payouts",
    desc: "Real-time weather and city data feeds automatically trigger payouts when thresholds are met. No human intervention required.",
  },
  {
    icon: Bot,
    title: "AI Fraud Detection",
    desc: "Advanced ML models cross-reference GPS logs and activity data to ensure payouts reach active workers actually affected by the event.",
  },
  {
    icon: CalendarDays,
    title: "Weekly Adaptive Pricing",
    desc: "Dynamic risk modeling allows us to offer low-cost weekly subscriptions that adjust based on seasonal risk factors.",
  },
  {
    icon: Landmark,
    title: "3-Tier Income Verification",
    desc: "Seamless integration with RBI Account Aggregator and UPI data to verify income loss with bank-grade precision.",
  },
];

/* ── Marquee items ── */
const marqueeTop = [
  "Heavy Rain",
  "Flood Alerts",
  "AQI Hazard",
  "Curfew",
  "Cyclone",
  "Dense Fog",
  "Zone Closure",
  "Wind >80km/h",
];
const marqueeBottom = [
  "Auto UPI Payout",
  "Zero Paperwork",
  "Weekly Premium",
  "Fraud-Proof",
  "Instant Trigger",
  "Risk-Scored",
];

/* ── Steps ── */
const steps = [
  { icon: Smartphone, title: "Sign Up", sub: "Phone + UPI ID" },
  { icon: Calculator, title: "Get Priced", sub: "Risk Calculator" },
  { icon: ShieldCheck, title: "Stay Protected", sub: "Automated Monitoring" },
  { icon: CircleCheckBig, title: "Get Paid", sub: "Instant UPI Deposit" },
];

/* ── Tech chips ── */
const techChips = [
  "Next.js",
  "FastAPI",
  "Supabase",
  "Razorpay",
  "OpenWeatherMap",
  "OpenAQ",
  "scikit-learn",
  "Upstash Redis",
];

/* ── Case studies ── */
const caseStudies = [
  {
    name: "Ravi · Mumbai",
    role: "Food Delivery",
    roleIcon: Bike,
    topColor: "bg-tertiary-container",
    initials: "RK",
    event: "Monsoon Flood (Red Alert)",
    threshold: ">15mm rain/hour",
    impact: "2 (Dinner Peak)",
    impactLabel: "Lost Shifts",
    payout: "₹1,200.00",
    quote:
      '"Water was knee-deep in Dadar. I didn\'t even have to call anyone. Trigr notified me and the money was there by 9 PM."',
  },
  {
    name: "Priya · Delhi NCR",
    role: "Grocery Delivery",
    roleIcon: ShoppingBasket,
    topColor: "bg-primary-container",
    initials: "PS",
    event: "Severe AQI Hazard",
    threshold: "AQI > 450 (24h)",
    impact: "3 Days (Stay-Home)",
    impactLabel: "Impact Duration",
    payout: "₹2,450.00",
    quote:
      '"During the November smog, I couldn\'t risk my health. Trigr verified the AQI levels in Gurgaon and covered my missed days."',
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("partner");

  return (
    <>
      <Navbar />
      <PageShell>
        {/* ── Hero ── */}
        <section className="py-20 px-6 max-w-shell mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight text-on-surface">
              Income protection for India&apos;s delivery workers.
              <br />
              <span className="text-primary">Automatic. Instant. Fair.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              Trigr pays you when floods, pollution, or curfews stop your work -
              no claims, no paperwork, no waiting.
            </p>
          </div>

          {/* Persona Tabs */}
          <div className="mt-16 bg-surface-container-lowest rounded-xl shadow-feature border border-outline-variant/10 overflow-hidden max-w-3xl mx-auto">
            <div className="flex border-b border-outline-variant/20">
              {personas.map((p) => {
                const Icon = p.icon;
                const isActive = activeTab === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`flex-1 py-4 px-2 font-headline font-bold text-sm md:text-base border-b-2 transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? "border-primary-container text-primary-container bg-primary-container/5"
                        : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-8 text-left min-h-[180px] flex flex-col justify-between border-l-4 border-tertiary-container">
              {personas.map((p) => (
                <div
                  key={p.id}
                  className={`space-y-4 ${activeTab === p.id ? "block" : "hidden"}`}
                >
                  <p className="text-on-surface text-lg leading-relaxed">
                    {p.text}
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center text-primary-container font-bold hover:gap-2 transition-all"
                  >
                    {p.cta}{" "}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Request a Demo</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">Explore the Docs</Link>
            </Button>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <Section alt id="how-it-works">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-surface-container-lowest p-8 rounded-xl shadow-elevated -mt-32 relative z-10 border border-outline-variant/10">
            <MetricCard value="12M+" label="Workers Unprotected" />
            <MetricCard value="₹1.8k-2.4k" label="Monthly Income Lost" />
            <MetricCard value="₹131" label="Weekly Premium" />
            <MetricCard value="<3 min" label="Time to Payout" />
          </div>

          {/* Features heading */}
          <div className="mt-24 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">
              Parametric insurance built for Bharat&apos;s gig economy.
            </h2>
            <p className="text-lg text-on-surface-variant">
              No broker. No claim form. Just a trigger and a transfer.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-t-4 border-transparent hover:border-primary-container transition-all group"
                >
                  <Icon className="w-10 h-10 text-primary-container mb-4" />
                  <h3 className="text-xl font-headline font-bold text-on-surface mb-2">
                    {f.title}
                  </h3>
                  <p className="text-on-surface-variant">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Marquee ── */}
        <section className="py-24 overflow-hidden bg-surface">
          <div className="space-y-12">
            {/* Forward */}
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...marqueeTop, ...marqueeTop].map((item, i) => (
                <span
                  key={`top-${i}`}
                  className="px-8 py-3 rounded-full border border-primary-container font-bold bg-primary-container/10 text-on-surface shrink-0"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Reverse */}
            <div className="flex animate-marquee-reverse gap-8 whitespace-nowrap">
              {[...marqueeBottom, ...marqueeBottom].map((item, i) => (
                <span
                  key={`bot-${i}`}
                  className="px-8 py-3 rounded-full border border-outline-variant text-on-surface-variant font-medium shrink-0"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Quote block */}
            <div className="max-w-2xl mx-auto px-6">
              <div className="bg-primary/5 border-l-4 border-primary-container p-6 rounded-r-xl">
                <p className="text-on-surface font-medium text-lg italic">
                  &ldquo;Trigr covers what platforms won&apos;t - and pays before
                  you even think to ask.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4-Step Flow ── */}
        <Section alt>
          <h2 className="text-3xl font-headline font-bold mb-16 text-center">
            Simple. Transparent. 4 Steps.
          </h2>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 max-w-4xl mx-auto">
            {/* Connector */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-primary-container/30 -translate-y-8 z-0" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="relative z-10 flex flex-col items-center gap-4 flex-1"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white dark:ring-surface">
                    {i + 1}
                  </div>
                  <div className="space-y-1 text-center">
                    <Icon className="w-5 h-5 text-primary-container mx-auto" />
                    <h4 className="font-bold">{s.title}</h4>
                    <p className="text-xs text-on-surface-variant">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-20 space-y-4 text-center">
            <Button size="xl" asChild>
              <Link href="/register">
                Start Coverage <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-on-surface-variant">
              No app download. Works on any mobile browser.
            </p>
          </div>
        </Section>

        {/* ── Case Studies ── */}
        <Section id="workers">
          <SectionHeader title="Real disruptions. Real payouts. Real workers." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((cs) => {
              const RoleIcon = cs.roleIcon;
              return (
                <Card
                  key={cs.name}
                  className="overflow-hidden shadow-feature flex flex-col h-full"
                >
                  <div className={`h-2 ${cs.topColor}`} />
                  <div className="p-8 space-y-6 flex-grow">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-lg font-bold text-on-surface-variant">
                          {cs.initials}
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-xl">
                            {cs.name}
                          </h3>
                          <p className="text-sm text-on-surface-variant flex items-center gap-1">
                            {cs.role}{" "}
                            <RoleIcon className="w-4 h-4" />
                          </p>
                        </div>
                      </div>
                      <span className="bg-primary/10 text-primary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CircleCheckBig className="w-3 h-3" /> Sent to UPI
                      </span>
                    </div>
                    {/* Details */}
                    <div className="space-y-3">
                      {[
                        { label: "Event", value: cs.event },
                        { label: "Trigger Threshold", value: cs.threshold },
                        { label: cs.impactLabel, value: cs.impact },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between text-sm py-2 border-b border-outline-variant/10"
                        >
                          <span className="text-outline">{row.label}</span>
                          <span className="font-semibold">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm py-2 font-bold text-on-surface">
                        <span>Payout Amount</span>
                        <span className="text-primary font-currency">
                          {cs.payout}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm italic text-on-surface-variant">
                      {cs.quote}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ── Tech Stack + CTA ── */}
        <Section alt id="platforms">
          <div className="space-y-16">
            <SectionHeader
              title="The engine behind Trigr"
              subtitle="Built by insurance veterans and infrastructure engineers for ultimate reliability."
            />
            <div className="pt-4 border-t border-outline-variant/20">
              <p className="text-center text-xs font-bold text-outline uppercase tracking-widest mb-8">
                Our Technology Stack
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {techChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/30 text-sm font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            {/* CTA Block */}
            <div className="bg-primary-container text-white p-12 rounded-2xl shadow-2xl text-center group cursor-pointer hover:scale-[1.01] transition-all">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold">
                Want to see Trigr in action?
              </h2>
              <Link
                href="/register"
                className="text-xl mt-4 font-bold opacity-90 group-hover:opacity-100 flex items-center justify-center gap-2"
              >
                Request a Demo{" "}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer className="bg-surface-container-lowest pt-20 pb-10 border-t border-outline-variant/20">
          <div className="max-w-shell mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Brand */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-2xl font-bold font-headline text-on-surface">
                  <Zap className="w-6 h-6 text-primary-container fill-primary-container" />
                  <span>Trigr</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Redefining income resilience for India&apos;s gig economy
                  through smart parametric insurance. Built for speed,
                  transparency, and fairness.
                </p>
              </div>
              {/* Links */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold">Product</h4>
                  <ul className="space-y-2 text-sm text-on-surface-variant">
                    <li>
                      <Link href="#how-it-works" className="hover:text-primary">How It Works</Link>
                    </li>
                    <li>
                      <Link href="/register" className="hover:text-primary">Worker Coverage</Link>
                    </li>
                    <li>
                      <Link href="#platforms" className="hover:text-primary">Platform API</Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">Company</h4>
                  <ul className="space-y-2 text-sm text-on-surface-variant">
                    <li>
                      <Link href="#" className="hover:text-primary">About Us</Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-primary">Contact</Link>
                    </li>
                    <li>
                      <a href="https://github.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Newsletter */}
              <div className="space-y-6">
                <h4 className="font-bold">Newsletter</h4>
                <p className="text-sm text-on-surface-variant">
                  Get the latest on parametric insurance trends.
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-4 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all bg-transparent"
                    placeholder="Email address"
                    type="email"
                  />
                  <Button size="sm">Join</Button>
                </div>
              </div>
            </div>
            {/* Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-outline-variant/10 text-xs text-outline">
              <p>
                © 2025 Trigr - Built for Guidewire DEVTrails. This is a
                hackathon prototype.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-primary-container">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary-container">Terms of Service</Link>
              </div>
            </div>
            <p className="text-[10px] text-outline/50 mt-4 leading-relaxed text-center italic">
              Disclaimer: Trigr is a technology platform and not a direct
              insurer. Insurance products are underwritten by our partner
              carriers. Payouts are subject to verified data triggers as defined
              in individual policy certificates.
            </p>
          </div>
        </footer>
      </PageShell>
    </>
  );
}
