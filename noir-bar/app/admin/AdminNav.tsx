"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Calendar, Megaphone, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Productos", icon: ShoppingBag },
  { href: "/admin/reservations", label: "Reservas", icon: Calendar },
  { href: "/admin/promotions", label: "Promos", icon: Megaphone },
  { href: "/admin/settings", label: "Config", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
        <h1 className="font-serif text-xl text-[#F5F5F5]">
          NOIR <span className="text-[#C8A96B]">·</span> ADMIN
        </h1>
        <span className="text-[10px] text-emerald-400 tracking-widest uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Live
        </span>
      </div>

      {/* Bottom tab nav (mobile first) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#2A2A2A] flex justify-around z-50 px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] tracking-wide transition-colors min-w-[50px]",
                isActive ? "text-[#C8A96B]" : "text-[#888] hover:text-[#F5F5F5]"
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
