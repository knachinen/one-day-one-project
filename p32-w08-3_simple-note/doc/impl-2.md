아래는 **2단계: 목업 디자인 반영(정적 UI 구축)**을 위한
**상세 구현 명세서 + To-do 리스트**입니다.
실제 개발자 기준으로 바로 작업할 수 있도록 구체적으로 정리했습니다.

---

# ✅ **2단계 상세 구현 명세서 (Mockup → Static UI Build)**

## 🎯 **2단계 목표**

* 목업 디자인(와이어프레임)을 실제 UI로 구현
* 아직 Supabase API 연동 없음
* 모든 화면은 Mock 데이터로만 동작
* 컴포넌트 구조 골격 완성
* 이후 CRUD 기능을 쉽게 붙일 수 있게 UI 구조 정리

---

# 🗂 **2단계 전체 작업 범위**

```
UI 스타일링 정리
기본 레이아웃 구축
네비게이션 구성
Note 리스트 화면 구성
Note 상세 입력 폼 구성
Mock 데이터 연결
컴포넌트 아키텍처 설계
기본 상태관리 적용(useState)
정적 UI QA 및 조정
태그/버튼/입력창 UI 미세 조정
버전 태깅 (v0.2)
```

---

# 📘 **1. 디자인 시스템〮스타일 설정**

## ✔️ To-do

1. 색상 팔레트 확정
2. 타이포그래피 베이스 스타일 설정
3. 버튼·입력창 등 기본 컴포넌트 스타일 가이드 작성
4. Tailwind preset 적용

---

## 🔧 상세 명세

### 1.1 색상 시스템(예시)

* Primary: `#000000` (black)
* Secondary: `#f3f3f3`
* Accent: `#2563eb`
* Radius: `rounded-lg`
* Shadow: `shadow-md`

### 1.2 공통 클래스 정리

`styles/theme.css` 파일 생성 (선택)

---

# 📘 **2. 전체 페이지 레이아웃 구성**

## ✔️ To-do

1. 공통 Layout 컴포넌트 생성
2. Header / Footer 구성(필요시)
3. 페이지 전체 Width 규칙 설정
4. 모바일/데스크탑 반응형 베이스

---

## 🔧 상세 명세

`app/layout.tsx` 예시

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-white text-black max-w-2xl mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">Simple Notes</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

---

# 📘 **3. Note 리스트 화면(정적) 구현**

## ✔️ To-do

1. `/notes` 페이지 생성
2. 목업 기반 리스트 UI 구성
3. Mock Data로 카드 반복 렌더링
4. NoteCard 컴포넌트 분리

---

## 🔧 상세 명세

### 3.1 Mock 데이터

`data/mockNotes.ts`

```ts
export const mockNotes = [
  { id: 1, title: "첫 번째 노트", content: "내용 입력 예시..." },
  { id: 2, title: "두 번째 노트", content: "테스트 데이터" },
];
```

### 3.2 NoteCard 컴포넌트

`components/NoteCard.tsx`

```tsx
export function NoteCard({ title, content }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-sm text-neutral-600">{content}</p>
    </div>
  );
}
```

### 3.3 리스트 페이지

`app/notes/page.tsx`

```tsx
import { mockNotes } from "@/data/mockNotes";
import { NoteCard } from "@/components/NoteCard";

export default function NotesPage() {
  return (
    <main>
      <div className="space-y-4">
        {mockNotes.map((n) => (
          <NoteCard key={n.id} title={n.title} content={n.content} />
        ))}
      </div>
    </main>
  );
}
```

---

# 📘 **4. Note 생성/수정 폼 페이지(정적)**

## ✔️ To-do

1. `/notes/new` 페이지 생성
2. 입력폼 UI 구성
3. save 버튼은 동작 없이 console.log로 Mock
4. Form 컴포넌트 분리

---

## 🔧 상세 명세

### 4.1 NoteForm 컴포넌트

`components/NoteForm.tsx`

```tsx
"use client";
import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form className="space-y-4">
      <input
        className="w-full border rounded p-2"
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded p-2 h-40"
        placeholder="내용 입력"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="button"
        onClick={() => console.log({ title, content })}
        className="bg-black text-white px-4 py-2 rounded"
      >
        저장
      </button>
    </form>
  );
}
```

### 4.2 `/notes/new` 페이지

```tsx
import NoteForm from "@/components/NoteForm";

export default function NewNotePage() {
  return (
    <main>
      <h2 className="text-lg font-bold mb-4">새 노트</h2>
      <NoteForm />
    </main>
  );
}
```

---

# 📘 **5. Navigation 및 라우팅 구조 확정**

## ✔️ To-do

1. Header에 노트 목록/새 노트 버튼 추가
2. 라우팅 구조 연결
3. 반응형 메뉴 구성(선택)

---

## 🔧 예시

`app/layout.tsx` 수정

```tsx
<header className="flex justify-between items-center mb-8">
  <h1 className="text-xl font-bold">Simple Notes</h1>

  <nav className="space-x-4 text-sm">
    <a href="/notes">노트 목록</a>
    <a href="/notes/new" className="text-blue-600 font-medium">새 노트</a>
  </nav>
</header>
```

---

# 📘 **6. 정적 UI QA 및 스타일 보정**

## ✔️ To-do

1. 모바일 사이즈에서 카드 깨짐 여부 확인
2. 입력폼 여백/라인 간격 확인
3. 타이포그래피 통일
4. 색상 대비 확인
5. mockNotes UI 균일성 체크
6. hover/transition 부자연스러움 제거

---

# 📘 **7. v0.2 태깅**

## ✔️ To-do

1. 전체 코드 정리
2. 필요없는 콘솔 제거
3. Git commit
4. Tag: **v0.2**

```
git add .
git commit -m "feat: static UI implemented for notes list & form"
git tag v0.2
```

---

# ✔ **2단계 완료 기준 (Definition of Done)**

* [ ] 목업 기반의 UI 100% 반영
* [ ] 리스트 페이지가 Mock 데이터로 표시됨
* [ ] NoteCard 컴포넌트 완성
* [ ] NoteForm 컴포넌트 완성
* [ ] 레이아웃/네비게이션 구축
* [ ] 반응형 구조 최소 대응
* [ ] Git v0.2 태깅

---

# 🔍 다음 단계는?

원하신다면 바로
➡ **3단계 상세 구현 명세서 (DB 구축 & CRUD 준비)**
➡ **전체 구조도(Architecture Diagram)**
➡ **캔버스에 코드 전체 자동 생성**

중 하나로 이어서 작성해드릴게요.
