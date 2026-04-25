const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${domain}/api/2026-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// Reusable cart fields
const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              images(first: 1) {
                edges { node { url altText } }
              }
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
`;

export async function getAllProducts() {
  const data = await shopifyFetch(`
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            tags
            images(first: 5) {
              edges { node { url altText } }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `);
  return data.products.edges.map((e) => e.node);
}

export async function getProduct(handle) {
  const data = await shopifyFetch(
    `query getProduct($handle: String!) {
      product(handle: $handle) {
        id title handle description descriptionHtml tags
        images(first: 5) {
          edges { node { url altText } }
        }
        variants(first: 10) {
          edges {
            node {
              id title
              price { amount currencyCode }
              availableForSale
            }
          }
        }
      }
    }`,
    { handle }
  );
  return data.product;
}

export async function getCart(cartId) {
  const res = await fetch(`https://${domain}/api/2026-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": accessToken,
    },
    body: JSON.stringify({
      query: `query getCart($cartId: ID!) {
        cart(id: $cartId) { ${CART_FIELDS} }
      }`,
      variables: { cartId },
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data.cart;
}

export async function createCart() {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `);
  return data.cartCreate.cart;
}

export async function addToCart(cartId, merchandiseId, quantity = 1) {
  const data = await shopifyFetch(
    `mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lines: [{ merchandiseId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId, lineIds) {
  const data = await shopifyFetch(
    `mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lineIds }
  );
  return data.cartLinesRemove.cart;
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopifyFetch(
    `mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return data.cartLinesUpdate.cart;
}

export function formatPrice(amount, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
