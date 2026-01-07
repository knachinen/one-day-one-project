아래는 **Supabase를 이용해 가장 기본적인 CRUD(Create, Read, Update, Delete) 기능을 구현하는 간단한 프로젝트 구조 예시**입니다.
(Web: Next.js / Backend: Supabase / DB: Postgres)

필요하다면 **코드 템플릿**, **ERD**, **프로젝트 구조**, **UI 기획**, **슬라이드**, **캔버스에 코드 작성**도 바로 만들어줄게요.

---

# ✅ Supabase 기반 간단 CRUD 프로젝트 기획안

## 1. 프로젝트 개요

**프로젝트명:** Simple Notes App
**설명:** 사용자 로그인 없이 간단한 메모를 생성·조회·수정·삭제할 수 있는 CRUD 웹앱
**사용 기술:**

* **Supabase**

  * Authentication(옵션)
  * Database(PostgreSQL)
  * REST & Realtime API
* **Next.js (App Router) 또는 React**
* **Tailwind CSS** (선택)

---

# 2. DB 스키마 (Supabase Table)

### **notes 테이블**

| 필드명        | 타입        | 설명    |
| ---------- | --------- | ----- |
| id         | uuid (PK) | 기본 키  |
| title      | text      | 메모 제목 |
| content    | text      | 메모 본문 |
| created_at | timestamp | 생성 시간 |
| updated_at | timestamp | 수정 시간 |

**SQL (Supabase 콘솔 → SQL Editor)**

```sql
create table public.notes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

---

# 3. Supabase Client 초기 설정 (Next.js)

`lib/supabaseClient.ts`

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

# 4. CRUD 기능 코드 예시

## 📌 1) CREATE (메모 생성)

```ts
const createNote = async (title: string, content: string) => {
  const { data, error } = await supabase
    .from('notes')
    .insert({ title, content })
    .select()

  if (error) throw error
  return data
}
```

---

## 📌 2) READ (모든 메모 목록 조회)

```ts
const getNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
```

---

## 📌 3) UPDATE (메모 수정)

```ts
const updateNote = async (id: string, title: string, content: string) => {
  const { data, error } = await supabase
    .from('notes')
    .update({
      title,
      content,
      updated_at: new Date(),
    })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}
```

---

## 📌 4) DELETE (메모 삭제)

```ts
const deleteNote = async (id: string) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw error
}
```

---

# 5. Next.js Example Page

미니멀 UI 예시:

```tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data } = await supabase.from("notes").select("*");
    setNotes(data || []);
  };

  const addNote = async () => {
    await supabase.from("notes").insert({ title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const removeNote = async (id: string) => {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Notes</h1>

      <div className="mt-4">
        <input
          className="border w-full p-2 mb-2"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border w-full p-2"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-black text-white px-4 py-2 mt-2 rounded"
        >
          Add Note
        </button>
      </div>

      <ul className="mt-6 space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded">
            <h2 className="font-semibold">{note.title}</h2>
            <p className="text-sm mt-1">{note.content}</p>
            <button
              onClick={() => removeNote(note.id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

# 6. 확장 아이디어 (원한다면 구현해드림)

| 기능             | 설명                  |
| -------------- | ------------------- |
| 인증(Auth) 적용    | 로그인한 사용자만 CRUD 가능   |
| Realtime 메모 반영 | 동시 편집 가능            |
| 파일 업로드         | Supabase Storage 사용 |
| 태그 기능          | note_tags 테이블 연결    |
| UI 애니메이션       | Framer Motion       |

---

# 원하시는 다음 단계는?

👇 아래에서 골라줘

1. **Next.js 전체 프로젝트 구조 만들어줘**
2. **전체 코드를 캔버스에 작성해줘**
3. **UI 디자인 시스템 적용해서 더 예쁘게**
4. **옵시디언 슬라이드(advanced slides) 버전으로 요약**
5. **ERD/DB 스키마 자동 생성해줘**
6. **더 쉬운 튜토리얼 스타일로 설명해줘**

어떤 걸 원해?
