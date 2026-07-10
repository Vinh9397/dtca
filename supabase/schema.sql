-- DTCA website — Supabase schema
-- Chạy trong Supabase SQL Editor (Project > SQL Editor > New query) theo đúng thứ tự từ trên xuống.

create extension if not exists "pgcrypto";

-- ============================================================
-- projects: Danh sách công trình / hợp đồng tiêu biểu
-- ============================================================
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title_vi text not null,
  title_en text not null,
  location_vi text not null,
  location_en text not null,
  year int not null,
  in_progress boolean not null default false,
  investor text not null,
  contractor text not null,
  category text not null check (
    category in ('nha-may-dien', 'dien-mat-troi', 'tram-bien-ap', 'san-xuat-cong-nghiep')
  ),
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- posts: Bài viết tin tức
-- ============================================================
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title_vi text not null,
  title_en text not null,
  excerpt_vi text not null,
  excerpt_en text not null,
  content_vi text not null,
  content_en text not null,
  cover_image text,
  category text not null default 'cong-nghe',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- partners: Logo đối tác / hãng thiết bị
-- ============================================================
create table if not exists public.partners (
  id bigint generated always as identity primary key,
  name text not null,
  logo_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- contact_submissions: Dữ liệu form Liên hệ
-- ============================================================
create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  locale text not null default 'vi',
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.partners enable row level security;
alter table public.contact_submissions enable row level security;

-- Đọc công khai: ai cũng xem được projects/partners, và posts đã published
create policy "public read projects" on public.projects
  for select using (true);

create policy "public read partners" on public.partners
  for select using (true);

create policy "public read published posts" on public.posts
  for select using (status = 'published');

-- Ghi: chỉ user đã đăng nhập (tài khoản quản trị nội bộ DTCA, tạo trong Supabase Auth) mới được insert/update/delete
create policy "authenticated manage projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated manage posts" on public.posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated manage partners" on public.partners
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Form liên hệ: ai cũng insert được (gửi liên hệ), nhưng chỉ user đã đăng nhập mới đọc được danh sách
create policy "anyone can submit contact" on public.contact_submissions
  for insert with check (true);

create policy "authenticated read contact submissions" on public.contact_submissions
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- Storage buckets (chạy riêng trong Supabase Dashboard > Storage nếu SQL bucket API không khả dụng)
-- ============================================================
insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('post-images', 'post-images', true),
  ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;

create policy "public read project images" on storage.objects
  for select using (bucket_id = 'project-images');
create policy "public read post images" on storage.objects
  for select using (bucket_id = 'post-images');
create policy "public read partner logos" on storage.objects
  for select using (bucket_id = 'partner-logos');

create policy "authenticated upload project images" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.role() = 'authenticated');
create policy "authenticated upload post images" on storage.objects
  for insert with check (bucket_id = 'post-images' and auth.role() = 'authenticated');
create policy "authenticated upload partner logos" on storage.objects
  for insert with check (bucket_id = 'partner-logos' and auth.role() = 'authenticated');
