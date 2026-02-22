"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroScene3D = dynamic(() => import("@/components/HeroScene3D"), {
  ssr: false,
});

/* ── Typewriter with type-in / delete-out cycle ── */
const rotatingWords = [
  "Cloud in Seconds",
  "Apps with Ease",
  "Scale Instantly",
  "Infrastructure Fast",
];

function TypewriterText() {
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentWord = rotatingWords[wordIdx];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing in
      const next = currentWord.slice(0, displayText.length + 1);
      setDisplayText(next);
      if (next === currentWord) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      const next = currentWord.slice(0, displayText.length - 1);
      setDisplayText(next);
      if (next === "") {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % rotatingWords.length);
      }
    }
  }, [displayText, wordIdx, isDeleting, isPaused]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue bg-clip-text text-transparent">
      {displayText}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-accent-cyan"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

/* ── Server Illustration ── */
function ServerIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.6, rotateX: 25, rotateY: -20 },
      { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.4, ease: "power3.out", delay: 0.5 }
    );

    gsap.to(containerRef.current, {
      scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "bottom 20%", scrub: 1.5 },
      rotateX: -10, rotateY: 15, scale: 1.08, ease: "none",
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto gsap-reveal-3d" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-blue/20 blur-3xl rounded-full scale-150 opacity-60" />
        <div className="relative border rounded-2xl p-6 space-y-3 theme-transition" style={{ background: "var(--card-bg)", borderColor: "var(--bd)" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-4 py-3 theme-transition" style={{ background: "var(--surface)", border: "1px solid var(--bd)" }}>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 2 ? "#eab308" : "#22c55e", boxShadow: i === 2 ? "0 0 6px rgba(234,179,8,0.6)" : "0 0 6px rgba(34,197,94,0.6)" }} />
              </div>
              <div className="flex-1 flex gap-1">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="flex-1 h-6 rounded-sm" style={{ background: "var(--bd)", border: "1px solid var(--bd)" }} />
                ))}
              </div>
              <motion.div className="w-1.5 h-4 rounded-full bg-accent-cyan" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
            </div>
          ))}
          <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--bd)" }}>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted font-mono">SYS OK</span>
              <motion.span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
            <span className="text-xs text-muted font-mono">99.99% uptime</span>
          </div>
        </div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-8 h-px bg-gradient-to-r from-accent-cyan/50 to-transparent" animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} style={{ transformOrigin: "left" }} />
          ))}
        </div>
      </div>
      <motion.div className="absolute inset-0 pointer-events-none" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headlineRef.current, { opacity: 0, y: 60, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1 })
      .fromTo(subRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.3")
      .fromTo(metricsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

    if (sectionRef.current) {
      gsap.to(sectionRef.current.querySelector(".hero-content"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
        y: -60, opacity: 0.3, scale: 0.95, ease: "none",
      });
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.08)_0%,_transparent_50%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-accent-purple/5 to-transparent rounded-full blur-3xl" />

      <HeroScene3D />

      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted mb-8 theme-transition"
              style={{ border: "1px solid var(--nav-border)", background: "var(--surface)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </motion.div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] opacity-0"
              style={{ perspective: "600px" }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, var(--hero-from), var(--hero-to))" }}
              >
                Deploy Your
              </span>
              <br />
              <TypewriterText />
            </h1>

            <p ref={subRef} className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0">
              High-performance VPS and Cloud solutions powered by NVMe SSD
              storage, 10Gbps network, and enterprise-grade DDoS protection.
              Scale effortlessly from startup to enterprise.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start opacity-0">
              <Link
                href="#pricing"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm cursor-pointer transition-all duration-300 shadow-lg hover:shadow-accent-cyan/25 hover:scale-105 hover:brightness-110"
                style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-fg)" }}
              >
                Get Started
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm cursor-pointer transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan/40 hover:text-accent-cyan hover:scale-105"
                style={{ border: "1px solid var(--btn-secondary-border)", color: "var(--btn-secondary-fg)" }}
              >
                <Play size={14} />
                See How It Works
              </Link>
            </div>

            <div ref={metricsRef} className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-sm text-muted opacity-0">
              <div>
                <span className="block text-2xl font-bold" style={{ color: "var(--heading-color)" }}>99.99%</span>
                Uptime SLA
              </div>
              <div className="w-px h-10" style={{ background: "var(--bd)" }} />
              <div>
                <span className="block text-2xl font-bold" style={{ color: "var(--heading-color)" }}>50K+</span>
                Deployments
              </div>
              <div className="w-px h-10" style={{ background: "var(--bd)" }} />
              <div>
                <span className="block text-2xl font-bold" style={{ color: "var(--heading-color)" }}>30+</span>
                Regions
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <ServerIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
