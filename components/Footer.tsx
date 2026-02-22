import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Community", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Status", href: "#" },
    { label: "API Reference", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "SLA", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="theme-transition"
      style={{ borderTop: "1px solid var(--bd)", background: "var(--footer-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              High-performance cloud infrastructure for modern applications.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-sm font-medium mb-4"
                style={{ color: "var(--heading-color)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--bd)" }}
        >
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} NovaCloud. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "GitHub", "Discord"].map((platform) => (
              <Link
                key={platform}
                href="#"
                className="text-xs text-muted hover:text-foreground transition-colors duration-200"
              >
                {platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
