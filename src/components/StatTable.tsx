import { useLocale, useTranslations } from "next-intl";
import { workforce, totalWorkforce } from "@/lib/data/company";

export function StatTable() {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("about");

  return (
    <div className="overflow-hidden rounded-lg border border-navy-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy-900 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">{t("workforceRole")}</th>
            <th className="px-4 py-3 text-right font-semibold">{t("workforceCount")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {workforce.map((row, index) => (
            <tr key={row.role.vi} className={index % 2 === 0 ? "bg-white" : "bg-navy-50"}>
              <td className="px-4 py-3 text-slate-500">{index + 1}</td>
              <td className="px-4 py-3 text-navy-900">{row.role[locale]}</td>
              <td className="px-4 py-3 text-right font-semibold text-navy-900">{row.count}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-navy-100">
            <td className="px-4 py-3" colSpan={2}>
              <span className="font-bold text-navy-950">{t("workforceTotal")}</span>
            </td>
            <td className="px-4 py-3 text-right text-base font-bold text-navy-950">
              {totalWorkforce}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
