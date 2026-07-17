import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Partner } from "@/types";

export function PartnerLogoGrid({ partners }: { partners: Partner[] }) {
  const t = useTranslations("about");

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="relative flex h-28 items-center justify-center rounded-md border border-navy-100 bg-white p-1.5 text-center text-sm font-semibold text-navy-700"
            title={partner.name}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain p-1.5 transition-transform duration-200 hover:scale-105"
              sizes="(min-width: 1024px) 200px, 150px"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">{t("partnerDisclaimer")}</p>
    </div>
  );
}
