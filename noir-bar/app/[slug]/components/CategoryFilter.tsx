"use client";
import { useState } from "react";
import type { Category } from "@/lib/types";
interface Props {
  categories: Category[];
  onFilter?: (categoryId: string | null) => void;
}
export function CategoryFilter({ categories, onFilter }: Props) {
  const [active, setActive] = useState<string | null>(null);
  function handleClick(id: string | null) {
    setActive(id);
    onFilter?.(id);
    window.dispatchEvent(new CustomEvent("filterCategory", { detail: id }));
  }
  return (
    <div style={{ position: "sticky", top: "44px", zIndex: 30, backgroundColor: "#0D0D0D", borderBottom: "1px solid #2A2A2A" }}>
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleClick(null)}
          className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${active === null ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B] font-medium" : "border-[#2A2A2A] text-[#888] hover:text-[#F5F5F5]"}`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap ${active === cat.id ? "bg-[#C8A96B] text-[#0D0D0D] border-[#C8A96B] font-medium" : "border-[#2A2A2A] text-[#888] hover:text-[#F5F5F5]"}`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
