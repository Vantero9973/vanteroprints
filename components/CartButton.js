"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { itemCount, setOpen } = useCart();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-40 bg-[#c0392b] text-white flex items-center gap-2.5 px-4 py-3 rounded-sm shadow-lg hover:opacity-90 transition-opacity"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      <span className="text-white text-sm font-normal tracking-widest uppercase">
        Cart
      </span>
      <span className="text-white text-sm font-semibold flex items-center justify-center">
        {itemCount}
      </span>
    </button>
  );
}
