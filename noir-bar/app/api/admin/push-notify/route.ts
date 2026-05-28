import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const resend = new Resend(process.env.RESEND_API_KEY);

webpush.setVapidDetails(
  "mailto:admin@noir-bar.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  const { venueId, title, body, url } = await req.json();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // 1. Enviar mail
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const ownerEmail = users?.users?.[0]?.email;

  if (ownerEmail) {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ownerEmail,
      subject: title,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #C8A96B; margin-bottom: 8px;">🍸 ${title}</h2>
          <div style="font-size: 15px; color: #333; line-height: 1.8;">${body}</div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 14px; color: #555;">
            Contactate con el cliente para confirmar o cancelar dicha reserva.
          </p>
        </div>
      `,
    });
  }

  // 2. Enviar push notification
  const { data: subs } = await supabaseAdmin
    .from("push_subscriptions")
    .select("subscription")
    .eq("venue_id", venueId);

  if (subs && subs.length > 0) {
    const payload = JSON.stringify({ title, body, url });
    await Promise.allSettled(
      subs.map((s) => webpush.sendNotification(s.subscription, payload))
    );
  }

  return NextResponse.json({ ok: true });
}