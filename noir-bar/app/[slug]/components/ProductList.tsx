"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { formatPrice } from "@/lib/utils";

interface Props {
  products: Product[];
  categories: Category[];
  showUnavailable: boolean;
}

export function ProductList({ products, categories, showUnavailable }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Escuchar el evento del CategoryFilter
  useEffect(() => {
    const handler = (e: Event) => {
      setActiveCategoryId((e as CustomEvent).detail);
    };
    window.addEventListener("filterCategory", handler);
    return () => window.removeEventListener("filterCategory", handler);
  }, []);

  // Filtrar productos
  const filtered = products.filter((p) => {
    if (!showUnavailable && !p.available) return false;
    if (activeCategoryId && p.category_id !== activeCategoryId) return false;
    return true;
  });

  // Agrupar por categoría para mostrar sección
  const grouped = categories
    .map((cat) => ({
      category: cat,
      products: filtered.filter((p) => p.category_id === cat.id),
    }))
    .filter((g) => g.products.length > 0);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted">
        <span className="text-4xl mb-3">🍽️</span>
        <p className="text-sm">No hay productos en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="px-5 pb-24 pt-4">
      {grouped.map((group, groupIdx) => (
        <div key={group.category.id} className="mb-6">
          {/* Título de sección (solo si mostramos varios) */}
          {!activeCategoryId && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: groupIdx * 0.05 }}
              className="font-serif text-[11px] tracking-[0.15em] uppercase text-muted pb-2 border-b border-border mb-3"
            >
              {group.category.icon} {group.category.name}
            </motion.h2>
          )}

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {group.products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
