import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "./config";
import { partners as fallbackPartners } from "@/lib/data/partners";
import type { Partner } from "@/types";

interface PartnerRow {
  id: number;
  name: string;
  logo_url: string;
}

export async function getPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured()) return fallbackPartners;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackPartners;
  return (data as PartnerRow[]).map((row) => ({
    id: String(row.id),
    name: row.name,
    logo: row.logo_url,
  }));
}
