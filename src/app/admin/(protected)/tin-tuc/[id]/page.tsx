import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "@/lib/supabase/post-actions";
import { PostForm } from "@/components/admin/PostForm";

export const metadata = { title: "Sửa bài viết" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();

  if (!post) notFound();

  const updateWithId = updatePost.bind(null, Number(id));

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Sửa bài viết</h1>
      <div className="mt-6">
        <PostForm action={updateWithId} defaultValues={post} />
      </div>
    </div>
  );
}
