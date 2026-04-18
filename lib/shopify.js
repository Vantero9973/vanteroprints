const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query, variables = {}) {
  console.log("domain:", domain);
  console.log("url:", `https://${domain}/api/2026-01/graphql.json`);
  console.log("token:", accessToken ? "exists" : "MISSING");
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
        id title handle description tags
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

export async function createCartWithItem(merchandiseId, quantity = 1) {
  const data = await shopifyFetch(
    `mutation createCart($merchandiseId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ quantity: $quantity, merchandiseId: $merchandiseId }]
      }) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }`,
    { merchandiseId, quantity }
  );
  return data.cartCreate;
}

export function formatPrice(amount, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
