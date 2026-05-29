"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Loader2, Camera, ImageOff, ChevronDown } from "lucide-react";
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
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
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
    if (cats && cats.length > 0) {
      setForm((f) => ({ ...f, category_id: cats[0].id }));
      setOpenSections(new Set([cats[0].id]));
    }
    setLoading(false);
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set<string>();
      if (!prev.has(id)) next.add(id);
      return next;
    });
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

  // ← NUEVO: abre el modal con la categoría preseleccionada
  function openNewInCategory(categoryId: string) {
    setEditingId(null);
    setForm({ name: "", description: "", price: "", emoji: "🍽️", category_id: categoryId, badge: "", available: true, image_url: "" });
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

  const grouped = categories
    .map((cat) => ({
      category: cat,
      products: products.filter((p) => p.category_id === cat.id),
    }));

  const uncategorized = products.filter((p) => !categories.find((c) => c.id === p.category_id));

  return (
    <div className="px-5 pt-5 pb-24">
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
          {grouped.map((group) => {
            const isOpen = openSections.has(group.category.id);
            return (
              <div key={group.category.id} className="border border-[#2A2A2A] rounded-lg overflow-hidden">
                <div className="flex items-center bg-[#1A1A1A] hover:bg-[#1f1f1f] transition-colors">
                  {/* Header clickeable para abrir/cerrar */}
                  <button
                    onClick={() => toggleSection(group.category.id)}
                    className="flex-1 flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{group.category.icon}</span>
                      <span className="font-serif text-[#F5F5F5] text-sm">{group.category.name}</span>
                      <span className="text-[10px] text-[#555] bg-[#111] border border-[#2A2A2A] px-2 py-0.5 rounded-full">
                        {group.products.length}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={15} className="text-[#C8A96B]" />
                    </motion.div>
                  </button>

                  {/* ← BOTÓN + por categoría */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openNewInCategory(group.category.id);
                    }}
                    className="flex items-center justify-center w-10 h-10 mr-2 rounded-lg border border-dashed border-[#C8A96B]/40 text-[#C8A96B] hover:bg-[#C8A96B]/10 transition-colors flex-shrink-0"
                    title={`Agregar producto en ${group.category.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex flex-col divide-y divide-[#1f1f1f]">
                        {group.products.length === 0 ? (
                          <div className="px-4 py-4 text-center">
                            <p className="text-xs text-[#555] mb-2">No hay productos en esta categoría</p>
                            <button
                              onClick={() => openNewInCategory(group.category.id)}
                              className="text-xs text-[#C8A96B] border border-dashed border-[#C8A96B]/30 px-3 py-1.5 rounded-lg hover:bg-[#C8A96B]/5 transition-colors"
                            >
                              + Agregar el primero
                            </button>
                          </div>
                        ) : (
                          group.products.map((p) => (
                            <div key={p.id} className="bg-[#161616] px-3.5 py-3 flex items-center gap-3">
                              {p.image_url && (
                                <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{p.name}</p>
                                <p className="text-[11px] text-[#888] truncate">{p.description}</p>
                              </div>
                              <span className="text-sm text-[#C8A96B] font-medium mr-1 flex-shrink-0">{formatPrice(p.price)}</span>
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
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {uncategorized.length > 0 && (
            <div className="border border-dashed border-[#2A2A2A] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("__uncategorized__")}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A]"
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[#888] text-sm">Sin categoría</span>
                  <span className="text-[10px] text-[#555] bg-[#111] border border-[#2A2A2A] px-2 py-0.5 rounded-full">
                    {uncategorized.length}
                  </span>
                </div>
                <ChevronDown size={15} className="text-[#555]" />
              </button>
              <AnimatePresence initial={false}>
                {openSections.has("__uncategorized__") && (
                  <motion.div
                    key="uncategorized"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="flex flex-col divide-y divide-[#1f1f1f]">
                      {uncategorized.map((p) => (
                        <div key={p.id} className="bg-[#161616] px-3.5 py-3 flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{p.name}</p>
                          </div>
                          <span className="text-sm text-[#C8A96B] font-medium mr-1">{formatPrice(p.price)}</span>
                          <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-[#C8A96B] transition-colors">
                            <Edit3 size={13} />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-red-400 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 bg-[#C8A96B] text-[#0D0D0D] text-xs font-medium px-3 py-1.5 rounded">
                          <Camera size={13} /> Cambiar foto
                        </button>
                        <button onClick={() => setForm((f) => ({ ...f, image_url: "" }))} className="flex items-center gap-1.5 bg-[#2A2A2A] text-[#F5F5F5] text-xs px-3 py-1.5 rounded">
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
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="w-full h-24 border border-dashed border-[#3A3A3A] rounded-lg flex flex-col items-center justify-center gap-2 text-[#666] hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors">
                      {uploadingImage ? <Loader2 size={20} className="animate-spin" /> : <><Camera size={20} /><span className="text-xs">Subir foto</span></>}
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
                      <option value="gold">👨‍🍳 Del chef</option>
                      <option value="new">✨ Temporada</option>
                      <option value="hot">🍷 La preferida</option>
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
