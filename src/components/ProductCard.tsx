import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { slugify } from "@/lib/slug";
import type { Product } from "@/types";

const badgeLabelKey: Record<NonNullable<Product["badge"]>, string> = {
  "best-sale": "badgeBestSale",
  new: "badgeNew",
  featured: "badgeFeatured",
};

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const t = useTranslations("store");
  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const detailHref = {
    pathname: "/cua-hang/[brand]/[slug]" as const,
    params: { brand: slugify(product.brand), slug: product.slug },
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={detailHref} className="relative block aspect-square w-full overflow-hidden bg-navy-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 260px, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-navy-300">
            <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="8" y="12" width="32" height="24" rx="2" strokeLinejoin="round" />
              <path d="M8 30l9-9 8 8 7-7 8 8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="19" r="2.4" />
            </svg>
          </div>
        )}
        {product.badge ? (
          <span className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-center text-[10px] font-bold leading-tight text-white shadow-sm">
            {t(badgeLabelKey[product.badge])}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 text-center">
        <Link href={detailHref}>
          <h3 className="text-sm font-semibold leading-snug text-navy-950 hover:text-accent-red">
            {name}
          </h3>
        </Link>
        <p className="text-xs font-medium uppercase tracking-wide text-navy-500">{product.brand}</p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link
            href={{ pathname: "/lien-he" }}
            className="rounded-md bg-navy-800 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-900"
          >
            {t("requestQuote")}
          </Link>
        </div>
      </div>
    </article>
  );
}
