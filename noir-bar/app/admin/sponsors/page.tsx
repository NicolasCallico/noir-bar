"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Loader2, Pause, Play } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getVenueByOwner } from "@/lib/venue";

interface Sponsor {
  id: string;
  logo_url: string;
  name: string | null;
  active: boolean;
  order: number;
}

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [venueId, setVenueId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchSponsors(); }, []);

  async function fetchSponsors() {
    setLoading(true);
    const venue = await getVenueByOwner();
    if (!venue) { setLoading(false); return; }
    setVenueId(venue.id);

    const { data } = await supabase
      .from("brand_sponsors")
      .select("*")
      .eq("venue_id", venue.id)
      .order("order", { ascending: true });
    setSponsors(data || []);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !venueId) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${venueId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("sponsors").upload(path, file, { upsert: true });
    if (uploadError) {
      alert("Error subiendo el logo");
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("sponsors").getPublicUrl(path);
    const { error: insertError } = await supabase.from("brand_sponsors").insert({
      venue_id: venueId,
      logo_url: publicUrl,
      name: file.name.split(".")[0],
      active: true,
      order: sponsors.length,
    });
    if (insertError) {
      alert("Error guardando el logo");
    }
    setUploading(false);
    fetchSponsors();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function toggleActive(id: string, active: boolean) {
    await supabase.from("brand_sponsors").update({ active }).eq("id", id);
    setSponsors((prev) => prev.map((s) => (s.id === id ? { ...s, active } : s)));
  }

  async function deleteSponsor(id: string) {
    if (!confirm("¿Eliminar este logo de marca?")) return;
    await supabase.from("brand_sponsors").delete().eq("id", id);
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="px-4 pt-5 pb-24">
      <div className="mb-5">
        <h2 className="font-serif text-xl text-[#F5F5F5]">Logos de patrocinios</h2>
        <p className="text-xs text-[#888] mt-0.5">
          Subí los logos de las marcas auspiciantes. Se muestran en un carrusel al final del menú.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || !venueId}
        className="w-full mb-5 flex items-center justify-center gap-2 border border-dashed border-[#C8A96B]/40 text-[#C8A96B] py-3 rounded-lg hover:bg-[#C8A96B]/5 transition-colors disabled:opacity-50"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        {uploading ? "Subiendo..." : "Agregar logo de marca"}
      </button>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#888]" size={24} />
        </div>
      ) : sponsors.length === 0 ? (
        <div className="text-center py-16 text-[#888]">
          <p className="text-3xl mb-2">🏷️</p>
          <p className="text-sm">Todavía no agregaste logos de marcas</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 flex flex-col gap-2 ${!s.active ? "opacity-50" : ""}`}
            >
              <div className="h-16 flex items-center justify-center bg-[#111] rounded-md">
                <img src={s.logo_url} alt={s.name || ""} className="max-h-12 max-w-[80%] object-contain" />
              </div>
              <p className="text-xs text-[#F5F5F5] truncate text-center">{s.name || "Sin nombre"}</p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => toggleActive(s.id, !s.active)}
                  className="flex-1 flex items-center justify-center gap-1 text-[10px] border border-[#2A2A2A] rounded-md py-1.5 text-[#888] hover:text-[#C8A96B] hover:border-[#8a7248] transition-colors"
                >
                  {s.active ? <><Pause size={11} /> Pausar</> : <><Play size={11} /> Activar</>}
                </button>
                <button
                  onClick={() => deleteSponsor(s.id)}
                  className="w-8 flex items-center justify-center border border-[#2A2A2A] rounded-md text-[#888] hover:text-red-400 hover:border-red-900 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
