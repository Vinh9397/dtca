import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { getProjects, getProjectYears } from "@/lib/data-access/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const [projects, years] = await Promise.all([getProjects(), getProjectYears()]);

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
          <ProjectsBrowser projects={projects} years={years} />
        </div>
      </section>
    </>
  );
}
