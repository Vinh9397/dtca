import type { Project } from "@/types";

const categoryOptions: { value: Project["category"]; label: string }[] = [
  { value: "nha-may-dien", label: "Nhà máy điện" },
  { value: "dien-mat-troi", label: "Điện mặt trời" },
  { value: "tram-bien-ap", label: "Trạm biến áp" },
  { value: "san-xuat-cong-nghiep", label: "Sản xuất công nghiệp" },
];

interface ProjectFormValues {
  title_vi: string;
  title_en: string;
  location_vi: string;
  location_en: string;
  year: number;
  in_progress: boolean;
  investor: string;
  contractor: string;
  category: Project["category"];
  image_url?: string | null;
}

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ProjectFormValues;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên công trình (VI)" name="titleVi" defaultValue={defaultValues?.title_vi} required />
        <Field label="Title (EN)" name="titleEn" defaultValue={defaultValues?.title_en} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Địa điểm (VI)" name="locationVi" defaultValue={defaultValues?.location_vi} required />
        <Field label="Location (EN)" name="locationEn" defaultValue={defaultValues?.location_en} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Chủ đầu tư" name="investor" defaultValue={defaultValues?.investor} required />
        <Field label="Đơn vị ký hợp đồng" name="contractor" defaultValue={defaultValues?.contractor} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Năm" name="year" type="number" defaultValue={defaultValues?.year ?? new Date().getFullYear()} required />
        <div>
          <label className="text-sm font-medium text-navy-800">Danh mục</label>
          <select
            name="category"
            defaultValue={defaultValues?.category ?? "nha-may-dien"}
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 pt-7 text-sm font-medium text-navy-800">
          <input type="checkbox" name="inProgress" defaultChecked={defaultValues?.in_progress} />
          Đang triển khai
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-navy-800">Hình ảnh dự án</label>
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
        Lưu dự án
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
