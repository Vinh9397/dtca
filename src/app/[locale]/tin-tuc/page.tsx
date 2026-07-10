import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/data-access/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const posts = await getPosts();

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t("pageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-navy-100">{t("pageDescription")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}
