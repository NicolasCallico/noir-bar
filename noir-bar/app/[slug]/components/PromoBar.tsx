"use client";

import { useState, useEffect } from "react";
import type { Promotion } from "@/lib/types";

interface Props {
  promotions: Promotion[];
}

export function PromoBar({ promotions }: Props) {
  const [current, setCurrent] = useState(0);

  // Rotación automática si hay varias promos
  useEffect(() => {
    if (promotions.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  const promo = promotions[current];

  return (
    <div className="bg-gold px-5 py-2 text-center">
      <p className="text-bg text-xs font-medium tracking-widest uppercase">
        🥂 {promo.name} — {promo.description}{" "}
        <span className="opacity-70">· {promo.time_range}</span>
      </p>
    </div>
  );
}
