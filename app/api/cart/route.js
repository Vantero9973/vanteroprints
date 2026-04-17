import { createCartWithItem } from "@/lib/shopify";

export async function POST(req) {
  const { merchandiseId, quantity } = await req.json();
  try {
    const result = await createCartWithItem(merchandiseId, quantity);
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
