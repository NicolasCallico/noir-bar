"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Loader2, GripVertical } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/types";

const VENUE_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [form, setForm] = useState({ name: "", slug: "", icon: "🍽️" });

  const inputClass = "w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-[#888] focus:outline-none focus:border-[#8a7248] transition-colors";

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("venue_id", VENUE_ID)
      .order("order");
    setCategories(data || []);
    setLoading(false);
  }

  function openNew() {
    setEditingId(null);
    setForm({ name: "", slug: "", icon: "🍽️" });
    setShowModal(true);
  }

  function openEdit(c: Category) {
    setEditingId(c.id);
    setForm({ name: c.name, slug: c.slug || "", icon: c.icon || "🍽️" });
    setShowModal(true);
  }

  function generateSlug(name: string) {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  async function saveCategory() {
    if (!form.name) return alert("Completá el nombre.");
    setSaving(true);
    const slug = form.slug || generateSlug(form.name);
    const payload = { name: form.name, slug, icon: form.icon };

    if (editingId) {
      await supabase.from("categories").update(payload).eq("id", editingId);
    } else {
      const nextOrder = categories.length + 1;
      await supabase.from("categories").insert({ ...payload, venue_id: VENUE_ID, order: nextOrder });
    }

    setSaving(false);
    setShowModal(false);
    fetchCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("¿Eliminar esta categoría? Los productos de esta categoría quedarán sin categoría.")) return;
    await supabase.from("categories").delete().eq("id", id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newCats = [...categories];
    const [moved] = newCats.splice(dragIndex, 1);
    newCats.splice(index, 0, moved);
    setDragIndex(index);
    setCategories(newCats);
  }

  async function handleDragEnd() {
    setDragIndex(null);
    await Promise.all(
      categories.map((c, i) =>
        supabase.from("categories").update({ order: i + 1 }).eq("id", c.id)
      )
    );
  }

  return (
    <div className="px-5 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl">Categorías</h2>
          <p className="text-xs text-[#888]">Crear, renombrar, reordenar y eliminar categorías.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-[#C8A96B] text-[#0D0D0D] text-xs font-medium px-3 py-2 rounded">
          <Plus size={14} /> Nueva categoría
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#888]">
          <Loader2 className="animate-spin" size={24} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] text-[#555] mb-1">Arrastrá para reordenar</p>
          {categories.map((c, index) => (
            <div
              key={c.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 py-3 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-opacity ${dragIndex === index ? "opacity-50" : ""}`}
            >
              <GripVertical size={14} className="text-[#444] flex-shrink-0" />
              <span className="text-xl w-8 text-center flex-shrink-0">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-[11px] text-[#555]">/{c.slug}</p>
              </div>
              <span className="text-[10px] text-[#555] mr-2">#{c.order}</span>
              <button onClick={() => openEdit(c)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-[#C8A96B] hover:border-[#8a7248] transition-colors">
                <Edit3 size={13} />
              </button>
              <button onClick={() => deleteCategory(c.id)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-red-400 hover:border-red-900 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center" onClick={() => setShowModal(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28 }} className="bg-[#161616] border border-[#2A2A2A] rounded-t-2xl p-5 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg">{editingId ? "Editar categoría" : "Nueva categoría"}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#888]"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Ícono</label>
                    <input className={inputClass} placeholder="🍸" value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Nombre</label>
                    <input
                      className={inputClass}
                      placeholder="Cocktails"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: generateSlug(e.target.value) }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Slug (se genera solo)</label>
                  <input className={inputClass} placeholder="cocktails" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                </div>
              </div>
              <button onClick={saveCategory} disabled={saving} className="w-full mt-4 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Guardando..." : "Guardar categoría"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}