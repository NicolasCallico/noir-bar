"use client";

import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
}

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
  const imageUrl = getProductImageUrl(product.image_url);
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[1.25rem] border bg-[#0d0d0d]/95 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-16px_rgba(200,169,107,0.22)]",
        product.available
          ? "border-border"
          : "border-red-500/30 bg-[#170606]"
      )}
    >
      <div className="bg-[#111] px-3 py-3">
        {imageUrl ? (
          <div className="relative mx-auto flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-[#090909]">
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="max-h-full w-full object-contain object-center transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-24 w-full items-center justify-center rounded-xl bg-zinc-950 text-3xl">
            {product.emoji}
          </div>
        )}
      </div>

      <div className="space-y-2 p-3 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-base font-semibold leading-tight text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-[13px] leading-5 text-[#c2c2c2] max-h-14 overflow-hidden">
              {product.description}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-base font-semibold text-gold">{formatPrice(product.price)}</p>
            {product.original_price ? (
              <p className="text-[11px] text-muted line-through">{formatPrice(product.original_price)}</p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 text-sm">
          {product.original_price ? (
            <span className="rounded-full border border-gold/20 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-gold/70">
              Oferta
            </span>
          ) : (
            <div className="h-4" />
          )}

          {!product.available && (
            <span className="rounded-full bg-red-500/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm shadow-red-500/20">
              Sin stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
