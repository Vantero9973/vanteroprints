"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ variantId, available }) {
  const { addToCart, loading } = useCart();

  if (!available) {
    return (
      <button
        disabled
        className="w-full bg-ink-muted border border-white/5 text-text-muted text-xs font-medium tracking-widest uppercase py-4 rounded-sm cursor-not-allowed mt-2"
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(variantId)}
      disabled={loading}
      className="w-full bg-accent text-ink text-xs font-medium tracking-widest uppercase py-4 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
    >
      {loading ? "Adding..." : "Add to cart"}
    </button>
  );
}
