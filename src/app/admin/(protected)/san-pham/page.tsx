import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "@/lib/supabase/product-actions";

export const metadata = { title: "Sản phẩm" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-950">Sản phẩm ({products?.length ?? 0})</h1>
        <Link
          href="/admin/san-pham/new"
          className="rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-900"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-navy-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Tên sản phẩm</th>
              <th className="px-4 py-3 font-semibold">Thương hiệu</th>
              <th className="px-4 py-3 font-semibold">Danh mục con</th>
              <th className="px-4 py-3 font-semibold">Nhãn</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {(products ?? []).map((product) => (
              <tr key={product.id}>
                <td className="max-w-md px-4 py-3 text-navy-900">{product.name_vi}</td>
                <td className="px-4 py-3 text-slate-600">{product.brand}</td>
                <td className="px-4 py-3 text-slate-600">{product.subcategory ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{product.badge ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/san-pham/${product.id}`}
                      className="font-semibold text-navy-700 hover:text-navy-900"
                    >
                      Sửa
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(product.id);
                      }}
                    >
                      <button type="submit" className="font-semibold text-accent-red hover:opacity-80">
                        Xóa
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(products ?? []).length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Chưa có sản phẩm nào trong Supabase. Chạy `supabase/seed-products.sql` để nhập sản phẩm
            mẫu, hoặc bấm &quot;Thêm sản phẩm&quot; để tạo mới.
          </p>
        ) : null}
      </div>
    </div>
  );
}
