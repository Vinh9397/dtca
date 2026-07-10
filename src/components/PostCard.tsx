import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/types";

export function PostCard({ post }: { post: Post }) {
  const locale = useLocale();
  const t = useTranslations("news");
  const title = locale === "vi" ? post.titleVi : post.titleEn;
  const excerpt = locale === "vi" ? post.excerptVi : post.excerptEn;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }} className="relative block aspect-[16/9] w-full overflow-hidden bg-navy-50">
        <Image src={post.coverImage} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 380px, 100vw" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-blue">{date}</p>
        <h3 className="text-base font-semibold leading-snug text-navy-950">
          <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }} className="hover:text-navy-700">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-slate-600">{excerpt}</p>
        <Link
          href={{ pathname: "/tin-tuc/[slug]", params: { slug: post.slug } }}
          className="mt-auto text-sm font-semibold text-navy-700 hover:text-navy-900"
        >
          {t("readMore")} →
        </Link>
      </div>
    </article>
  );
}
