import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verificar sesión
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#111] text-[#F5F5F5]">
      <AdminNav />
      <main className="pb-20">{children}</main>
    </div>
  );
}
