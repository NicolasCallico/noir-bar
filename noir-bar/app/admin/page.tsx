import { supabase } from "@/lib/supabase";
import { ShoppingBag, Calendar, QrCode, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  // Stats en paralelo
  const results = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("reservations").select("*", { count: "exact", head: true }),
    supabase.from("reservations").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("reservations").select("*", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const totalProducts = results[0].count ?? 0;
  const totalReservations = results[1].count ?? 0;
  const recentReservations = results[2].data ?? [];
  const pendingReservations = results[3].count ?? 0;

  const stats = [
    { label: "Productos", value: totalProducts ?? 0, sub: "en el menú", icon: ShoppingBag, href: "/admin/products" },
    { label: "Reservas hoy", value: pendingReservations ?? 0, sub: "pendientes", icon: Calendar, href: "/admin/reservations" },
    { label: "Total reservas", value: totalReservations ?? 0, sub: "históricas", icon: TrendingUp, href: "/admin/reservations" },
  ];

  const statusLabel: Record<string, { label: string; class: string }> = {
    new: { label: "Nuevo", class: "text-emerald-400 bg-emerald-400/10" },
    confirmed: { label: "Confirmado", class: "text-gold bg-gold/10" },
    cancelled: { label: "Cancelado", class: "text-red-400 bg-red-400/10" },
  };

  return (
    <div className="px-5 pt-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 hover:border-[#8a7248] transition-colors"
          >
            <p className="text-[10px] uppercase tracking-wider text-[#888] mb-1">{stat.label}</p>
            <p className="font-serif text-2xl text-[#C8A96B]">{stat.value}</p>
            <p className="text-[10px] text-[#888] mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 mb-5">
        <p className="text-[10px] uppercase tracking-wider text-[#888] mb-3">Acciones rápidas</p>
        <div className="flex flex-col gap-2">
          <Link
            href="/admin/products?new=true"
            className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors"
          >
            + Agregar producto
          </Link>
          <Link
            href="/admin/reservations"
            className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors"
          >
            Ver reservas pendientes
          </Link>
          <Link
            href="/admin/promotions?new=true"
            className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors"
          >
            Activar promoción
          </Link>
        </div>
      </div>

      {/* Últimas reservas */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4">
        <p className="text-[10px] uppercase tracking-wider text-[#888] mb-3">Últimas reservas</p>
        {recentReservations && recentReservations.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentReservations.map((r) => (
              <div key={r.id} className="border border-[#2A2A2A] rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">
                    {r.name} {r.is_birthday ? "🎂" : ""}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${statusLabel[r.status]?.class}`}>
                    {statusLabel[r.status]?.label}
                  </span>
                </div>
                <div className="flex gap-3 text-[11px] text-[#888]">
                  <span>👥 {r.people} personas</span>
                  <span>📅 {r.date}</span>
                  <span>🕐 {r.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#888] text-center py-4">No hay reservas aún</p>
        )}
      </div>
    </div>
  );
}
