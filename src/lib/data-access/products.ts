import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "./config";
import { products as fallbackProducts } from "@/lib/data/products";
import { slugify } from "@/lib/slug";
import type { Product } from "@/types";

interface ProductRow {
  id: number;
  name_vi: string;
  name_en: string;
  slug: string;
  brand: string;
  subcategory: string | null;
  description_vi: string | null;
  description_en: string | null;
  image_url: string | null;
  badge: Product["badge"] | null;
  sort_order: number;
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    nameVi: row.name_vi,
    nameEn: row.name_en,
    slug: row.slug,
    brand: row.brand,
    subcategory: row.subcategory ?? undefined,
    descriptionVi: row.description_vi ?? undefined,
    descriptionEn: row.description_en ?? undefined,
    image: row.image_url ?? undefined,
    badge: row.badge ?? undefined,
    sortOrder: row.sort_order,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return fallbackProducts;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: false });

  if (error || !data || data.length === 0) return fallbackProducts;
  return (data as ProductRow[]).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const list = await getProducts();
  return list.find((p) => p.slug === slug);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const list = await getProducts();
  return list.filter((p) => brand === "all" || p.brand === brand);
}

/** Resolves the real brand name from a URL-friendly slug, e.g. "phoenix-contact" -> "Phoenix Contact". */
export async function getBrandBySlug(brandSlug: string): Promise<string | undefined> {
  const list = await getProducts();
  const brands = Array.from(new Set(list.map((p) => p.brand)));
  return brands.find((brand) => slugify(brand) === brandSlug);
}

export async function getAllBrandSlugs(): Promise<string[]> {
  const list = await getProducts();
  return Array.from(new Set(list.map((p) => slugify(p.brand))));
}

export interface ProductBrandSummary {
  brand: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

export async function getProductBrands(): Promise<ProductBrandSummary[]> {
  const list = await getProducts();
  const map = new Map<string, ProductBrandSummary>();

  for (const product of list) {
    if (!map.has(product.brand)) {
      map.set(product.brand, { brand: product.brand, count: 0, subcategories: [] });
    }
    const entry = map.get(product.brand)!;
    entry.count += 1;

    if (product.subcategory) {
      const sub = entry.subcategories.find((s) => s.name === product.subcategory);
      if (sub) {
        sub.count += 1;
      } else {
        entry.subcategories.push({ name: product.subcategory, count: 1 });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.brand.localeCompare(b.brand));
}
