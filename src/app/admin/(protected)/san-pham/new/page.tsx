import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/supabase/product-actions";

export const metadata = { title: "Thêm sản phẩm" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Thêm sản phẩm</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
