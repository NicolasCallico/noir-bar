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
  const pdfRef = useRef<HTMLDivElement>(null);

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

    // Intentar obtener venue_id desde metadata del usuario
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
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-menu-${venue?.slug || "local"}.png`;
    link.click();
  }

  async function downloadQRPDF() {
    if (!pdfRef.current || !venue) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        backgroundColor: "#0D0D0D",
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "A4");

      // Margen
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Título
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(200, 169, 107); // Color #C8A96B
      pdf.text("MATERIAL DEL LOCAL", margin, margin + 10);

      // Nombre del local
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(14);
      pdf.setTextColor(245, 245, 245); // #F5F5F5
      pdf.text(venue.name || "Sin nombre", margin, margin + 25);

      // Instrucción
      pdf.setFontSize(11);
      pdf.setTextColor(136, 136, 136); // #888
      const textLines = pdf.splitTextToSize(
        "Imprime este código QR en el local. Los clientes podrán acceder al menú con su celular.",
        pageWidth - margin * 2
      );
      pdf.text(textLines, margin, margin + 35);

      // Imagen del contenido
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      pdf.addImage(imgData, "PNG", margin, margin + 55, imgWidth, imgHeight);

      // URL del menú en el footer
      const footerY = pageHeight - margin - 10;
      pdf.setFontSize(10);
      pdf.setTextColor(200, 169, 107);
      pdf.text(`Enlace directo: ${qrUrl}`, margin, footerY);

      pdf.save(`menu-qr-${venue.slug}.pdf`);
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
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-[#F5F5F5] mb-1">Material para el Local</h2>
        <p className="text-xs text-[#888]">Descargá el código QR para imprimir en tu negocio.</p>
      </div>

      {/* Card Principal */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 mb-8">
        {/* Vista previa para PDF */}
        <div
          ref={pdfRef}
          className="mb-8 p-8 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] flex flex-col items-center text-center"
        >
          {/* Logo si existe */}
          {venue.logo_url && (
            <div className="mb-6">
              <img
                src={venue.logo_url}
                alt={venue.name}
                className="h-16 w-auto max-w-[120px] object-contain"
              />
            </div>
          )}

          {/* Nombre del local */}
          <h3 className="font-serif text-xl text-[#F5F5F5] mb-2">{venue.name}</h3>
          <p className="text-xs text-[#888] mb-8">{venue.tagline || "Menú digital"}</p>

          {/* QR */}
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-lg shadow-lg mb-6"
          >
            <QRCode
              value={qrUrl}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* URL */}
          <p className="text-[10px] text-[#555] font-mono mt-4">{qrUrl}</p>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          {/* Botón Descargar PNG */}
          <button
            onClick={downloadQRPNG}
            className="w-full flex items-center justify-center gap-2 bg-[#C8A96B]/10 border border-[#C8A96B]/30 text-[#C8A96B] py-3 rounded-lg hover:bg-[#C8A96B]/20 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Descargar QR como PNG
          </button>

          {/* Botón Descargar PDF */}
          <button
            onClick={downloadQRPDF}
            className="w-full flex items-center justify-center gap-2 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded-lg hover:bg-[#C8A96B]/90 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Descargar PDF para imprimir
          </button>

          {/* Copiar URL */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#888] hover:text-[#F5F5F5] hover:border-[#C8A96B]/30 py-3 rounded-lg transition-colors text-sm font-medium"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-400" />
                Copiado al portapapeles
              </>
            ) : (
              <>
                <Copy size={16} />
                Copiar enlace del menú
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="space-y-4">
        <h4 className="font-serif text-sm text-[#C8A96B] uppercase tracking-wider mb-3">
          Cómo usar
        </h4>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#C8A96B]/20 flex items-center justify-center flex-shrink-0 text-[#C8A96B] text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-sm text-[#F5F5F5] font-medium">
                Descargá el PDF listo para imprimir
              </p>
              <p className="text-xs text-[#888] mt-1">
                El archivo contiene el QR con el logo de tu local
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#C8A96B]/20 flex items-center justify-center flex-shrink-0 text-[#C8A96B] text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-sm text-[#F5F5F5] font-medium">
                Imprimilo en formato A4
              </p>
              <p className="text-xs text-[#888] mt-1">
                Recomendamos 300 DPI para mejor calidad
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#C8A96B]/20 flex items-center justify-center flex-shrink-0 text-[#C8A96B] text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-sm text-[#F5F5F5] font-medium">
                Pegá el código QR en tu local
              </p>
              <p className="text-xs text-[#888] mt-1">
                Tus clientes podrán acceder al menú escaneando con su celular
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info del local */}
      <div className="mt-8 bg-[#111] border border-[#2A2A2A] rounded-lg p-4">
        <p className="text-[10px] text-[#555] uppercase tracking-wider mb-2">Información del local</p>
        <div className="space-y-1 text-xs text-[#888]">
          <p>
            <span className="text-[#C8A96B]">Nombre:</span> {venue.name}
          </p>
          <p>
            <span className="text-[#C8A96B]">Slug:</span> {venue.slug}
          </p>
          {venue.whatsapp && (
            <p>
              <span className="text-[#C8A96B]">WhatsApp:</span> {venue.whatsapp}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
