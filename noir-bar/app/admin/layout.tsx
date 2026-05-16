"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.access_token && pathname !== "/admin/login") {
        router.replace("/admin/login");
        return;
      }

      setCheckingAuth(false);
    });

    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
        return;
      }

      setCheckingAuth(false);
    }

    checkAuth();

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, [pathname, router]);

  if (checkingAuth && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-[#888]">
        Cargando administración...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-[#F5F5F5]">
      <AdminNav />
      <main className="pb-20">{children}</main>
    </div>
  );
}