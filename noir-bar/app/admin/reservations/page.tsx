"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";

const statusConfig = {
  new: { label: "Nuevo", class: "text-emerald-400 bg-emerald-400/10" },
  confirmed: { label: "Confirmado", class: "text-[#C8A96B] bg-[#C8A96B]/10" },
  cancelled: { label: "Cancelado", class: "text-red-400 bg-red-400/10" },
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "confirmed">("new");

  useEffect(() => { fetchReservations(); }, []);

  async function fetchReservations() {
    setLoading(true);
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    setReservations(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Reservation["status"]) {
    await supabase.from("reservations").update({ status }).eq("id", id);
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div className="px-5 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="font-serif text-xl">Reservas</h2>
          <p className="text-xs text-[#888]">Ver reservas y confirmar o cancelar con un clic.</p>
        </div>
        <button
          onClick={fetchReservations}
          className="self-start text-[#888] border border-[#2A2A2A] px-3 py-2 rounded text-xs hover:border-[#C8A96B] hover:text-[#F5F5F5] transition-colors"
        >
          Recargar
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {(["new", "confirmed", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === f ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B]" : "border-[#2A2A2A] text-[#888]"}`}
          >
            {f === "new" ? "Nuevas" : f === "confirmed" ? "Confirmadas" : "Todas"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-[#888]" size={24} /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#888]">
          <p className="text-3xl mb-2">📅</p>
          <p className="text-sm">No hay reservas</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((r) => (
            <div key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{r.name} {r.is_birthday ? "🎂" : ""}</span>
                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${statusConfig[r.status]?.class}`}>
                  {statusConfig[r.status]?.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-[#888] mb-3">
                <span>👥 {r.people} personas</span>
                <span>📅 {r.date}</span>
                <span>🕐 {r.time}</span>
                <span>📱 {r.phone}</span>
              </div>
              {r.notes && <p className="text-xs text-[#888] italic mb-3">"{r.notes}"</p>}
              {/* Acciones */}
              {r.status === "new" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(r.id, "confirmed")}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 border border-emerald-400/25 px-3 py-1.5 rounded-lg hover:bg-emerald-400/5 transition-colors"
                  >
                    <CheckCircle size={12} /> Confirmar
                  </button>
                  <button
                    onClick={() => updateStatus(r.id, "cancelled")}
                    className="flex items-center gap-1.5 text-xs text-red-400 border border-red-400/25 px-3 py-1.5 rounded-lg hover:bg-red-400/5 transition-colors"
                  >
                    <XCircle size={12} /> Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
