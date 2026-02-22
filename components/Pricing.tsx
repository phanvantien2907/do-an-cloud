"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    description: "Perfect for personal projects and small apps.",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      "1 vCPU Core",
      "2 GB RAM",
      "50 GB NVMe SSD",
      "2 TB Bandwidth",
      "1 IPv4 Address",
      "Basic DDoS Protection",
      "Community Support",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses and production workloads.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      "4 vCPU Cores",
      "8 GB RAM",
      "200 GB NVMe SSD",
      "Unmetered Bandwidth",
      "2 IPv4 Addresses",
      "Advanced DDoS Protection",
      "Priority Support",
      "Daily Backups",
      "Free SSL Certificates",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For mission-critical applications and large teams.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "16 vCPU Cores",
      "64 GB RAM",
      "1 TB NVMe SSD",
      "Unmetered Bandwidth",
      "5 IPv4 Addresses",
      "Enterprise DDoS (5Tbps)",
      "24/7 Dedicated Support",
      "Hourly Backups",
      "Free SSL Certificates",
      "Private Networking",
      "Custom SLA",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll<HTMLElement>(".pricing-card");

    cards.forEach((card, i) => {
      // GSAP ScrollTrigger: 3D reveal — scroll down = expand, scroll up = collapse
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.7,
          rotateX: 25,
          y: 100,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.8,
            toggleActions: "play reverse play reverse",
          },
          delay: i * 0.05,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-24 sm:py-32">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-purple/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-sm font-medium text-accent-cyan tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "var(--heading-color)" }}>
            Simple,{" "}
            <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg">
            No hidden fees. No surprise charges. Scale your infrastructure
            affordably.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={cn(
              "text-sm transition-colors",
              !yearly ? "text-foreground" : "text-muted"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-12 h-6 rounded-full transition-colors theme-transition"
            style={{ background: "var(--surface)", border: "1px solid var(--bd)" }}
            aria-label="Toggle billing period"
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-accent-cyan"
              animate={{ x: yearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={cn(
              "text-sm transition-colors",
              yearly ? "text-foreground" : "text-muted"
            )}
          >
            Yearly{" "}
            <span className="text-accent-cyan text-xs font-medium">
              Save 20%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "pricing-card gsap-reveal-3d relative rounded-2xl p-8 flex flex-col theme-transition",
                plan.highlighted
                  ? "animated-border border-transparent"
                  : "bg-card"
              )}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
                border: plan.highlighted ? undefined : "1px solid var(--bd)",
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-xs font-medium text-white z-10">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold" style={{ color: "var(--heading-color)" }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-muted mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={{ color: "var(--heading-color)" }}>
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted text-sm">/mo</span>
                </div>
                {yearly && (
                  <p className="text-xs text-muted mt-1">
                    Billed annually (${plan.yearlyPrice * 12}/yr)
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={cn(
                  "inline-flex items-center justify-center w-full py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-105",
                  plan.highlighted
                    ? "shadow-lg hover:shadow-lg hover:shadow-accent-cyan/20 hover:brightness-110"
                    : "hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10"
                )}
                style={
                  plan.highlighted
                    ? { background: "var(--btn-primary-bg)", color: "var(--btn-primary-fg)" }
                    : { border: "1px solid var(--btn-secondary-border)", color: "var(--btn-secondary-fg)" }
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
