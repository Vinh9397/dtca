import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  getBrandBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data-access/products";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; brand: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description =
    locale === "vi" ? product.descriptionVi : product.descriptionEn;
  return { title: name, description: description ?? undefined };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string; slug: string }>;
}) {
  const { locale, brand: brandSlug, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("store");
  const brand = await getBrandBySlug(brandSlug);
  const product = await getProductBySlug(slug);

  if (!brand || !product || product.brand !== brand) notFound();

  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description = locale === "vi" ? product.descriptionVi : product.descriptionEn;
  const related = await getRelatedProducts(product);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <p className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-navy-700">
            {t("home")}
          </Link>{" "}
          /{" "}
          <Link href={{ pathname: "/cua-hang" }} className="hover:text-navy-700">
            {t("pageTitle")}
          </Link>{" "}
          /{" "}
          <Link
            href={{ pathname: "/cua-hang/[brand]", params: { brand: brandSlug } }}
            className="hover:text-navy-700"
          >
            {brand}
          </Link>{" "}
          / <span className="text-navy-800">{name}</span>
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-navy-100 bg-navy-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={name}
                fill
                className="object-contain p-10"
                sizes="(min-width: 1024px) 500px, 100vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-navy-300">
                <svg
                  viewBox="0 0 48 48"
                  className="h-24 w-24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="8" y="12" width="32" height="24" rx="2" strokeLinejoin="round" />
                  <path d="M8 30l9-9 8 8 7-7 8 8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="19" r="2.4" />
                </svg>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-navy-500">
              {product.brand}
              {product.subcategory ? ` · ${product.subcategory}` : ""}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-navy-950 sm:text-3xl">{name}</h1>

            <div className="mt-6 rounded-md bg-accent-red px-5 py-3 text-center text-base font-bold text-white">
              {t("priceContact")}
            </div>

            <Link
              href={{ pathname: "/lien-he" }}
              className="mt-4 block rounded-md bg-navy-800 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-navy-900"
            >
              {t("requestQuote")}
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-100 pt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-950">
            {t("descriptionTitle")}
          </h2>
          <div className="mt-2 h-px w-10 bg-accent-red" />
          <p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {description || t("noDescription")}
          </p>
        </div>

        {related.length > 0 ? (
          <div className="mt-14 border-t border-navy-100 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-navy-950">
              {t("relatedProducts")}
            </h2>
            <div className="mt-2 h-px w-10 bg-accent-red" />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
