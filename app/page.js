import Link from "next/link";
import Image from "next/image";
import { getAllProducts, formatPrice } from "@/lib/shopify";

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
        {/* <header className="flex flex-col gap-4 mb-16 max-w-lg">
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
        </header> */}

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

// import Link from "next/link";
// import Image from "next/image";
// import { getAllProducts } from "@/lib/shopify";

// export default async function HomePage() {
//   let featured = null;
//   try {
//     const products = await getAllProducts();
//     featured =
//       products.find((p) => p.tags.includes("featured")) || products[0] || null;
//   } catch (err) {
//     console.error("Shopify error:", err);
//   }

//   const heroImage = featured?.images?.edges?.[0]?.node;

//   return (
//     <section className="pt-[122px] flex items-start relative overflow-hidden">
//       <div className="max-w-site mx-auto px-6 lg:px-16 py-24 grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center w-full">
//         {/* Copy */}
//         <div className="flex flex-col gap-6">
//           <span className="text-base font-medium tracking-widest uppercase text-accent">
//             Mokuhanga · 木版画
//           </span>
//           <h1 className="font-display text-5xl lg:text-7xl font-normal leading-none tracking-tight">
//             Hand-carved
//             <br />
//             woodblock prints
//           </h1>
//           <p className="text-lg text-text-secondary max-w-lg leading-loose">
//             Traditional Japanese mokuhanga, made in Chicago. Each print
//             hand-carved and hand-pulled on washi paper.
//           </p>
//           <div className="mt-8">
//             <Link
//               href="/shop"
//               className="border border-black/50 dark:border-white/50 text-text-secondary text-base font-medium tracking-widest uppercase px-8 py-3.5 rounded-sm dark:hover:border-white hover:border-black hover:text-text-primary transition-colors"
//             >
//               View prints
//             </Link>
//           </div>
//         </div>

//         {/* Image */}
//         <div className="flex flex-col gap-3">
//           <div className="aspect-[5/7] relative bg-[#f5f4dc] rounded-sm overflow-hidden w-full">
//             {heroImage ? (
//               <Image
//                 src={heroImage.url}
//                 alt={heroImage.altText || "Print"}
//                 fill
//                 className="object-cover rounded-sm"
//                 priority
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <span className="font-display text-7xl text-text-muted opacity-15">
//                   夜桜
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="flex justify-between text-xs text-text-muted tracking-wide">
//             <span>{featured?.title || "Midnight Sakura — Yozakura 夜桜"}</span>
//             <span>Mokuhanga · 7 blocks · 2026</span>
//           </div>
//         </div>
//       </div>

//       <span
//         className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 font-display text-xs tracking-[0.3em] text-text-muted opacity-50 whitespace-nowrap"
//         aria-hidden
//       >
//         木版画
//       </span>
//     </section>
//   );
// }
