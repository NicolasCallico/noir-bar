"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Calendar } from "lucide-react";
import type { VenueSettings } from "@/lib/types";
import { ReservaModal } from "./ReservaModal";

interface Props {
  venue: VenueSettings;
}

export function Hero({ venue }: Props) {
  const [showReserva, setShowReserva] = useState(false);

  return (
    <>
      <section
        className="relative px-5 pt-8 pb-6 border-b border-border overflow-hidden"
        style={{
          background: venue.hero_image_url
            ? `linear-gradient(to bottom, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.95) 100%), url(${venue.hero_image_url}) center/cover no-repeat`
            : "linear-gradient(160deg, #111 0%, #0d0d0d 100%)",
        }}
      >
        {/* Badge localización */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-gold border border-gold-dim px-3 py-1 rounded-full mb-3">
            {venue.address}
          </span>
        </motion.div>

        {/* Nombre del local */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl font-light tracking-wide leading-tight text-[#F5F5F5]"
        >
          {venue.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs text-muted mt-1.5 mb-5 tracking-wide"
        >
          {venue.tagline}
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2"
        >
          <button
            onClick={() => setShowReserva(true)}
            className="flex items-center gap-2 bg-gold text-bg text-xs font-medium px-4 py-2.5 rounded tracking-wide hover:bg-gold/90 transition-colors active:scale-95"
          >
            <Calendar size={14} />
            Reservar mesa
          </button>

          <a
            href={`https://instagram.com/${venue.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-transparent text-[#F5F5F5] text-xs font-light px-4 py-2.5 rounded border border-border hover:border-gold-dim transition-colors active:scale-95"
          >
            <Instagram size={14} />
            Instagram
          </a>
        </motion.div>
      </section>

      {/* Modal de reserva */}
      <ReservaModal
        isOpen={showReserva}
        onClose={() => setShowReserva(false)}
        venueId={venue.id}
        venueName={venue.name}
      />
    </>
  );
}
