import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { subscription, venueId } = await req.json();
  if (!subscription || !venueId) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const supabase = createSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Faltan variables de entorno de Supabase." },
      { status: 500 }
    );
  }

  const { data: existing } = await supabase
    .from("push_subscriptions")
    .select("id")
    .eq("venue_id", venueId)
    .eq("subscription->>endpoint", subscription.endpoint)
    .single();

  if (!existing) {
    await supabase.from("push_subscriptions").insert({ venue_id: venueId, subscription });
  }

  return NextResponse.json({ ok: true });
}