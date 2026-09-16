import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { pages } from "@/data/activitiesData";
import { Hero } from "./Hero";
import { BlockRenderer } from "./BlockRenderer";
import { Reveal } from "./Reveal";
import campus from "@/assets/hero-campus.jpg";
import students from "@/assets/hero-students.jpg";
import service from "@/assets/hero-service.jpg";
import seminar from "@/assets/hero-seminar.jpg";

const imgMap = { campus, students, service, seminar };

export function CellPage({ page }: { page: any }) {
  if (!page) return null;
  const allPages = Array.isArray(pages) ? pages : [];
  const idx = allPages.findIndex((p) => p.slug === page.slug);
  const next = allPages.length > 0 ? (allPages[(idx + 1) % allPages.length] ?? page) : page;
  const pageImg =
    page.customImage ||
    (typeof page.image === "string" && (page.image.startsWith("/") || page.image.startsWith("http"))
      ? page.image
      : imgMap[page.image as keyof typeof imgMap] || students);
  const nextImg =
    next?.customImage ||
    (typeof next?.image === "string" && (next.image.startsWith("/") || next.image.startsWith("http"))
      ? next.image
      : imgMap[next?.image as keyof typeof imgMap] || campus);


  return (
    <div style={{ fontSize: "16px", fontFamily: "'Jost', system-ui, sans-serif" }}>
      <main>
        <Hero
          title={page.hero}
          subtitle={page.intro}
          image={pageImg}
          eyebrow={`SVASC · ${page.nav}`}
        />

        {/* ── Marquee motto band ────────────────────────────────── */}
        {page.motto ? (
          <div className="overflow-hidden border-y border-border py-5" style={{ background: "var(--ink)" }}>
            <div className="marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "0 32px",
                        fontSize: "17px",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        whiteSpace: "nowrap",
                        fontStyle: "italic",
                        color: "var(--gold)",
                      }}
                    >
                      {page.motto}{" "}
                      <img src="/SVCAS-Logo.png" alt="SVASC Logo" style={{ height: "18px", display: "inline-block", verticalAlign: "middle", margin: "0 10px" }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── Page title intro section with side image ──────────── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "80px 0",
            background: "var(--ink)",
          }}
        >
          {/* Large faint bg watermark */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${pageImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.07,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          {/* Gold diagonal accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "100%",
              background: "linear-gradient(135deg, transparent 60%, color-mix(in oklab, var(--gold) 8%, transparent))",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div
            className="mx-auto max-w-6xl px-6"
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              gap: "clamp(32px, 5vw, 64px)",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Text */}
            <div style={{ flex: "1 1 360px" }}>
              <Reveal>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "var(--gold)",
                    marginBottom: "16px",
                  }}
                >
                  {page.nav}
                </p>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4.5vw, 54px)",
                    lineHeight: 1.1,
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "white",
                    maxWidth: "22ch",
                  }}
                >
                  {page.title}
                </h2>
                <div
                  style={{
                    marginTop: "20px",
                    height: "3px",
                    width: "80px",
                    background: "var(--gradient-gold)",
                    borderRadius: "2px",
                  }}
                />
                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "color-mix(in oklab, white 72%, transparent)",
                    maxWidth: "48ch",
                  }}
                >
                  {page.intro}
                </p>
              </Reveal>
            </div>

            {/* Side image — overlapping frame effect */}
            <Reveal style={{ flexShrink: 0 }}>
              <div style={{ position: "relative", width: "clamp(240px, 36%, 420px)" }}>
                <div
                  style={{
                    borderRadius: "4px",
                    overflow: "hidden",
                    height: "300px",
                    boxShadow: "0 40px 100px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  <img
                    src={pageImg}
                    alt={page.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                {/* Gold frame offset */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-14px",
                    right: "-14px",
                    width: "60%",
                    height: "60%",
                    border: "2px solid var(--gold)",
                    borderRadius: "4px",
                    opacity: 0.5,
                    zIndex: -1,
                  }}
                />
                {/* Gold stat badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "-16px",
                    background: "var(--gradient-gold)",
                    padding: "12px 18px",
                    borderRadius: "4px",
                    boxShadow: "0 12px 30px -8px color-mix(in oklab, var(--gold-deep) 60%, transparent)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    SVASC
                  </p>
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "var(--ink)",
                      lineHeight: 1.1,
                    }}
                  >
                    {page.nav}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Content blocks ────────────────────────────────────── */}
        {(page.blocks || []).map((b, i) => (
          <BlockRenderer key={i} block={b} index={i} variant={idx} />
        ))}


        {/* ── Next page CTA ─────────────────────────────────────── */}
        <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
          {/* Transparent BG image */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${nextImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.05,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div className="mx-auto max-w-6xl px-6" style={{ position: "relative", zIndex: 1 }}>
            <Reveal>
              <Link
                to={next.slug}
                className="group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  padding: "clamp(28px, 4vw, 48px)",
                  background: "var(--cream)",
                  textDecoration: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Hover gold shimmer */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, transparent 60%, color-mix(in oklab, var(--gold) 6%, transparent))",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <span>
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.34em",
                        textTransform: "uppercase",
                        color: "var(--gold-deep)",
                        fontWeight: 500,
                      }}
                    >
                      Explore Next
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: "8px",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(22px, 3vw, 34px)",
                        fontWeight: 700,
                        color: "var(--ink)",
                        lineHeight: 1.2,
                      }}
                    >
                      {next.title}
                    </span>
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "var(--gradient-gold)",
                      flexShrink: 0,
                      boxShadow: "0 8px 24px -6px color-mix(in oklab, var(--gold-deep) 55%, transparent)",
                    }}
                  >
                    <ArrowRight
                      size={22}
                      style={{ color: "var(--ink)", transition: "transform 0.4s ease" }}
                      className="group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
