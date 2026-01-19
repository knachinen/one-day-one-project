아래는 **2단계(목업 디자인 반영)**에 대한 **상세 구현 명세서 + 실행 가능한 TODO 리스트**입니다.
1단계가 끝난 상태(Next.js + Tailwind + 배포 완료)를 전제로 하되, **2단계 단독으로도 검증 가능한 산출물**을 명확히 정의했습니다.

---

# **📌 2단계 상세 구현 명세서**

### **단계명**

**목업 디자인 반영 – Home(Hero) UI 완성**

### **목표**

* 제공된 목업 디자인을 기준으로 **Home 화면(Hero Section)**을 시각적으로 동일한 수준으로 구현
* 이후 모든 페이지에 재사용될 **디자인 시스템의 기준점**을 만든다

---

# **2단계 산출물 (Deliverables)**

* `/` Home 페이지 UI 완성
* 공통 Layout 구조(Header 포함)
* 버튼 / 태그 / 카드 컴포넌트
* 반응형 대응(Desktop / Mobile)
* 실제 배포 URL에서 디자인 검증 가능

---

# **1. 레이아웃 & 구조 구현**

## **1.1 App Layout 구조 정의**

### 작업 내용

* [x] `/app/layout.tsx` 수정
* [x] 공통 `<Header />` 포함
* [x] `<main>` 영역 max-width 제한
* [x] background color 적용

### 레이아웃 기준

* max-width: `1200px`
* padding: `px-6 lg:px-8`
* background: `bg-slate-50`

---

## **1.2 Header 컴포넌트 구현**

### 파일

* `/components/layout/Header.tsx`

### UI 구성

* 좌측: 로고 텍스트
* 우측: 네비게이션 링크 (About / Work / Contact)
* CTA 버튼: “Let’s Talk”

### TODO

* [x] Header 레이아웃 구현 (flex)
* [x] hover 스타일 적용
* [x] mobile breakpoint에서 메뉴 숨김 (2단계에서는 햄버거 제외)

---

# **2. Hero Section 구현 (핵심)**

## **2.1 Hero Section 구조**

### 파일

* `/app/page.tsx`
* `/components/home/Hero.tsx`

### 구조

```
[Hero]
 ├─ Label (AVAILABLE FOR NEW PROJECTS)
 ├─ Title (Hi, I'm Minjun)
 ├─ Description
 ├─ Button Group (View Work / Contact Me)
 ├─ Tag List
 ├─ Profile Image
 └─ Status Card
```

---

## **2.2 Hero 텍스트 영역**

### 스타일 명세

* Label

  * text-xs
  * text-blue-500
  * tracking-wide
* Title

  * text-5xl
  * font-extrabold
  * 이름 부분만 `text-blue-500`
* Description

  * text-base
  * text-slate-600
  * max-w-md

### TODO

* [x] 타이틀 텍스트 분리 (이름 강조)
* [x] 줄간격 / 여백 조정
* [x] 모바일에서 font-size 축소 처리

---

## **2.3 버튼 컴포넌트**

### 파일

* `/components/ui/Button.tsx`

### Primary Button

* bg-blue-500
* text-white
* px-5 py-3
* rounded-lg

### Secondary Button

* bg-white
* border
* text-slate-900

### TODO

* [x] 공통 Button 컴포넌트 작성
* [x] variant props (primary / secondary)
* [x] hover 상태 구현

---

## **2.4 Tag 컴포넌트**

### 파일

* `/components/ui/Tag.tsx`

### 스타일

* text-sm
* text-slate-500
* inline-flex
* gap-4

### TODO

* [x] 태그 리스트 컴포넌트 생성
* [x] 반응형 줄바꿈 처리

---

## **2.5 프로필 이미지**

### 파일

* `/components/home/ProfileImage.tsx`

### 명세

* next/image 사용
* aspect-ratio: 4 / 5
* rounded-3xl
* height 기준 480px

### TODO

* [x] 이미지 에셋 추가 (`/public/images/profile.jpg`)
* [x] next/image 적용
* [x] 모바일에서 이미지 위치 조정

---

## **2.6 Status Card**

### 파일

* `/components/home/StatusCard.tsx`

### 스타일

* bg-white
* rounded-2xl
* shadow-sm
* padding 20px

### 내용

* 아이콘 + 제목
* 짧은 상태 텍스트

### TODO

* [x] 카드 컴포넌트 구현
* [x] 이미지 하단 overlay 위치 조정
* [x] 모바일에서는 카드 숨김 처리

---

# **3. 반응형 처리**

## **3.1 Breakpoints**

* Mobile: `<768px`
* Desktop: `≥1024px`

### TODO

* [x] 모바일에서 Hero 영역 1열 스택
* [x] 버튼 세로 정렬
* [x] 이미지 크기 축소
* [x] 텍스트 줄바꿈 자연스럽게 조정

---

# **4. 스타일 시스템 기초 세팅**

## **4.1 컬러 토큰**

* blue-500
* slate-900
* slate-600
* slate-400
* white

### TODO

* [x] 컬러 사용 일관성 체크

---

## **4.2 타이포 스케일**

* Heading
* Body
* Label

### TODO

* [x] Tailwind class 중복 제거
* [x] 공통 타이포 패턴 정리

---

# **5. 품질 체크 & 배포**

## **5.1 로컬 점검**

* [x] Chrome / Safari 확인
* [x] 반응형 breakpoint 테스트
* [x] 콘솔 에러 없음

## **5.2 배포**

* [ ] main 브랜치 커밋
* [ ] Vercel Preview 확인
* [ ] Production 배포

---

# **6. 완료 기준 (Definition of Done)**

* [x] Home 화면이 목업 디자인과 시각적으로 일치
* [x] Header + Hero 완성
* [x] 주요 컴포넌트 재사용 가능 상태
* [x] 모바일/데스크톱 모두 UX 문제 없음
* [ ] 배포 URL에서 확인 가능

---

# **2단계 전체 TODO 요약**

### 구조

* [x] Layout / Header
* [x] Hero 구조

### UI 컴포넌트

* [x] Button
* [x] Tag
* [x] Status Card
* [x] Profile Image

### 스타일

* [x] 타이포
* [x] 컬러
* [x] 반응형

### 배포

* [ ] Preview
* [ ] Production

---

## 다음 단계 예고

👉 **3단계: 전체 페이지 골조 구축 (About / Work / Contact)**
👉 **4단계: 실제 콘텐츠 & 프로젝트 상세 구현**

원하시면 **3단계 상세 명세서**도 바로 이어서 작성해드릴게요.