import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/lib/supabase/post-actions";

export const metadata = { title: "Thêm bài viết" };

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Thêm bài viết</h1>
      <div className="mt-6">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}
