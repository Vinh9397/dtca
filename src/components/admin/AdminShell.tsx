import Link from "next/link";
import { signOut } from "@/lib/supabase/auth-actions";

const navItems = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/san-pham", label: "Sản phẩm" },
  { href: "/admin/du-an", label: "Dự án" },
  { href: "/admin/tin-tuc", label: "Tin tức" },
];

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-navy-100 bg-white sm:block">
        <div className="border-b border-navy-100 px-5 py-4">
          <p className="text-sm font-bold text-navy-950">DTCA Admin</p>
        </div>
        <nav className="p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 hover:text-navy-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-6 py-3">
          <p className="text-sm text-slate-500">Đăng nhập: {userEmail}</p>
          <form action={signOut}>
            <button type="submit" className="text-sm font-semibold text-navy-700 hover:text-navy-900">
              Đăng xuất
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
