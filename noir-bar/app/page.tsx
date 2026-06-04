import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { VenueSettings } from "@/lib/types";

export default async function Home() {
  // Intenta redirigir al slug configurado
  if (process.env.NEXT_PUBLIC_VENUE_SLUG) {
    redirect(`/${process.env.NEXT_PUBLIC_VENUE_SLUG}`);
  }

  // Si no hay slug configurado, obtén el primer venue
  try {
    const { data: venues } = await supabase
      .from("venue_settings")
      .select("slug")
      .limit(1);

    if (venues && venues.length > 0) {
      const firstVenue = (venues[0] as any) as VenueSettings;
      redirect(`/${firstVenue.slug}`);
    }
  } catch (error) {
    console.error("Error fetching venues:", error);
  }

  // Fallback: mostrar error
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D] text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">⚠️ Configuración incompleta</h1>
        <p className="mb-4 text-gray-400">No se encontraron locales configurados</p>
        <p className="text-sm text-gray-500">
          Contacta al administrador para configurar tu menú digital
        </p>
      </div>
    </div>
  );
}