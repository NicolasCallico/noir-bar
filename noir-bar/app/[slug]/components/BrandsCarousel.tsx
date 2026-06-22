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

  // Duplicamos la lista para el efecto de loop infinito
  const looped = [...sponsors, ...sponsors];

  return (
    <div
      className="w-full py-4 overflow-hidden"
      style={{
        backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D",
        borderTop: `1px solid ${isLight ? "#E0D9CC" : "#1a1a1a"}`,
      }}
    >
      <div
        className="flex items-center gap-6"
        style={{
          width: "max-content",
          animation: `nox-marquee ${sponsors.length * 4}s linear infinite`,
        }}
      >
        {looped.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}-${idx}`}
            className="flex-shrink-0 h-9 flex items-center justify-center rounded-lg px-3"
            style={{
              minWidth: 64,
              maxWidth: 110,
              backgroundColor: isLight ? "#fff" : "#161616",
              border: `1px solid ${isLight ? "#E0D9CC" : "#2a2a2a"}`,
            }}
          >
            <img
              src={sponsor.logo_url}
              alt={sponsor.name || "Sponsor"}
              className="object-contain max-h-6"
              style={{ maxWidth: 80 }}
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
