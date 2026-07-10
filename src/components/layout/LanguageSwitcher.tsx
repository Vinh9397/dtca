"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

const labels: Record<string, string> = { vi: "VI", en: "EN" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-navy-200 p-0.5 text-xs font-semibold ${className ?? ""}`}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() =>
            router.replace(
              // @ts-expect-error -- pathname is dynamically typed by next-intl's routing config
              { pathname, params },
              { locale: loc }
            )
          }
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === loc ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-navy-50"
          }`}
          aria-current={locale === loc}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
