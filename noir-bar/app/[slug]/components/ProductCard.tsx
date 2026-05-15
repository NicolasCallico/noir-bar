"use client";

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

function isExternalUrl(url?: string) {
  return !!url && (url.startsWith("http://") || url.startsWith("https://"));
}

function getProductImageUrl(imageUrl?: string) {
  if (!imageUrl) return undefined;
  if (isExternalUrl(imageUrl)) return imageUrl;
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
        "flex items-center gap-3 rounded-lg border border-border bg-card/80 transition-colors overflow-hidden",
        product.available ? "" : "opacity-60"
      )}
      style={{ maxHeight: 80 }}
     >
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-md bg-zinc-950/60 border border-border/60 overflow-hidden ml-2">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="text-2xl">{product.emoji}</div>
        )}
      </div>

      <div className="flex-1 min-w-0 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {badge && (
                <span className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                  badge.class
                )}>
                  {badge.label}
                </span>
              )}
              {product.original_price && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
                  Oferta
                </span>
              )}
              {!product.available && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
                  Sin stock
                </span>
              )}
            </div>

            <h3 className="font-serif text-sm font-semibold leading-tight text-white truncate">
              {product.name}
            </h3>
            <p className="text-xs text-muted leading-tight truncate line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex-shrink-0 text-right pr-3">
            <p className="text-lg font-semibold text-gold">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-xs text-muted line-through">{formatPrice(product.original_price)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
