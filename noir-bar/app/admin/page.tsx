"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Calendar, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";

const statusLabel: Record<string, { label: string; class: string }> = {
  new: { label: "Pendiente", class: "text-yellow-400 bg-yellow-400/10" },
  confirmed: { label: "Confirmada", class: "text-emerald-400 bg-emerald-400/10" },
  cancelled: { label: "Cancelado", class: "text-red-400 bg-red-400/10" },
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const today = new Date().toISOString().split("T")[0];

    const [productsRes, reservationsRes] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*").order("created_at", { ascending: false }),
    ]);

    setTotalProducts(productsRes.count ?? 0);
    setReservations(reservationsRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();

    // Tiempo real: escucha cambios en la tabla reservations
    const channel = supabase
      .channel("admin-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, () => {
        fetchData();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const pending = reservations.filter((r) => r.status === "new");
  const confirmed = reservations.filter((r) => r.status === "confirmed");
  const todayReservations = reservations.filter((r) => r.date === today);
  const recent = reservations.slice(0, 5);

  const stats = [
    { label: "Productos", value: totalProducts, sub: "en el menú", href: "/admin/products" },
    { label: "Pendientes", value: pending.length, sub: "sin confirmar", href: "/admin/reservations" },
    { label: "Total reservas", value: reservations.length, sub: "históricas", href: "/admin/reservations" },
  ];

  return (
    <div className="px-5 pt-5 pb-24">
      <div className="mb-6">
        <h1 className="font-serif text-2xl mb-1">Panel de administración</h1>
        <p className="text-xs text-[#888]">Carga productos, promociones y controla reservas desde el admin.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 hover:border-[#8a7248] transition-colors"
          >
            <p className="text-[10px] uppercase tracking-wider text-[#888] mb-1">{stat.label}</p>
            <p className="font-serif text-2xl text-[#C8A96B]">
              {loading ? <Loader2 size={18} className="animate-spin" /> : stat.value}
            </p>
            <p className="text-[10px] text-[#888] mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Reservas pendientes */}
      {pending.length > 0 && (
        <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-4 mb-5">
          <p className="text-[10px] uppercase tracking-wider text-yellow-400 mb-3">
            ⚠️ Reservas pendientes ({pending.length})
          </p>
          <div className="flex flex-col gap-2">
            {pending.map((r) => (
              <Link href="/admin/reservations" key={r.id} className="border border-[#2A2A2A] rounded-lg p-3 bg-[#1A1A1A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#F5F5F5]">{r.name} {r.is_birthday ? "🎂" : ""}</span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium text-yellow-400 bg-yellow-400/10">
                    Pendiente
                  </span>
                </div>
                <div className="flex gap-3 text-[11px] text-[#888]">
                  <span>👥 {r.people} personas</span>
                  <span>📅 {r.date}</span>
                  <span>🕐 {r.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reservas confirmadas */}
      {confirmed.length > 0 && (
        <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-lg p-4 mb-5">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 mb-3">
            ✅ Confirmadas ({confirmed.length})
          </p>
          <div className="flex flex-col gap-2">
            {confirmed.slice(0, 3).map((r) => (
              <Link href="/admin/reservations" key={r.id} className="border border-[#2A2A2A] rounded-lg p-3 bg-[#1A1A1A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#F5F5F5]">{r.name} {r.is_birthday ? "🎂" : ""}</span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium text-emerald-400 bg-emerald-400/10">
                    Confirmada
                  </span>
                </div>
                <div className="flex gap-3 text-[11px] text-[#888]">
                  <span>👥 {r.people} personas</span>
                  <span>📅 {r.date}</span>
                  <span>🕐 {r.time}</span>
                </div>
              </Link>
            ))}
            {confirmed.length > 3 && (
              <Link href="/admin/reservations" className="text-center text-xs text-[#C8A96B] py-1">
                Ver todas ({confirmed.length}) →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 mb-5">
        <p className="text-[10px] uppercase tracking-wider text-[#888] mb-3">Acciones rápidas</p>
        <div className="flex flex-col gap-2">
          <Link href="/admin/products?new=true" className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors">
            + Agregar producto
          </Link>
          <Link href="/admin/reservations" className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors">
            Ver todas las reservas
          </Link>
          <Link href="/admin/promotions?new=true" className="w-full py-2.5 border border-dashed border-[#8a7248] rounded-lg text-[#C8A96B] text-xs text-center hover:bg-[#C8A96B]/5 transition-colors">
            Activar promoción
          </Link>
        </div>
      </div>
    </div>
  );
}
