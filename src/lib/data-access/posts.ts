import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "./config";
import { posts as fallbackPosts } from "@/lib/data/posts";
import type { Post } from "@/types";

interface PostRow {
  slug: string;
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  cover_image: string | null;
  category: Post["category"];
  published_at: string | null;
}

function mapRow(row: PostRow): Post {
  return {
    slug: row.slug,
    titleVi: row.title_vi,
    titleEn: row.title_en,
    excerptVi: row.excerpt_vi,
    excerptEn: row.excerpt_en,
    contentVi: row.content_vi.split("\n\n"),
    contentEn: row.content_en.split("\n\n"),
    coverImage: row.cover_image ?? "/images/hero/scada-control-room.jpg",
    publishedAt: row.published_at ?? new Date().toISOString(),
    category: row.category,
  };
}

export async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return fallbackPosts;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) return fallbackPosts;
  return (data as PostRow[]).map(mapRow);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const list = await getPosts();
  return list.find((p) => p.slug === slug);
}
