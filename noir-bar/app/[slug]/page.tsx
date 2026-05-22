import { supabase } from "@/lib/supabase";
import { VenueSettings, Category, Product, Promotion } from "@/lib/types";
import { Hero } from "./components/Hero";
import { PromoBar } from "./components/PromoBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductList } from "./components/ProductList";
import { WhatsAppFAB } from "./components/WhatsAppFAB";
import { notFound } from "next/navigation";
export const revalidate = 0;
interface Props {
  params: { slug: string };
}
export async function generateMetadata({ params }: Props) {
  const result = await supabase
    .from("venue_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();
  const venue = (result.data as unknown) as VenueSettings | null;
  if (!venue) return { title: "Menú no encontrado" };
  return {
    title: `${venue.name || "Menú"} — Menú`,
    description: venue.tagline || "Menú del local",
  };
}
export default async function MenuPage({ params }: Props) {
  const venueResult = await supabase
    .from("venue_settings")
    .select("*")
    .eq("slug", params.slug)
    .single();
  const venue = (venueResult.data as unknown) as VenueSettings | null;
  if (!venue) notFound();
  const categoriesResult = await supabase
    .from("categories")
    .select("*")
    .eq("venue_id", venue.id)
    .order("order");
  const categories = (categoriesResult.data as unknown) as Category[] | null;
  const productsResult = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("venue_id", venue.id)
    .order("created_at", { ascending: false });
  const products = (productsResult.data as unknown) as Product[] | null;
  const promotionsResult = await supabase
    .from("promotions")
    .select("*")
    .eq("venue_id", venue.id)
    .eq("active", true);
  const promotions = (promotionsResult.data as unknown) as Promotion[] | null;
  return (
    <main className="min-h-screen bg-bg">
      {/* Hero / Portada */}
      <Hero venue={venue} />
      {/* Barra de promociones (si hay activas) */}
      {promotions && promotions.length > 0 && (
        <PromoBar promotions={promotions} />
      )}
      {/* Filtro de categorías */}
      <CategoryFilter categories={categories || []} />
      {/* Lista de productos */}
      <ProductList
        products={products || []}
        categories={categories || []}
        showUnavailable={venue.show_unavailable}
      />
      {/* Botón flotante WhatsApp */}
      <WhatsAppFAB phone={venue.whatsapp} instagram={venue.instagram} />
    </main>
  );
}
