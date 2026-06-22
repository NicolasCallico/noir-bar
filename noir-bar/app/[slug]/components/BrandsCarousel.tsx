"use client";
interface Sponsor {
  id: string;
  logo_url: string;
  name?: string;
}
interface Props {
  sponsors: Sponsor[];
  isLight?: boolean;
}
export function BrandsCarousel({ sponsors, isLight }: Props) {
  if (!sponsors || sponsors.length === 0) return null;

  const looped = [...sponsors, ...sponsors, ...sponsors];
  const duration = sponsors.length * 3;
  const bgColor = isLight ? "#FAF8F3" : "#0D0D0D";

  return (
    <div
      className="w-full py-5 relative"
      style={{
        backgroundColor: bgColor,
        borderTop: `1px solid ${isLight ? "#E0D9CC" : "#1a1a1a"}`,
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center gap-3"
        style={{
          width: "max-content",
          animation: `nox-marquee ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {looped.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              backgroundColor: "rgba(245,242,235,0.88)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              padding: 10,
            }}
          >
            <img
              src={sponsor.logo_url}
              alt={sponsor.name || "Sponsor"}
              className="object-contain"
              style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto" }}
            />
          </div>
        ))}
      </div>

      {/* Fades en los bordes para que el loop no se corte de golpe */}
      <div
        className="absolute top-0 left-0 h-full pointer-events-none"
        style={{ width: 36, background: `linear-gradient(to right, ${bgColor}, transparent)` }}
      />
      <div
        className="absolute top-0 right-0 h-full pointer-events-none"
        style={{ width: 36, background: `linear-gradient(to left, ${bgColor}, transparent)` }}
      />

      <style>{`
        @keyframes nox-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
