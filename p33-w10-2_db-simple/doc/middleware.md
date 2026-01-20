좋습니다 👍
이제 **Next.js App Router에서 “진짜 실무에서 쓰는” 인증 보호 방식**인
👉 **Middleware + Supabase Auth** 패턴을 정리해드릴게요.

---

# 🔐 Next.js Middleware로 인증 보호 (Supabase)

## 🎯 목표

* 로그인 안 된 사용자는 `/login`으로 강제 이동
* `/posts`, `/dashboard` 같은 보호된 페이지 접근 차단
* **페이지마다 auth 체크 코드 제거**

---

## 1️⃣ 필요한 패키지

```bash
npm install @supabase/ssr
```

> `@supabase/ssr`은 **쿠키 기반 세션 유지**를 위해 필수입니다.

---

## 2️⃣ Supabase 서버 클라이언트

### `src/lib/supabaseServer.ts`

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
```

---

## 3️⃣ Middleware 구현 (핵심)

### `src/middleware.ts`

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/posts", req.url));
  }

  return res;
}
```

---

## 4️⃣ 보호할 경로 설정

### `matcher` 추가

```ts
export const config = {
  matcher: [
    "/posts/:path*",
    "/dashboard/:path*",
  ],
};
```

➡️ **지정된 경로만 미들웨어 적용**
➡️ `/login`, `/` 은 제외

---

## 5️⃣ 로그인 페이지 수정 (중요)

### `signIn` 성공 시

```ts
await supabase.auth.signInWithPassword({
  email,
  password,
});

// ❌ router.push()
// ✅ 새로고침으로 세션 쿠키 반영
window.location.href = "/posts";
```

> Middleware는 **쿠키 기반 세션**을 읽기 때문에
> `router.push()`만 쓰면 세션이 안 잡힐 수 있습니다.

---

## 6️⃣ 로그아웃 처리

```ts
await supabase.auth.signOut();
window.location.href = "/login";
```

---

## 7️⃣ 최종 동작 흐름

```
[사용자 요청]
   ↓
middleware.ts
   ↓
쿠키에서 세션 확인
   ↓
┌──────────────┐
│ 로그인 ❌    │ → /login 리다이렉트
└──────────────┘
┌──────────────┐
│ 로그인 ✅    │ → 요청 페이지 접근
└──────────────┘
```

---

## ✅ 이 방식의 장점 (실무 기준)

| 항목    | 페이지 useEffect 방식 | Middleware |
| ----- | ---------------- | ---------- |
| 보안    | ❌ 느슨함            | ✅ 강력       |
| UX    | 깜빡임 있음           | ✅ 없음       |
| 중복 코드 | 많음               | ❌ 없음       |
| 실무 사용 | 거의 ❌             | ⭐⭐⭐⭐⭐      |

---

## 🚀 확장 패턴

### 🔹 관리자 권한

```ts
const role = user.user_metadata.role;
if (role !== "admin") redirect("/403");
```

### 🔹 공개/비공개 페이지 분리

```ts
const publicPaths = ["/", "/about"];
```

### 🔹 Server Component에서 유저 사용

```ts
const supabase = createSupabaseServerClient();
const { data } = await supabase.auth.getUser();
```

---

## 🧠 실무 팁 (중요)

* **RLS는 반드시 유지** (Middleware는 UX + 라우팅용)
* 민감한 데이터는 **Server Component / Server Action**
* Client Component에서는 최소 권한만

---

원하시면 다음 단계로 👇
1️⃣ **Server Actions + Supabase CRUD**
2️⃣ **권한(Role) 기반 미들웨어**
3️⃣ **실무용 Auth 아키텍처 정리**

어디까지 가볼까요?
