export type Locale = "vi" | "en";

export type ProjectCategory =
  | "nha-may-dien"
  | "dien-mat-troi"
  | "tram-bien-ap"
  | "san-xuat-cong-nghiep";

export interface Project {
  id: number;
  titleVi: string;
  titleEn: string;
  locationVi: string;
  locationEn: string;
  year: number;
  inProgress: boolean;
  investor: string;
  contractor: string;
  category: ProjectCategory;
  image?: string;
}

export type ProductBadge = "best-sale" | "new" | "featured";

export interface Product {
  id: number;
  nameVi: string;
  nameEn: string;
  slug: string;
  brand: string;
  subcategory?: string;
  descriptionVi?: string;
  descriptionEn?: string;
  image?: string;
  badge?: ProductBadge;
  sortOrder: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Post {
  slug: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  contentVi: string[];
  contentEn: string[];
  coverImage: string;
  publishedAt: string;
  category: ProjectCategory | "cong-nghe";
}

export interface WorkforceRow {
  role: { vi: string; en: string };
  count: number;
}
