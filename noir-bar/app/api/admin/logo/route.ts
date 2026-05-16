import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LOGO_BUCKET = "products";

function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, detectSessionInUrl: false },
  });
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace(/^Bearer\s+/, "");

  if (!accessToken) {
    return NextResponse.json({ error: "Falta token de autorización." }, { status: 401 });
  }

  const supabaseAdmin = createAdminClient();
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Falta la clave de servicio de Supabase en las variables de entorno." }, { status: 500 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Token inválido o usuario no autorizado." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const venueId = formData.get("venueId");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Debe enviarse un archivo de imagen válido." }, { status: 400 });
  }

  if (typeof venueId !== "string") {
    return NextResponse.json({ error: "Falta el ID del local." }, { status: 400 });
  }

  const fileExtension = file.name.split(".").pop() || "png";
  const filePath = `logos/${venueId}/logo-${Date.now()}.${fileExtension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(LOGO_BUCKET)
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 });
  }

  const publicResult = supabaseAdmin.storage
    .from(LOGO_BUCKET)
    .getPublicUrl(filePath);

  if (!publicResult?.data?.publicUrl) {
    return NextResponse.json({ error: "No se pudo obtener la URL pública del logo." }, { status: 500 });
  }

  const publicData = publicResult.data;
  const { error: updateError } = await supabaseAdmin
    .from("venue_settings")
    .update({ logo_image_url: publicData.publicUrl })
    .eq("id", venueId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ publicUrl: publicData.publicUrl });
}
