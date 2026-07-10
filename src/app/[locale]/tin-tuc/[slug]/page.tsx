import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPosts } from "@/lib/data-access/posts";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const posts = await getPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: locale === "vi" ? post.titleVi : post.titleEn,
    description: locale === "vi" ? post.excerptVi : post.excerptEn,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = locale === "vi" ? post.titleVi : post.titleEn;
  const content = locale === "vi" ? post.contentVi : post.contentEn;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <Link href="/tin-tuc" className="text-sm font-semibold text-navy-600 hover:text-navy-800">
          ← {t("backToList")}
        </Link>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-accent-blue">{date}</p>
        <h1 className="mt-2 text-2xl font-bold text-navy-950 sm:text-3xl">{title}</h1>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-navy-50">
          <Image src={post.coverImage} alt={title} fill className="object-cover" sizes="768px" />
        </div>

        <div className="prose prose-slate mt-8 max-w-none space-y-4 text-base leading-relaxed text-slate-700">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
