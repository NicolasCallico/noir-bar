"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Loader2, Camera, ImageOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Product, Category } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "", description: "", price: "", emoji: "🍽️",
    category_id: "", badge: "" as "" | "gold" | "new" | "hot",
    available: true, image_url: "",
  });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*, categories(*)").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("order"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
    if (cats && cats.length > 0) setForm((f) => ({ ...f, category_id: cats[0].id }));
    setLoading(false);
  }

  async function toggleAvailable(id: string, val: boolean) {
    await supabase.from("products").update({ available: val }).eq("id", id);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, available: val } : p)));
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function openNew() {
    setEditingId(null);
    setForm({ name: "", description: "", price: "", emoji: "🍽️", category_id: categories[0]?.id || "", badge: "", available: true, image_url: "" });
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, price: String(p.price), emoji: p.emoji, category_id: p.category_id, badge: p.badge, available: p.available, image_url: p.image_url || "" });
    setShowModal(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const ext = file.name.split(".").pop();
    const path = `${editingId || "new"}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file, { upsert: true });
    if (error) { alert("Error subiendo imagen"); setUploadingImage(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("products").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploadingImage(false);
  }

  async function saveProduct() {
    if (!form.name || !form.price) return alert("Completá nombre y precio.");
    setSaving(true);
    const payload = {
      name: form.name, description: form.description, price: parseFloat(form.price),
      emoji: form.emoji, category_id: form.category_id, badge: form.badge,
      available: form.available, image_url: form.image_url || null,
    };
    const venueId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    if (editingId) {
      await supabase.from("products").update(payload).eq("id", editingId);
    } else {
      await supabase.from("products").insert({ ...payload, venue_id: venueId });
    }
    setSaving(false);
    setShowModal(false);
    fetchData();
  }

  const inputClass = "w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-[#888] focus:outline-none focus:border-[#8a7248] transition-colors";

  return (
    <div className="px-5 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl">Productos</h2>
          <p className="text-xs text-[#888]">Agregar, editar precios y controlar stock.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchData} className="text-[#888] border border-[#2A2A2A] px-3 py-2 rounded text-xs hover:border-[#C8A96B] hover:text-[#F5F5F5] transition-colors">
            Recargar
          </button>
          <button onClick={openNew} className="flex items-center gap-1.5 bg-[#C8A96B] text-[#0D0D0D] text-xs font-medium px-3 py-2 rounded">
            <Plus size={14} /> Agregar
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#888]">
          <Loader2 className="animate-spin" size={24} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((p) => (
            <div key={p.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 py-3 flex items-center gap-3">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-[11px] text-[#888]">{(p.categories as Category)?.name || "—"}</p>
              </div>
              <span className="text-sm text-[#C8A96B] font-medium mr-1">{formatPrice(p.price)}</span>
              <button
                onClick={() => toggleAvailable(p.id, !p.available)}
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${p.available ? "bg-[#C8A96B]/25" : "bg-[#333]"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${p.available ? "left-4 bg-[#C8A96B]" : "left-0.5 bg-[#666]"}`} />
              </button>
              <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-[#C8A96B] hover:border-[#8a7248] transition-colors">
                <Edit3 size={13} />
              </button>
              <button onClick={() => deleteProduct(p.id)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-red-400 hover:border-red-900 transition-colors">
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
                <h3 className="font-serif text-lg">{editingId ? "Editar producto" : "Nuevo producto"}</h3>
                <button onClick={() => setShowModal(false)} className="text-[#888]"><X size={18} /></button>
              </div>

              <div className="space-y-3">

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Foto del producto</label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {form.image_url ? (
                    <div className="relative w-full h-36 rounded-lg overflow-hidden">
                      <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 bg-[#C8A96B] text-[#0D0D0D] text-xs font-medium px-3 py-1.5 rounded"
                        >
                          <Camera size={13} /> Cambiar foto
                        </button>
                        <button
                          onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                          className="flex items-center gap-1.5 bg-[#2A2A2A] text-[#F5F5F5] text-xs px-3 py-1.5 rounded"
                        >
                          <ImageOff size={13} /> Quitar
                        </button>
                      </div>
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader2 size={20} className="animate-spin text-[#C8A96B]" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full h-24 border border-dashed border-[#3A3A3A] rounded-lg flex flex-col items-center justify-center gap-2 text-[#666] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors"
                    >
                      {uploadingImage ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Camera size={20} />
                          <span className="text-xs">Subir foto</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Nombre</label>
                    <input className={inputClass} placeholder="Negroni" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Precio ($)</label>
                    <input className={inputClass} type="number" placeholder="2800" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Descripción</label>
                  <input className={inputClass} placeholder="Descripción breve" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Categoría</label>
                    <select className={inputClass} value={form.category_id} onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Badge</label>
                    <select className={inputClass} value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value as any }))}>
                      <option value="">Sin badge</option>
                      <option value="gold">⭐ Destacado</option>
                      <option value="new">Nuevo</option>
                      <option value="hot">🔥 Más vendido</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Emoji</label>
                    <input className={inputClass} placeholder="🍸" value={form.emoji} onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))} />
                  </div>
                  <div className="flex items-end pb-1">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setForm((f) => ({ ...f, available: !f.available }))} className={`relative w-9 h-5 rounded-full transition-colors ${form.available ? "bg-[#C8A96B]/25" : "bg-[#333]"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${form.available ? "left-4 bg-[#C8A96B]" : "left-0.5 bg-[#666]"}`} />
                      </button>
                      <span className="text-xs text-[#888]">Disponible</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={saveProduct} disabled={saving} className="w-full mt-4 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Guardando..." : "Guardar producto"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
