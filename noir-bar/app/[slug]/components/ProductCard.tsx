"use client";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
interface Props {
  product: Product;
  isLight?: boolean;
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
export function ProductCard({ product, isLight }: Props) {
  const imageUrl = getProductImageUrl(product.image_url);
  const badge = product.badge ? badgeConfig[product.badge] : null;
  const unavailable = !product.available;
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${isLight ? "#E0D9CC" : "#141414"}` }}>
      {imageUrl ? (
        <div className={cn("w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-[#141414]", unavailable && "opacity-35")}>
          <img src={imageUrl} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ) : null}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          {badge && !unavailable && (
            <span className={cn("inline-block text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full", badge.class)}>
              {badge.label}
            </span>
          )}
          {unavailable && (
            <span className="inline-block text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full text-[#e05555] bg-[rgba(224,85,85,0.1)] border border-[rgba(224,85,85,0.3)]">
              Sin stock
            </span>
          )}
        </div>
        <div className={cn("flex items-start justify-between gap-2", unavailable && "opacity-65")}>
          <h3 className={`font-serif text-[17px] font-medium leading-tight ${isLight ? "text-[#1C1814]" : "text-[#F5F5F5]"}`}>{product.name}</h3>
          <div className="flex-shrink-0 text-right">
            <p className="text-[14px] font-medium text-[#C8A96B]">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-[11px] text-[#555] line-through">{formatPrice(product.original_price)}</p>
            )}
          </div>
        </div>
      <p className={cn(`text-[11px] mt-0.5 leading-snug line-clamp-1 ${isLight ? "text-[#9E917E]" : "text-[#666]"}`, unavailable && "opacity-65")}>
          {product.description}
        </p>
      </div>
    </div>
  );
}
