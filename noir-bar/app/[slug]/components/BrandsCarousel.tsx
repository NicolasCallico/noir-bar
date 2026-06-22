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
        className="flex items-center gap-5"
        style={{
          width: "max-content",
          animation: `nox-marquee ${sponsors.length * 2.5}s linear infinite`,
        }}
      >
        {looped.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}-${idx}`}
            className="flex-shrink-0 h-14 flex items-center justify-center"
            style={{ minWidth: 80, maxWidth: 140 }}
          >
            <img
              src={sponsor.logo_url}
              alt={sponsor.name || "Sponsor"}
              className="object-contain max-h-12"
              style={{ maxWidth: 120 }}
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
