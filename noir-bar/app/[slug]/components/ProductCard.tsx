"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

export function ProductCard({ product }: Props) {
  const badge = badgeConfig[product.badge];

  return (
    <div
      className={cn(
        "flex gap-3 p-3.5 rounded-lg border border-border bg-card transition-all duration-200",
        product.available
          ? "hover:border-gold-dim active:scale-[0.99]"
          : "opacity-40 cursor-default"
      )}
    >
      {/* Imagen / Emoji */}
      <div className="w-[68px] h-[68px] flex-shrink-0 rounded-md overflow-hidden bg-[#222] flex items-center justify-center text-3xl">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={68}
            height={68}
            className="object-cover w-full h-full"
          />
        ) : (
          <span>{product.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Badges */}
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {badge && (
            <span className={cn("text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full border font-medium", badge.class)}>
              {badge.label}
            </span>
          )}
          {!product.available && (
            <span className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full border border-border text-muted font-medium">
              Sin stock
            </span>
          )}
        </div>

        {/* Nombre */}
        <h3 className="font-serif text-[17px] font-medium leading-tight text-[#F5F5F5]">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-[11px] text-muted mt-0.5 mb-2 leading-snug line-clamp-2">
          {product.description}
        </p>

        {/* Precio */}
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-gold">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
