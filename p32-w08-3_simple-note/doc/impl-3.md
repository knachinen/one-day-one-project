아래는 **3단계: DB 스키마 구축 & CRUD 준비**의
**상세 구현 명세서 + 세부 To-do**입니다.
2단계(정적 UI) 위에 실제 데이터 레이어를 구축하는 단계입니다.

---

# ✅ **3단계 상세 구현 명세서 (DB Schema & CRUD Layer Build)**

## 🎯 **3단계 목표**

* Supabase에 실제 DB 테이블 생성
* RLS(접근 정책) 설정
* CRUD API 함수 작성
* UI는 아직 Mock 데이터 그대로 사용 (연동 X)
* 4단계에서 UI와 이 함수를 연결할 준비를 완료

---

# 🗂 **3단계 전체 범위 요약**

```
1) Supabase DB 테이블 생성 (notes)
2) RLS 정책 설정: 인증 유무에 따른 접근 허용 규칙
3) DB 기본 테스트(SQL)
4) CRUD API 함수 구축(supabase-js)
5) 에러 처리 및 반환 구조 설계
6) 서버/클라이언트 경계 규칙 설정
7) 통합 테스트 준비
8) Git 태깅(v0.3)
```

---

# 📘 **1. Supabase DB 테이블 구축**

## ✔️ To-do

1. Supabase 콘솔에서 SQL Editor 실행
2. `notes` 테이블 생성
3. 기본 timestamp, uuid 자동 생성 규칙 작성
4. 인덱스 최적화 (created_at index)

---

## 🔧 상세 명세

### 1.1 notes 테이블 생성 SQL

Supabase > SQL Editor > New Query

```sql
create table if not exists public.notes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

### 1.2 인덱스 추가

목록 정렬 속도 개선용

```sql
create index if not exists notes_created_at_idx
on public.notes (created_at desc);
```

---

# 📘 **2. RLS 정책 구성 (권한)**

## ✔️ To-do

1. RLS 활성화
2. 공개 읽기/쓰기 허용할지 여부 결정

   * 인증 없는 프로젝트 → public all access
   * 인증 사용 프로젝트 → 사용자별 row-level 제한
3. 정책 작성
4. 정책 기능 테스트

---

## 🔧 상세 명세

### 2.1 RLS 활성화

Supabase → Table Editor → notes → RLS 활성화

### 2.2 인증 없이 사용한다면 (빠른 프로토타입용)

```sql
create policy "Enable read for all" 
on public.notes for select 
using (true);

create policy "Enable insert for all" 
on public.notes for insert 
with check (true);

create policy "Enable update for all" 
on public.notes for update 
using (true);

create policy "Enable delete for all" 
on public.notes for delete 
using (true);
```

### ※ 인증 적용하고 싶다면

요청하면 user_id 기반 RLS 버전도 작성해드릴게요.

---

# 📘 **3. DB 기본 테스트(RPC/SQL)**

## ✔️ To-do

1. SELECT 테스트
2. INSERT 테스트
3. UPDATE 테스트
4. DELETE 테스트

---

## 🔧 명세

```
select * from notes;
```

```
insert into notes (title, content) values ('테스트', '내용');
```

```
update notes set title = '수정됨' where id = 'uuid...';
```

```
delete from notes where id = 'uuid...';
```

---

# 📘 **4. CRUD API 함수 개발 (supabase-js)**

## ✔️ To-do

1. `/lib/db/notes.ts` 생성
2. Create / Read / Update / Delete 함수 생성
3. 공통 에러 핸들러
4. 타입 정의

---

## 🔧 상세 명세

### 4.1 타입 정의

`types/note.ts`

```ts
export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};
```

---

### 4.2 CRUD 함수

`lib/db/notes.ts`

```ts
import { supabase } from "@/lib/supabaseClient";
import { Note } from "@/types/note";

// CREATE
export async function createNote(title: string, content: string) {
  const { data, error } = await supabase
    .from("notes")
    .insert({ title, content })
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

// READ (all)
export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Note[];
}

// READ (single)
export async function getNote(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// UPDATE
export async function updateNote(id: string, title: string, content: string) {
  const { data, error } = await supabase
    .from("notes")
    .update({ title, content, updated_at: new Date() })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

// DELETE
export async function deleteNote(id: string) {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}
```

---

# 📘 **5. 서버/클라이언트 경계 규칙 설정**

## ✔️ To-do

1. 어떤 함수는 서버에서만 실행?
2. 어떤 컴포넌트가 “use client”가 필요한지?
3. fetch 정책 정리

---

## 🔧 권장 규칙

* READ: 서버에서 실행 (SSR 안정적)
* CREATE/UPDATE/DELETE: 클라이언트(버튼 기반 액션)에서 실행
* Form 컴포넌트: `use client`
* 데이터 표시 페이지: 서버 컴포넌트 가능

---

# 📘 **6. CRUD 함수 단독 테스트**

## ✔️ To-do

1. 개발자 콘솔에서 직접 함수 호출
2. 정상 입력/비정상 입력 테스트
3. 예외 처리 검증
4. unknown error 핸들링 추가

---

## 🔧 명세

```ts
await createNote("테스트", "테스트 내용")
await getNotes()
await updateNote("uuid", "수정된 제목", "내용")
await deleteNote("uuid")
```

---

# 📘 **7. v0.3 Git 태깅 (3단계 완료)**

## ✔️ To-do

1. 전체 폴더 정리
2. 주석/불필요 코드 제거
3. Commit → Tag

```
git add .
git commit -m "feat: completed DB schema and CRUD api layer"
git tag v0.3
```

---

# ✔ **3단계 완료 기준 (Definition of Done)**

* [ ] notes 테이블 생성 완료
* [ ] RLS 정책 정상 설정
* [ ] 인덱스 최적화 적용
* [ ] CRUD API 함수 5종 완성
* [ ] 함수 단독 동작 테스트 완료
* [ ] Git 태깅 v0.3

---

# 🔍 다음 단계 (4단계)도 바로 작성해드릴까요?

4단계는
➡ **UI + API 연결 (정적 → 실제 CRUD 동작으로 전환)**

원하면 바로 이어서 상세 명세서 작성해줄게요.
