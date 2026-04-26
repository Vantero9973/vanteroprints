import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, getAllProducts, formatPrice } from "@/lib/shopify";
import AddToCartSection from "@/components/AddToCartSelection";

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return { title: product.title, description: product.description };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  let product = null;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }
  if (!product) notFound();

  const images = product.images?.edges?.map((e) => e.node) || [];
  const variants = product.variants?.edges?.map((e) => e.node) || [];
  const mainImage = images[0];

  return (
    <div className="pt-[122px]">
      <div className="max-w-site mx-auto px-6 lg:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-16 lg:gap-24 items-start">
          {/* Images */}
          <div className="flex flex-col gap-3 xl:col-span-2 md:sticky md:top-40">
            <div className="aspect-[5/7] relative rounded-sm overflow-hidden">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  fill
                  className="object-cover rounded-sm"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-7xl text-text-muted opacity-10">
                    版
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 aspect-square relative rounded-sm overflow-hidden"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8 xl:col-span-3 pt-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Mokuhanga
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-normal tracking-tight pt-3">
                {product.title}
              </h1>
            </div>

            <AddToCartSection variant={variants[0]} />

            <div
              className="product-description text-base text-text-secondary leading-loose flex flex-col gap-4 [&>p]:leading-loose"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* Shipping info */}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Shipping
              </span>
              <p className="text-sm text-text-muted leading-loose">
                Ships within 1–3 business days. Tracked and insured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
