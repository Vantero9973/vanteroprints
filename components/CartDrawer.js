"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function CartDrawer() {
  const {
    open,
    setOpen,
    lineItems,
    itemCount,
    checkoutUrl,
    total,
    removeFromCart,
    updateQuantity,
    loading,
  } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/5 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <span className="font-display text-lg">
            Cart{" "}
            {itemCount > 0 && (
              <span className="text-text-muted text-sm">({itemCount})</span>
            )}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-text-muted hover:text-text-primary transition-colors text-xl"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lineItems.length === 0 ? (
            <p className="text-text-muted text-sm">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {lineItems.map((line) => {
                const variant = line.merchandise;
                const product = variant.product;
                const image = product.images?.edges?.[0]?.node;

                return (
                  <div key={line.id} className="flex gap-4">
                    <div className="w-20 aspect-[5/7] relative bg-ink-muted border border-white/5 rounded-sm overflow-hidden flex-shrink-0">
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText || product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                      <span className="font-display text-sm text-text-primary">
                        {product.title}
                      </span>
                      {variant.title !== "Default Title" && (
                        <span className="text-xs text-text-muted">
                          {variant.title}
                        </span>
                      )}
                      <span className="text-sm text-accent mt-1">
                        {formatPrice(
                          variant.price.amount,
                          variant.price.currencyCode
                        )}
                      </span>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(line.id, line.quantity - 1)
                          }
                          disabled={loading}
                          className="w-6 h-6 border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors rounded-sm flex items-center justify-center text-sm disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-sm text-text-primary w-4 text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(line.id, line.quantity + 1)
                          }
                          disabled={loading}
                          className="w-6 h-6 border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20 transition-colors rounded-sm flex items-center justify-center text-sm disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(line.id)}
                      disabled={loading}
                      className="text-text-muted hover:text-text-primary transition-colors text-sm self-start mt-0.5 disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lineItems.length > 0 && (
          <div className="px-6 py-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-widest uppercase text-text-muted">
                Total
              </span>
              <span className="font-display text-2xl text-accent">
                {total && formatPrice(total.amount, total.currencyCode)}
              </span>
            </div>
            <a
              href={checkoutUrl}
              className="w-full bg-accent text-ink text-xs font-medium tracking-widest uppercase py-4 text-center rounded-sm hover:opacity-85 transition-opacity"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
