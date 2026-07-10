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
            className="flex h-20 items-center justify-center rounded-md border border-navy-100 bg-white px-4 text-center text-sm font-semibold text-navy-700"
            title={partner.name}
          >
            {partner.name}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">{t("partnerDisclaimer")}</p>
    </div>
  );
}
