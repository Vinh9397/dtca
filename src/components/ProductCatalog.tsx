"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/ProductCard";
import { slugify } from "@/lib/slug";
import type { Product } from "@/types";
import type { ProductBrandSummary } from "@/lib/data-access/products";

type SortOption = "default" | "name-asc" | "name-desc";

export function ProductCatalog({
  products,
  brandSummaries,
  activeBrand,
}: {
  products: Product[];
  brandSummaries: ProductBrandSummary[];
  /** Real brand name of the active category page, or undefined on the "all products" page. */
  activeBrand?: string;
}) {
  const t = useTranslations("store");
  const locale = useLocale();
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const list = [...products];
    list.sort((a, b) => {
      const nameA = locale === "vi" ? a.nameVi : a.nameEn;
      const nameB = locale === "vi" ? b.nameVi : b.nameEn;
      return sort === "name-asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    return list;
  }, [products, sort, locale]);

  const totalCount = brandSummaries.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside>
        <h2 className="text-sm font-bold uppercase tracking-wide text-navy-950">
          {t("categoriesTitle")}
        </h2>
        <div className="mt-3 h-px w-10 bg-accent-red" />
        <nav className="mt-4 space-y-1 text-sm">
          <Link
            href={{ pathname: "/cua-hang" }}
            className={`flex items-center justify-between rounded-md px-2 py-2 font-semibold ${
              !activeBrand ? "text-accent-red" : "text-navy-800 hover:text-accent-red"
            }`}
          >
            <span>{t("allBrands")}</span>
            <span className="text-xs font-normal text-slate-400">({totalCount})</span>
          </Link>
          {brandSummaries.map((summary) => (
            <BrandItem
              key={summary.brand}
              summary={summary}
              isActive={activeBrand === summary.brand}
            />
          ))}
        </nav>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 pb-4">
          <p className="text-sm text-slate-600">
            {t("showingResults", { count: sorted.length })}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">{t("sortLabel")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-md border border-navy-200 px-3 py-1.5 text-sm text-navy-800"
            >
              <option value="default">{t("sortDefault")}</option>
              <option value="name-asc">{t("sortNameAsc")}</option>
              <option value="name-desc">{t("sortNameDesc")}</option>
            </select>
          </label>
        </div>

        {sorted.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500">{t("empty")}</p>
        )}
      </div>
    </div>
  );
}

function BrandItem({
  summary,
  isActive,
}: {
  summary: ProductBrandSummary;
  isActive: boolean;
}) {
  const brandSlug = slugify(summary.brand);
  const hasSubcategories = summary.subcategories.length > 0;

  if (!hasSubcategories) {
    return (
      <Link
        href={{ pathname: "/cua-hang/[brand]", params: { brand: brandSlug } }}
        className={`flex items-center justify-between rounded-md px-2 py-2 ${
          isActive ? "font-semibold text-accent-red" : "text-navy-800 hover:text-accent-red"
        }`}
      >
        <span>{summary.brand}</span>
        <span className="text-xs font-normal text-slate-400">({summary.count})</span>
      </Link>
    );
  }

  return (
    <details className="group/details" open={isActive}>
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2 marker:content-none">
        <Link
          href={{ pathname: "/cua-hang/[brand]", params: { brand: brandSlug } }}
          className={`flex-1 ${
            isActive ? "font-semibold text-accent-red" : "text-navy-800 hover:text-accent-red"
          }`}
        >
          {summary.brand}
        </Link>
        <span className="flex items-center gap-1 text-xs font-normal text-slate-400">
          ({summary.count})
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 transition-transform group-open/details:rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>
      <div className="ml-3 space-y-1 border-l border-navy-100 pl-3">
        {summary.subcategories.map((sub) => (
          <p key={sub.name} className="px-2 py-1.5 text-xs text-slate-600">
            {sub.name} <span className="text-slate-400">({sub.count})</span>
          </p>
        ))}
      </div>
    </details>
  );
}
