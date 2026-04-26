import Link from "next/link";
import Image from "next/image";
import { getAllProducts, formatPrice } from "@/lib/shopify";

export const metadata = {
  title: "Shop",
  description: "Original hand-pulled woodblock prints.",
};

export default async function ShopPage() {
  let products = [];
  try {
    products = await getAllProducts();
  } catch {
    // Shopify not yet connected
  }

  return (
    <div className="pt-[122px]">
      <div className="max-w-site mx-auto px-6 lg:px-16 py-16">
        <header className="flex flex-col gap-4 mb-16 max-w-lg">
          <span className="text-xs font-medium tracking-widest uppercase text-accent">
            Shop
          </span>
          <h1 className="font-display text-5xl lg:text-6xl font-normal tracking-tight">
            Prints
          </h1>
          <p className="text-base text-text-secondary leading-loose">
            Each original is hand-carved and hand-pulled on Nishinouchi washi.
            No two prints are identical.
          </p>
        </header>

        {products.length === 0 ? (
          <p className="text-text-muted text-sm py-16">Prints coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => {
              const image = product.images?.edges?.[0]?.node;
              const prices = product.variants?.edges
                ?.map((e) => parseFloat(e.node.price.amount))
                .sort((a, b) => a - b);
              const currency =
                product.variants?.edges?.[0]?.node.price.currencyCode;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.handle}`}
                  className="group rounded-sm overflow-hidden transition-colors"
                >
                  <div className="aspect-[5/7] relative rounded-sm">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-sm"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-5xl text-text-muted opacity-10">
                          版
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline py-5 dark:bg-black bg-white border-t border-white/5">
                    <span className="font-display text-base text-text-primary">
                      {product.title}
                    </span>
                    {prices?.[0] && currency && (
                      <span className="text-sm text-accent">
                        {formatPrice(prices[0], currency)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
