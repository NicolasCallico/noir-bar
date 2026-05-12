import { supabase } from "@/lib/supabase";
import { Hero } from "./components/Hero";
import { PromoBar } from "./components/PromoBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductList } from "./components/ProductList";
import { WhatsAppFAB } from "./components/WhatsAppFAB";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { data: venue } = await supabase
    .from("venue_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!venue) return { title: "Menú no encontrado" };

  return {
    title: `${venue.name} — Menú`,
    description: venue.tagline,
  };
}

export default async function MenuPage({ params }: Props) {
  // Traer datos del local
  const { data: venue } = await supabase
    .from("venue_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!venue) notFound();

  // Traer categorías
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("venue_id", venue.id)
    .order("order");

  // Traer productos con su categoría
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("venue_id", venue.id)
    .order("created_at", { ascending: false });

  // Traer promociones activas
  const { data: promotions } = await supabase
    .from("promotions")
    .select("*")
    .eq("venue_id", venue.id)
    .eq("active", true);

  return (
    <main className="min-h-screen bg-bg">
      {/* Barra de promociones (si hay activas) */}
      {promotions && promotions.length > 0 && (
        <PromoBar promotions={promotions} />
      )}

      {/* Hero / Portada */}
      <Hero venue={venue} />

      {/* Filtro de categorías */}
      <CategoryFilter categories={categories || []} />

      {/* Lista de productos */}
      <ProductList
        products={products || []}
        categories={categories || []}
        showUnavailable={venue.show_unavailable}
      />

      {/* Botón flotante WhatsApp */}
      <WhatsAppFAB phone={venue.whatsapp} />
    </main>
  );
}
