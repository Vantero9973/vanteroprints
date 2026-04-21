"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext(null);

async function cartApi(body) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data?.error) throw new Error(data.error);
  return data;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // On mount, fetch the current cart from the server using the cookie
  useEffect(() => {
    const initCart = async () => {
      try {
        const existingCart = await cartApi({ action: "get" });
        setCart(existingCart); // null if no cart or cart was completed
      } catch (err) {
        // No cart or error — start fresh
        setCart(null);
      } finally {
        setInitialized(true);
      }
    };
    initCart();
  }, []);

  const addToCart = useCallback(async (merchandiseId, quantity = 1) => {
    setLoading(true);
    try {
      const updatedCart = await cartApi({
        action: "add",
        merchandiseId,
        quantity,
      });
      setCart(updatedCart);
      setOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (lineId) => {
    setLoading(true);
    try {
      const updatedCart = await cartApi({
        action: "remove",
        lineIds: [lineId],
      });
      setCart(updatedCart); // null if cart is now empty
    } catch (err) {
      console.error("Remove from cart error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      if (quantity < 1) return removeFromCart(lineId);
      setLoading(true);
      try {
        const updatedCart = await cartApi({
          action: "update",
          lineId,
          quantity,
        });
        setCart(updatedCart);
      } catch (err) {
        console.error("Update quantity error:", err);
      } finally {
        setLoading(false);
      }
    },
    [removeFromCart]
  );

  const lineItems = cart?.lines?.edges?.map((e) => e.node) || [];
  const itemCount = lineItems.reduce((acc, line) => acc + line.quantity, 0);
  const checkoutUrl = cart?.checkoutUrl;
  const total = cart?.cost?.totalAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        open,
        setOpen,
        loading,
        initialized,
        lineItems,
        itemCount,
        checkoutUrl,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
