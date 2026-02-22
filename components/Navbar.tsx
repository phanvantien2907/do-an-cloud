"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out"
      style={{ paddingTop: scrolled ? "6px" : "16px", paddingInline: scrolled ? "12px" : "16px" }}
    >
      <nav
        className={cn(
          "flex items-center justify-between gap-8 px-6 py-3 border transition-all duration-500 ease-in-out theme-transition",
          "backdrop-blur-xl",
          scrolled
            ? "rounded-2xl shadow-lg"
            : "rounded-full"
        )}
        style={{
          width: scrolled ? "min(1200px, 98vw)" : "min(900px, 95vw)",
          background: scrolled ? "var(--nav-bg-scroll)" : "var(--nav-bg)",
          borderColor: "var(--nav-border)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span
            className="font-semibold text-lg tracking-tight"
            style={{ color: "var(--heading-color)" }}
          >
            NovaCloud
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted cursor-pointer transition-all duration-300 hover:text-accent-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-accent-cyan/15 hover:text-accent-cyan hover:scale-110"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} className="text-muted" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} className="text-muted" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* CTA */}
          <Link
            href="#pricing"
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-accent-cyan/20 hover:scale-105 hover:brightness-110"
            style={{
              background: "var(--btn-primary-bg)",
              color: "var(--btn-primary-fg)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted cursor-pointer transition-all duration-300 hover:text-accent-cyan hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-foreground cursor-pointer transition-all duration-300 hover:text-accent-cyan hover:scale-110"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute mt-2 backdrop-blur-xl rounded-2xl p-6 md:hidden theme-transition",
              scrolled ? "top-full left-0 right-0 mx-4" : "top-full left-4 right-4"
            )}
            style={{
              background: "var(--nav-bg-scroll)",
              borderColor: "var(--nav-border)",
              border: "1px solid var(--nav-border)",
            }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted cursor-pointer transition-all duration-300 hover:text-accent-cyan text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-accent-cyan/20 hover:brightness-110"
                  style={{
                    background: "var(--btn-primary-bg)",
                    color: "var(--btn-primary-fg)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
