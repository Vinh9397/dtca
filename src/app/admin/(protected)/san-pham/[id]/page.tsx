import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "@/lib/supabase/product-actions";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Sửa sản phẩm" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, Number(id));

  return (
    <div>
      <h1 className="text-xl font-bold text-navy-950">Sửa sản phẩm</h1>
      <div className="mt-6">
        <ProductForm action={updateWithId} defaultValues={product} />
      </div>
    </div>
  );
}
