import { useEffect, useState } from "react";
import campus from "@/assets/hero-campus.jpg";
import students from "@/assets/hero-students.jpg";
import service from "@/assets/hero-service.jpg";
import seminar from "@/assets/hero-seminar.jpg";

const images = { campus, students, service, seminar } as const;

export type HeroImage = keyof typeof images;

export function Hero({
  title,
  subtitle,
  image = "campus",
  eyebrow,
  priority = false,
}: {
  title: string;
  subtitle: string;
  image?: HeroImage | string;
  eyebrow?: string;
  priority?: boolean;
}) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(title.slice(0, i));
      if (i >= title.length) window.clearInterval(id);
    }, 65);
    return () => window.clearInterval(id);
  }, [title]);

  const imgSrc =
    typeof image === "string" && (image.startsWith("/") || image.startsWith("http"))
      ? image
      : images[image as HeroImage] ?? images.campus;

  return (
    <header className="relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden">
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        {...(priority ? {} : { loading: "lazy" as const })}
        className="kenburns absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--ink) 78%, transparent), color-mix(in oklab, var(--ink) 62%, transparent) 45%, color-mix(in oklab, var(--ink) 85%, transparent))",
        }}
      />
      <div className="mx-auto w-full max-w-4xl px-6 py-28 text-center">
        {eyebrow ? (
          <p
            style={{ fontSize: "11px", letterSpacing: "0.42em", textTransform: "uppercase", fontWeight: 500, marginBottom: "24px", color: "var(--gold-soft)" }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 style={{ display: "flex", alignItems: "stretch", justifyContent: "center", fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.1, fontWeight: 700 }}>
          <span
            style={{
              color: "var(--gold)",
              textShadow: "0 18px 40px color-mix(in oklab, var(--ink) 55%, transparent)",
            }}
          >
            {typed || "\u00a0"}
          </span>
          <span className="caret" aria-hidden="true" />
        </h1>
        <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.9, fontSize: "clamp(12px, 1.2vw, 15px)", color: "color-mix(in oklab, var(--onlight) 92%, transparent)", marginTop: "28px", maxWidth: "48rem", margin: "28px auto 0" }}>{subtitle}</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      />
    </header>
  );
}
