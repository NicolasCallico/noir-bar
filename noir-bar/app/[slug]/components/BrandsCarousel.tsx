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
  const looped = [...sponsors, ...sponsors];
  return (
    <div
      className="w-full py-5 overflow-hidden"
      style={{
        backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D",
        borderTop: `1px solid ${isLight ? "#E0D9CC" : "#1a1a1a"}`,
      }}
    >
      <div
        className="flex items-center gap-3"
        style={{
          width: "max-content",
          animation: `nox-marquee ${sponsors.length * 2.5}s linear infinite`,
        }}
      >
        {looped.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
      <style>{`
        @keyframes nox-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
