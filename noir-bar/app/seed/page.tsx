import { supabase } from "@/lib/supabase";

export default async function SeedPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div style={{ padding: 20 }}>
        <h1>⚠️ Configuración de Supabase incompleta</h1>
        <p>La página de seed requiere las variables de entorno de Supabase para funcionar.</p>
      </div>
    );
  }

  const result = await supabase
    .from("venue_settings")
    .select("*")
    .eq("slug", "noir-bar")
    .single();

  if (result.data) {
    return (
      <div style={{ padding: 20 }}>
        <h1>✅ Venue encontrado</h1>
        <p>Slug: {result.data.slug}</p>
        <p>Nombre: {result.data.name}</p>
        <p>URL del menú: <a href="/noir-bar">/noir-bar</a></p>
      </div>
    );
  }

  // Si no existe, intentar crear
  const { error } = await supabase.from("venue_settings").insert({
    id: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    slug: 'noir-bar',
    name: 'Noir Bar',
    tagline: 'Cocktails artesanales & gastronomía de autor',
    whatsapp: '5491112345678',
    instagram: 'noirbar.ba',
    address: 'Calle Principal 123, Buenos Aires',
    primary_color: '#C8A96B',
    show_unavailable: true,
  });

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h1>❌ Error al crear venue</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Venue creado exitosamente</h1>
      <p>Ahora puedes acceder al menú en: <a href="/noir-bar">/noir-bar</a></p>
    </div>
  );
}
