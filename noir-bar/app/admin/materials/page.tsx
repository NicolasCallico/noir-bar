"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, Download, Copy, Check } from "lucide-react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import type { VenueSettings } from "@/lib/types";

export default function AdminMaterials() {
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState<VenueSettings | null>(null);
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVenueData();
  }, []);

  async function fetchVenueData() {
    setLoading(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (!session) {
      setLoading(false);
      return;
    }

    let venueId = session.user.user_metadata?.venue_id || "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

    const { data: venueData } = await supabase
      .from("venue_settings")
      .select("*")
      .eq("id", venueId)
      .single();

    if (venueData) {
      setVenue(venueData);
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      setQrUrl(`${origin}/${venueData.slug}`);
    }

    setLoading(false);
  }

  async function downloadQRPNG() {
    if (!qrRef.current) return;
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: "white",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `qr-menu-${venue?.slug || "local"}.png`;
      link.click();
    } catch (error) {
      console.error("Error descargando PNG:", error);
      alert("Error al descargar el QR");
    }
  }

  async function downloadQRPDF() {
    if (!qrRef.current || !venue) return;
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: "white",
        scale: 4,
        useCORS: true,
      });

      const qrImageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", [85, 100]);
      const pageWidth = 85;
      const qrSize = 58;
      const qrX = (pageWidth - qrSize) / 2;
      const qrY = 10;

      pdf.setFillColor(13, 13, 13);
      pdf.rect(0, 0, 85, 100, "F");

      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 6, 3, 3, "F");
      pdf.addImage(qrImageData, "PNG", qrX, qrY, qrSize, qrSize);

      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(200, 169, 107);
      pdf.text(venue.name || "", pageWidth / 2, qrY + qrSize + 14, { align: "center" });

      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(136, 136, 136);
      pdf.text("Escaneá para ver el menú", pageWidth / 2, qrY + qrSize + 20, { align: "center" });

      pdf.save(`qr-mesa-${venue.slug}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF");
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#888] px-5 pt-5">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="px-5 pt-5">
        <p className="text-[#888] text-center py-8">
          No se pudo cargar la configuración del local.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-20 max-w-3xl">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-[#F5F5F5] mb-1">Material para el Local</h2>
        <p className="text-xs text-[#888]">Descargá el código QR para imprimir en tu negocio.</p>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 mb-8">
        <div className="mb-8 p-8 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] flex flex-col items-center text-center">
          {venue.logo_url && (
            <div className="mb-6">
              <img src={venue.logo_url} alt={venue.name} className="h-16 w-auto max-w-[120px] object-contain" />
            </div>
          )}
          <h3 className="font-serif text-xl text-[#F5F5F5] mb-2">{venue.name}</h3>
          <p className="text-xs text-[#888] mb-8">{venue.tagline || "Menú digital"}</p>
          <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <QRCode value={qrUrl} size={256} level="H" includeMargin={true} />
          </div>
          <p className="text-[10px] text-[#555] font-mono mt-4">{qrUrl}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={downloadQRPNG}
            className="w-full flex items-center justify-center gap-2 bg-[#C8A96B]/10 border border-[#C8A96B]/30 text-[#C8A96B] py-3 rounded-lg hover:bg-[#C8A96B]/20 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Descargar QR como PNG
          </button>
          <button
            onClick={downloadQRPDF}
            className="w-full flex items-center justify-center gap-2 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded-lg hover:bg-[#C8A96B]/90 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Descargar PDF para imprimir
          </button>
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#888] hover:text-[#F5F5F5] hover:border-[#C8A96B]/30 py-3 rounded-lg transition-colors text-sm font-medium"
          >
            {copied ? (
              <><Check size={16} className="text-emerald-400" />Copiado al portapapeles</>
            ) : (
              <><Copy size={16} />Copiar enlace del menú</>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-serif text-sm text-[#C8A96B] uppercase tracking-wider mb-3">Cómo usar</h4>
        <div className="space-y-3">
          {[
            { n: 1, title: "Descargá el PDF listo para imprimir", sub: "El archivo contiene el QR en tamaño tarjeta de mesa" },
            { n: 2, title: "Imprimilo y recortalo", sub: "Queda en 85×100mm, ideal para apoyar en la mesa" },
            { n: 3, title: "Pegá el código QR en tu local", sub: "Tus clientes podrán acceder al menú escaneando con su celular" },
          ].map(({ n, title, sub }) => (
            <div key={n} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#C8A96B]/20 flex items-center justify-center flex-shrink-0 text-[#C8A96B] text-xs font-bold">{n}</div>
              <div>
                <p className="text-sm text-[#F5F5F5] font-medium">{title}</p>
                <p className="text-xs text-[#888] mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-[#111] border border-[#2A2A2A] rounded-lg p-4">
        <p className="text-[10px] text-[#555] uppercase tracking-wider mb-2">Información del local</p>
        <div className="space-y-1 text-xs text-[#888]">
          <p><span className="text-[#C8A96B]">Nombre:</span> {venue.name}</p>
          <p><span className="text-[#C8A96B]">Slug:</span> {venue.slug}</p>
          {venue.whatsapp && <p><span className="text-[#C8A96B]">WhatsApp:</span> {venue.whatsapp}</p>}
        </div>
      </div>
    </div>
  );
}
