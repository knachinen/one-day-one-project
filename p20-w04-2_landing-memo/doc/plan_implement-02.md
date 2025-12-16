# Phase 1 구현 상세 명세서 – 히어로 섹션 (정적 UI)

본 문서는 **메모앱 랜딩페이지 Phase 1**의 구현을 위한 상세 명세서이다. Phase 1의 목표는 **애니메이션·고급 인터랙션 없이도 서비스의 핵심 가치를 즉시 전달**하는 것이다.

> ⚠️ Phase 1은 **Phase 0 구조를 변경하지 않고**, UI 컴포넌트만 추가한다.

---

## 1. Phase 1 목표 정의

### 1.1 목적

* 첫 화면에서 제품 가치 3초 내 인지
* CTA 클릭 유도 가능한 최소 랜딩 완성
* 이후 애니메이션/인터랙션을 얹을 수 있는 정적 UI 토대 구축

### 1.2 완료 기준 (Definition of Done)

* Hero 섹션이 모든 해상도에서 정상 표시
* CTA 버튼 클릭 가능(링크 또는 더미 액션)
* Lighthouse 기준 Layout Shift 문제 없음

---

## 2. 구현 범위

### 포함

* Hero 섹션 정적 레이아웃
* 헤드라인 / 서브 카피
* CTA 버튼 2종
* 반응형 타이포그래피

### 제외 (명시적 비포함)

* 애니메이션 (타이핑, 패럴럭스 등)
* 플로팅 메모 카드
* 스크롤 인디케이터

---

## 3. 컴포넌트 구조

```
components/
 └─ hero/
    ├─ HeroSection.tsx
    ├─ HeroTitle.tsx
    ├─ HeroSubtitle.tsx
    └─ HeroCTA.tsx
```

> 각 컴포넌트는 **순수 UI 컴포넌트**이며 상태 관리 없음

---

## 4. HeroSection 레이아웃 명세

### 4.1 구조

```
<section>
  <HeroTitle />
  <HeroSubtitle />
  <HeroCTA />
</section>
```

### 4.2 레이아웃 규칙

* 화면 높이: min-h-[100svh]
* 콘텐츠 정렬: 세로 중앙
* 최대 너비: 1200px
* 좌우 패딩:

  * Desktop: 24px
  * Tablet: 20px
  * Mobile: 16px

---

## 5. HeroTitle 구현 명세

### 5.1 문구 (고정)

```
생각이 떠오르는 순간,
바로 메모
```

### 5.2 스타일

| 항목                  | 값         |
| ------------------- | --------- |
| Font Size (Desktop) | 56px      |
| Font Size (Mobile)  | 36px      |
| Font Weight         | 700 / 800 |
| Line Height         | 1.2       |
| Letter Spacing      | -1%       |

### 5.3 강조 규칙

* "바로 메모" 텍스트에 `text-primary` 적용
* 줄바꿈 고정 (반응형에서도 유지)

---

## 6. HeroSubtitle 구현 명세

### 6.1 문구

> 생각을 놓치지 않도록, 가장 빠르고 가벼운 메모 경험

### 6.2 스타일

| 항목         | 값             |
| ---------- | ------------- |
| Font Size  | 18px          |
| Color      | text-gray-600 |
| Max Width  | 640px         |
| Margin Top | 24px          |

---

## 7. HeroCTA 구현 명세

### 7.1 버튼 구성

* Primary CTA: `무료로 시작하기`
* Secondary CTA: `앱 다운로드`

### 7.2 버튼 스타일

#### Primary Button

* Height: 56px
* Padding: 24px
* Radius: 28px
* Background: `bg-primary`
* Text Color: white

#### Secondary Button

* Height: 56px
* Padding: 24px
* Radius: 28px
* Border: 1px solid #E5E7EB
* Background: white

### 7.3 배치 규칙

* Desktop: 가로 정렬, 간격 16px
* Mobile: 세로 정렬, 간격 12px

---

## 8. 반응형 동작

### Mobile (≤767px)

* 텍스트 중앙 정렬
* 버튼 세로 스택
* Hero 높이 자동

### Tablet / Desktop

* 텍스트 좌측 정렬
* 버튼 가로 배치

---

## 9. 접근성(A11y) 기준

* h1 태그 사용 (HeroTitle)
* 버튼은 반드시 `<button>` 사용
* 대비 비율 WCAG AA 충족

---

## 10. 페이지 연결

### page.tsx

```tsx
import HeroSection from '@/components/hero/HeroSection'

export default function Home() {
  return <HeroSection />
}
```

---

## 11. Phase 1 체크리스트

* [ ] 모바일/데스크탑 정상 표시
* [ ] CLS 발생 없음
* [ ] CTA 클릭 가능
* [ ] SEO 메타 타이틀 정상 노출

---

## 12. Phase 2 연결 가이드

Phase 2에서 추가될 요소:

* 네비게이션 바
* 섹션 스크롤 구조

> Phase 1의 Hero 컴포넌트는 **변경하지 않고 상단에 Nav만 추가**

---

**Phase 1은 “보여지는 첫 가치”를 만드는 단계이며, 이후 모든 고급 UX는 이 위에 얹는다.**
