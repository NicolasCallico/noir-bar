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
    <div className="mx-auto w-full max-w-4xl space-y-5 px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      {grouped.map((group, groupIdx) => (
        <section key={group.category.id} className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.05 }}
            className="flex flex-col gap-2"
          >
            <div className="rounded-[1.5rem] border border-gold/10 bg-[#090909]/85 p-4 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.7)] sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold/60">Carta</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-white">
                {group.category.icon} {group.category.name}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <AnimatePresence>
              {group.products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, delay: idx * 0.02 }}
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
