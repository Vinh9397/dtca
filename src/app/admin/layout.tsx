import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Quản trị DTCA", template: "%s | Quản trị DTCA" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-navy-950">{children}</div>;
}
