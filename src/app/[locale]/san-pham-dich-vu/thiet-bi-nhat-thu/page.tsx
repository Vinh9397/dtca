import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductServiceDetail } from "@/components/ProductServiceDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products.primaryEquipment" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrimaryEquipmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProductServiceDetail
      namespaceKey="primaryEquipment"
      relatedCategories={["tram-bien-ap", "san-xuat-cong-nghiep"]}
    />
  );
}
