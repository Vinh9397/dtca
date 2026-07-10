/**
 * Sinh file supabase/seed.sql từ dữ liệu mẫu trong src/lib/data/*.
 * Chạy: npx tsx scripts/generate-seed-sql.ts
 */
import { writeFileSync } from "node:fs";
import { projects } from "../src/lib/data/projects";
import { partners } from "../src/lib/data/partners";
import { posts } from "../src/lib/data/posts";

function sqlString(value: string | undefined | null): string {
  if (value === undefined || value === null) return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

const lines: string[] = [];
lines.push("-- File này được sinh tự động bởi scripts/generate-seed-sql.ts — không chỉnh sửa tay.");
lines.push("-- Chạy sau khi đã chạy supabase/schema.sql.");
lines.push("");

lines.push("insert into public.projects");
lines.push(
  "  (title_vi, title_en, location_vi, location_en, year, in_progress, investor, contractor, category, image_url, sort_order)"
);
lines.push("values");
lines.push(
  projects
    .map((p, i) => {
      const row = [
        sqlString(p.titleVi),
        sqlString(p.titleEn),
        sqlString(p.locationVi),
        sqlString(p.locationEn),
        String(p.year),
        p.inProgress ? "true" : "false",
        sqlString(p.investor),
        sqlString(p.contractor),
        sqlString(p.category),
        sqlString(p.image ?? null),
        String(projects.length - i),
      ].join(", ");
      return `  (${row})`;
    })
    .join(",\n") + ";"
);
lines.push("");

lines.push("insert into public.partners (name, logo_url, sort_order)");
lines.push("values");
lines.push(
  partners
    .map((p, i) => `  (${sqlString(p.name)}, ${sqlString(p.logo)}, ${i + 1})`)
    .join(",\n") + ";"
);
lines.push("");

lines.push(
  "insert into public.posts (slug, title_vi, title_en, excerpt_vi, excerpt_en, content_vi, content_en, cover_image, category, status, published_at)"
);
lines.push("values");
lines.push(
  posts
    .map((post) => {
      const row = [
        sqlString(post.slug),
        sqlString(post.titleVi),
        sqlString(post.titleEn),
        sqlString(post.excerptVi),
        sqlString(post.excerptEn),
        sqlString(post.contentVi.join("\n\n")),
        sqlString(post.contentEn.join("\n\n")),
        sqlString(post.coverImage),
        sqlString(post.category),
        "'published'",
        sqlString(post.publishedAt),
      ].join(", ");
      return `  (${row})`;
    })
    .join(",\n") + ";"
);
lines.push("");

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), lines.join("\n"), "utf-8");
console.log("Đã sinh supabase/seed.sql");
