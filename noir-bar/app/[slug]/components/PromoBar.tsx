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
    }, 3000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  const promo = promotions[current];

  return (
    <div className="sticky top-0 z-40 w-full bg-[#121212]/95 backdrop-blur-md border-b border-gold/15 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)] sm:static sm:shadow-none">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1400] via-[#2a1f00] to-[#1a1400] px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div
          key={current}
          className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 rounded-full border border-gold/20 bg-black/20 px-4 py-2 text-center text-sm text-[#F5F5F5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] animate-promoFade"
        >
          <span className="text-base animate-pulse">🥂</span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-gold font-semibold uppercase tracking-[0.2em] text-[11px]">
              {promo.name}
            </span>
            <span className="text-gold/40 text-xs">—</span>
            <span className="text-[#F5F5F5] text-xs tracking-wide max-w-[22rem] leading-5">
              {promo.description}
            </span>
            <span className="text-gold/40 text-xs">·</span>
            <span className="text-gold/60 text-[11px] tracking-wider">
              {promo.time_range}
            </span>
          </div>

          <span className="text-base animate-pulse">🥂</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        {promotions.length > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {promotions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-gold w-3 h-3" : "bg-gold/30 w-2 h-2"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
