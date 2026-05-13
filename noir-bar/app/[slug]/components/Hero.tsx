"use client";

import { useState } from "react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";

interface Props { venue: VenueSettings; }

export function Hero ({ venue } : Props) {
  const [showReserva, setShowReserva] = useState(false);
return (
<div className="px-5 pt-8 pb-6 border-b border-border">
      <h1 className="font-serif text-4xl text-[#F5F5F5]">{venue.name}</h1>
      <p className="text-xs text-muted mt-1">{venue.tagline}</p>
      <button onClick={() => setShowReserva(true)} className="mt-4 bg-gold text-bg text-xs px-4 py-2 rounded">Reservar mesa</button>
      <ReservaModal isOpen={showReserva} onClose={() => setShowReserva(false)} venueId={venue.id} venueName={venue.name} />
    </div>
  );
}

