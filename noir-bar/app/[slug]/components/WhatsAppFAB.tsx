"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  phone: string;
  instagram?: string;
  message?: string;
}

export function WhatsAppFAB({ phone, instagram, message = "Hola, quiero reservar una mesa 🍸" }: Props) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const instagramUrl = `https://instagram.com/${instagram}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">

      {/* Opciones desplegables */}
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-[#F5F5F5] bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-[#2a2a2a] whitespace-nowrap">
                WhatsApp
              </span>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#25D366",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                flexShrink: 0,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.116 1.523 5.845L.057 23.428a.5.5 0 0 0 .614.614l5.638-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.537-5.196-1.467l-.372-.22-3.852 1.009 1.013-3.798-.236-.384A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
            </motion.a>

            {/* Instagram */}
            {instagram && (
              <motion.a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs text-[#F5F5F5] bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-[#2a2a2a] whitespace-nowrap">
                  Instagram
                </span>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  boxShadow: "0 4px 20px rgba(214,36,159,0.35)",
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </div>
              </motion.a>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Botón principal Contacto */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", damping: 15 }}
        whileTap={{ scale: 0.92 }}
        style={{
          height: 46,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: open ? "#1a1a1a" : "#C8A96B",
          border: open ? "1px solid #2a2a2a" : "none",
          boxShadow: open ? "none" : "0 4px 20px rgba(200,169,107,0.35)",
          cursor: "pointer",
          padding: "0 20px",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 18, lineHeight: 1, color: open ? "#C8A96B" : "#0D0D0D" }}
        >
          ✦
        </motion.span>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: open ? "#C8A96B" : "#0D0D0D",
        }}>
          {open ? "Cerrar" : "Contacto"}
        </span>
      </motion.button>

    </div>
  );
}
