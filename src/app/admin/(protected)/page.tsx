import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: projectCount }, { count: postCount }, { count: submissionCount }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { label: "Dự án", value: projectCount ?? 0, href: "/admin/du-an" },
    { label: "Bài viết", value: postCount ?? 0, href: "/admin/tin-tuc" },
    { label: "Yêu cầu liên hệ", value: submissionCount ?? 0, href: "/admin" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Tổng quan</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-navy-100 bg-white p-5 shadow-sm hover:shadow-md"
          >
            <p className="text-3xl font-bold text-navy-900">{card.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{card.label}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate-500">
        Sử dụng menu bên trái để thêm/sửa Dự án và Tin tức. Nội dung sẽ hiển thị ngay trên website
        công khai sau khi lưu.
      </p>
    </div>
  );
}
