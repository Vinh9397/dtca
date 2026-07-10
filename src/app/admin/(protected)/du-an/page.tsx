import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "@/lib/supabase/project-actions";

export const metadata = { title: "Dự án" };

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-950">Dự án ({projects?.length ?? 0})</h1>
        <Link
          href="/admin/du-an/new"
          className="rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-900"
        >
          + Thêm dự án
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-navy-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Tên công trình</th>
              <th className="px-4 py-3 font-semibold">Năm</th>
              <th className="px-4 py-3 font-semibold">Danh mục</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {(projects ?? []).map((project) => (
              <tr key={project.id}>
                <td className="max-w-md px-4 py-3 text-navy-900">{project.title_vi}</td>
                <td className="px-4 py-3 text-slate-600">
                  {project.year}
                  {project.in_progress ? " (đang triển khai)" : ""}
                </td>
                <td className="px-4 py-3 text-slate-600">{project.category}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/du-an/${project.id}`}
                      className="font-semibold text-navy-700 hover:text-navy-900"
                    >
                      Sửa
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProject(project.id);
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
        {(projects ?? []).length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Chưa có dự án nào trong Supabase. Chạy `supabase/seed.sql` để nhập 35 dự án mẫu từ hồ
            sơ năng lực, hoặc bấm &quot;Thêm dự án&quot; để tạo mới.
          </p>
        ) : null}
      </div>
    </div>
  );
}
