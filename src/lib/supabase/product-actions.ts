"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import type { Product } from "@/types";

async function uploadImageIfProvided(
  formData: FormData,
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<string | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

function readProductFields(formData: FormData) {
  const nameVi = String(formData.get("nameVi") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const badge = String(formData.get("badge") ?? "");

  return {
    name_vi: nameVi,
    name_en: String(formData.get("nameEn") ?? ""),
    slug: slugify(slugInput || nameVi),
    brand: String(formData.get("brand") ?? ""),
    subcategory: String(formData.get("subcategory") ?? "").trim() || null,
    description_vi: String(formData.get("descriptionVi") ?? "").trim() || null,
    description_en: String(formData.get("descriptionEn") ?? "").trim() || null,
    badge: (badge || null) as Product["badge"] | null,
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const imageUrl = await uploadImageIfProvided(formData, supabase);

  const { error } = await supabase.from("products").insert({
    ...readProductFields(formData),
    image_url: imageUrl ?? null,
  });
  if (error) throw error;

  revalidatePath("/admin/san-pham");
  redirect("/admin/san-pham");
}

export async function updateProduct(id: number, formData: FormData) {
  const supabase = await createClient();
  const imageUrl = await uploadImageIfProvided(formData, supabase);

  const update: Record<string, unknown> = {
    ...readProductFields(formData),
    updated_at: new Date().toISOString(),
  };
  if (imageUrl) update.image_url = imageUrl;

  const { error } = await supabase.from("products").update(update).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/san-pham");
  redirect("/admin/san-pham");
}

export async function deleteProduct(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/san-pham");
}
