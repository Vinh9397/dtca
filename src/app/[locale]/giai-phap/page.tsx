import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/data-access/projects";
import { projectCategories } from "@/lib/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("solutions");
  const projects = await getProjects();

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t("pageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{t("pageDescription")}</p>
        </div>
      </section>

      {projectCategories.map((category, index) => {
        const categoryProjects = projects
          .filter((p) => p.category === category.id)
          .slice(0, 3);

        return (
          <section
            key={category.id}
            className={`py-16 sm:py-20 ${index % 2 === 1 ? "bg-navy-50" : ""}`}
          >
            <div className="container-page">
              <SectionHeading
                eyebrow={t("pageTitle")}
                title={t(`categories.${category.id}.title`)}
                description={t(`categories.${category.id}.description`)}
              />
              {categoryProjects.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}
