import { useState, useEffect } from "react";
import type { Block } from "@/data/site";
import { Reveal } from "./Reveal";
import { Calendar, Tag, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import campus from "@/assets/hero-campus.jpg";
import students from "@/assets/hero-students.jpg";
import service from "@/assets/hero-service.jpg";
import seminar from "@/assets/hero-seminar.jpg";

/* ─── image pool for section imagery ──────────────────────────────────────── */
const imgPool = [campus, students, seminar, service];

/* ─── shared inline style helpers ─────────────────────────────────────────── */
const bodyText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.85,
  color: "var(--ink-soft)",
};
const smallLabel: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
  color: "var(--gold-deep)",
};
const heading3: React.CSSProperties = {
  fontSize: "clamp(18px, 2vw, 22px)",
  fontWeight: 700,
  fontFamily: "'Playfair Display', Georgia, serif",
  lineHeight: 1.3,
};
const heading4: React.CSSProperties = {
  fontSize: "clamp(16px, 1.6vw, 20px)",
  fontWeight: 700,
  fontFamily: "'Playfair Display', Georgia, serif",
  lineHeight: 1.4,
};
const sectionHeadH2: React.CSSProperties = {
  fontSize: "clamp(24px, 3.5vw, 38px)",
  fontWeight: 700,
  fontFamily: "'Playfair Display', Georgia, serif",
  marginTop: "12px",
  lineHeight: 1.2,
};
const eyebrowStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.34em",
  textTransform: "uppercase" as const,
  fontWeight: 500,
  color: "var(--gold-deep)",
};
const tableText: React.CSSProperties = { fontSize: "15px" };
const tableHeadText: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

/* ─── Decorative corner SVG accent ────────────────────────────────────────── */
function GoldAccent({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      style={{
        position: "absolute",
        ...(flip ? { bottom: 0, right: 0, transform: "rotate(180deg)" } : { top: 0, left: 0 }),
        opacity: 0.12,
        pointerEvents: "none",
      }}
    >
      <line x1="0" y1="0" x2="120" y2="0" stroke="oklch(0.79 0.152 85.5)" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="0" y2="120" stroke="oklch(0.79 0.152 85.5)" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="100" y2="20" stroke="oklch(0.79 0.152 85.5)" strokeWidth="0.8" />
      <line x1="20" y1="20" x2="20" y2="100" stroke="oklch(0.79 0.152 85.5)" strokeWidth="0.8" />
    </svg>
  );
}

/* ─── Watermark background letters ────────────────────────────────────────── */
function WatermarkText({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-20px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(80px, 14vw, 200px)",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        color: "var(--gold)",
        opacity: 0.04,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        letterSpacing: "-0.05em",
        zIndex: 0,
      }}
    >
      {text}
    </div>
  );
}

/* ─── Side image panel ────────────────────────────────────────────────────── */
function SideImage({
  src,
  alt,
  imageLeft,
}: {
  src: string;
  alt: string;
  imageLeft: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        width: "clamp(280px, 38%, 480px)",
        alignSelf: "stretch",
        minHeight: "360px",
      }}
    >
      {/* Main image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 32px 80px -20px color-mix(in oklab, var(--ink) 35%, transparent)",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {/* Tinted overlay for brand cohesion */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: imageLeft
              ? "linear-gradient(to right, color-mix(in oklab, var(--ink) 18%, transparent), transparent)"
              : "linear-gradient(to left, color-mix(in oklab, var(--ink) 18%, transparent), transparent)",
          }}
        />
      </div>
      {/* Offset gold border accent */}
      <div
        style={{
          position: "absolute",
          ...(imageLeft
            ? { bottom: "-16px", right: "-16px" }
            : { bottom: "-16px", left: "-16px" }),
          width: "55%",
          height: "55%",
          border: "2px solid var(--gold)",
          borderRadius: "4px",
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      {/* Gold dot cluster */}
      <svg
        aria-hidden="true"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        style={{
          position: "absolute",
          ...(imageLeft ? { top: "-24px", left: "-24px" } : { top: "-24px", right: "-24px" }),
          opacity: 0.22,
        }}
      >
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 20 + 10}
              cy={row * 20 + 10}
              r="2.5"
              fill="oklch(0.79 0.152 85.5)"
            />
          ))
        )}
      </svg>
    </div>
  );
}

