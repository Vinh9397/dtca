import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data-access/config";
import { AdminShell } from "@/components/admin/AdminShell";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return <SupabaseSetupNotice />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}
