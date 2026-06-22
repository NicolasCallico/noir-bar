"use client";

interface Sponsor {
  id: string;
  logo_url: string;
  name?: string;
}

interface Props {
  sponsors: Sponsor[];
}

export function BrandsCarousel({ sponsors }: Props) {
  if (!sponsors || sponsors.length === 0) return null;

  // Duplicamos la lista para el efecto de loop infinito
  const looped = [...sponsors, ...sponsors];

  return (
    <div className="w-full bg-[#0D0D0D] border-t border-[#1a1a1a] py-4 overflow-hidden">
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
            className="flex-shrink-0 h-9 flex items-center justify-center bg-[#161616] border border-[#2a2a2a] rounded-lg px-3"
            style={{ minWidth: 64, maxWidth: 110 }}
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