/* ─── GALLERY Component ─────────────────────────────────────────────────── */
function GallerySection({
  block,
  index,
  tinted,
}: {
  block: Extract<Block, { kind: "gallery" }>;
  index: number;
  tinted: boolean;
}) {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(block.items.map((i) => i.category).filter(Boolean))) as string[]];

  const filteredItems =
    selectedCat === "All"
      ? block.items
      : block.items.filter((i) => i.category === selectedCat);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <>
      <SectionHead title={block.title} index={index} />

      {block.subtitle ? (
        <Reveal>
          <p
            style={{
              ...bodyText,
              maxWidth: "54ch",
              marginTop: "-20px",
              marginBottom: "32px",
              fontSize: "15px",
            }}
          >
            {block.subtitle}
          </p>
        </Reveal>
      ) : null}

      {/* Category filter tabs */}
      {categories.length > 2 && (
        <Reveal className="mb-10">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {categories.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCat(cat);
                    setLightboxIndex(null);
                  }}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    border: active
                      ? "1px solid var(--gold)"
                      : "1px solid color-mix(in oklab, var(--ink) 14%, transparent)",
                    background: active
                      ? "var(--gradient-gold)"
                      : tinted
                        ? "rgba(255, 255, 255, 0.75)"
                        : "var(--cream)",
                    color: active ? "var(--ink)" : "var(--ink-soft)",
                    boxShadow: active
                      ? "0 6px 18px -4px color-mix(in oklab, var(--gold-deep) 45%, transparent)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      {/* Gallery Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredItems.map((item, idx) => (
          <Reveal key={idx} delay={idx * 45}>
            <div
              onClick={() => setLightboxIndex(idx)}
              className="group"
              style={{
                cursor: "pointer",
                borderRadius: "6px",
                overflow: "hidden",
                background: tinted ? "rgba(255, 255, 255, 0.85)" : "white",
                border: "1px solid var(--border)",
                boxShadow: "0 6px 24px -10px color-mix(in oklab, var(--ink) 12%, transparent)",
                transition: "all 0.35s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow = "0 14px 32px -10px color-mix(in oklab, var(--gold-deep) 30%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 6px 24px -10px color-mix(in oklab, var(--ink) 12%, transparent)";
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: "relative",
                  height: "220px",
                  overflow: "hidden",
                  background: "var(--ink)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.6s ease",
                  }}
                  className="group-hover:scale-108"
                />

                {/* Gradient shade */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--ink) 70%, transparent), transparent 60%)",
                  }}
                />

                {/* Category tag badge */}
                {item.category && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(10, 14, 23, 0.85)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--gold)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <Tag size={11} />
                    <span>{item.category}</span>
                  </div>
                )}

                {/* Hover overlay with zoom icon */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "color-mix(in oklab, var(--ink) 40%, transparent)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="group-hover:!opacity-100"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "var(--gradient-gold)",
                      color: "var(--ink)",
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      fontWeight: 700,
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      transform: "translateY(8px)",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:!translate-y-0"
                  >
                    <Eye size={15} />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>

              {/* Content body */}
              <div
                style={{
                  padding: "18px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Date indicator if provided */}
                {item.date && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--gold-deep)",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                )}

                <h3
                  style={{
                    ...heading4,
                    fontSize: "17px",
                    lineHeight: 1.35,
                    marginBottom: "8px",
                    color: "var(--ink)",
                  }}
                >
                  {item.title}
                </h3>

                {item.description && (
                  <p
                    style={{
                      ...bodyText,
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      color: "var(--ink-soft)",
                      marginTop: "auto",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(6, 9, 15, 0.94)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Top Bar: Title, Count, Close */}
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  background: "rgba(255,255,255,0.08)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                }}
              >
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              {filteredItems[lightboxIndex].category && (
                <span style={{ fontSize: "13px", color: "color-mix(in oklab, white 70%, transparent)" }}>
                  • {filteredItems[lightboxIndex].category}
                </span>
              )}
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close modal"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gradient-gold)";
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Main Stage: Prev, Image, Next */}
          <div
            style={{
              position: "relative",
              flex: 1,
              width: "100%",
              maxWidth: "1100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "16px 0",
              overflow: "hidden",
            }}
          >
            {/* Prev button */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                  );
                }}
                aria-label="Previous photo"
                style={{
                  position: "absolute",
                  left: "10px",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(10, 14, 23, 0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                  color: "var(--gold)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gradient-gold)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(10, 14, 23, 0.75)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Main Image */}
            <div
              style={{
                maxHeight: "68vh",
                maxWidth: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 25px 70px -15px rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                style={{
                  maxHeight: "68vh",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* Next button */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
                  );
                }}
                aria-label="Next photo"
                style={{
                  position: "absolute",
                  right: "10px",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(10, 14, 23, 0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                  color: "var(--gold)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gradient-gold)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(10, 14, 23, 0.75)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              padding: "14px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
              <h4
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                }}
              >
                {filteredItems[lightboxIndex].title}
              </h4>
              {filteredItems[lightboxIndex].date && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold)", fontSize: "13px", fontWeight: 600 }}>
                  <Calendar size={14} />
                  <span>{filteredItems[lightboxIndex].date}</span>
                </div>
              )}
            </div>
            {filteredItems[lightboxIndex].description && (
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  lineHeight: 1.5,
                  color: "color-mix(in oklab, white 78%, transparent)",
                }}
              >
                {filteredItems[lightboxIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Section header ──────────────────────────────────────────────────────── */
function SectionHead({ title, index }: { title?: string | undefined; index: number }) {
  if (!title) return null;
  return (
    <Reveal className="mb-12">
      <p style={eyebrowStyle}>{String(index + 1).padStart(2, "0")} — Section</p>
      <h2 style={sectionHeadH2}>{title}</h2>
      <div style={{ marginTop: "16px", height: "2px", width: "68px", background: "var(--gradient-gold)" }} />
    </Reveal>
  );
}

/* ─── Main BlockRenderer ──────────────────────────────────────────────────── */
export function BlockRenderer({
  block,
  index,
  variant,
}: {
  block: Block;
  index: number;
  variant: number;
}) {
  const tinted = index % 2 === 1;
  const imageLeft = index % 2 === 0;
  const sectionImg = imgPool[index % imgPool.length] ?? campus;
  const cardCols =
    variant % 3 === 0
      ? "md:grid-cols-3"
      : variant % 3 === 1
        ? "md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-4";

  /* Pick a short watermark word from block title */
  const watermarkWord =
    "title" in block && block.title
      ? block.title.split(" ")[0]?.toUpperCase() ?? ""
      : "";

  return (
    <section
      className="relative overflow-hidden py-20"
      style={tinted ? { background: "var(--cream)" } : undefined}
    >
      {/* Corner accents */}
      <GoldAccent />
      <GoldAccent flip />

      {/* Watermark */}
      <WatermarkText text={watermarkWord} />

      {/* Subtle dot grid background for tinted sections */}
      {tinted && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.35,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-6" style={{ position: "relative", zIndex: 1 }}>
        {/* ── PROSE with alternating side image ─────────────────────── */}
        {block.kind === "prose" && (
          <>
            <SectionHead title={block.title} index={index} />
            <div
              style={{
                display: "flex",
                gap: "clamp(32px, 5vw, 72px)",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: imageLeft ? "row" : "row-reverse",
              }}
            >
              {/* Side image */}
              <SideImage
                src={sectionImg}
                alt={block.title ?? "Section image"}
                imageLeft={imageLeft}
              />

              {/* Text content */}
              <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {block.body.map((p, i) => (
                    <Reveal key={i} delay={i * 90}>
                      <p style={bodyText}>{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── LIST ─────────────────────────────────────────────────── */}
        {block.kind === "list" && (
          <>
            <SectionHead title={block.title} index={index} />
            {/* Floating image overlay for visual depth */}
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-80px",
                  width: "260px",
                  height: "320px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  opacity: 0.08,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                <img
                  src={sectionImg}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <ul
                style={{
                  display: "grid",
                  gap: "14px",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {block.items.map((it, i) => (
                  <Reveal as="li" key={i} delay={i * 55}>
                    <div
                      style={{
                        display: "flex",
                        gap: "14px",
                        alignItems: "flex-start",
                        padding: "14px 16px",
                        background: tinted ? "rgba(255,255,255,0.7)" : "var(--cream)",
                        borderRadius: "4px",
                        border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span
                        style={{
                          marginTop: "8px",
                          height: "8px",
                          width: "8px",
                          flexShrink: 0,
                          transform: "rotate(45deg)",
                          background: "var(--gradient-gold)",
                          display: "inline-block",
                          borderRadius: "1px",
                        }}
                      />
                      <span style={{ ...bodyText, lineHeight: 1.7 }}>{it}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ── NUMBERED ─────────────────────────────────────────────── */}
        {block.kind === "numbered" && (
          <>
            <SectionHead title={block.title} index={index} />
            {/* Image strip behind numbered items */}
            <div style={{ position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${sectionImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.04,
                  borderRadius: "8px",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <ol
                style={{
                  display: "grid",
                  gap: "20px",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  position: "relative",
                  zIndex: 1,
                  padding: "8px 0",
                }}
              >
                {block.items.map((it, i) => (
                  <Reveal as="li" key={i} delay={i * 55}>
                    <div
                      style={{
                        display: "flex",
                        gap: "18px",
                        alignItems: "flex-start",
                        padding: "18px",
                        background: tinted ? "rgba(255,255,255,0.8)" : "white",
                        borderRadius: "4px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 4px 20px -8px color-mix(in oklab, var(--ink) 12%, transparent)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(28px, 3vw, 40px)",
                          fontWeight: 700,
                          fontFamily: "'Playfair Display', Georgia, serif",
                          lineHeight: 1,
                          flexShrink: 0,
                          color: "color-mix(in oklab, var(--gold) 85%, var(--ink))",
                          minWidth: "44px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ ...bodyText, paddingTop: "6px" }}>{it}</span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* ── CARDS ────────────────────────────────────────────────── */}
        {block.kind === "cards" && (
          <>
            <SectionHead title={block.title} index={index} />
            {/* Top accent image strip */}
            <div
              aria-hidden="true"
              style={{
                width: "100%",
                height: "6px",
                background: "var(--gradient-gold)",
                borderRadius: "3px",
                marginBottom: "32px",
                opacity: 0.7,
              }}
            />
            <div className={`grid gap-6 ${cardCols}`}>
              {block.items.map((c, i) => (
                <Reveal as="article" key={i} delay={i * 70} className="h-full">
                  <div
                    className="surface-card group h-full"
                    style={{
                      borderRadius: "4px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Card image top strip */}
                    <div
                      style={{
                        height: "140px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={imgPool[i % imgPool.length] ?? campus}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 40%",
                          transition: "transform 0.6s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, color-mix(in oklab, var(--ink) 55%, transparent), transparent 60%)",
                        }}
                      />
                      {/* Card number badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "14px",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Card text */}
                    <div style={{ padding: "20px 22px 22px" }}>
                      <div
                        style={{
                          height: "2px",
                          width: "40px",
                          background: "var(--gradient-gold)",
                          marginBottom: "12px",
                          transition: "width 0.5s ease",
                        }}
                        className="group-hover:w-full"
                      />
                      <h3 style={{ ...heading4, marginBottom: "10px" }}>{c.title}</h3>
                      <p style={{ ...bodyText, fontSize: "14px" }}>{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ── PLAN timeline ────────────────────────────────────────── */}
        {block.kind === "plan" && (
          <>
            <SectionHead title={block.title} index={index} />
            <div style={{ display: "flex", gap: "clamp(24px, 4vw, 60px)", flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* Left: timeline */}
              <div style={{ flex: "1 1 500px", position: "relative" }}>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "7px",
                    width: "1px",
                    background: "linear-gradient(to bottom, var(--gold), color-mix(in oklab, var(--gold) 20%, transparent))",
                  }}
                />
                <ul style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {block.items.map((p, i) => (
                    <Reveal as="li" key={i} delay={i * 50}>
                      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                        {/* Timeline dot */}
                        <div style={{ flexShrink: 0, position: "relative", marginTop: "4px" }}>
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "2px solid var(--gold)",
                              background: tinted ? "var(--cream)" : "white",
                              position: "relative",
                              zIndex: 1,
                            }}
                          />
                        </div>
                        {/* Content */}
                        <div
                          style={{
                            flex: 1,
                            padding: "16px 20px",
                            background: tinted ? "rgba(255,255,255,0.75)" : "var(--cream)",
                            borderRadius: "4px",
                            border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <span style={smallLabel}>{p.when}</span>
                          <h3 style={{ ...heading3, marginTop: "6px", marginBottom: "8px" }}>{p.label}</h3>
                          <p style={{ ...bodyText, fontSize: "14px" }}>{p.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Right: decorative stacked image */}
              <div
                style={{
                  flexShrink: 0,
                  width: "clamp(200px, 28%, 320px)",
                  position: "sticky",
                  top: "100px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px -20px color-mix(in oklab, var(--ink) 30%, transparent)",
                    height: "220px",
                  }}
                >
                  <img
                    src={campus}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    borderRadius: "4px",
                    overflow: "hidden",
                    height: "160px",
                    marginLeft: "20px",
                    boxShadow: "0 20px 60px -20px color-mix(in oklab, var(--ink) 25%, transparent)",
                  }}
                >
                  <img
                    src={students}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    padding: "16px",
                    background: "var(--ink)",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ ...smallLabel, color: "var(--gold)" }}>SVASC College</p>
                  <p style={{ color: "var(--gold-soft)", fontSize: "13px", marginTop: "6px", lineHeight: 1.6 }}>
                    Erode, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── MEMBERS table ────────────────────────────────────────── */}
        {block.kind === "members" && (
          <>
            <SectionHead title={block.title} index={index} />
            {/* Header image banner */}
            <div
              style={{
                position: "relative",
                height: "100px",
                borderRadius: "4px 4px 0 0",
                overflow: "hidden",
                marginBottom: "-1px",
              }}
            >
              <img
                src={service}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, color-mix(in oklab, var(--ink) 80%, transparent), color-mix(in oklab, var(--ink) 55%, transparent))",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 24px",
                }}
              >
                <div>
                  <p style={{ ...smallLabel, color: "var(--gold)" }}>Committee</p>
                  <p style={{ color: "white", fontSize: "20px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginTop: "4px" }}>
                    {block.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-sm border border-border bg-card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              <table style={{ width: "100%", minWidth: "640px", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--gradient-gold)", color: "var(--ink)" }}>
                    {["#", "Name", "Designation", "Contact"].map((h) => (
                      <th key={h} style={{ ...tableHeadText, padding: "14px 20px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.items.map((m, i) => (
                    <tr
                      key={i}
                      style={{ borderTop: "1px solid var(--border)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <td style={{ ...tableText, padding: "14px 20px", color: "var(--gold-deep)", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td style={{ ...tableText, padding: "14px 20px", fontWeight: 600 }}>
                        {m.name}
                        {m.extra ? (
                          <span style={{ display: "block", fontSize: "12px", color: "var(--ink-soft)", fontWeight: 400, marginTop: "2px" }}>{m.extra}</span>
                        ) : null}
                      </td>
                      <td style={{ ...tableText, padding: "14px 20px", color: "var(--ink-soft)" }}>{m.role}</td>
                      <td style={{ ...tableText, padding: "14px 20px", color: "var(--ink-soft)" }}>
                        {m.phone ? (
                          <a href={`tel:${m.phone}`} style={{ display: "block", color: "var(--ink-soft)" }}>{m.phone}</a>
                        ) : null}
                        {m.email ? (
                          <a href={`mailto:${m.email}`} style={{ display: "block", wordBreak: "break-all", color: "var(--gold-deep)", fontSize: "13px" }}>
                            {m.email}
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── GALLERY ──────────────────────────────────────────────── */}
        {block.kind === "gallery" && (
          <GallerySection block={block} index={index} tinted={tinted} />
        )}
      </div>
    </section>
  );
}
