import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/supabase/project-actions";

export const metadata = { title: "Thêm dự án" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Thêm dự án</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
