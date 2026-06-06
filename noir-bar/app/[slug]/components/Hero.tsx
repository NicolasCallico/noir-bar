"use client";
import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";

interface Props { venue: VenueSettings; }

export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${venue.theme === "light" ? "#E0D9CC" : "#1a1a1a"}`, backgroundColor: venue.theme === "light" ? "#FAF8F3" : "#0D0D0D" }} className="w-full px-4 py-3.5">
      <div className="mx-auto flex items-center gap-3 max-w-3xl">

        {venue.logo_url && (
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-2xl overflow-hidden"
            style={{
              width: 72,
              height: 72,
              minWidth: 72,
              boxShadow: "0 0 0 1px rgba(200,169,107,0.15)",
            }}
          >
            <img
              src={venue.logo_url}
              alt={venue.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 6,
                mixBlendMode: "screen",
              }}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h1 className={`font-serif text-[20px] sm:text-2xl font-light tracking-wide leading-tight truncate ${venue.theme === "light" ? "text-[#1C1814]" : "text-[#F5F5F5]"}`}>
            {venue.name}
          </h1>
          <p className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${venue.theme === "light" ? "text-[#9E917E]" : "text-[#666]"}`}>
            {venue.tagline}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${venue.theme === "light" ? "bg-[#8A6535]" : "bg-[#C8A96B]"}`} />
            <span className={`text-[9px] tracking-widest uppercase opacity-70 truncate ${venue.theme === "light" ? "text-[#8A6535]" : "text-[#C8A96B]"}`}>
              {venue.address}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowReserva(true)}
          className="flex-shrink-0 bg-[#C8A96B] text-[#0D0D0D] font-bold rounded-full border-none cursor-pointer uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(200,169,107,0.35)] hover:scale-105 active:scale-95"
          style={{ fontSize: 9, padding: "8px 14px", whiteSpace: "nowrap", lineHeight: 1.4 }}
        >
          Reservar<br />mesa
        </button>

      </div>
<ReservaModal
  isOpen={showReserva}
  onClose={() => setShowReserva(false)}
  venueId={venue.id}
  venueName={venue.name}
  birthdayPromoText={venue.birthday_promo_text}
  reservationTimeOpen={venue.reservation_time_open}
  reservationTimeClose={venue.reservation_time_close}
/>
    </div>
  );
}
