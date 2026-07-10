"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function uploadCoverIfProvided(
  formData: FormData,
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<string | undefined> {
  const file = formData.get("cover");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("post-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("post-images").getPublicUrl(path);
  return data.publicUrl;
}

const DIACRITIC_MARKS_REGEX = /[̀-ͯ]/g;

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(DIACRITIC_MARKS_REGEX, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readPostFields(formData: FormData) {
  const titleVi = String(formData.get("titleVi") ?? "");
  const slugInput = String(formData.get("slug") ?? "");

  return {
    slug: slugify(slugInput || titleVi),
    title_vi: titleVi,
    title_en: String(formData.get("titleEn") ?? ""),
    excerpt_vi: String(formData.get("excerptVi") ?? ""),
    excerpt_en: String(formData.get("excerptEn") ?? ""),
    content_vi: String(formData.get("contentVi") ?? ""),
    content_en: String(formData.get("contentEn") ?? ""),
    category: String(formData.get("category") ?? "cong-nghe"),
    status: formData.get("status") === "on" ? "published" : "draft",
  };
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const coverUrl = await uploadCoverIfProvided(formData, supabase);
  const fields = readPostFields(formData);

  const { error } = await supabase.from("posts").insert({
    ...fields,
    cover_image: coverUrl ?? null,
    published_at: fields.status === "published" ? new Date().toISOString() : null,
  });
  if (error) throw error;

  revalidatePath("/admin/tin-tuc");
  redirect("/admin/tin-tuc");
}

export async function updatePost(id: number, formData: FormData) {
  const supabase = await createClient();
  const coverUrl = await uploadCoverIfProvided(formData, supabase);
  const fields = readPostFields(formData);

  const update: Record<string, unknown> = { ...fields, updated_at: new Date().toISOString() };
  if (coverUrl) update.cover_image = coverUrl;
  if (fields.status === "published") {
    update.published_at = new Date().toISOString();
  }

  const { error } = await supabase.from("posts").update(update).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/tin-tuc");
  redirect("/admin/tin-tuc");
}

export async function deletePost(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/tin-tuc");
}
