"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { VenueSettings } from "@/lib/types";

const DEFAULT_VENUE_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const DEFAULT_VENUE_SLUG = "noir-bar";
const LOGO_BUCKET = "products";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [settings, setSettings] = useState<VenueSettings | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("venue_settings")
      .select("*")
      .eq("slug", DEFAULT_VENUE_SLUG)
      .single();

    if (data) {
      setSettings(data);
      setFetchError(null);
      setLoading(false);
      return;
    }

    if (error) {
      const { data: createdData, error: createError } = await supabase
        .from("venue_settings")
        .insert({
          id: DEFAULT_VENUE_ID,
          slug: DEFAULT_VENUE_SLUG,
          name: "Noir Bar",
          tagline: "Cocktails artesanales & gastronomía de autor",
          whatsapp: "5491112345678",
          instagram: "noirbar.ba",
          address: "Palermo, Buenos Aires",
          birthday_promo_text:
            "Recordá que si vas a festejar tu cumpleaños, presentando el DNI tenés un 20% OFF.",
        })
        .single();

      if (createdData) {
        setSettings(createdData);
        setFetchError(null);
      } else {
        setSettings(null);
        setFetchError(createError?.message || error.message || "No se encontró la configuración del local.");
      }
    }

    setLoading(false);
  }

  async function requireSession() {
    const { data, error } = await supabase.auth.getSession();

    console.log("Supabase session check:", { data, error });

    if (error || !data?.session) {
      alert("Tu sesión expiró o no estás autenticado. Ingresá de nuevo en el panel admin.");
      return null;
    }

    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    return data.session;
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);

    const session = await requireSession();
    if (!session) {
      setSaving(false);
      return;
    }

    let updateResult = await supabase
      .from("venue_settings")
      .update({
        name: settings.name,
        tagline: settings.tagline,
        whatsapp: settings.whatsapp,
        instagram: settings.instagram,
        address: settings.address,
        logo_url: settings.logo_url,
        show_unavailable: settings.show_unavailable,
        birthday_promo_text: settings.birthday_promo_text || "",
      })
      .eq("id", settings.id);

    if (updateResult.error && updateResult.error.message?.includes("birthday_promo_text")) {
      console.warn("Birthday promo column missing in DB schema, retrying without it.", updateResult.error);
      updateResult = await supabase
        .from("venue_settings")
        .update({
          name: settings.name,
          tagline: settings.tagline,
          whatsapp: settings.whatsapp,
          instagram: settings.instagram,
          address: settings.address,
          logo_url: settings.logo_url,
          show_unavailable: settings.show_unavailable,
        })
        .eq("id", settings.id);
    }

    if (!updateResult.error) {
      alert("Configuración guardada correctamente.");
    } else {
      console.error("Error saving venue settings:", updateResult.error);
      alert(`Error al guardar la configuración. ${updateResult.error.message}`);
    }

    setSaving(false);
  }

  async function uploadLogo() {
    if (!settings || !selectedLogo) return;
    setUploading(true);

    const session = await requireSession();
    if (!session) {
      setUploading(false);
      return;
    }

    const sessionResult = await supabase.auth.getSession();
    const accessToken = sessionResult.data?.session?.access_token;

    if (!accessToken) {
      alert("No se encontró sesión activa. Iniciá sesión de nuevo en el panel admin.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedLogo);
    formData.append("venueId", settings.id);

    const response = await fetch("/api/admin/logo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Error uploading logo via server:", result);
      alert(`Error al subir el logo. ${result.error || "Intentá de nuevo."}`);
      setUploading(false);
      return;
    }

    setSettings({ ...settings, logo_url: result.publicUrl });
    setSelectedLogo(null);
    alert("Logo cargado correctamente.");

    setUploading(false);
  }

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Por favor seleccioná un archivo de imagen.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("El logo no puede superar los 4 MB.");
      return;
    }

    setSelectedLogo(file);
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
        <p className="text-[#888] text-center py-8">
          No se pudo cargar la configuración.
          {fetchError ? ` ${fetchError}` : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl">Datos del Local</h2>
          <p className="text-xs text-[#888]">Subí el logo y actualizá los datos del bar.</p>
        </div>
        <button
          onClick={fetchSettings}
          className="text-[#888] border border-[#2A2A2A] px-3 py-2 rounded text-xs hover:border-[#C8A96B] hover:text-[#F5F5F5] transition-colors"
        >
          Recargar
        </button>
      </div>

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

        {/* Texto de promoción de cumpleaños */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Texto de promoción de cumpleaños</label>
          <textarea
            className={`${inputClass} min-h-[120px] resize-none`}
            placeholder="Recordá que si vas a festejar tu cumpleaños, presentando el DNI tenés un 20% OFF."
            value={settings.birthday_promo_text || ""}
            onChange={(e) => setSettings({ ...settings, birthday_promo_text: e.target.value })}
          />
          <p className="text-xs text-[#888] mt-2">Este texto se mostrará en el formulario de reserva cuando el cliente seleccione cumpleaños.</p>
        </div>

        {/* Logo del local */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Logo del local</label>
          <div className="space-y-3">
            {settings.logo_url ? (
              <div className="mx-auto max-w-[180px] rounded-3xl border border-[#2A2A2A] bg-[#111] p-4">
                <img
                  src={settings.logo_url}
                  alt={`${settings.name} logo`}
                  className="mx-auto h-20 w-20 sm:h-24 sm:w-24 object-contain"
                />
              </div>
            ) : (
              <p className="text-sm text-[#aaa]">No hay logo cargado aún.</p>
            )}

            <div className="grid gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                disabled={uploading}
                className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-2.5 text-sm text-[#F5F5F5]"
              />

              <button
                type="button"
                onClick={uploadLogo}
                disabled={!selectedLogo || uploading}
                className="w-full bg-gold text-[#0D0D0D] py-2 rounded text-sm font-medium hover:bg-[#d4b980] transition-colors disabled:opacity-60"
              >
                {uploading ? "Subiendo logo..." : "Cargar logo"}
              </button>

              {selectedLogo ? (
                <p className="text-sm text-[#F5F5F5]">Archivo listo para subir: <span className="font-medium text-gold">{selectedLogo.name}</span></p>
              ) : (
                <p className="text-xs text-[#888]">Seleccioná un archivo desde tu computadora y luego tocá "Subir logo".</p>
              )}

              {uploading ? (
                <p className="text-xs text-[#aaa]">Subiendo logo...</p>
              ) : null}
            </div>
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
