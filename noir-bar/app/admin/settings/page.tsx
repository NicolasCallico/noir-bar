"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { VenueSettings } from "@/lib/types";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<VenueSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data: { session } } = await supabase.auth.getSession();
    const venueId = session?.user?.user_metadata?.venue_id;

    if (!venueId) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("venue_settings")
      .select("*")
      .eq("id", venueId)
      .single();

    setSettings(data || null);
    setLoading(false);
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);

    const { error } = await supabase
      .from("venue_settings")
      .update({
        name: settings.name,
        tagline: settings.tagline,
        whatsapp: settings.whatsapp,
        instagram: settings.instagram,
        address: settings.address,
        primary_color: settings.primary_color,
        show_unavailable: settings.show_unavailable,
      })
      .eq("id", settings.id);

    if (!error) {
      alert("Configuración guardada correctamente.");
    } else {
      alert("Error al guardar la configuración.");
    }

    setSaving(false);
  }

  const inputClass = "w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-[#888] focus:outline-none focus:border-[#8a7248] transition-colors";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#888] px-5 pt-5">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="px-5 pt-5">
        <p className="text-[#888] text-center py-8">No se pudo cargar la configuración.</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 max-w-2xl">
      <h2 className="font-serif text-2xl mb-6">Configuración del Local</h2>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 space-y-5">
        {/* Nombre */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Nombre del local</label>
          <input
            className={inputClass}
            type="text"
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Tagline</label>
          <input
            className={inputClass}
            type="text"
            placeholder="Ej: Los mejores cócteles de la ciudad"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">WhatsApp (formato: +54xxx)</label>
          <input
            className={inputClass}
            type="tel"
            placeholder="+5491123456789"
            value={settings.whatsapp}
            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Instagram</label>
          <input
            className={inputClass}
            type="text"
            placeholder="@milocal"
            value={settings.instagram}
            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Dirección</label>
          <input
            className={inputClass}
            type="text"
            placeholder="Calle Principal 123, CABA"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
          />
        </div>

        {/* Color primario */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Color primario</label>
          <div className="flex gap-3">
            <input
              className="w-16 h-10 bg-[#111] border border-[#2A2A2A] rounded-md cursor-pointer"
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
            />
            <input
              className={`flex-1 ${inputClass}`}
              type="text"
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
            />
          </div>
        </div>

        {/* Mostrar productos no disponibles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSettings({ ...settings, show_unavailable: !settings.show_unavailable })}
            className={`relative w-10 h-5 rounded-full transition-colors ${settings.show_unavailable ? "bg-[#C8A96B]/25" : "bg-[#333]"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${settings.show_unavailable ? "left-5 bg-[#C8A96B]" : "left-0.5 bg-[#666]"}`} />
          </button>
          <label className="text-sm text-[#F5F5F5]">Mostrar productos no disponibles</label>
        </div>
      </div>

      {/* Botón guardar */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full mt-6 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 hover:bg-[#d4b980] transition-colors"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saving ? "Guardando..." : "Guardar configuración"}
      </button>
    </div>
  );
}
