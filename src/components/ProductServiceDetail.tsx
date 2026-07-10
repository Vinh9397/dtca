import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/data-access/projects";
import type { Project } from "@/types";

interface ProductServiceDetailProps {
  namespaceKey: "scada" | "infoSystems" | "primaryEquipment";
  relatedCategories: Project["category"][];
}

export async function ProductServiceDetail({
  namespaceKey,
  relatedCategories,
}: ProductServiceDetailProps) {
  const t = await getTranslations(`products.${namespaceKey}`);
  const tCommon = await getTranslations("products");
  const items = t.raw("items") as string[];

  const projects = await getProjects();
  const related = projects
    .filter((p) => relatedCategories.includes(p.category))
    .slice(0, 3);

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-yellow">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{t("intro")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-navy-950">{t("title")}</h2>
            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 sm:text-base">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="flex flex-col gap-4 rounded-lg border border-navy-100 bg-navy-50 p-6">
            <p className="text-sm font-semibold text-navy-900">{tCommon("backToOverview")}</p>
            <ButtonLink href="/san-pham-dich-vu" variant="outline">
              {tCommon("backToOverview")}
            </ButtonLink>
            <ButtonLink href="/lien-he">{t("eyebrow")}</ButtonLink>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-navy-50 py-16 sm:py-20">
          <div className="container-page">
            <h2 className="text-xl font-bold text-navy-950">{tCommon("relatedProjects")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
