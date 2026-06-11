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
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(`category-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  return (
    <div
      style={{
        borderBottom: `1px solid ${isLight ? "#E0D9CC" : "#1a1a1a"}`,
        backgroundColor: isLight ? "#FAF8F3" : "#0D0D0D",
      }}
      className="w-full px-4 py-3 overflow-x-auto no-scrollbar"
    >
      <div className="flex gap-2 md:justify-center">
        <button
          onClick={() => handleClick(null)}
          style={{
            background: active === null
              ? isLight ? "rgba(138,101,53,0.08)" : "rgba(200,169,107,0.08)"
              : "rgba(255,255,255,0.03)",
            border: `1px solid ${active === null
              ? isLight ? "rgba(138,101,53,0.4)" : "rgba(200,169,107,0.4)"
              : isLight ? "#D5CCBC" : "#222"}`,
            borderRadius: "12px",
            padding: "10px 16px",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: "64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "20px" }}>✦</span>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: active === null
                ? isLight ? "#8A6535" : "#C8A96B"
                : isLight ? "#8A7E6E" : "#666",
            }}
          >
            Todos
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            style={{
              background: active === cat.id
                ? isLight ? "rgba(138,101,53,0.08)" : "rgba(200,169,107,0.08)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${active === cat.id
                ? isLight ? "rgba(138,101,53,0.4)" : "rgba(200,169,107,0.4)"
                : isLight ? "#D5CCBC" : "#222"}`,
              borderRadius: "12px",
              padding: "10px 16px",
              cursor: "pointer",
              transition: "all 0.2s",
              minWidth: "64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "20px" }}>{cat.icon}</span>
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: active === cat.id
                  ? isLight ? "#8A6535" : "#C8A96B"
                  : isLight ? "#8A7E6E" : "#666",
              }}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
