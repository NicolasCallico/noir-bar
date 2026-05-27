"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
        return;
      }
      setAuthenticated(!!session);
      setCheckingAuth(false);
    }
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
        setAuthenticated(false);
        return;
      }
      setAuthenticated(!!session);
      setCheckingAuth(false);
    });

    return () => { authListener?.subscription?.unsubscribe?.(); };
  }, [pathname, router]);

  // Mientras verifica, no mostrar nada
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-[#888]">
        Cargando...
      </div>
    );
  }

  // Si no está autenticado y no es la página de login, no renderizar nada
  if (!authenticated && pathname !== "/admin/login") {
    return null;
  }

  // Si es la página de login, renderizarla sin el nav
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#111] text-[#F5F5F5]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#111] text-[#F5F5F5]">
      <AdminNav />
      <main className="pb-20">{children}</main>
    </div>
  );
}
