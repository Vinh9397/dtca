import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "./config";
import { projects as fallbackProjects, projectYears as fallbackYears } from "@/lib/data/projects";
import type { Project } from "@/types";

interface ProjectRow {
  id: number;
  title_vi: string;
  title_en: string;
  location_vi: string;
  location_en: string;
  year: number;
  in_progress: boolean;
  investor: string;
  contractor: string;
  category: Project["category"];
  image_url: string | null;
}

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    titleVi: row.title_vi,
    titleEn: row.title_en,
    locationVi: row.location_vi,
    locationEn: row.location_en,
    year: row.year,
    inProgress: row.in_progress,
    investor: row.investor,
    contractor: row.contractor,
    category: row.category,
    image: row.image_url ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return fallbackProjects;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: false });

  if (error || !data || data.length === 0) return fallbackProjects;
  return (data as ProjectRow[]).map(mapRow);
}

export async function getProjectYears(): Promise<number[]> {
  const list = await getProjects();
  if (list === fallbackProjects) return fallbackYears;
  return Array.from(new Set(list.map((p) => p.year))).sort((a, b) => b - a);
}
