# Phase 2 구현 상세 명세서 – 네비게이션 바 & 스크롤 구조

본 문서는 **메모앱 랜딩페이지 Phase 2**의 구현을 위한 상세 명세서이다. Phase 2의 목표는 **페이지 탐색 구조를 완성**하고, 사용자가 스크롤을 통해 전체 콘텐츠를 자연스럽게 인지하도록 만드는 것이다.

> ⚠️ Phase 2는 **Phase 1 Hero 컴포넌트를 수정하지 않고**, 상·하위 구조만 추가한다.

---

## 1. Phase 2 목표 정의

### 1.1 목적

* 글로벌 네비게이션 제공
* 섹션 기반 스크롤 구조 확립
* 이후 섹션(Features, Use Case 등) 추가를 위한 앵커 기준 정의

### 1.2 완료 기준 (Definition of Done)

* 네비게이션 바가 모든 페이지에서 정상 표시
* 메뉴 클릭 시 해당 섹션으로 이동
* 스크롤 시 레이아웃 깨짐 없음
* 모바일/데스크탑 모두 사용 가능

---

## 2. 구현 범위

### 포함

* 상단 네비게이션 바 (정적)
* 메뉴 항목
* CTA 버튼(상단)
* 섹션 앵커 구조

### 제외 (명시적 비포함)

* 스크롤 애니메이션
* Glassmorphism 효과
* 모바일 햄버거 메뉴 애니메이션

---

## 3. 컴포넌트 구조

```
components/
 └─ navigation/
    ├─ Navbar.tsx
    ├─ NavLogo.tsx
    ├─ NavMenu.tsx
    └─ NavCTA.tsx
```

---

## 4. 페이지 구조 변경 명세

### 4.1 page.tsx

```
<Navbar />
<main>
  <HeroSection />
  <section id="features" />
  <section id="use-cases" />
  <section id="social-proof" />
  <section id="cta" />
</main>
```

> 각 section은 Phase 2에서는 **빈 영역(placeholder)**으로 유지

---

## 5. Navbar 레이아웃 명세

### 5.1 기본 구조

```
<nav>
  <NavLogo />
  <NavMenu />
  <NavCTA />
</nav>
```

### 5.2 스타일 규칙

| 항목         | 값                 |
| ---------- | ----------------- |
| Position   | fixed top-0       |
| Height     | 72px              |
| Background | transparent       |
| Z-index    | 50                |
| Max Width  | 1200px (centered) |

---

## 6. NavLogo 구현 명세

* 좌측 배치
* 텍스트 로고(임시)
* 클릭 시 `#top` 또는 `/` 이동

```tsx
<h1 className="font-bold text-lg">MemoApp</h1>
```

---

## 7. NavMenu 구현 명세

### 7.1 메뉴 항목 (고정)

| Label | Anchor        |
| ----- | ------------- |
| 기능    | #features     |
| 사용 사례 | #use-cases    |
| 후기    | #social-proof |

### 7.2 동작 규칙

* `<a href="#features">` 형태
* JavaScript 스크롤 제어 없음
* 브라우저 기본 스크롤 사용

### 7.3 반응형

* Desktop: 가로 메뉴
* Mobile: 메뉴 숨김 (CTA만 노출)

---

## 8. NavCTA 구현 명세

### 8.1 버튼

* 텍스트: `무료로 시작하기`
* 스타일: Phase 1 Primary CTA와 동일

### 8.2 동작

* 클릭 시 `#cta` 이동

---

## 9. 스크롤 구조 명세

### 9.1 section 공통 규칙

* 최소 높이: min-h-[100svh]
* 상단 여백: 72px (Navbar 높이 고려)

```css
section {
  scroll-margin-top: 72px;
}
```

---

## 10. 접근성(A11y) 기준

* `<nav>` 시맨틱 태그 사용
* 메뉴는 `<a>` 태그 사용
* 키보드 Tab 이동 가능
* 포커스 시 outline 유지

---

## 11. Phase 2 체크리스트

* [ ] Navbar 고정 정상 동작
* [ ] 앵커 이동 정상
* [ ] 모바일에서 화면 가림 없음
* [ ] Hero와 겹침 문제 없음

---

## 12. Phase 3 연결 가이드

Phase 3에서는 다음 요소만 추가됨:

* Hero 내부 플로팅 메모 카드

> Navbar, section 구조는 **변경하지 않음**

---

**Phase 2는 “페이지의 뼈대와 동선”을 완성하는 단계이며, 이후 모든 콘텐츠는 이 구조 안에서만 확장된다.**
