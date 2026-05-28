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
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail;
      setActiveCategoryId(id);
      // Si filtra por una categoría específica, la abre automáticamente
      if (id) {
        setOpenSections(new Set([id]));
      } else {
        // Vuelve a "Todos" → cierra todo
        setOpenSections(new Set());
      }
    };
    window.addEventListener("filterCategory", handler);
    return () => window.removeEventListener("filterCategory", handler);
  }, []);

  function toggleSection(categoryId: string) {
    setOpenSections((prev) => {
      const next = new Set<string>();
      // Si ya estaba abierta, la cierra (next queda vacío)
      // Si estaba cerrada, abre solo esta y cierra las demás
      if (!prev.has(categoryId)) {
        next.add(categoryId);
      }
      return next;
    });
  }

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
      <div className="flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
        <span className="text-4xl mb-3">😔</span>
        <p className="text-sm font-medium text-white">No hay productos disponibles.</p>
        <p className="mt-1 text-xs text-[#555]">Intentá cambiar de categoría.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-2 sm:px-6">
      {grouped.map((group, groupIdx) => {
        const isOpen = openSections.has(group.category.id);
        return (
          <section key={group.category.id} className="mb-2">
            {/* Header clickeable del accordion */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.05 }}
              onClick={() => toggleSection(group.category.id)}
              className="w-full flex items-center gap-3 py-3.5 px-1 mb-0 cursor-pointer bg-transparent border-none text-left group"
            >
              <span className="font-serif text-2xl text-[#F5F5F5]">
                {group.category.icon} {group.category.name}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(200,169,107,0.3)] to-transparent" />
              <span className="text-[10px] text-[#444] mr-1">{group.products.length}</span>
              {/* Chevron animado */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[#C8A96B] opacity-60 text-xs"
              >
                ▾
              </motion.span>
            </motion.button>

            {/* Línea separadora */}
            <div className="h-[1px] bg-[#1a1a1a] mb-1" />

            {/* Productos con animación */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {group.products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}
