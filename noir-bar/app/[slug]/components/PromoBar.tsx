"use client";
import { useEffect, useRef } from "react";
import type { Promotion } from "@/lib/types";

interface Props {
  promotions: Promotion[];
  isLight?: boolean;
}

export function PromoBar({ promotions, isLight }: Props) {
  if (!promotions.length) return null;

  const items = [...promotions, ...promotions];

  return (
    <div
      style={{
        borderTop: `1px solid ${isLight ? "#E0D9CC" : "rgba(200,169,107,0.3)"}`,
        borderBottom: `1px solid ${isLight ? "#E0D9CC" : "rgba(200,169,107,0.3)"}`,
        backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D",
        overflow: "hidden",
      }}
      className="w-full py-2"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          whiteSpace: "nowrap",
          animation: "nox-marquee 18s linear infinite",
        }}
      >
        {items.map((p, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: isLight ? "rgba(138,101,53,0.4)" : "rgba(200,169,107,0.4)", fontSize: "10px" }}>
              ✦
            </span>
            <span
              style={{
                color: isLight ? "#8A6535" : "#C8A96B",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {p.name}
            </span>
            <span
              style={{
                color: isLight ? "#1C1814" : "#F5F5F5",
                fontSize: "11px",
                letterSpacing: "0.06em",
              }}
            >
              {p.description}
              {p.time_range ? ` · ${p.time_range}` : ""}
            </span>
          </span>
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
