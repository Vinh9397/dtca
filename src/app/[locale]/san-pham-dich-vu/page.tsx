import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("products") };
}

export default async function ProductsOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const tScada = await getTranslations("products.scada");
  const tInfo = await getTranslations("products.infoSystems");
  const tPrimary = await getTranslations("products.primaryEquipment");

  const groups = [
    { href: "/san-pham-dich-vu/scada-dcs" as const, title: tScada("title"), intro: tScada("intro") },
    { href: "/san-pham-dich-vu/he-thong-thong-tin" as const, title: tInfo("title"), intro: tInfo("intro") },
    { href: "/san-pham-dich-vu/thiet-bi-nhat-thu" as const, title: tPrimary("title"), intro: tPrimary("intro") },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={tNav("products")} title={tNav("products")} align="center" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Link
              key={group.href}
              href={group.href}
              className="group flex flex-col rounded-lg border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-sm font-bold text-white">
                0{index + 1}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy-950 group-hover:text-navy-700">
                {group.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-slate-600">{group.intro}</p>
              <span className="mt-4 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
