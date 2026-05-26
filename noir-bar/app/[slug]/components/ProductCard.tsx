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
  if (imageUrl.startsWith("/")) return `${supabaseUrl}${imageUrl}`;
  return `${supabaseUrl}/storage/v1/object/public/products/${imageUrl.replace(/^\/+/, "")}`;
}
const badgeConfig: Record<string, { label: string; class: string }> = {
  hot: { label: "CLÁSICO DE LA CASA", class: "text-[#e05555] bg-[rgba(224,85,85,0.1)] border border-[rgba(224,85,85,0.2)]" },
  new: { label: "NOVEDAD", class: "text-[#50c878] bg-[rgba(80,200,120,0.1)] border border-[rgba(80,200,120,0.2)]" },
  gold: { label: "RECOMENDADO", class: "text-[#C8A96B] bg-[rgba(200,169,107,0.1)] border border-[rgba(200,169,107,0.2)]" },
};
export function ProductCard({ product }: Props) {
  const imageUrl = getProductImageUrl(product.image_url);
  const badge = product.badge ? badgeConfig[product.badge] : null;
  return (
    <div className={cn("flex items-center gap-3 py-3 border-b border-[#141414]", !product.available && "opacity-40")}>
      {imageUrl ? (
        <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-[#141414]">
          <img src={imageUrl} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-[#141414] flex items-center justify-center text-2xl">
          {product.emoji}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {badge && (
          <span className={cn("inline-block text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full mb-1", badge.class)}>
            {badge.label}
          </span>
        )}
        {!product.available && (
          <span className="inline-block text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full mb-1 text-[#555] bg-[rgba(80,80,80,0.12)] border border-[#2a2a2a]">
            Sin stock
          </span>
        )}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-[17px] font-medium text-[#F5F5F5] leading-tight">{product.name}</h3>
          <div className="flex-shrink-0 text-right">
            <p className="text-[14px] font-medium text-[#C8A96B]">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-[11px] text-[#555] line-through">{formatPrice(product.original_price)}</p>
            )}
          </div>
        </div>
        <p className="text-[11px] text-[#666] mt-0.5 leading-snug line-clamp-1">{product.description}</p>
      </div>
    </div>
  );
}
