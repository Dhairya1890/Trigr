"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
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
  Globe,
  Users,
  CheckCircle2,
  BarChart3,
  ChevronDown,
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
        automatically - before you even open the app.
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
    name: "Ravi - Mumbai",
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
    name: "Priya - Delhi NCR",
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

const faqs = [
  {
    question: "How do payouts work without a claim form?",
    answer: "Trigr uses parametric triggers. When verified weather or city data (like 50mm+ rain in 3 hours) hits your specific zone, a payout is automatically calculated based on your shift overlap and sent directly to your UPI ID.",
  },
  {
    question: "How are disruptions detected exactly?",
    answer: "We poll high-reliability APIs (OpenWeatherMap, OpenAQ) every 15 minutes. For social disruptions like curfews or strikes, we use news sentiment analysis and official government feeds to verify the event before triggering payouts.",
  },
  {
    question: "What documents do I need to register?",
    answer: "Just your Phone Number and UPI ID for basic coverage. For higher coverage caps, you can optionally share bank statements via the RBI Account Aggregator framework to verify your platform earnings.",
  },
  {
    question: "Is the coverage instant after I sign up?",
    answer: "Once you register and pay your first weekly premium, your coverage is active for the following week starting Monday at 12:00 AM. Pricing is recalculated every Monday based on seasonal risk factors.",
  },
  {
    question: "What happens if my payout is flagged for review?",
    answer: "Our ML fraud engine cross-references GPS logs to ensure you were actually active in the affected zone. If a flag is raised, a human reviewer evaluates the case within 4 hours to ensure fair and accurate payouts.",
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-outline-variant/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-colors focus-ring rounded-lg px-2"
      >
        <span className="font-headline font-bold text-lg text-on-surface">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-outline transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-on-surface-variant leading-relaxed px-2">{answer}</p>
      </div>
    </div>
  );
}

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
          <div className="mt-16 bg-surface-container-lowest rounded-2xl shadow-feature border border-outline-variant/10 overflow-hidden max-w-3xl mx-auto animate-fade-up">
            <div className="flex border-b border-outline-variant/20 bg-surface-container-low/30">
              {personas.map((p) => {
                const Icon = p.icon;
                const isActive = activeTab === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`flex-1 py-5 px-2 font-headline font-bold text-sm md:text-base border-b-2 transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-8 md:p-10 text-left min-h-[200px] flex flex-col justify-between border-l-4 border-primary">
              {personas.map((p) => (
                <div
                  key={p.id}
                  className={`space-y-5 animate-in fade-in slide-in-from-left-2 duration-500 ${activeTab === p.id ? "block" : "hidden"}`}
                >
                  <p className="text-on-surface text-lg md:text-xl leading-relaxed">
                    {p.text}
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all group"
                  >
                    {p.cta}{" "}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:200ms]">
            <Button size="xl" className="shadow-cta" asChild>
              <Link href="/register">Request a Demo</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="#how-it-works">Explore the Docs</Link>
            </Button>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <Section alt id="how-it-works">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-elevated -mt-36 relative z-10 border border-outline-variant/10">
            <MetricCard value="12M+" label="Workers Unprotected" />
            <MetricCard value="₹1.8k-2.4k" label="Monthly Income Lost" />
            <MetricCard value="₹131" label="Weekly Premium" />
            <MetricCard value="<3 min" label="Time to Payout" />
          </div>

          {/* Features heading */}
          <div className="mt-32 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface leading-tight">
              Parametric insurance built <br className="hidden md:block" /> for Bharat&apos;s gig economy.
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              No broker. No claim form. Just a trigger and a transfer.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-surface-container-lowest p-10 rounded-3xl shadow-card border border-outline-variant/5 hover:border-primary/20 hover:shadow-elevated transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                    {f.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Marquee ── */}
        <section className="py-32 overflow-hidden bg-surface relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />
          <div className="space-y-16">
            {/* Forward */}
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...marqueeTop, ...marqueeTop, ...marqueeTop].map((item, i) => (
                <span
                  key={`top-${i}`}
                  className="px-10 py-4 rounded-full border border-primary/20 font-bold bg-primary/5 text-primary text-sm uppercase tracking-widest shrink-0"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Reverse */}
            <div className="flex animate-marquee-reverse gap-8 whitespace-nowrap">
              {[...marqueeBottom, ...marqueeBottom, ...marqueeBottom].map((item, i) => (
                <span
                  key={`bot-${i}`}
                  className="px-10 py-4 rounded-full border border-outline-variant/30 text-on-surface-variant font-bold text-sm uppercase tracking-widest shrink-0 bg-surface-container-low"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Quote block */}
            <div className="max-w-3xl mx-auto px-6">
              <div className="bg-primary-container/5 border-l-4 border-primary p-8 rounded-r-3xl">
                <p className="text-on-surface font-headline font-bold text-xl md:text-2xl italic leading-relaxed">
                  &ldquo;Trigr covers what platforms won&apos;t - and pays before
                  you even think to ask.&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />
        </section>

        {/* ── 4-Step Flow ── */}
        <Section alt>
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">
              Simple. Transparent. 4 Steps.
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">From registration to payout in a fraction of the time of traditional insurance.</p>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 max-w-5xl mx-auto">
            {/* Connector */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 -translate-y-8 z-0" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="relative z-10 flex flex-col items-center gap-6 flex-1 group"
                >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-headline font-black text-2xl shadow-cta ring-8 ring-white dark:ring-surface transition-transform group-hover:scale-110">
                    {i + 1}
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-headline font-bold text-lg">{s.title}</h4>
                    <p className="text-sm text-on-surface-variant font-medium leading-tight">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-24 space-y-6 text-center animate-fade-up">
            <Button size="xl" className="px-12 shadow-cta" asChild>
              <Link href="/register">
                Start Coverage <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-on-surface-variant font-medium">
              No app download. Works on any mobile browser.
            </p>
          </div>
        </Section>

        {/* ── Case Studies ── */}
        <Section id="workers">
          <SectionHeader 
            title="Real disruptions. Real payouts. Real workers." 
            subtitle="How Trigr helps independent contractors maintain income resilience during city-wide events."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            {caseStudies.map((cs) => {
              const RoleIcon = cs.roleIcon;
              return (
                <Card
                  key={cs.name}
                  hover
                  className="overflow-hidden shadow-elevated flex flex-col h-full border-none bg-surface-container-low/50"
                >
                  <div className={`h-2.5 ${cs.topColor} w-full`} />
                  <div className="p-8 md:p-10 space-y-8 flex-grow">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-headline font-black text-primary shadow-inner">
                          {cs.initials}
                        </div>
                        <div>
                          <h3 className="font-headline font-extrabold text-2xl text-on-surface">
                            {cs.name}
                          </h3>
                          <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2 mt-0.5">
                            <RoleIcon className="w-4 h-4 text-primary" />
                            {cs.role}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status="PAID" className="px-4 py-1.5 rounded-xl shadow-sm" />
                    </div>
                    {/* Details */}
                    <div className="space-y-4 bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/10">
                      {[
                        { label: "Event", value: cs.event },
                        { label: "Trigger Threshold", value: cs.threshold },
                        { label: cs.impactLabel, value: cs.impact },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between text-sm py-2.5 border-b border-outline-variant/5 last:border-0"
                        >
                          <span className="text-outline font-bold uppercase tracking-wider text-[10px]">{row.label}</span>
                          <span className="font-bold text-on-surface">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-base py-3 mt-2 border-t-2 border-primary/10 font-black text-on-surface">
                        <span className="uppercase tracking-widest text-xs self-center">Payout Amount</span>
                        <span className="text-primary text-2xl font-currency">
                          {cs.payout}
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-2 -top-2 text-4xl text-primary/10 font-serif">&ldquo;</div>
                      <p className="text-base italic text-on-surface-variant leading-relaxed pl-4 font-medium">
                        {cs.quote}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ── Tech Stack + CTA ── */}
        <Section alt id="platforms">
          <div className="space-y-20">
            <SectionHeader
              title="The engine behind Trigr"
              subtitle="Built by insurance veterans and infrastructure engineers for ultimate reliability."
            />
            <div className="pt-10 border-t border-outline-variant/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-surface-container-low text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                Enterprise Stack
              </div>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {techChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-6 py-3 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-sm font-bold text-on-surface shadow-sm hover:shadow-card hover:border-primary/20 transition-all cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            {/* CTA Block */}
            <div className="bg-primary hover:bg-on-primary-fixed-variant text-white p-12 md:p-20 rounded-3xl shadow-cta text-center group cursor-pointer transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/20 rounded-full -ml-32 -mb-32 blur-3xl" />
              
              <h2 className="text-3xl md:text-5xl font-headline font-black relative z-10 leading-tight">
                Want to see India&apos;s <br /> first parametric insurer in action?
              </h2>
              <Link
                href="/register"
                className="inline-flex items-center text-xl md:text-2xl mt-10 font-black relative z-10 group-hover:scale-110 transition-transform"
              >
                Request a Demo{" "}
                <ArrowRight className="w-8 h-8 ml-3 transition-transform group-hover:translate-x-3" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section id="faq">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">
                Frequently Asked Questions
              </h2>
              <p className="text-on-surface-variant">
                Everything you need to know about Trigr&apos;s automated coverage.
              </p>
            </div>
            <div className="bg-surface-container-low/30 rounded-2xl p-4 md:p-8 border border-outline-variant/10">
              {faqs.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
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
                    className="flex-1 px-4 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all bg-surface text-on-surface"
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
