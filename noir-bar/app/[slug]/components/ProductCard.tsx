"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
}

const badgeConfig = {
  gold: { label: "⭐ Destacado", class: "bg-gold/10 text-gold border-gold/25" },
  new: { label: "Nuevo", class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" },
  hot: { label: "🔥 Más vendido", class: "bg-red-500/10 text-red-400 border-red-500/25" },
  "": null,
};

function getProductImageUrl(imageUrl?: string) {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl) return imageUrl;
  if (imageUrl.startsWith("/")) {
    return `${supabaseUrl}${imageUrl}`;
  }
  return `${supabaseUrl}/storage/v1/object/public/products/${imageUrl.replace(/^\/+/, "")}`;
}

export function ProductCard({ product }: Props) {
  const badge = badgeConfig[product.badge];
  const imageUrl = getProductImageUrl(product.image_url);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[26px] border border-border bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-gold-dim/50",
        product.available ? "" : "opacity-60"
      )}
    >
      <div className="grid gap-4 md:grid-cols-[160px_1fr] p-4 md:p-5">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950/70 border border-border/60 shadow-inner shadow-black/30 min-h-[160px] md:min-h-[180px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 160px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-muted">
              {product.emoji}
            </div>
          )}
          {!product.available && (
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
              Sin stock
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {badge && (
                <span className={cn(
                  "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em]",
                  badge.class
                )}>
                  {badge.label}
                </span>
              )}
              {product.original_price && (
                <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted">
                  Oferta
                </span>
              )}
            </div>

            <h3 className="font-serif text-lg font-semibold leading-tight text-white">
              {product.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 pt-2">
            <div>
              <p className="text-2xl font-semibold text-gold">{formatPrice(product.price)}</p>
              {product.original_price && (
                <p className="text-xs text-muted line-through">{formatPrice(product.original_price)}</p>
              )}
            </div>

            {product.available && (
              <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Disponible
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
