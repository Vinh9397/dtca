interface PostFormValues {
  slug: string;
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  category: string;
  status: string;
  cover_image?: string | null;
}

export function PostForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PostFormValues;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Tiêu đề (VI)" name="titleVi" defaultValue={defaultValues?.title_vi} required />
        <TextField label="Title (EN)" name="titleEn" defaultValue={defaultValues?.title_en} required />
      </div>
      <TextField
        label="Slug (để trống sẽ tự tạo từ tiêu đề)"
        name="slug"
        defaultValue={defaultValues?.slug}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea label="Tóm tắt (VI)" name="excerptVi" defaultValue={defaultValues?.excerpt_vi} rows={3} required />
        <TextArea label="Excerpt (EN)" name="excerptEn" defaultValue={defaultValues?.excerpt_en} rows={3} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea
          label="Nội dung (VI) — mỗi đoạn cách nhau 1 dòng trống"
          name="contentVi"
          defaultValue={defaultValues?.content_vi}
          rows={8}
          required
        />
        <TextArea
          label="Content (EN) — separate paragraphs with a blank line"
          name="contentEn"
          defaultValue={defaultValues?.content_en}
          rows={8}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Danh mục" name="category" defaultValue={defaultValues?.category ?? "cong-nghe"} />
        <div>
          <label className="text-sm font-medium text-navy-800">Ảnh bìa</label>
          {defaultValues?.cover_image ? (
            <p className="mt-1 text-xs text-slate-500">Ảnh hiện tại đã lưu — chọn ảnh mới để thay thế.</p>
          ) : null}
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
        <input type="checkbox" name="status" defaultChecked={defaultValues?.status === "published"} />
        Xuất bản (hiển thị công khai trên website)
      </label>

      <button
        type="submit"
        className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
      >
        Lưu bài viết
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
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
  rows,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy-800">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="mt-1.5 w-full rounded-md border border-navy-200 px-3 py-2 text-sm"
      />
    </div>
  );
}
