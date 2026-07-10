export function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-lg font-bold text-navy-950">Chưa kết nối Supabase</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Trang quản trị cần kết nối tới Supabase để đăng nhập và quản lý Dự án, Tin tức. Vui lòng:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>
            Tạo file <code className="rounded bg-slate-100 px-1.5 py-0.5">.env.local</code> từ mẫu{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5">.env.local.example</code>.
          </li>
          <li>
            Điền <code className="rounded bg-slate-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            và <code className="rounded bg-slate-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            từ Supabase Project Settings → API.
          </li>
          <li>
            Chạy lần lượt <code className="rounded bg-slate-100 px-1.5 py-0.5">supabase/schema.sql</code>{" "}
            rồi <code className="rounded bg-slate-100 px-1.5 py-0.5">supabase/seed.sql</code> trong Supabase SQL Editor.
          </li>
          <li>Tạo tài khoản quản trị trong Supabase Authentication → Users.</li>
          <li>Khởi động lại server.</li>
        </ol>
      </div>
    </div>
  );
}
