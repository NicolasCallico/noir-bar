"use client";
import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";
interface Props { venue: VenueSettings; }
export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);
  return (
    <div className="w-full border-b border-[#1a1a1a] bg-[#0D0D0D] px-4 py-3 sm:py-4">
      <div className="mx-auto flex items-center gap-3 max-w-3xl">
        {venue.logo_url && (
          <div className="flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden border border-gold/20 bg-[#111] shadow-[0_0_20px_rgba(200,169,107,0.08)]">
            <img
              src={venue.logo_url}
              alt={venue.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-lg sm:text-2xl font-light tracking-wide text-[#F5F5F5] leading-tight truncate">
            {venue.name}
          </h1>
          <p className="text-[11px] text-[#666] mt-0.5 leading-snug truncate">
            {venue.tagline}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            <span className="text-[10px] text-gold/60 tracking-widest uppercase truncate">
              {venue.address}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowReserva(true)}
          className="flex-shrink-0 relative overflow-hidden bg-gold text-[#0D0D0D] text-[10px] sm:text-[11px] font-bold rounded-full px-4 py-2.5 uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Reservar mesa</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4b87a] to-[#C8A96B] opacity-0 hover:opacity-100 transition-opacity" />
        </button>
      </div>
      <ReservaModal
        isOpen={showReserva}
        onClose={() => setShowReserva(false)}
        venueId={venue.id}
        venueName={venue.name}
        birthdayPromoText={venue.birthday_promo_text}
      />
    </div>
  );
}
