import { useLocale } from "next-intl";
import { orgChart } from "@/lib/data/company";

export function OrgChart() {
  const locale = useLocale() as "vi" | "en";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-md bg-navy-900 px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow">
        {orgChart.root[locale]}
      </div>
      <div className="h-6 w-px bg-navy-200" aria-hidden />
      <div className="grid w-full gap-6 sm:grid-cols-3">
        {orgChart.branches.map((branch) => (
          <div key={branch.titleVi} className="flex flex-col items-center gap-3">
            <div className="w-full rounded-md bg-navy-700 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white shadow">
              {locale === "vi" ? branch.titleVi : branch.titleEn}
            </div>
            <div className="h-4 w-px bg-navy-200" aria-hidden />
            <div className="flex w-full flex-col gap-2">
              {branch.children.map((child) => (
                <div
                  key={child.vi}
                  className="rounded-md border border-navy-200 bg-navy-50 px-3 py-2 text-center text-xs font-medium text-navy-800"
                >
                  {child[locale]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
