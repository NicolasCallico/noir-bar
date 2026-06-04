"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle, Phone, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";

const statusConfig = {
  new: { label: "Pendiente", class: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20" },
  confirmed: { label: "Confirmada", class: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" },
  cancelled: { label: "Cancelada", class: "text-red-400 bg-red-400/10 border border-red-400/20" },
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "confirmed" | "cancelled">("all");

  useEffect(() => { fetchReservations(); }, []);

  async function fetchReservations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setReservations(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Reservation["status"]) {
    const { error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  }

  async function deleteReservation(id: string) {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", id);
    if (!error) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    }
  }

  function formatWhatsappPhone(phone: string) {
    let digits = phone.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (digits.startsWith("54")) return digits;
    if (digits.startsWith("0")) digits = digits.slice(1);
    return `54${digits}`;
  }

  const filtered = filter === "all"
    ? reservations
    : reservations.filter((r) => r.status === filter);

  const counts = {
    all: reservations.length,
    new: reservations.filter((r) => r.status === "new").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div className="px-4 md:px-8 pt-5 pb-24 max-w-5xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl text-[#F5F5F5]">Reservas</h2>
          <p className="text-xs text-[#888] mt-0.5">Gestioná todas las reservas del local</p>
        </div>
        <button
          onClick={fetchReservations}
          className="text-[#888] border border-[#2A2A2A] px-3 py-2 rounded-lg text-xs hover:border-[#C8A96B] hover:text-[#F5F5F5] transition-colors"
        >
          Actualizar
        </button>
      </div>

{/* Filtros */}
      <div className="flex gap-1.5 mb-4 pb-1">
        {([
          { key: "all", label: "Todas" },
          { key: "new", label: "Pendientes" },
          { key: "confirmed", label: "Confirmadas" },
          { key: "cancelled", label: "Canceladas" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 text-[10px] px-1.5 py-1.5 rounded-full border transition-colors flex items-center justify-center gap-1 ${
              filter === key
                ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B] font-medium"
                : "border-[#2A2A2A] text-[#888]"
            }`}
          >
            {label}
            <span className={`text-[9px] px-1 py-0.5 rounded-full ${filter === key ? "bg-[#0D0D0D]/20" : "bg-[#2A2A2A]"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#888]" size={24} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#888]">
          <p className="text-3xl mb-2">📅</p>
          <p className="text-sm">No hay reservas en esta categoría</p>
        </div>
      ) : (
        <>
          {/* DESKTOP: tabla */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#555] text-[11px] uppercase tracking-wider border-b border-[#2A2A2A]">
                  <th className="text-left pb-3 font-medium">Nombre</th>
                  <th className="text-left pb-3 font-medium">Fecha y hora</th>
                  <th className="text-left pb-3 font-medium">Personas</th>
                  <th className="text-left pb-3 font-medium">Contacto</th>
                  <th className="text-left pb-3 font-medium">Estado</th>
                  <th className="text-left pb-3 font-medium">Notas</th>
                  <th className="text-right pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-3 pr-4">
                      <span className="text-[#F5F5F5] font-medium">{r.name} {r.is_birthday ? "🎂" : ""}</span>
                      <p className="text-[10px] text-[#555] mt-0.5">
                        {new Date(r.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-[#888]">{r.date} · {r.time}hs</td>
                    <td className="py-3 pr-4 text-[#888]">{r.people}</td>
                    <td className="py-3 pr-4">
                      <a href={`tel:${r.phone}`} className="text-[#C8A96B] hover:underline flex items-center gap-1">
                        <Phone size={10} /> {r.phone}
                      </a>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded-full font-medium border ${statusConfig[r.status]?.class}`}>
                        {statusConfig[r.status]?.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-[#555] text-xs italic max-w-[150px] truncate">
                      {r.notes || "—"}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {r.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(r.id, "confirmed")}
                            title="Confirmar"
                            className="p-1.5 text-emerald-400 border border-emerald-400/20 rounded-lg hover:bg-emerald-400/10 transition-colors"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                        {r.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(r.id, "cancelled")}
                            title="Cancelar"
                            className="p-1.5 text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors"
                          >
                            <XCircle size={13} />
                          </button>
                        )}
                        {r.status === "cancelled" && (
                          <button
                            onClick={() => deleteReservation(r.id)}
                            title="Borrar"
                            className="p-1.5 text-[#555] border border-[#2A2A2A] rounded-lg hover:text-red-400 hover:border-red-400/20 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                        <a
                          href={`https://wa.me/${formatWhatsappPhone(r.phone)}?text=${encodeURIComponent(`Hola ${r.name}, confirmamos tu reserva para el ${r.date} a las ${r.time} hs para ${r.people} personas. ¡Te esperamos!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          className="p-1.5 text-[#25D366] border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/10 transition-colors text-xs"
                        >
                          💬
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE: cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {filtered.map((r) => (
              <div key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm font-medium text-[#F5F5F5]">{r.name} {r.is_birthday ? "🎂" : ""}</span>
                    <p className="text-[10px] text-[#666] mt-0.5">
                      Recibida {new Date(r.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium ${statusConfig[r.status]?.class}`}>
                    {statusConfig[r.status]?.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#111] rounded-lg px-3 py-2">
                    <p className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Fecha y hora</p>
                    <p className="text-xs text-[#F5F5F5] font-medium">📅 {r.date} · {r.time} hs</p>
                  </div>
                  <div className="bg-[#111] rounded-lg px-3 py-2">
                    <p className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Personas</p>
                    <p className="text-xs text-[#F5F5F5] font-medium">👥 {r.people} personas</p>
                  </div>
                </div>
                <div className="bg-[#111] rounded-lg px-3 py-2 mb-3">
                  <p className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Contacto</p>
                  <a href={`tel:${r.phone}`} className="text-xs text-[#C8A96B] font-medium flex items-center gap-1.5">
                    <Phone size={10} /> {r.phone}
                  </a>
                </div>
                {r.notes && (
                  <div className="bg-[#111] rounded-lg px-3 py-2 mb-3">
                    <p className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Notas</p>
                    <p className="text-xs text-[#888] italic">"{r.notes}"</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {r.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(r.id, "confirmed")}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-emerald-400 border border-emerald-400/25 px-3 py-2 rounded-lg hover:bg-emerald-400/5 transition-colors"
                    >
                      <CheckCircle size={12} /> Confirmar
                    </button>
                  )}
                  {r.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(r.id, "cancelled")}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-red-400 border border-red-400/25 px-3 py-2 rounded-lg hover:bg-red-400/5 transition-colors"
                    >
                      <XCircle size={12} /> Cancelar
                    </button>
                  )}
                  {r.status === "cancelled" && (
                    <button
                      onClick={() => deleteReservation(r.id)}
                      className="flex items-center justify-center gap-1.5 text-xs text-[#555] border border-[#2A2A2A] px-3 py-2 rounded-lg hover:text-red-400 hover:border-red-400/25 transition-colors"
                    >
                      <Trash2 size={12} /> Borrar
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${formatWhatsappPhone(r.phone)}?text=${encodeURIComponent(`Hola ${r.name}, confirmamos tu reserva para el ${r.date} a las ${r.time} hs para ${r.people} personas. ¡Te esperamos!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs text-[#25D366] border border-[#25D366]/25 px-3 py-2 rounded-lg hover:bg-[#25D366]/5 transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
