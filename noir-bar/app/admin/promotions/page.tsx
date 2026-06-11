"use client";

import { useEffect, useState } from "react";
import { Plus, X, Loader2, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { getVenueByOwner } from "@/lib/venue";
import type { Promotion } from "@/lib/types";

export default function AdminPromotions() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [venueId, setVenueId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", time_range: "", active: true });

  useEffect(() => { fetchPromos(); }, []);

  async function fetchPromos() {
    const venue = await getVenueByOwner();
    if (!venue) return;
    setVenueId(venue.id);
    const { data } = await supabase
      .from("promotions")
      .select("*")
      .eq("venue_id", venue.id)
      .order("created_at", { ascending: false });
    setPromos(data || []);
    setLoading(false);
  }

  async function togglePromo(id: string, val: boolean) {
    await supabase.from("promotions").update({ active: val }).eq("id", id);
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, active: val } : p)));
  }

  function openNew() {
    setEditingId(null);
    setForm({ name: "", description: "", time_range: "", active: true });
    setShowModal(true);
  }

  function openEdit(p: Promotion) {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, time_range: p.time_range, active: p.active });
    setShowModal(true);
  }

  async function savePromo() {
    if (!form.name) return alert("Ingresá un nombre.");
    if (!venueId) return alert("No se encontró el venue.");
    setSaving(true);
    if (editingId) {
      await supabase.from("promotions").update({ ...form }).eq("id", editingId);
    } else {
      await supabase.from("promotions").insert({ ...form, venue_id: venueId });
    }
    setSaving(false);
    setShowModal(false);
    fetchPromos();
  }

  async function deletePromo(id: string) {
    if (!confirm("¿Seguro que querés eliminar esta promoción?")) return;
    setDeleting(id);
    await supabase.from("promotions").delete().eq("id", id);
    setPromos((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  const inputClass = "w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-[#888] focus:outline-none focus:border-[#8a7248] transition-colors";

  return (
    <div className="px-5 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl">Promociones</h2>
          <p className="text-xs text-[#888]">Crear y activar ofertas visibles en el menú.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPromos}
            className="text-[#888] border border-[#2A2A2A] px-3 py-2 rounded text-xs hover:border-[#C8A96B] hover:text-[#F5F5F5] transition-colors"
          >
            Recargar
          </button>
          <button onClick={openNew} className="flex items-center gap-1.5 bg-[#C8A96B] text-[#0D0D0D] text-xs font-medium px-3 py-2 rounded">
            <Plus size={14} /> Nueva promo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-[#888]" size={24} /></div>
      ) : (
        <div className="flex flex-col gap-3">
          {promos.map((p) => (
            <div key={p.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-lg">{p.name}</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-[#888] hover:text-[#C8A96B] transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deletePromo(p.id)}
                    disabled={deleting === p.id}
                    className="text-[#888] hover:text-red-400 transition-colors disabled:opacity-40"
                  >
                    {deleting === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                  <button
                    onClick={() => togglePromo(p.id, !p.active)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${p.active ? "bg-[#C8A96B]/25" : "bg-[#333]"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${p.active ? "left-5 bg-[#C8A96B]" : "left-0.5 bg-[#666]"}`} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#888] mb-2">{p.description}</p>
              <p className="text-[11px] text-[#C8A96B]">⏰ {p.time_range}</p>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center" onClick={() => setShowModal(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28 }} className="bg-[#161616] border border-[#2A2A2A] rounded-t-2xl p-5 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg">{editingId ? "Editar promoción" : "Nueva promoción"}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#888]"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Nombre</label>
                  <input className={inputClass} placeholder="Happy Hour" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Descripción</label>
                  <input className={inputClass} placeholder="Cocktails 2×1" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Horario</label>
                  <input className={inputClass} placeholder="Lunes a jueves, 18:00–20:00" value={form.time_range} onChange={(e) => setForm((f) => ({ ...f, time_range: e.target.value }))} />
                </div>
              </div>
              <button onClick={savePromo} disabled={saving} className="w-full mt-4 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? "Guardar cambios" : "Guardar promoción"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
