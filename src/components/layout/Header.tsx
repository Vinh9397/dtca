"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { companyInfo } from "@/lib/data/company";

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const productLinks = [
    { href: "/san-pham-dich-vu/scada-dcs" as const, label: t("productsScada") },
    { href: "/san-pham-dich-vu/he-thong-thong-tin" as const, label: t("productsInfo") },
    { href: "/san-pham-dich-vu/thiet-bi-nhat-thu" as const, label: t("productsPrimary") },
  ];

  const navLinks = [
    { href: "/giai-phap" as const, label: t("solutions") },
    { href: "/du-an" as const, label: t("projects") },
    { href: "/tin-tuc" as const, label: t("news") },
    { href: "/ve-chung-toi" as const, label: t("about") },
    { href: "/lien-he" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo className="h-16 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50 hover:text-navy-950"
          >
            {t("home")}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50 hover:text-navy-950"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
            >
              {t("products")}
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {productsOpen ? (
              <div className="absolute left-0 top-full w-80 rounded-lg border border-navy-100 bg-white p-3 shadow-lg">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-navy-50 hover:text-navy-950"
                    onClick={() => setProductsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50 hover:text-navy-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${companyInfo.hotline.replace(/\./g, "")}`}
            className="text-sm font-semibold text-navy-800"
          >
            {companyInfo.hotline}
          </a>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-800 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 lg:hidden">
          <Link href="/" className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy-800" onClick={() => setMobileOpen(false)}>
            {t("home")}
          </Link>
          <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t("products")}
          </p>
          {productLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy-800"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-navy-100 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy-800"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-navy-100 pt-3">
            <a href={`tel:${companyInfo.hotline.replace(/\./g, "")}`} className="text-sm font-semibold text-navy-800">
              {companyInfo.hotline}
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
