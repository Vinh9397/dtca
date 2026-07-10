"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types";

async function uploadImageIfProvided(
  formData: FormData,
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<string | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

function readProjectFields(formData: FormData) {
  return {
    title_vi: String(formData.get("titleVi") ?? ""),
    title_en: String(formData.get("titleEn") ?? ""),
    location_vi: String(formData.get("locationVi") ?? ""),
    location_en: String(formData.get("locationEn") ?? ""),
    year: Number(formData.get("year")),
    in_progress: formData.get("inProgress") === "on",
    investor: String(formData.get("investor") ?? ""),
    contractor: String(formData.get("contractor") ?? ""),
    category: String(formData.get("category") ?? "nha-may-dien") as Project["category"],
  };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const imageUrl = await uploadImageIfProvided(formData, supabase);

  const { error } = await supabase.from("projects").insert({
    ...readProjectFields(formData),
    image_url: imageUrl ?? null,
  });
  if (error) throw error;

  revalidatePath("/admin/du-an");
  redirect("/admin/du-an");
}

export async function updateProject(id: number, formData: FormData) {
  const supabase = await createClient();
  const imageUrl = await uploadImageIfProvided(formData, supabase);

  const update: Record<string, unknown> = {
    ...readProjectFields(formData),
    updated_at: new Date().toISOString(),
  };
  if (imageUrl) update.image_url = imageUrl;

  const { error } = await supabase.from("projects").update(update).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/du-an");
  redirect("/admin/du-an");
}

export async function deleteProject(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/du-an");
}
