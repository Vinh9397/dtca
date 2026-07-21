import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase KHÔNG dùng cookie — an toàn để gọi lúc build (generateStaticParams,
 * sitemap.ts) vì những nơi đó không có request/cookie context.
 * Chỉ dùng cho dữ liệu đọc công khai (products, projects, posts, partners) — các bảng
 * này đã có policy "public read" nên không cần phiên đăng nhập.
 * KHÔNG dùng client này để ghi dữ liệu (insert/update/delete) trong trang /admin.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
