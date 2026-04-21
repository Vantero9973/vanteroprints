import {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
} from "@/lib/shopify";
import { cookies } from "next/headers";

const CART_COOKIE = "vantero_cart_id";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  domain:
    process.env.NODE_ENV === "production" ? ".vanteroprints.com" : undefined,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function POST(req) {
  const cookieStore = await cookies();
  const { action, merchandiseId, quantity, lineIds, lineId } = await req.json();

  try {
    // Get or validate existing cart
    let cartId = cookieStore.get(CART_COOKIE)?.value;
    let cart = null;

    if (cartId) {
      cart = await getCart(cartId);
      // If cart is null, it was completed or expired — will create fresh below
    }

    if (action === "get") {
      // Return current cart state (null if none or completed)
      return Response.json(cart, {
        headers: cart
          ? {}
          : {
              "Set-Cookie": `${CART_COOKIE}=; Max-Age=0; Path=/`,
            },
      });
    }

    if (action === "add") {
      if (!cart) {
        // No valid cart — create one
        cart = await createCart();
        const res = await addToCart(cart.id, merchandiseId, quantity || 1);
        cart = res;
      } else {
        cart = await addToCart(cart.id, merchandiseId, quantity || 1);
      }

      const response = Response.json(cart);
      response.headers.append(
        "Set-Cookie",
        `${CART_COOKIE}=${cart.id}; Max-Age=${
          cookieOptions.maxAge
        }; Path=/; SameSite=Lax${cookieOptions.secure ? "; Secure" : ""}${
          cookieOptions.domain ? `; Domain=${cookieOptions.domain}` : ""
        }`
      );
      return response;
    }

    if (action === "remove") {
      if (!cart) return Response.json(null);
      cart = await removeFromCart(cart.id, lineIds);

      // If cart is now empty clear the cookie
      const remaining = cart?.lines?.edges?.length || 0;
      if (remaining === 0) {
        const response = Response.json(null);
        response.headers.append(
          "Set-Cookie",
          `${CART_COOKIE}=; Max-Age=0; Path=/`
        );
        return response;
      }
      return Response.json(cart);
    }

    if (action === "update") {
      if (!cart) return Response.json(null);
      cart = await updateCartLine(cart.id, lineId, quantity);
      return Response.json(cart);
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Cart API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
