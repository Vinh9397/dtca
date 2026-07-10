import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrgChart } from "@/components/OrgChart";
import { StatTable } from "@/components/StatTable";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { getPartners } from "@/lib/data-access/partners";
import { companyInfo } from "@/lib/data/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const partners = await getPartners();
  const criteria = t.raw("criteria") as string[];

  const infoRows: { label: string; value: string }[] = [
    { label: t("fieldName"), value: locale === "vi" ? companyInfo.nameVi : companyInfo.nameEn },
    { label: t("fieldAddress"), value: locale === "vi" ? companyInfo.addressVi : companyInfo.addressEn },
    { label: t("fieldOffice"), value: locale === "vi" ? companyInfo.officeVi : companyInfo.officeEn },
    { label: t("fieldHotline"), value: companyInfo.hotline },
    { label: t("fieldEmail"), value: companyInfo.email },
    { label: t("fieldWebsite"), value: companyInfo.website },
    { label: t("fieldTaxCode"), value: companyInfo.taxCode },
    { label: t("fieldRepresentative"), value: companyInfo.representativeVi },
    {
      label: t("fieldPosition"),
      value: locale === "vi" ? companyInfo.positionVi : companyInfo.positionEn,
    },
  ];

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t("pageTitle")}</h1>
        </div>
      </section>

      {/* Thư ngỏ */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow={t("pageTitle")} title={t("introTitle")} />
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {tHome("introBody")
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            <div className="flex flex-wrap gap-3 pt-2">
              {criteria.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-navy-100 px-4 py-1.5 text-xs font-semibold text-navy-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thông tin công ty */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t("companyInfoTitle")} />
          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="flex gap-4 border-b border-navy-100 pb-3">
                <dt className="w-40 shrink-0 text-sm font-semibold text-navy-700">{row.label}</dt>
                <dd className="text-sm text-slate-700">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sơ đồ tổ chức */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t("orgChartTitle")} align="center" />
          <div className="mt-10">
            <OrgChart />
          </div>
        </div>
      </section>

      {/* Nguồn nhân lực */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t("workforceTitle")} />
          <div className="mt-8 max-w-2xl">
            <StatTable />
          </div>
        </div>
      </section>

      {/* Đối tác */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t("partnersTitle")} align="center" />
          <div className="mt-8">
            <PartnerLogoGrid partners={partners} />
          </div>
        </div>
      </section>
    </>
  );
}
