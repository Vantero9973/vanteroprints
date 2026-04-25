import {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
} from "@/lib/shopify";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const CART_COOKIE = "vantero_cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function cartCookieHeader(cartId) {
  const isProduction = process.env.NODE_ENV === "production";
  const parts = [
    `${CART_COOKIE}=${cartId}`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    `Path=/`,
    `SameSite=Lax`,
  ];
  if (isProduction) parts.push("Secure");
  if (isProduction) parts.push("Domain=.vanteroprints.com");
  return parts.join("; ");
}

function clearCookieHeader() {
  return `${CART_COOKIE}=; Max-Age=0; Path=/`;
}

export async function POST(req) {
  const cookieStore = await cookies();
  const { action, merchandiseId, quantity, lineIds, lineId } = await req.json();

  try {
    let cartId = cookieStore.get(CART_COOKIE)?.value;
    let cart = null;

    if (cartId) {
      cart = await getCart(cartId);
    }

    if (action === "get") {
      if (!cart) {
        return Response.json(null, {
          headers: { "Set-Cookie": clearCookieHeader() },
        });
      }
      return Response.json(cart);
    }

    if (action === "add") {
      if (!cart) {
        cart = await createCart();
        cart = await addToCart(cart.id, merchandiseId, quantity || 1);
      } else {
        cart = await addToCart(cart.id, merchandiseId, quantity || 1);
      }
      return Response.json(cart, {
        headers: { "Set-Cookie": cartCookieHeader(cart.id) },
      });
    }

    if (action === "remove") {
      if (!cart) return Response.json(null);
      cart = await removeFromCart(cart.id, lineIds);
      const remaining = cart?.lines?.edges?.length || 0;
      if (remaining === 0) {
        return Response.json(null, {
          headers: { "Set-Cookie": clearCookieHeader() },
        });
      }
      return Response.json(cart, {
        headers: { "Set-Cookie": cartCookieHeader(cart.id) },
      });
    }

    if (action === "update") {
      if (!cart) return Response.json(null);
      cart = await updateCartLine(cart.id, lineId, quantity);
      return Response.json(cart, {
        headers: { "Set-Cookie": cartCookieHeader(cart.id) },
      });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Cart API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
