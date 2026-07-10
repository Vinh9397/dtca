import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getPosts } from "@/lib/data-access/posts";

const staticPathnames = [
  "/",
  "/san-pham-dich-vu",
  "/san-pham-dich-vu/scada-dcs",
  "/san-pham-dich-vu/he-thong-thong-tin",
  "/san-pham-dich-vu/thiet-bi-nhat-thu",
  "/giai-phap",
  "/du-an",
  "/tin-tuc",
  "/ve-chung-toi",
  "/lien-he",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtca.vn";
  const posts = await getPosts();

  const staticEntries: MetadataRoute.Sitemap = staticPathnames.map((pathname) => ({
    url: `${siteUrl}${getPathname({ locale: routing.defaultLocale, href: pathname })}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteUrl}${getPathname({ locale, href: pathname })}`,
        ])
      ),
    },
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}${getPathname({
      locale: routing.defaultLocale,
      href: { pathname: "/tin-tuc/[slug]", params: { slug: post.slug } },
    })}`,
    lastModified: post.publishedAt,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteUrl}${getPathname({
            locale,
            href: { pathname: "/tin-tuc/[slug]", params: { slug: post.slug } },
          })}`,
        ])
      ),
    },
  }));

  return [...staticEntries, ...postEntries];
}
