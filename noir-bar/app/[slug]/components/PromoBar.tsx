"use client";

import { useState, useEffect } from "react";
import type { Promotion } from "@/lib/types";

interface Props {
  promotions: Promotion[];
}

export function PromoBar({ promotions }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (promotions.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  const promo = promotions[current];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1400] via-[#2a1f00] to-[#1a1400] border-b border-gold/20 px-5 py-3">
      {/* Línea dorada superior */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="flex items-center justify-center gap-3">
        {/* Ícono animado */}
        <span className="text-base animate-pulse">🥂</span>

        {/* Contenido */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-gold font-semibold text-xs tracking-[0.15em] uppercase">
            {promo.name}
          </span>
          <span className="text-gold/40 text-xs">—</span>
          <span className="text-[#F5F5F5] text-xs tracking-wide">
            {promo.description}
          </span>
          <span className="hidden sm:inline text-gold/40 text-xs">·</span>
          <span className="text-gold/60 text-[11px] tracking-wider">
            {promo.time_range}
          </span>
        </div>

        <span className="text-base animate-pulse">🥂</span>
      </div>

      {/* Línea dorada inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Indicadores si hay varias promos */}
      {promotions.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {promotions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1 h-1 rounded-full transition-all ${i === current ? "bg-gold w-3" : "bg-gold/30"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
