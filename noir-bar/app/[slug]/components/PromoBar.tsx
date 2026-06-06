"use client";
import { useState, useEffect } from "react";
import type { Promotion } from "@/lib/types";
interface Props {
  promotions: Promotion[];
  isLight?: boolean;
}
export function PromoBar({ promotions, isLight }: Props) {
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
    <div style={{ borderBottom: `1px solid ${isLight ? "#E0D9CC" : "rgba(200,169,107,0.1)"}`, backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D" }} className="w-full px-4 py-2.5">
      <div className="mx-auto max-w-lg">
        <div style={{ backgroundColor: isLight ? "#EDE8DF" : "#1a1400", border: `1px solid ${isLight ? "#D5CCBC" : "rgba(200,169,107,0.2)"}` }} className="flex items-center justify-center gap-2 rounded-full px-4 py-2">
          <span className="text-sm">🥂</span>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span style={{ color: isLight ? "#8A6535" : undefined }} className="text-gold text-[11px] font-semibold uppercase tracking-widest">{promo.name}</span>
            <span style={{ color: isLight ? "#9E917E" : undefined }} className="text-gold/40 text-[10px]">—</span>
            <span className={`text-[11px] tracking-wide ${isLight ? "text-[#1C1814]" : "text-[#F5F5F5]"}`}>{promo.description}</span>
            <span style={{ color: isLight ? "#9E917E" : undefined }} className="text-gold/40 text-[10px]">·</span>
            <span style={{ color: isLight ? "#8A6535" : undefined }} className="text-gold/60 text-[10px] tracking-wide">{promo.time_range}</span>
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
