아래는 앞서 작성한 **데이터베이스 활용 기획안**을 실제 개발로 바로 옮길 수 있도록 정리한
**📌 데이터베이스 활용 상세 구현 명세서 (실무·포트폴리오 기준)** 입니다.
기준 스택은 **Next.js (App Router) + Supabase** 입니다.

---

# 📌 데이터베이스 활용 상세 구현 명세서

### *Portfolio CMS 기능 구현*

---

## 1. 구현 범위 요약

### 이 명세서에서 다루는 것

* Supabase DB 테이블 생성
* RLS 정책 설정
* 프로젝트 데이터 CRUD 흐름
* Public 포트폴리오 연동
* Admin 페이지 연동 구조

### 다루지 않는 것

* 디자인 디테일
* 애니메이션 (5단계에서 처리)
* 외부 CMS 연동

---

## 2. 데이터베이스 테이블 구현

---

### 2.1 `projects` 테이블 생성

#### SQL 명세

```sql
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
```

---

### 2.2 `project_images` 테이블 생성

```sql
create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  "order" int default 0
);
```

---

### 2.3 관계 정의

* `projects (1)` → `project_images (N)`
* 프로젝트 삭제 시 이미지 자동 삭제 (`on delete cascade`)

---

## 3. Supabase RLS (Row Level Security) 설정

---

### 3.1 RLS 활성화

```sql
alter table projects enable row level security;
alter table project_images enable row level security;
```

---

### 3.2 Public Read 정책

#### 프로젝트 조회 허용

```sql
create policy "Public can read projects"
on projects
for select
using (true);
```

#### 프로젝트 이미지 조회 허용

```sql
create policy "Public can read project images"
on project_images
for select
using (true);
```

---

### 3.3 Admin CRUD 정책

> Admin 조건: `auth.role() = 'authenticated'`

```sql
create policy "Admin can manage projects"
on projects
for all
using (auth.role() = 'authenticated');
```

```sql
create policy "Admin can manage project images"
on project_images
for all
using (auth.role() = 'authenticated');
```

---

## 4. Supabase 클라이언트 설정

### 파일 구조

```
/lib/supabase/client.ts
/lib/supabase/server.ts
```

---

### 4.1 Public Client (Read-only)

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

### 4.2 Server Client (Admin / Auth)

* Server Actions 또는 Route Handler에서 사용
* Cookie 기반 세션 연동

---

## 5. 데이터 조회 구현 (Public)

---

### 5.1 프로젝트 목록 조회

```ts
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'completed')
  .order('created_at', { ascending: false })
```

---

### 5.2 기술 스택 필터링

```ts
.eq('tech_stack', 'Next.js')
```

또는

```ts
.contains('tech_stack', ['Supabase'])
```

---

### 5.3 프로젝트 상세 + 이미지 조회

```ts
const { data } = await supabase
  .from('projects')
  .select(`
    *,
    project_images (
      image_url,
      order
    )
  `)
  .eq('id', projectId)
  .single()
```

---

## 6. Admin 페이지 CRUD 흐름

---

### 6.1 프로젝트 생성

**입력 필드**

* title
* summary
* role
* tech_stack (멀티 선택)
* status

```ts
await supabase.from('projects').insert({
  title,
  summary,
  role,
  tech_stack,
  status
})
```

---

### 6.2 프로젝트 수정

```ts
await supabase
  .from('projects')
  .update(updatedFields)
  .eq('id', projectId)
```

---

### 6.3 프로젝트 삭제

```ts
await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
```

> ✔ 연결된 이미지 자동 삭제

---

## 7. 이미지 업로드 처리

---

### 7.1 Supabase Storage

**버킷**

```
project-images
```

---

### 7.2 업로드 흐름

1. 이미지 업로드
2. public URL 획득
3. `project_images` 테이블 insert

```ts
await supabase.storage
  .from('project-images')
  .upload(filePath, file)
```

---

## 8. 상태 기반 UI 분기

---

### 8.1 Work 페이지

* 완료 프로젝트: 기본 표시
* 진행중 프로젝트: 별도 섹션

```ts
.eq('status', 'in_progress')
```

---

### 8.2 Admin 페이지

* 토글 버튼으로 상태 변경
* 즉시 Public 페이지 반영

---

## 9. 에러 & 예외 처리

### 필수 처리

* 데이터 없음 → Empty State
* 권한 없음 → Redirect
* Supabase Error → Toast / Alert

---

## 10. 완료 기준 (Definition of Done)

* [x] DB 테이블 생성 완료
* [x] RLS 정책 정상 동작
* [x] Public 페이지 데이터 조회 성공
* [x] Admin CRUD 정상 작동
* [x] 상태/기술 필터 반영
* [ ] 포트폴리오 무중단 운영 가능

---

## 11. 이 구조의 포트폴리오적 가치

> **“나는 단순히 화면을 만드는 사람이 아니라
> 데이터 구조를 설계하고, 운영 가능한 서비스를 만든다.”**

* 프론트엔드
* 기획
* DB 설계
* CMS 사고방식
  👉 **한 번에 보여주는 구조**

---

### 다음으로 추천하는 문서

* 👉 **Admin 페이지 UI/UX 상세 명세서**
* 👉 **Supabase 기반 인증 설계**
* 👉 **DB → ISR / 캐싱 전략**

원하시는 다음 단계, 바로 이어서 작성해드릴게요.
