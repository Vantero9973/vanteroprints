import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/shopify";

export default async function HomePage() {
  let featured = null;
  try {
    const products = await getAllProducts();
    featured =
      products.find((p) => p.tags.includes("featured")) || products[0] || null;
  } catch (err) {
    console.error("Shopify error:", err);
  }

  const heroImage = featured?.images?.edges?.[0]?.node;

  return (
    <section className="pt-[122px] flex items-start relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-site mx-auto px-6 lg:px-16 py-24 grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center w-full">
        {/* Copy */}
        <div className="flex flex-col gap-6">
          <span className="text-base font-medium tracking-widest uppercase text-accent">
            Mokuhanga · 木版画
          </span>
          <h1 className="font-display text-5xl lg:text-7xl font-normal leading-none tracking-tight">
            Hand-carved
            <br />
            woodblock prints
          </h1>
          <p className="text-lg text-text-secondary max-w-lg leading-loose">
            Traditional Japanese mokuhanga, made in Chicago. Each print
            hand-carved and hand-pulled on washi paper.
          </p>
          <div className="mt-8">
            <Link
              href="/shop"
              className="border border-white/10 text-text-secondary text-base font-medium tracking-widest uppercase px-8 py-3.5 rounded-sm hover:border-white/20 hover:text-text-primary transition-colors"
            >
              View prints
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-3">
          <div className="aspect-[5/7] relative bg-[#f5f4dc] border border-[20px] border-white rounded-sm overflow-hidden w-full">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.altText || "Print"}
                fill
                className="object-cover border border-[5px] border-[#393231] rounded-sm"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-7xl text-text-muted opacity-15">
                  夜桜
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs text-text-muted tracking-wide">
            <span>{featured?.title || "Midnight Sakura — Yozakura 夜桜"}</span>
            <span>Mokuhanga · 7 blocks · 2026</span>
          </div>
        </div>
      </div>

      <span
        className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 font-display text-xs tracking-[0.3em] text-text-muted opacity-50 whitespace-nowrap"
        aria-hidden
      >
        木版画
      </span>
    </section>
  );
}
