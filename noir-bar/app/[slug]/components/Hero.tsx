"use client";
import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";
interface Props { venue: VenueSettings; }
export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);
  return (
    <div className="w-full border-b border-border bg-[#0D0D0D] px-5 py-4">
      <div className="mx-auto flex items-center gap-4 max-w-3xl">
        {venue.logo_url && (
          <img src={venue.logo_url} alt={venue.name} className="h-14 w-14 rounded-xl object-contain flex-shrink-0 border border-gold/20 bg-[#111] p-1.5" />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-xl font-light tracking-wide text-[#F5F5F5] leading-tight">{venue.name}</h1>
          <p className="text-[11px] text-muted mt-0.5 leading-snug">{venue.tagline}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            <span className="text-[10px] text-gold/70 tracking-wide uppercase">{venue.address}</span>
          </div>
        </div>
        <button onClick={() => setShowReserva(true)} className="flex-shrink-0 bg-gold text-bg text-[10px] font-semibold rounded-full px-4 py-2 uppercase tracking-widest hover:bg-gold/90 transition-all">
          Reservar
        </button>
      </div>
      <ReservaModal isOpen={showReserva} onClose={() => setShowReserva(false)} venueId={venue.id} venueName={venue.name} birthdayPromoText={venue.birthday_promo_text} />
    </div>
  );
}
