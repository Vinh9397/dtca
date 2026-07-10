# dtca.vn — Website Công ty TNHH Thương mại và Kỹ thuật DTCA

Website đa ngôn ngữ (Tiếng Việt `/vi`, Tiếng Anh `/en`) xây dựng bằng Next.js (App Router) +
Tailwind CSS + Supabase, deploy trên Vercel. Nội dung Sản phẩm & Dịch vụ, Giải pháp, Dự án
tiêu biểu lấy từ hồ sơ năng lực DTCA 2026.

## 1. Chạy thử ở máy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000 — sẽ tự chuyển hướng sang `/vi`.

Nếu **chưa** cấu hình Supabase (bước 2), toàn bộ trang công khai vẫn chạy được nhờ dữ liệu mẫu
tại `src/lib/data/*.ts` (35 dự án, bài viết mẫu, đối tác, thông tin công ty — lấy từ hồ sơ năng
lực). Trang quản trị `/admin` sẽ hiển thị hướng dẫn cấu hình thay vì lỗi.

## 2. Kết nối Supabase (bắt buộc để dùng trang quản trị `/admin`)

1. Tạo project mới tại https://supabase.com.
2. Copy `.env.local.example` thành `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` và
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
3. Vào Supabase SQL Editor, chạy lần lượt:
   - `supabase/schema.sql` — tạo bảng `projects`, `posts`, `partners`, `contact_submissions`,
     bật RLS và tạo storage bucket.
   - `supabase/seed.sql` — nhập sẵn 35 dự án + bài viết mẫu (sinh từ
     `scripts/generate-seed-sql.ts`, chạy `npx tsx scripts/generate-seed-sql.ts` nếu sửa dữ liệu
     mẫu và muốn sinh lại).
4. Vào Authentication → Users, tạo tài khoản đăng nhập cho nhân sự DTCA sẽ quản trị nội dung.
5. Khởi động lại `npm run dev`, đăng nhập tại `/admin/login`.

## 3. Form Liên hệ (gửi email)

Điền `RESEND_API_KEY` và `CONTACT_TO_EMAIL` trong `.env.local` (đăng ký miễn phí tại
https://resend.com). Nếu chưa cấu hình, form vẫn nhận submit và log ra console — không gửi email
thật.

## 4. SEO / Analytics

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: mã Google Analytics 4 (dạng `G-XXXXXXXXXX`).
- `NEXT_PUBLIC_GSC_VERIFICATION`: mã xác minh Google Search Console.
- `NEXT_PUBLIC_SITE_URL`: domain thật (`https://dtca.vn`) — dùng để sinh sitemap/canonical/hreflang.

## 5. Việc còn cần DTCA cung cấp trước khi lên production

- **Logo vector gốc** (AI/SVG/EPS) — hiện đang dùng bản tái tạo tạm tại `src/components/Logo.tsx`.
- **Ảnh thật** cho các dự án/bài viết (hiện dùng ảnh minh họa SVG placeholder tại `public/images/`).
- **Rà soát bản dịch tiếng Anh** tại `src/messages/en.json` và `src/lib/data/*.ts` (đã dịch bằng AI
  từ tiếng Việt, nên có kỹ sư rà lại thuật ngữ chuyên ngành).
- Xác nhận domain `dtca.vn` đã trỏ DNS về Vercel khi deploy production.

## 6. Cấu trúc chính

```
src/
  app/[locale]/        Các trang công khai (vi/en) — routing đa ngôn ngữ qua next-intl
  app/admin/            Trang quản trị nội bộ (không đa ngôn ngữ, bảo vệ bằng Supabase Auth)
  app/api/contact/      API nhận form Liên hệ
  components/           UI dùng chung + layout + admin
  i18n/                 Cấu hình next-intl (routing, pathnames song ngữ)
  lib/data/              Dữ liệu mẫu/nguồn sự thật (từ hồ sơ năng lực)
  lib/data-access/       Lớp truy vấn: ưu tiên Supabase, fallback dữ liệu mẫu
  lib/supabase/          Supabase client (browser/server) + server actions cho /admin
  messages/              Nội dung song ngữ vi.json / en.json
supabase/
  schema.sql             Lược đồ bảng + RLS + storage buckets
  seed.sql                Dữ liệu khởi tạo (sinh tự động, không sửa tay)
```

## Deploy

Deploy trực tiếp lên Vercel (import repo, điền các biến môi trường ở trên trong Project
Settings → Environment Variables), sau đó trỏ domain `dtca.vn` vào project trên Vercel.
