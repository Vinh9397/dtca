import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import {
  getAllBrandSlugs,
  getBrandBySlug,
  getProductBrands,
  getProductsByBrand,
} from "@/lib/data-access/products";

export async function generateStaticParams() {
  const brandSlugs = await getAllBrandSlugs();
  return brandSlugs.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = await getBrandBySlug(brandSlug);
  return { title: brand ?? brandSlug };
}

export default async function StoreBrandPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { locale, brand: brandSlug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("store");
  const brand = await getBrandBySlug(brandSlug);
  if (!brand) notFound();

  const [products, brandSummaries] = await Promise.all([
    getProductsByBrand(brand),
    getProductBrands(),
  ]);

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{brand}</h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-navy-700">
              {t("home")}
            </Link>{" "}
            /{" "}
            <Link href={{ pathname: "/cua-hang" }} className="hover:text-navy-700">
              {t("pageTitle")}
            </Link>{" "}
            / <span className="text-navy-800">{brand}</span>
          </p>
          <ProductCatalog products={products} brandSummaries={brandSummaries} activeBrand={brand} />
        </div>
      </section>
    </>
  );
}
