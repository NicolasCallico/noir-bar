"use client";

import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";

interface Props { venue: VenueSettings; }

export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-3xl px-5 pt-10 pb-8 border-b border-border overflow-hidden">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-gold/20 bg-[#111]/95 p-5 shadow-[0_30px_80px_-56px_rgba(0,0,0,0.9)] sm:p-8 md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-8">
        {venue.logo_url ? (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-gold/40 bg-[#0f0f0f] p-3 shadow-[inset_0_0_0_1px_rgba(200,169,107,0.12)] md:mx-0 md:h-28 md:w-28">
            <img
              src={venue.logo_url}
              alt={`${venue.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}

        <div className="flex flex-col justify-between gap-5 text-center md:text-left">
          <div className="space-y-4">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold/80 shadow-sm shadow-black/20 md:mx-0">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span>{venue.address}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-[0.04em] text-[#F5F5F5] leading-tight">
                {venue.name}
              </h1>
              <div className="mx-auto h-[1px] w-16 bg-gold/40 md:mx-0" />
              <p className="mx-auto max-w-xl text-sm leading-7 text-[#d8d8d8] sm:text-base md:mx-0">
                {venue.tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setShowReserva(true)}
              className="bg-gold text-bg text-sm font-semibold rounded-full px-5 py-2.5 uppercase tracking-[0.18em] transition hover:bg-gold/90"
            >
              Reservar mesa
            </button>
            <a
              href={`https://instagram.com/${venue.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white/5 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-[#F5F5F5] transition hover:border-gold/40 hover:bg-white/5"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <ReservaModal
        isOpen={showReserva}
        onClose={() => setShowReserva(false)}
        venueId={venue.id}
        venueName={venue.name}
      />
    </div>
  );
}
      