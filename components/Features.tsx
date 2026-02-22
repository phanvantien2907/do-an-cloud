"use client";

import { useRef, useEffect, type MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HardDrive,
  Shield,
  Gauge,
  Globe,
  Server,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    description:
      "Up to 7GB/s read speeds with enterprise-grade NVMe SSDs. Your data, served at the speed of light.",
    span: "col-span-1 md:col-span-2",
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6,182,212,0.4)",
    stat: "7 GB/s",
    statLabel: "Read Speed",
  },
  {
    icon: Gauge,
    title: "10Gbps Network",
    description:
      "Unmetered bandwidth on a 10Gbps dedicated port. Zero throttling, zero compromises.",
    span: "col-span-1",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168,85,247,0.4)",
    stat: "10 Gbps",
    statLabel: "Bandwidth",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade L3/L4/L7 DDoS mitigation with always-on filtering up to 5Tbps.",
    span: "col-span-1",
    gradient: "from-green-500 to-emerald-500",
    glowColor: "rgba(34,197,94,0.4)",
    stat: "5 Tbps",
    statLabel: "Mitigation",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "Deploy across 30+ data centers worldwide. Sub-millisecond latency to your users.",
    span: "col-span-1 md:col-span-2",
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249,115,22,0.4)",
    stat: "30+",
    statLabel: "Regions",
  },
  {
    icon: Server,
    title: "Instant Provisioning",
    description:
      "Spin up a fully configured server in under 30 seconds. API-first infrastructure as code.",
    span: "col-span-1",
    gradient: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59,130,246,0.4)",
    stat: "<30s",
    statLabel: "Deploy Time",
  },
  {
    icon: Zap,
    title: "Auto Scaling",
    description:
      "Automatically scale resources based on demand. Pay only for what you use.",
    span: "col-span-1",
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "rgba(234,179,8,0.4)",
    stat: "∞",
    statLabel: "Scalability",
  },
];

/* ── 3D Tilt Card with advanced effects ── */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring-based mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  useEffect(() => {
    if (!cardRef.current) return;

    // GSAP ScrollTrigger: dramatic 3D entry
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.6,
          rotateX: 35,
          rotateY: index % 2 === 0 ? -20 : 20,
          z: -200,
          y: 120,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 0.6,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card gsap-reveal-3d group relative rounded-2xl overflow-hidden theme-transition ${feature.span}`}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from var(--angle, 0deg), ${feature.glowColor}, transparent, ${feature.glowColor})`,
          animation: isHovered ? "border-rotate 3s linear infinite" : "none",
          padding: "1.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.glowColor.replace("0.4", "0.08")}, transparent 40%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative z-10 h-full p-6 sm:p-8 rounded-2xl theme-transition"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--bd)",
        }}
      >
        {/* Floating icon with glow */}
        <motion.div
          className="relative mb-5"
          animate={isHovered ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${feature.glowColor.replace("0.4", "0.2")}, var(--surface))`
                : "var(--surface)",
              border: "1px solid var(--bd)",
              boxShadow: isHovered ? `0 0 20px ${feature.glowColor.replace("0.4", "0.3")}` : "none",
            }}
          >
            <Icon
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: isHovered ? feature.glowColor.replace("0.4)", "1)") : "var(--color-accent-cyan)" }}
            />
          </div>
          {/* Icon glow ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={isHovered ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 0 }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            style={{
              border: `2px solid ${feature.glowColor}`,
              width: 48,
              height: 48,
            }}
          />
        </motion.div>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-2 transition-colors duration-300"
          style={{ color: "var(--heading-color)" }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Stats badge — slides in on hover */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold"
            style={{
              background: `linear-gradient(135deg, ${feature.glowColor.replace("0.4", "0.15")}, transparent)`,
              color: feature.glowColor.replace("0.4)", "1)"),
              border: `1px solid ${feature.glowColor.replace("0.4", "0.3")}`,
            }}
          >
            {feature.stat}
          </div>
          <span className="text-xs text-muted">{feature.statLabel}</span>
        </motion.div>

        {/* Corner decoration */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${feature.glowColor.replace("0.4", "0.1")}, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60, scale: 0.85, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.6,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Decorative line animation
      if (gridRef.current) {
        const lines = gridRef.current.querySelectorAll(".feature-connector");
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                end: "top 60%",
                scrub: 0.5,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-3d"
          style={{ perspective: "800px" }}
        >
          <motion.span
            className="inline-block text-sm font-medium text-accent-cyan tracking-wider uppercase px-4 py-1.5 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            Features
          </motion.span>
          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: "var(--heading-color)" }}
          >
            Infrastructure that{" "}
            <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              scales with you
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg">
            Everything you need to deploy, manage, and scale your applications
            with confidence.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
