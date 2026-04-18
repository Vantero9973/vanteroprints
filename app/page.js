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
    <section className="pt-[72px] flex items-start relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-site mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-start w-full">
        {/* Copy */}
        <div className="flex flex-col gap-6 pt-8 md:pt-16 md:sticky md:top-24">
          <span className="text-xs font-medium tracking-widest uppercase text-accent">
            Mokuhanga · 木版画
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-normal leading-none tracking-tight">
            Hand-carved
            <br />
            woodblock
            <br />
            prints
          </h1>
          <p className="text-base text-text-secondary max-w-sm leading-loose">
            Traditional Japanese mokuhanga, made in Chicago. Each print
            hand-carved and hand-pulled on washi paper.
          </p>
          <div className="mt-2">
            <Link
              href="/shop"
              className="border border-white/10 text-text-secondary text-xs font-medium tracking-widest uppercase px-8 py-3.5 rounded-sm hover:border-white/20 hover:text-text-primary transition-colors"
            >
              View prints
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-3">
          <div className="aspect-[5/7] relative bg-ink-soft border border-white/5 rounded-sm overflow-hidden w-full">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.altText || "Print"}
                fill
                className="object-cover"
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
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-90 font-display text-xs tracking-[0.3em] text-text-muted opacity-15 whitespace-nowrap"
        aria-hidden
      >
        木版画
      </span>
    </section>
  );
}
