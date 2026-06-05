import { createSupabaseServerClient } from "./supabase-server";
import type { VenueSettings } from "./types";

export async function getVenueByOwnerServer(): Promise<VenueSettings | null> {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data } = await supabase
    .from("venue_settings")
    .select("*")
    .eq("owner_id", session.user.id)
    .single();

  return data;
}