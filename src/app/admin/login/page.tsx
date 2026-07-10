import type { Metadata } from "next";
import { signIn } from "@/lib/supabase/auth-actions";
import { isSupabaseConfigured } from "@/lib/data-access/config";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";

export const metadata: Metadata = { title: "Đăng nhập quản trị | DTCA", robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!isSupabaseConfigured()) {
    return <SupabaseSetupNotice />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-lg font-bold text-navy-950">Đăng nhập quản trị DTCA</h1>
        <p className="mt-1 text-sm text-slate-500">Dành cho nhân sự nội bộ quản trị nội dung website.</p>

        <form action={signIn} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-navy-800">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
            />
          </div>

          {error ? <p className="text-sm font-medium text-accent-red">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
