import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { COLLEGE, pages } from "@/data/activitiesData";


export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden" style={{ background: "var(--ink)" }}>
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h3 className="font-display text-2xl font-bold" style={{ color: "var(--gold)" }}>
            {COLLEGE.name}
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "oklch(0.82 0.01 80)" }}>
            A NAAC-accredited institution in {COLLEGE.place}, known for industry-aligned programmes,
            active student cells and a student-centric approach.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: "var(--gold-soft)" }}>
            Cells &amp; Clubs
          </p>
          <ul className="space-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  to={p.slug}
                  className="transition-colors"
                  style={{ color: "oklch(0.8 0.01 80)" }}
                >
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: "var(--gold-soft)" }}>
            Reach Us
          </p>
          <ul className="space-y-3 text-sm" style={{ color: "oklch(0.82 0.01 80)" }}>
            <li className="flex items-center gap-3">
              <MapPin size={16} style={{ color: "var(--gold)" }} /> {COLLEGE.place}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} style={{ color: "var(--gold)" }} /> {COLLEGE.email}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} style={{ color: "var(--gold)" }} /> {COLLEGE.phone}
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border-t px-6 py-6 text-center text-xs uppercase tracking-[0.25em]"
        style={{ borderColor: "oklch(1 0 0 / 12%)", color: "oklch(0.7 0.01 80)" }}
      >
        © {new Date().getFullYear()} {COLLEGE.short} · All Rights Reserved
      </div>
    </footer>
  );
}
