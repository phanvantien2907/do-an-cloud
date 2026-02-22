"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Alex Chen",
    role: "CTO, StreamFlow",
    quote:
      "NovaCloud's NVMe performance is unreal. Our API response times dropped by 60% after migrating.",
    stars: 5,
    accent: "rgba(6,182,212,0.5)",
  },
  {
    name: "Sarah Johnson",
    role: "DevOps Lead, Pixelware",
    quote:
      "The auto-scaling saved us during a viral launch. Zero downtime with 100x traffic spike.",
    stars: 5,
    accent: "rgba(168,85,247,0.5)",
  },
  {
    name: "Marcus Webb",
    role: "Founder, DataForge",
    quote:
      "Best DDoS protection in the market. We've been attack-free since switching to NovaCloud.",
    stars: 5,
    accent: "rgba(59,130,246,0.5)",
  },
  {
    name: "Emily Park",
    role: "Lead SRE, NexaTech",
    quote:
      "Provisioned 50 servers across 12 regions in under a minute. Infrastructure as code done right.",
    stars: 5,
    accent: "rgba(34,197,94,0.5)",
  },
  {
    name: "David Kim",
    role: "VP Engineering, CloudBase",
    quote:
      "The 24/7 support team is phenomenal. They resolved a critical issue in under 10 minutes.",
    stars: 5,
    accent: "rgba(249,115,22,0.5)",
  },
  {
    name: "Lisa Nguyen",
    role: "CEO, ScaleUp.io",
    quote:
      "We cut our infrastructure costs by 45% while getting better performance. No-brainer decision.",
    stars: 5,
    accent: "rgba(6,182,212,0.5)",
  },
  {
    name: "James Miller",
    role: "Architect, Quantum Labs",
    quote:
      "The private networking and custom SLAs made enterprise compliance a breeze for us.",
    stars: 5,
    accent: "rgba(168,85,247,0.5)",
  },
  {
    name: "Priya Patel",
    role: "CTO, FinSecure",
    quote:
      "Five nines uptime and they actually deliver on it. Our clients trust us because we trust NovaCloud.",
    stars: 5,
    accent: "rgba(59,130,246,0.5)",
  },
];

/* ── Typewriter for testimonials heading ── */
const rotatingPhrases = [
  "engineers worldwide",
  "developers everywhere",
  "DevOps teams globally",
  "startups & enterprises",
];

function TestimonialTypewriter() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = rotatingPhrases[phraseIdx];
    if (isPaused) return;

    if (!isDeleting) {
      const next = currentPhrase.slice(0, displayText.length + 1);
      setDisplayText(next);
      if (next === currentPhrase) {
        setIsPaused(true);
        setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2200);
      }
    } else {
      const next = currentPhrase.slice(0, displayText.length - 1);
      setDisplayText(next);
      if (next === "") {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % rotatingPhrases.length);
      }
    }
  }, [displayText, phraseIdx, isDeleting, isPaused]);

  useEffect(() => {
    const speed = isDeleting ? 35 : 70;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
      {displayText}
      <motion.span
        className="inline-block w-[3px] h-[0.8em] ml-1 align-middle rounded-sm bg-accent-purple"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

/* ── Review card — raindrop fall effect ── */
function ReviewCard({ review, index }: { review: (typeof testimonials)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Raindrop: cards start far above, fall down with slight wobble, bounce on landing
    // Scroll up → cards fall off-screen downward
    const wobble = (index % 2 === 0 ? -1 : 1) * (2 + Math.random() * 3);
    const staggerDelay = index * 0.04;

    const ctx = gsap.context(() => {
      // Fall from sky (scroll-linked)
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: -400 - index * 40,
          rotateZ: wobble,
          rotateX: -25,
          scale: 0.65,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 110%",
            end: "top 60%",
            scrub: 0.5,
          },
        }
      );

      // Bounce splash on landing
      gsap.fromTo(
        cardRef.current,
        { boxShadow: `0 0 0px ${review.accent.replace("0.5", "0")}` },
        {
          boxShadow: `0 8px 40px ${review.accent.replace("0.5", "0.15")}`,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 65%",
            end: "top 55%",
            scrub: 0.3,
          },
        }
      );

      // Scroll up → cards drop down and disappear (reverse gravity)
      gsap.to(cardRef.current, {
        y: 300 + index * 30,
        opacity: 0,
        rotateX: 15,
        rotateZ: -wobble * 0.5,
        scale: 0.8,
        filter: "blur(3px)",
        ease: "power2.in",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "bottom 20%",
          end: "bottom -20%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [index, review.accent]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
      className="gsap-reveal-3d group relative bg-card rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 theme-transition"
      style={{
        border: "1px solid var(--bd)",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Raindrop ripple ring — appears on "landing" */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[6px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${review.accent.replace("0.5", "0.3")}, transparent 70%)`,
        }}
      />

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-opacity duration-300">
        <Quote className="w-8 h-8" style={{ color: review.accent.replace("0.5", "1") }} />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${review.accent.replace("0.5", "0.06")}, 0 0 20px ${review.accent.replace("0.5", "0.08")}` }}
      />

      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--review-text)" }}>
          &ldquo;{review.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${review.accent.replace("0.5", "0.9")}, ${review.accent.replace("0.5", "0.5")})`,
              boxShadow: `0 4px 12px ${review.accent.replace("0.5", "0.3")}`,
            }}
          >
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--heading-color)" }}>{review.name}</p>
            <p className="text-xs text-muted">{review.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60, rotateX: 15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            end: "top 50%",
            scrub: 0.6,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Split into 2 columns for layout
  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} id="reviews" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-3d" style={{ perspective: "800px" }}>
          <motion.span
            className="inline-block text-sm font-medium text-accent-cyan tracking-wider uppercase px-4 py-1.5 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            Testimonials
          </motion.span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "var(--heading-color)" }}>
            Loved by{" "}
            <TestimonialTypewriter />
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg">
            See what our customers say about NovaCloud infrastructure.
          </p>
        </div>

        {/* Cards grid — fall from above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            {col1.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-5 md:mt-8">
            {col2.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
