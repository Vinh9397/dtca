import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProject } from "@/lib/supabase/project-actions";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "Sửa dự án" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) notFound();

  const updateWithId = updateProject.bind(null, Number(id));

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Sửa dự án</h1>
      <div className="mt-6">
        <ProjectForm action={updateWithId} defaultValues={project} />
      </div>
    </div>
  );
}
