import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { getProjects } from "@/lib/data-access/projects";
import { getPosts } from "@/lib/data-access/posts";
import { getPartners } from "@/lib/data-access/partners";
import { provinceCount } from "@/lib/data/projects";
import { workforce, totalWorkforce } from "@/lib/data/company";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  const [projects, posts, partners] = await Promise.all([
    getProjects(),
    getPosts(),
    getPartners(),
  ]);

  const featuredProjects = projects.slice(0, 6);
  const latestPosts = posts.slice(0, 3);

  const serviceCards = [
    { href: "/san-pham-dich-vu/scada-dcs" as const, title: tNav("productsScada") },
    { href: "/san-pham-dich-vu/he-thong-thong-tin" as const, title: tNav("productsInfo") },
    { href: "/san-pham-dich-vu/thiet-bi-nhat-thu" as const, title: tNav("productsPrimary") },
  ];

  const stats = [
    { label: t("statsProjects"), value: "100+" },
    { label: t("statsProvinces"), value: `${provinceCount}` },
    { label: t("statsEngineers"), value: `${totalWorkforce - (workforce.at(-1)?.count ?? 0)}` },
    { label: t("statsPartners"), value: `${partners.length}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <Image
          src="/images/hero-industrial.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="container-page relative py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-yellow">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
            {t("heroDescription")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/lien-he" variant="secondary">
              {t("heroCtaPrimary")}
            </ButtonLink>
            <ButtonLink href="/du-an" variant="outlineLight">
              {t("heroCtaSecondary")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy-900 sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Thư ngỏ / Intro */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow={t("heroEyebrow")} title={t("introTitle")} />
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t("introBody")
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm & Dịch vụ */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={tNav("products")}
            title={t("servicesTitle")}
            description={t("servicesDescription")}
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {serviceCards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-lg border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-sm font-bold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950 group-hover:text-navy-700">
                  {card.title}
                </h3>
                <span className="mt-3 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
                  {tNav("home")} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dự án tiêu biểu */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={tNav("projects")} title={t("solutionsTitle")} description={t("solutionsDescription")} />
            <ButtonLink href="/du-an" variant="outline">
              {tNav("projects")} →
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Đối tác */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={tNav("about")}
            title={t("partnersTitle")}
            description={t("partnersDescription")}
            align="center"
          />
          <div className="mt-10">
            <PartnerLogoGrid partners={partners} />
          </div>
        </div>
      </section>

      {/* Tin tức */}
      {latestPosts.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow={tNav("news")} title={t("newsTitle")} description={t("newsDescription")} />
              <ButtonLink href="/tin-tuc" variant="outline">
                {tNav("news")} →
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-100">{t("ctaDescription")}</p>
          <div className="mt-8">
            <ButtonLink href="/lien-he" variant="secondary">
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
