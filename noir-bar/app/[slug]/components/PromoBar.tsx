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
    <div className="w-full px-4 py-2.5 border-b border-gold/10 bg-[#0D0D0D]">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-center gap-2 bg-[#1a1400] border border-gold/20 rounded-full px-4 py-2">
          <span className="text-sm">🥂</span>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-gold text-[11px] font-semibold uppercase tracking-widest">{promo.name}</span>
            <span className="text-gold/40 text-[10px]">—</span>
            <span className="text-[#F5F5F5] text-[11px] tracking-wide">{promo.description}</span>
            <span className="text-gold/40 text-[10px]">·</span>
            <span className="text-gold/60 text-[10px] tracking-wide">{promo.time_range}</span>
          </div>
          <span className="text-sm">🥂</span>
        </div>
        {promotions.length > 1 && (
          <div className="flex justify-center gap-1 mt-1.5">
            {promotions.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-gold w-3 h-1.5" : "bg-gold/30 w-1.5 h-1.5"}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
