import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/lib/supabase/post-actions";

export const metadata = { title: "Tin tức" };

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-950">Tin tức ({posts?.length ?? 0})</h1>
        <Link
          href="/admin/tin-tuc/new"
          className="rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-900"
        >
          + Thêm bài viết
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-navy-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Tiêu đề</th>
              <th className="px-4 py-3 font-semibold">Trạng thái</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {(posts ?? []).map((post) => (
              <tr key={post.id}>
                <td className="max-w-md px-4 py-3 text-navy-900">{post.title_vi}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      post.status === "published"
                        ? "bg-accent-green/10 text-accent-green"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {post.status === "published" ? "Đã xuất bản" : "Nháp"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/tin-tuc/${post.id}`}
                      className="font-semibold text-navy-700 hover:text-navy-900"
                    >
                      Sửa
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePost(post.id);
                      }}
                    >
                      <button type="submit" className="font-semibold text-accent-red hover:opacity-80">
                        Xóa
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(posts ?? []).length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Chưa có bài viết nào trong Supabase. Chạy `supabase/seed.sql` để nhập bài viết mẫu, hoặc
            bấm &quot;Thêm bài viết&quot; để tạo mới.
          </p>
        ) : null}
      </div>
    </div>
  );
}
