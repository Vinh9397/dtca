import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const title = locale === "vi" ? project.titleVi : project.titleEn;
  const location = locale === "vi" ? project.locationVi : project.locationEn;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-50">
        {project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-navy-300">
            <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 40h36M10 40V16l14-8 14 8v24M18 40V24h12v16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded bg-navy-900/90 px-2 py-1 text-xs font-semibold text-white">
          {project.inProgress ? t("inProgress") : project.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold leading-snug text-navy-950">{title}</h3>
        <p className="mt-auto text-xs text-slate-500">{location}</p>
        <p className="text-xs font-medium text-navy-600">{project.investor}</p>
      </div>
    </article>
  );
}
