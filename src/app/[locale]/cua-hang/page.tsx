import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import { getProducts, getProductBrands } from "@/lib/data-access/products";

// Làm mới dữ liệu mỗi 60 giây, để sản phẩm thêm/sửa trong /admin/san-pham
// hiện ra trên trang Cửa hàng mà không cần deploy lại.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "store" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("store");
  const [products, brandSummaries] = await Promise.all([getProducts(), getProductBrands()]);

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t("pageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{t("pageDescription")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <p className="mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-navy-700">
              {t("home")}
            </Link>{" "}
            / <span className="text-navy-800">{t("pageTitle")}</span>
          </p>
          <ProductCatalog products={products} brandSummaries={brandSummaries} />
        </div>
      </section>
    </>
  );
}
