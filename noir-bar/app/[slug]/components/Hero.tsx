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
            style={{ width: 72, height: 72, minWidth: 72, boxShadow: "0 0 0 1px rgba(200,169,107,0.15)" }}
          >
            <img
              src={venue.logo_url}
              alt={venue.name}
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6, mixBlendMode: "screen" }}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h1 className={`font-serif text-[20px] sm:text-2xl font-light tracking-wide leading-tight truncate ${venue.theme === "light" ? "text-[#1C1814]" : "text-[#F5F5F5]"}`}>
            {venue.name}
          </h1>
          <p className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${venue.theme === "light" ? "text-[#6B5E4E]" : "text-[#666]"}`}>
            {venue.tagline}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${venue.theme === "light" ? "bg-[#8A6535]" : "bg-[#C8A96B]"}`} />
            <span className={`text-[9px] tracking-widest uppercase truncate ${venue.theme === "light" ? "text-[#6B5038]" : "text-[#C8A96B] opacity-70"}`}>
              {venue.address}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            onClick={() => setShowReserva(true)}
            className="bg-[#C8A96B] text-[#0D0D0D] font-bold rounded-full border-none cursor-pointer uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(200,169,107,0.35)] hover:scale-105 active:scale-95"
            style={{ fontSize: 9, padding: "8px 14px", whiteSpace: "nowrap", lineHeight: 1.4 }}
          >
            Reservar<br />mesa
          </button>
            {venue.whatsapp && (
            
           <a   href={`https://wa.me/${venue.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#25D366", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.523 5.845L.057 23.428a.5.5 0 0 0 .614.614l5.638-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.537-5.196-1.467l-.372-.22-3.852 1.009 1.013-3.798-.236-.384A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
          )}
          {venue.instagram && (
            
             <a href={`https://instagram.com/${venue.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          )}
        </div>

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
