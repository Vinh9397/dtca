"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types";

export function ProjectsBrowser({
  projects,
  years,
}: {
  projects: Project[];
  years: number[];
}) {
  const t = useTranslations("projects");
  const [activeYear, setActiveYear] = useState<number | "all">("all");

  const filtered = useMemo(
    () => (activeYear === "all" ? projects : projects.filter((p) => p.year === activeYear)),
    [projects, activeYear]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveYear("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeYear === "all"
              ? "bg-navy-900 text-white"
              : "bg-navy-50 text-navy-700 hover:bg-navy-100"
          }`}
        >
          {t("filterAll")}
        </button>
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setActiveYear(year)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeYear === year
                ? "bg-navy-900 text-white"
                : "bg-navy-50 text-navy-700 hover:bg-navy-100"
            }`}
          >
            {t("filterYear", { year })}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-slate-500">{t("empty")}</p>
      )}
    </div>
  );
}
