"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function AddToCartSection({ variant }) {
  const { addToCart, removeFromCart, updateQuantity, lineItems, loading } =
    useCart();

  const lineItem = lineItems.find((line) => line.merchandise.id === variant.id);
  const quantityInCart = lineItem?.quantity || 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-baseline py-4 border-y border-white/5">
        <span className="text-sm tracking-widest uppercase text-text-muted">
          Price
        </span>
        <span className="font-display text-2xl text-accent">
          {formatPrice(variant.price.amount, variant.price.currencyCode)}
        </span>
      </div>

      {!variant.availableForSale ? (
        <button
          disabled
          className="w-full bg-ink-muted border border-white/5 text-text-muted text-xs font-medium tracking-widest uppercase py-4 rounded-sm cursor-not-allowed"
        >
          Sold out
        </button>
      ) : quantityInCart === 0 ? (
        <button
          onClick={() => addToCart(variant.id)}
          disabled={loading}
          className="w-full bg-accent text-ink text-xs font-medium tracking-widest uppercase py-4 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add to cart"}
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateQuantity(lineItem.id, quantityInCart - 1)}
              disabled={loading}
              className="w-8 h-8 border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors rounded-sm flex items-center justify-center disabled:opacity-50"
            >
              −
            </button>
            <span className="text-sm text-text-primary w-4 text-center">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(lineItem.id, quantityInCart + 1)}
              disabled={loading}
              className="w-8 h-8 border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors rounded-sm flex items-center justify-center disabled:opacity-50"
            >
              +
            </button>
          </div>
          <span className="text-sm text-text-muted">
            {quantityInCart} in cart
          </span>
        </div>
      )}
    </div>
  );
}
