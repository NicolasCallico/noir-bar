"use client";

import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";

interface Props { venue: VenueSettings; }

export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);
    return (
    <div className="relative px-5 pt-10 pb-8 border-b border-border overflow-hidden">
      <div className="inline-flex items-center gap-1.5 border border-gold/30 rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold/80">{venue.address}</span>
        </div>
        <h1 className="font-serif text-5xl font-light tracking-wider text-[#F5F5F5] leading-none mb-2">
          {venue.name}
        </h1>
        <div className="w-12 h-[1px] bg-gold/50 mb-3" />
        <p className="text-xs text-muted tracking-widest uppercase mb-6">{venue.tagline}</p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowReserva(true)}
            className="bg-gold text-bg text-xs font-semibold px-5 py-2.5 rounded-full tracking-widest uppercase hover:bg-gold/90 transition-all"
            >
            Reservar mesa
          </button>

        <a href={`https://instagram.com/${venue.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F5F5F5] text-xs px-5 py-2.5 rounded-full border border-border tracking-widest uppercase hover:border-gold/40 transition-all"
          >
          Instagram
        </a>
      </div>
      <ReservaModal isOpen={showReserva} onClose={() => setShowReserva(false)} venueId={venue.id} venueName={venue.name} />
    </div>
  );
}
      