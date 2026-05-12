"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  venueId: string;
  venueName: string;
}

export function ReservaModal({ isOpen, onClose, venueId, venueName }: Props) {
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

  const times = ["19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"];

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
      const { error } = await supabase.from("reservations").insert({
        venue_id: venueId,
        name: form.name,
        phone: form.phone,
        people: parseInt(form.people),
        date: form.date,
        time: form.time,
        is_birthday: form.is_birthday,
        notes: form.notes,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      alert("Hubo un error. Intentá de nuevo.");
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
              /* Pantalla de éxito */
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle className="text-gold mb-4" size={48} strokeWidth={1.5} />
                <h3 className="font-serif text-2xl mb-2">¡Reserva recibida!</h3>
                <p className="text-muted text-sm mb-6">
                  Te contactamos a la brevedad para confirmar tu reserva en {venueName}.
                </p>
                <button onClick={handleClose} className="bg-gold text-bg px-6 py-2.5 rounded text-sm font-medium">
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-xl">Reservar mesa</h3>
                  <button onClick={handleClose} className="text-muted hover:text-[#F5F5F5]">
                    <X size={20} />
                  </button>
                </div>

                {/* Formulario */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Nombre</label>
                      <input className={inputClass} placeholder="Tu nombre" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Teléfono</label>
                      <input className={inputClass} type="tel" placeholder="+54 11..." value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Personas</label>
                      <input className={inputClass} type="number" min="1" max="30" value={form.people} onChange={(e) => handleChange("people", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Fecha</label>
                      <input className={inputClass} type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Horario</label>
                    <select className={inputClass} value={form.time} onChange={(e) => handleChange("time", e.target.value)}>
                      {times.map((t) => <option key={t} value={t}>{t} hs</option>)}
                    </select>
                  </div>

                  {/* Toggle cumpleaños */}
                  <div className="flex items-center gap-3 py-1">
                    <button
                      onClick={() => handleChange("is_birthday", !form.is_birthday)}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.is_birthday ? "bg-gold/30" : "bg-[#333]"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${form.is_birthday ? "left-5 bg-gold" : "left-0.5 bg-[#666]"}`} />
                    </button>
                    <span className="text-sm text-muted">¿Es cumpleaños? 🎂</span>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted mb-1 block">Notas (opcional)</label>
                    <textarea className={inputClass} rows={2} placeholder="Algún pedido especial..." value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-5 bg-gold text-bg py-3 rounded text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
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
