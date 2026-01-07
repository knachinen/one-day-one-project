아래는 **1단계: 환경 구축 & 테스트 페이지 런칭**을 위한
**상세 구현 명세서 + 세부 To-do 리스트**입니다.
최대한 실제 개발자가 그대로 따라할 수 있을 만큼 구체적으로 작성했습니다.

---

# ✅ **1단계 상세 구현 명세서 (Environment Setup & Test Launch)**

## 🎯 **1단계 목표**

* Next.js + Supabase 환경을 100% 구축
* API 연결 테스트용 페이지(`/test`) 정상 출력
* 이후 단계 개발이 가능한 기본 프로젝트 골격 확보

---

# 📘 **1. 프로젝트 초기화**

## ✔️ To-do

1. 프로젝트 폴더 생성
2. Next.js 기본 템플릿 설치
3. TypeScript 설정 확인
4. git 초기화

---

## 🔧 상세 명세

### 1.1 폴더 & Next.js 생성

```
npx create-next-app@latest simple-crud --ts --eslint --app
```

옵션 설명:

* `--ts` → TypeScript 활성화
* `--app` → App Router 기반
* `--eslint` → 정적 코드 분석 도구 포함

### 1.2 Git 초기화

```
cd simple-crud
git init
git add .
git commit -m "chore: initial project setup"
```

---

# 📘 **2. Supabase 연동 준비**

## ✔️ To-do

1. Supabase 프로젝트 생성
2. URL / anon key 확인
3. 환경 변수 파일 생성
4. Supabase JS SDK 설치
5. Supabase Client 파일 생성

---

## 🔧 상세 명세

### 2.1 Supabase 프로젝트 생성

* [https://app.supabase.com](https://app.supabase.com)
* New Project → 무료 플랜 선택
* 프로젝트명: **simple-crud**

### 2.2 API Keys 확인

Dashboard → Project Settings → API

* `Project URL`
* `anon public` key

### 2.3 `.env.local` 생성

— 파일 생성

```
touch .env.local
```

— 내용 추가

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 2.4 Supabase SDK 설치

```
npm install @supabase/supabase-js
```

### 2.5 Supabase Client 생성

`lib/supabaseClient.ts`

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

# 📘 **3. 테스트 페이지 구현 (/test)**

## ✔️ To-do

1. `/test` 디렉토리 생성
2. 간단한 서버 컴포넌트 or 클라이언트 컴포넌트 작성
3. Supabase 연결 테스트
4. 빌드 검증
5. 기본 UI 적용 (보기 좋게)

---

## 🔧 상세 명세

### 3.1 테스트 페이지 파일 생성

`app/test/page.tsx`

```tsx
import { supabase } from "@/lib/supabaseClient";

export default async function TestPage() {
  const { data, error } = await supabase.rpc("now"); // NOW() 실행

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Supabase Test</h1>

      {error && (
        <div className="text-red-500 mt-4">Error: {error.message}</div>
      )}

      {data && (
        <div className="mt-4">
          <p>Connected! Server time:</p>
          <p className="font-mono text-lg mt-2">{JSON.stringify(data)}</p>
        </div>
      )}
    </main>
  );
}
```

### 3.2 Supabase에서 `rpc("now")` 허용

SQL Editor에서 실행:

```sql
create or replace function public.now()
returns timestamp
language sql
as $$
  select now();
$$;
```

---

# 📘 **4. TailwindCSS 설정 (선택 요소 아닌 경우 포함)**

## ✔️ To-do

1. 패키지 설치
2. config 초기화
3. globals.css 연결
4. 테스트 페이지에 기본 스타일 반영

---

## 🔧 상세 명세

### 4.1 Tailwind 설치

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4.2 `tailwind.config.js` 수정

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
```

### 4.3 글로벌 스타일 추가

`app/globals.css` 최상단에 추가:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# 📘 **5. 로컬 테스트 및 정리**

## ✔️ To-do

1. 로컬 서버 실행
2. /test 페이지 접근
3. Supabase 연결 성공 여부 확인
4. 에러 발생 시 콘솔/네트워크 확인
5. 첫 릴리즈 커밋

---

## 🔧 상세 명세

### 5.1 로컬 서버 시작

```
npm run dev
```

### 5.2 주소 접속

[http://localhost:3000/test](http://localhost:3000/test)

“Connected!” 메시지가 뜨면 성공.

### 5.3 Git 커밋

```
git add .
git commit -m "feat: completed stage 1 setup and test page"
git tag v0.1
```

---

# 📘 **6. 1단계 완료 기준(Definition of Done)**

* [ ] Next.js 기본 프로젝트 정상 작동
* [ ] Supabase 연결 완료
* [ ] `.env.local` 설정 완료
* [ ] `/test` 페이지에서 Supabase API 호출 성공
* [ ] Tailwind 설정(선택) 정상 동작
* [ ] Git 초기 버전(v0.1) 생성

---

# 🔍 필요하면 계속 만들어드립니다

원하시면

* **2단계 상세 명세서**
* **전체 프로젝트 구조도**
* **개발자 온보딩용 README**
* **캔버스에 코드 전체 구성하기**

바로 이어서 작성해드릴까요?
