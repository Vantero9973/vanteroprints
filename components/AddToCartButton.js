"use client";

import { useState } from "react";
import { createCartWithItem } from "@/lib/shopify";

export default function AddToCartButton({
  variantId,
  available,
  label = "Purchase",
}) {
  const [loading, setLoading] = useState(false);

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

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchandiseId: variantId, quantity: 1 }),
      });
      const result = await res.json();
      if (result.cart?.checkoutUrl) {
        window.location.href = result.cart.checkoutUrl;
      }
    } catch (err) {
      console.error("Cart error:", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-accent text-ink text-xs font-medium tracking-widest uppercase py-4 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}
