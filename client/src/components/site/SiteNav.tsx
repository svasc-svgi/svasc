import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, COLLEGE } from "@/data/site";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: solid ? "color-mix(in oklab, var(--onlight) 92%, transparent)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold"
            style={{ background: "var(--gradient-gold)", color: "var(--ink)" }}
          >
            SV
          </span>
          <span className="leading-none">
            <span
              className="block font-display text-lg font-bold"
              style={{ color: solid ? "var(--ink)" : "var(--onlight)" }}
            >
              {COLLEGE.short}
            </span>
            <span
              className="block text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: solid ? "var(--ink-soft)" : "var(--gold-soft)" }}
            >
              Arts &amp; Science
            </span>
          </span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-full p-2 transition-colors"
          style={{
            color: solid ? "var(--ink)" : "var(--onlight)",
            background: "color-mix(in oklab, var(--gold) 18%, transparent)",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500"
        style={{
          maxHeight: open ? "80vh" : 0,
          opacity: open ? 1 : 0,
          background: "var(--onlight)",
          borderTop: open ? "1px solid var(--border)" : "none",
        }}
      >
        <ul className="mx-auto grid max-w-7xl gap-1 px-5 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {navLinks.map((l, i) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-sm px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
                activeProps={{ style: { color: "var(--gold-deep)" } }}
              >
                <span>{l.label}</span>
                <span
                  className="text-[0.65rem] tabular-nums opacity-40"
                  style={{ color: "var(--gold-deep)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
