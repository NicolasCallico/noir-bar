"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  venueId: string;
  venueName: string;
  birthdayPromoText?: string;
}

export function ReservaModal({ isOpen, onClose, venueId, venueName, birthdayPromoText }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    people: "2",
    date: "",
    time: "21:00",
    is_birthday: false,
    notes: "",
  });

  const times = [
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

async function handleSubmit() {
    if (!form.name || !form.phone || !form.date) {
      alert("Completá nombre, teléfono y fecha.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("reservations").insert([
        {
          venue_id: venueId,
          name: form.name,
          phone: form.phone,
          people: Number(form.people),
          date: form.date,
          time: form.time,
          is_birthday: form.is_birthday,
          notes: form.notes,
        },
      ]);

if (error) {
  console.error(error);
  return;
}

// Notificación push al admin
try {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/push-notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      venueId: venueId,
      title: "🍸 Nueva reserva",
      body: `${form.name} — ${form.people} personas el ${form.date} a las ${form.time}hs`,
      url: "/admin/reservations",
    }),
  });
} catch (e) {
  console.error("Error enviando push:", e);
}

      const mensaje =
        "🍸 *Nueva Reserva — " + venueName + "*\n\n" +
        "👤 *Nombre:* " + form.name + "\n" +
        "📱 *Teléfono:* " + form.phone + "\n" +
        "👥 *Personas:* " + form.people + "\n" +
        "📅 *Fecha:* " + form.date + "\n" +
        "🕐 *Horario:* " + form.time + " hs\n" +
        "🎂 *Cumpleaños:* " + (form.is_birthday ? "Sí 🎉" : "No") + "\n" +
        "📝 *Notas:* " + (form.notes || "Sin notas");

const whatsappUrl = "https://wa.me/5491130863536?text=" + encodeURIComponent(mensaje);
const link = document.createElement("a");
link.href = whatsappUrl;
link.target = "_blank";
link.rel = "noopener noreferrer";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => setSuccess(false), 300);
  }

  const inputClass =
    "w-full bg-[#111] border border-border rounded-md px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-muted focus:outline-none focus:border-gold-dim transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="bg-[#161616] border border-border rounded-t-2xl p-5 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle className="text-gold mb-4" size={48} />
                <h3 className="font-serif text-2xl mb-2">
                  ¡Reserva recibida!
                </h3>
                <p className="text-muted text-sm mb-6">
                  Te contactamos a la brevedad para confirmar tu reserva en{" "}
                  {venueName}.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-gold text-bg px-6 py-2.5 rounded text-sm font-medium"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl">Reservar mesa</h3>
                  <button
                    onClick={handleClose}
                    className="text-muted hover:text-[#F5F5F5]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      placeholder="Nombre"
                      value={form.name}
                      onChange={(e) =>
                        handleChange("name", e.target.value)
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Teléfono"
                      value={form.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      type="number"
                      value={form.people}
                      onChange={(e) =>
                        handleChange("people", e.target.value)
                      }
                    />

                    <input
                      className={inputClass}
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        handleChange("date", e.target.value)
                      }
                    />
                  </div>

                  <select
                    className={inputClass}
                    value={form.time}
                    onChange={(e) =>
                      handleChange("time", e.target.value)
                    }
                  >
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <div className="rounded-3xl border border-gold/20 bg-[#1c150b] p-4 text-sm text-[#f5f5f5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                    <p className="font-semibold text-gold mb-1">Promoción de cumple</p>
                    <p className="leading-6">
                      {birthdayPromoText ||
                        "Recordá que si vas a festejar tu cumpleaños, presentando el DNI tenés un "}
                      {birthdayPromoText ? null : (
                        <span className="font-semibold text-white">20% OFF</span>
                      )}
                    </p>
                  </div>

                  <textarea
                    className={inputClass}
                    placeholder="Notas"
                    value={form.notes}
                    onChange={(e) =>
                      handleChange("notes", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-5 bg-gold text-bg py-3 rounded text-sm font-medium flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Enviando..." : "Confirmar reserva"}
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}