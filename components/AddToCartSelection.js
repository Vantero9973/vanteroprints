"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function AddToCartSection({ variant }) {
  const { addToCart, updateQuantity, lineItems, loading } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);

  const lineItem = lineItems.find((line) => line.merchandise.id === variant.id);
  const quantityInCart = lineItem?.quantity || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <div className="flex justify-between items-baseline py-4 border-y border-white/5">
        <span className="text-xs tracking-widest uppercase text-text-muted">
          Price
        </span>
        <span className="font-display text-3xl text-accent">
          {formatPrice(variant.price.amount, variant.price.currencyCode)}
        </span>
      </div>

      {!variant.availableForSale ? (
        <button
          disabled
          className="w-full bg-black border border-white/5 text-text-muted text-xs font-medium tracking-widest uppercase py-4 rounded-sm cursor-not-allowed"
        >
          Sold out
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-stretch gap-2">
            {/* Quantity */}
            <div className="flex items-center border border-white/10 rounded-sm px-1">
              <button
                onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                className="w-7 h-full text-text-muted hover:text-text-primary transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-sm text-text-primary w-5 text-center">
                {selectedQty}
              </span>
              <button
                onClick={() => setSelectedQty((q) => q + 1)}
                className="w-7 h-full text-text-muted hover:text-text-primary transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => {
                if (quantityInCart > 0) {
                  updateQuantity(lineItem.id, quantityInCart + selectedQty);
                } else {
                  addToCart(variant.id, selectedQty);
                }
              }}
              disabled={loading}
              className="flex-1 bg-[#c0392b] text-white text-xs font-medium tracking-widest uppercase py-4 rounded-sm hover:bg-[#a93226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add to cart"}
            </button>
          </div>

          {quantityInCart > 0 && (
            <p className="text-xs text-text-muted tracking-wide text-center">
              {quantityInCart} already in cart
            </p>
          )}
        </div>
      )}
    </div>
  );
}
