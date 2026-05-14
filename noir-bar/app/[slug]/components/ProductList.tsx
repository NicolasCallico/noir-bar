"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  categories: Category[];
  showUnavailable: boolean;
}

export function ProductList({ products, categories, showUnavailable }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveCategoryId((e as CustomEvent).detail);
    };
    window.addEventListener("filterCategory", handler);
    return () => window.removeEventListener("filterCategory", handler);
  }, []);

  const filtered = products.filter((p) => {
    if (!showUnavailable && !p.available) return false;
    if (activeCategoryId && p.category_id !== activeCategoryId) return false;
    return true;
  });

  const grouped = categories
    .map((cat) => ({
      category: cat,
      products: filtered.filter((p) => p.category_id === cat.id),
    }))
    .filter((g) => g.products.length > 0);

  if (filtered.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[30px] border border-border bg-card/70 p-8 text-center text-muted shadow-xl shadow-black/20">
        <span className="text-5xl mb-4">😔</span>
        <p className="text-lg font-medium text-white">No hay productos disponibles.</p>
        <p className="mt-2 text-sm text-muted">Intenta cambiar de categoría o vuelve más tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-5 pb-24 pt-4 sm:px-6 lg:px-8">
      {grouped.map((group, groupIdx) => (
        <section key={group.category.id} className="space-y-5">
          {!activeCategoryId && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.05 }}
              className="flex flex-col gap-3"
            >
<div className="flex items-center gap-4">
  <span className="font-serif text-xl text-[#F5F5F5]">
    {group.category.icon} {group.category.name}
  </span>
  <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
  <span className="text-[10px] uppercase tracking-widest text-gold/60 border border-gold/20 rounded-full px-3 py-1">
    {group.products.length}
  </span>
</div>
            </motion.div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {group.products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      ))}
    </div>
  );
}
