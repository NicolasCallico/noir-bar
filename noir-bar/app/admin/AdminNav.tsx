"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Calendar, Settings, Bell, BellOff, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePushNotifications } from "@/lib/usePushNotifications";

const VENUE_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

const navItems = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/products", label: "Productos", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categorías", icon: Tag },
  { href: "/admin/reservations", label: "Reservas", icon: Calendar },
  { href: "/admin/settings", label: "Local", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const { supported, subscribed, loading, subscribe, unsubscribe } = usePushNotifications(VENUE_ID);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] bg-[#111]">
  <img src="/nox-logo.png" alt="NOX" className="h-12 w-auto" />
        <div className="flex items-center gap-2 flex-shrink-0">
          {supported && (
            <button
              onClick={subscribed ? unsubscribe : subscribe}
              disabled={loading}
              title={subscribed ? "Desactivar notificaciones" : "Activar notificaciones"}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
                subscribed
                  ? "border-[#C8A96B] text-[#C8A96B]"
                  : "border-[#2A2A2A] text-[#888] hover:border-[#C8A96B] hover:text-[#C8A96B]"
              }`}
            >
              {loading ? <span className="text-[10px]">...</span> : subscribed ? <Bell size={14} /> : <BellOff size={14} />}
            </button>
          )}
          <span className="text-[10px] text-emerald-400 tracking-widest uppercase flex items-center gap-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Live
          </span>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#2A2A2A] flex justify-around z-50 px-1 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[9px] tracking-wide transition-colors min-w-0 flex-1",
                isActive ? "text-[#C8A96B]" : "text-[#888] hover:text-[#F5F5F5]"
              )}
            >
              <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
