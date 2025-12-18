# Phase 0 구현 상세 명세서 – 프로젝트 기반 세팅

본 문서는 **메모앱 랜딩페이지 Phase 0**의 구현을 위한 상세 명세서이다. Phase 0은 이후 모든 단계의 기반이 되는 **기술·구조·규칙을 확정**하는 단계이며, UI 완성도보다 **안정적인 개발 토대 구축**을 목표로 한다.

> ⚠️ Phase 0은 단독으로 배포 가능해야 하며, 이후 Phase 1~N이 이 구조 위에서만 추가되도록 설계한다.

---

## 1. Phase 0 목표 정의

### 1.1 목적

- 프로젝트 공통 규칙 확정
    
- 기술 스택 초기화 및 검증
    
- 기본 레이아웃 구조 확보
    
- 이후 단계에서 **구조 변경이 발생하지 않도록** 사전 고정
    

### 1.2 완료 기준 (Definition of Done)

- 로컬 / 프리뷰 환경에서 정상 실행
    
- 기본 페이지 렌더링 가능
    
- 코드 포맷/린트 자동 적용
    
- 공통 레이아웃이 모든 페이지에 적용됨
    

---

## 2. 기술 스택 (Phase 0 기준)

|구분|기술|비고|
|---|---|---|
|Framework|Next.js (App Router)|최신 안정 버전|
|UI|React|Server Component 기본|
|Styling|Tailwind CSS|Design Token 반영|
|Font|Pretendard|웹폰트 적용|
|Package Manager|pnpm|고정 사용|
|Lint|ESLint|Next.js Preset|
|Format|Prettier|자동 정렬|

---

## 3. 프로젝트 초기화

### 3.1 프로젝트 생성

```bash
pnpm create next-app memoapp-landing
cd memoapp-landing
pnpm dev
```

### 3.2 필수 옵션

- App Router: ON
    
- TypeScript: ON
    
- ESLint: ON
    
- Tailwind CSS: ON
    
- src/ 디렉토리 사용: 선택 가능
    

---

## 4. 디렉터리 구조 명세

```
app/
 ├─ layout.tsx        # 전역 레이아웃
 ├─ page.tsx          # 루트 페이지
 ├─ globals.css       # 글로벌 스타일
 └─ favicon.ico

components/
 └─ ui/               # 공통 UI 컴포넌트 (Phase 0에서는 비어 있음)

styles/
 └─ tokens.css        # 디자인 토큰 (컬러, spacing)

lib/
 └─ utils.ts          # 공통 유틸 함수

public/
 └─ fonts/            # Pretendard 폰트
```

> ❗ Phase 0에서는 **폴더 구조만 생성**, 실제 컴포넌트 구현은 이후 Phase에서 진행

---

## 5. 글로벌 레이아웃 구현

### 5.1 layout.tsx 역할

- HTML / BODY 공통 설정
    
- 폰트, 배경색, 메타 정보 적용
    

### 5.2 구현 요구사항

- `<html lang="ko">` 설정
    
- `<body>`에 기본 배경색 적용
    
- children 렌더링만 포함 (네비게이션 X)
    

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
```

---

## 6. 글로벌 스타일 명세

### 6.1 globals.css

- Tailwind base / components / utilities 포함
    
- 기본 body 스타일 정의
    

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-white text-gray-900 antialiased;
}
```

---

## 7. 폰트 설정

### 7.1 Pretendard 적용 방식

- public/fonts에 woff2 저장
    
- next/font/local 사용
    

```ts
import localFont from 'next/font/local'

export const pretendard = localFont({
  src: '../public/fonts/Pretendard-Regular.woff2',
  display: 'swap'
})
```

### 7.2 적용 기준

- RootLayout에서 className으로 적용
    
- 시스템 폰트 fallback 포함
    

---

## 8. Tailwind 설정

### 8.1 tailwind.config.ts

- content 경로 명확화
    
- 컬러 토큰 확장
    

```ts
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7B61FF'
      }
    }
  }
}
```

---

## 9. 코드 품질 규칙

### 9.1 ESLint

- Next.js 기본 룰 사용
    
- unused-vars 경고 유지
    

### 9.2 Prettier

- 저장 시 자동 포맷
    
- 팀 전체 동일 설정 사용
    

---

## 10. 환경별 실행 기준

### 10.1 로컬

```bash
pnpm dev
```

### 10.2 프리뷰 배포

- Vercel 연동 가능 상태
    
- 별도 환경 변수 없이 실행
    

---

## 11. Phase 0 체크리스트

-  프로젝트 정상 실행
    
-  Tailwind 스타일 적용 확인
    
-  폰트 적용 확인
    
-  ESLint / Prettier 충돌 없음
    
-  Git 초기 커밋 완료
    

---

## 12. Phase 1 연결 가이드

Phase 1에서는 아래 항목만 추가된다:

- Hero 섹션 UI 컴포넌트
    
- 정적 콘텐츠 렌더링
    

> Phase 0의 파일 구조 및 설정은 **변경하지 않는다**

---

**Phase 0은 “보이지 않지만 가장 중요한 단계”이며, 이후 모든 구현 안정성을 좌우한다.**