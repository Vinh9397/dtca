const badgeOptions: { value: string; label: string }[] = [
  { value: "", label: "Không có" },
  { value: "best-sale", label: "Best sale" },
  { value: "new", label: "Mới" },
  { value: "featured", label: "Nổi bật" },
];

interface ProductFormValues {
  name_vi: string;
  name_en: string;
  slug: string;
  brand: string;
  subcategory?: string | null;
  description_vi?: string | null;
  description_en?: string | null;
  badge?: string | null;
  image_url?: string | null;
}

export function ProductForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ProductFormValues;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên sản phẩm (VI)" name="nameVi" defaultValue={defaultValues?.name_vi} required />
        <Field label="Name (EN)" name="nameEn" defaultValue={defaultValues?.name_en} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Slug (để trống để tự sinh từ tên VI)"
          name="slug"
          defaultValue={defaultValues?.slug}
        />
        <Field label="Thương hiệu / Hãng" name="brand" defaultValue={defaultValues?.brand} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Danh mục con (tuỳ chọn)"
          name="subcategory"
          defaultValue={defaultValues?.subcategory ?? ""}
        />
        <div>
          <label className="text-sm font-medium text-navy-800">Nhãn hiển thị</label>
          <select
            name="badge"
            defaultValue={defaultValues?.badge ?? ""}
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
          >
            {badgeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea
          label="Mô tả ngắn (VI)"
          name="descriptionVi"
          defaultValue={defaultValues?.description_vi ?? ""}
        />
        <TextArea
          label="Description (EN)"
          name="descriptionEn"
          defaultValue={defaultValues?.description_en ?? ""}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-navy-800">Hình ảnh sản phẩm</label>
        {defaultValues?.image_url ? (
          <p className="mt-1 text-xs text-slate-500">Ảnh hiện tại đã lưu — chọn ảnh mới để thay thế.</p>
        ) : null}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
      >
        Lưu sản phẩm
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy-800">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
      />
    </div>
  );
}
