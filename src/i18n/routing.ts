import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  pathnames: {
    "/": "/",
    "/san-pham-dich-vu": {
      vi: "/san-pham-dich-vu",
      en: "/products-services",
    },
    "/san-pham-dich-vu/scada-dcs": {
      vi: "/san-pham-dich-vu/scada-dcs",
      en: "/products-services/scada-dcs",
    },
    "/san-pham-dich-vu/he-thong-thong-tin": {
      vi: "/san-pham-dich-vu/he-thong-thong-tin",
      en: "/products-services/information-systems",
    },
    "/san-pham-dich-vu/thiet-bi-nhat-thu": {
      vi: "/san-pham-dich-vu/thiet-bi-nhat-thu",
      en: "/products-services/primary-equipment",
    },
    "/giai-phap": {
      vi: "/giai-phap",
      en: "/solutions",
    },
    "/cua-hang": {
      vi: "/cua-hang",
      en: "/store",
    },
    "/cua-hang/[brand]": {
      vi: "/cua-hang/[brand]",
      en: "/store/[brand]",
    },
    "/du-an": {
      vi: "/du-an",
      en: "/projects",
    },
    "/tin-tuc": {
      vi: "/tin-tuc",
      en: "/news",
    },
    "/tin-tuc/[slug]": {
      vi: "/tin-tuc/[slug]",
      en: "/news/[slug]",
    },
    "/ve-chung-toi": {
      vi: "/ve-chung-toi",
      en: "/about-us",
    },
    "/lien-he": {
      vi: "/lien-he",
      en: "/contact",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
