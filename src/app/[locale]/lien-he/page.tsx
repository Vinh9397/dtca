import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { companyInfo } from "@/lib/data/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t("pageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{t("pageDescription")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-navy-950">{t("officeTitle")}</h2>
            <dl className="mt-6 space-y-4 text-sm text-slate-700">
              <div>
                <dt className="font-semibold text-navy-800">{companyInfo.nameVi}</dt>
                <dd className="mt-1">{companyInfo.officeVi}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-800">Hotline</dt>
                <dd className="mt-1">
                  <a href={`tel:${companyInfo.hotline.replace(/\./g, "")}`} className="hover:text-navy-700">
                    {companyInfo.hotline}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-800">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${companyInfo.email}`} className="hover:text-navy-700">
                    {companyInfo.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg border border-navy-100">
              <iframe
                title="Bản đồ văn phòng DTCA"
                src="https://www.google.com/maps?q=Khu+do+thi+Tay+Nam+Linh+Dam%2C+Hoang+Liet%2C+Hanoi&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold text-navy-950">{t("formTitle")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
