"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminNav } from "./AdminNav";
import { LayoutDashboard, ShoppingBag, Tag, Calendar, Settings, Megaphone } from "lucide-react";
import Link from "next/link";

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

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, session: any) => {
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

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-[#888]">
        Cargando...
      </div>
    );
  }

  if (!authenticated && pathname !== "/admin/login") return null;

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#111] text-[#F5F5F5]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] flex flex-col">
      {/* Header siempre arriba */}
      <AdminNav />

      {/* En desktop: sidebar + contenido. En mobile: solo contenido */}
      <div className="flex flex-1">

        {/* Sidebar solo en desktop */}
        <aside className="hidden md:flex flex-col w-56 border-r border-[#2A2A2A] bg-[#111] fixed top-[61px] bottom-0 left-0 z-40">
          <AdminSidebarLinks />
        </aside>

        {/* Contenido principal */}
      <main className="flex-1 md:ml-56 pb-20 md:pb-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto overflow-x-hidden w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

// Links del sidebar desktop
function AdminSidebarLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Inicio", icon: LayoutDashboard },
    { href: "/admin/products", label: "Productos", icon: ShoppingBag },
    { href: "/admin/categories", label: "Categorías", icon: Tag },
    { href: "/admin/reservations", label: "Reservas", icon: Calendar },
    { href: "/admin/promotions", label: "Promociones", icon: Megaphone },
    { href: "/admin/settings", label: "Local", icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-1 p-3 pt-4">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-[#C8A96B]/10 text-[#C8A96B] font-medium"
                : "text-[#888] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]"
            }`}
          >
            <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
            {label}
        </Link>);
      })}
    </nav>
  );
}
