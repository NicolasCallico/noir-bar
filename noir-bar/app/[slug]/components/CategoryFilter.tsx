"use client";
import { useState } from "react";
import type { Category } from "@/lib/types";
interface Props {
  categories: Category[];
  onFilter?: (categoryId: string | null) => void;
  isLight?: boolean;
}
export function CategoryFilter({ categories, onFilter, isLight }: Props) {
  const [active, setActive] = useState<string | null>(null);
  function handleClick(id: string | null) {
    setActive(id);
    onFilter?.(id);
    window.dispatchEvent(new CustomEvent("filterCategory", { detail: id }));
    // Scroll suave hacia la sección si filtra por categoría
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(`category-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  return (
<div style={{ borderBottom: `1px solid ${isLight ? "#E0D9CC" : "#2A2A2A"}`, backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D" }} className="flex md:justify-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
      <button
        onClick={() => handleClick(null)}
className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
          active === null
            ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B] font-medium"
            : isLight ? "border-[#D5CCBC] text-[#8A7E6E] hover:text-[#1C1814]" : "border-[#2A2A2A] text-[#888] hover:text-[#F5F5F5]"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap ${
            active === cat.id
              ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B] font-medium"
      : isLight ? "border-[#D5CCBC] text-[#8A7E6E] hover:text-[#1C1814]" : "border-[#2A2A2A] text-[#888] hover:text-[#F5F5F5]"
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
