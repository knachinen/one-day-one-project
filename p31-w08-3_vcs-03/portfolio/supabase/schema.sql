-- 2.1 projects 테이블 생성
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  role text,
  tech_stack text[],
  thumbnail text,
  status text check (status in ('in_progress', 'completed')) default 'completed',
  created_at timestamp with time zone default now()
);

-- 2.2 project_images 테이블 생성
create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  "order" int default 0
);

-- 3. Supabase RLS (Row Level Security) 설정
-- 3.1 RLS 활성화
alter table projects enable row level security;
alter table project_images enable row level security;

-- 3.2 Public Read 정책
-- 프로젝트 조회 허용
create policy "Public can read projects"
on projects
for select
using (true);

-- 프로젝트 이미지 조회 허용
create policy "Public can read project images"
on project_images
for select
using (true);

-- 3.3 Admin CRUD 정책
-- Admin 조건: auth.role() = 'authenticated'
create policy "Admin can manage projects"
on projects
for all
using (auth.role() = 'authenticated');

create policy "Admin can manage project images"
on project_images
for all
using (auth.role() = 'authenticated');

-- Storage Bucket Creation (Conceptual)
-- insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'project-images' );
-- create policy "Auth Upload" on storage.objects for insert using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );
