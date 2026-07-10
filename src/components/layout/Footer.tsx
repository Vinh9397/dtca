import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { companyInfo } from "@/lib/data/company";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-9 w-auto" variant="white" />
          <p className="mt-4 text-sm leading-relaxed text-navy-200">{tf("tagline")}</p>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM3.5 8.75h3.9V21h-3.9V8.75zM10.3 8.75h3.73v1.68h.05c.52-.98 1.79-2 3.68-2 3.94 0 4.66 2.6 4.66 5.98V21h-3.9v-5.86c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.53-2.25 3.1V21h-3.9V8.75z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M21.6 7.2s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.1c-.4.1-1.3.1-2.1.9-.6.7-.8 2.2-.8 2.2S2.2 9 2.2 10.7v1.6C2.2 14 2.4 15.7 2.4 15.7s.2 1.5.8 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.4.2 7.4.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.4-.2-3.4zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">{tf("menuTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-200">
            <li><Link href="/" className="hover:text-white">{t("home")}</Link></li>
            <li><Link href="/san-pham-dich-vu/scada-dcs" className="hover:text-white">{t("productsScada")}</Link></li>
            <li><Link href="/giai-phap" className="hover:text-white">{t("solutions")}</Link></li>
            <li><Link href="/du-an" className="hover:text-white">{t("projects")}</Link></li>
            <li><Link href="/tin-tuc" className="hover:text-white">{t("news")}</Link></li>
            <li><Link href="/ve-chung-toi" className="hover:text-white">{t("about")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">{tf("contactTitle")}</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-200">
            <li>{companyInfo.officeVi}</li>
            <li>
              <a href={`tel:${companyInfo.hotline.replace(/\./g, "")}`} className="hover:text-white">
                {companyInfo.hotline}
              </a>
            </li>
            <li>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                {companyInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">{tf("workingHoursTitle")}</p>
          <p className="mt-4 text-sm text-navy-200">{tf("workingHours")}</p>
          <Link
            href="/lien-he"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-yellow hover:text-white"
          >
            {t("contact")} →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="container-page text-center text-xs text-navy-300">
          © {year} DTCA — {tf("rights")}
        </p>
      </div>
    </footer>
  );
}
