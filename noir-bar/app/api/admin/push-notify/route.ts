import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { venueId, title, body } = await req.json();

  // Obtener el email del dueño desde Supabase Auth
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const ownerEmail = users?.users?.[0]?.email;

  if (!ownerEmail) {
    return NextResponse.json({ error: "No se encontró email del dueño" }, { status: 400 });
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ownerEmail,
    subject: title,
    html: `<p>${body}</p>`,
  });

  return NextResponse.json({ ok: true });
}