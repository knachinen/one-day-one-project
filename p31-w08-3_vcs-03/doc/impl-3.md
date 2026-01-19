아래는 **3단계(전체 페이지 기본 구조 구축)**에 대한 **상세 구현 명세서 + 실행 가능한 TODO 리스트**입니다.
2단계(Home/Hero UI 완료)를 기준으로 하되, **3단계 단독으로도 “탐색 가능한 MVP 포트폴리오”가 완성되도록** 설계했습니다.

---

# **📌 3단계 상세 구현 명세서**

### **단계명**

**전체 페이지 골조 구축 (About / Work / Contact)**

### **목표**

* 포트폴리오 웹사이트의 **전체 정보 구조(IA)**를 완성
* 모든 메뉴가 연결된 **완전한 탐색 경험(MVP)** 제공
* 실제 콘텐츠 없이도 레이아웃·흐름·UX 검증 가능

---

# **3단계 산출물 (Deliverables)**

* `/about`, `/work`, `/contact` 페이지 생성
* 공통 Header / Footer 적용
* 페이지별 섹션 구조 + Skeleton UI
* 네비게이션 완전 연결
* SEO 기본 메타 세팅
* 운영 URL에서 전체 사이트 탐색 가능

---

# **1. 라우팅 & 페이지 구조 정의**

## **1.1 페이지 라우트 생성**

### 작업 대상

```
/app/about/page.tsx
/app/work/page.tsx
/app/contact/page.tsx
```

### TODO

* [ ] 각 페이지 기본 컴포넌트 생성
* [ ] 공통 `<Layout>` 자동 적용 확인
* [ ] 페이지별 `<main>` 구조 분리

---

## **1.2 Header 네비게이션 연결**

### 작업 내용

* [ ] Header 메뉴에 Link 연결

  * About → `/about`
  * Work → `/work`
  * Contact → `/contact`
* [ ] 현재 페이지 active 상태 스타일 적용(선택)

### 완료 기준

* 모든 메뉴 클릭 시 페이지 전환 정상
* 새로고침 시 라우트 유지

---

# **2. About 페이지 구조**

## **2.1 페이지 목적**

“이 사람이 어떤 사람인지”를 **간결한 구조**로 전달

---

## **2.2 섹션 구성**

```
[About Hero]
 ├─ Page Title
 ├─ Short Intro Text

[Profile Summary]
 ├─ 소개 텍스트 (placeholder)
 ├─ 키워드 또는 강점 리스트

[Skills / Tools]
 ├─ Tag or List 형태
```

---

## **2.3 TODO 리스트**

* [ ] 페이지 타이틀 컴포넌트 사용
* [ ] 본문 max-width 제한 (600–680px)
* [ ] 텍스트 skeleton UI 적용
* [ ] 섹션 간 spacing 통일

---

# **3. Work 페이지 구조**

## **3.1 페이지 목적**

작업물 목록을 한눈에 스캔 가능하게 제공

---

## **3.2 섹션 구성**

```
[Work Hero]
 ├─ Page Title
 ├─ One-line description

[Project List]
 ├─ Project Card (x N)
     ├─ Title
     ├─ Short Description
     ├─ Tech Tags
```

---

## **3.3 Project Card (Skeleton)**

### 파일

* `/components/work/ProjectCard.tsx`

### 명세

* 이미지 placeholder 또는 박스
* 제목 + 설명
* hover 가능 구조 (실제 동작은 4단계)

---

## **3.4 TODO 리스트**

* [ ] ProjectCard 컴포넌트 생성
* [ ] Grid 레이아웃 (2열 desktop / 1열 mobile)
* [ ] 더미 데이터 배열로 반복 렌더링
* [ ] 카드 간 간격 정렬

---

# **4. Contact 페이지 구조**

## **4.1 페이지 목적**

연락 가능한 모든 방법을 명확히 제시

---

## **4.2 섹션 구성**

```
[Contact Hero]
 ├─ Page Title
 ├─ Short Guide Text

[Contact Methods]
 ├─ Email
 ├─ SNS Links (optional)

[Contact CTA]
 ├─ Button or Email Highlight
```

---

## **4.3 TODO 리스트**

* [ ] 이메일 텍스트 강조 UI
* [ ] 버튼 또는 링크 컴포넌트 재사용
* [ ] 폼 없이 정적 구조만 구현 (기능은 7단계)

---

# **5. Footer 컴포넌트 추가**

## **5.1 Footer 역할**

* 사이트 마무리
* 최소 정보만 제공 (미니멀 유지)

### 파일

* `/components/layout/Footer.tsx`

### 구성

* © Year Name
* Optional: GitHub / LinkedIn 링크

### TODO

* [ ] Footer 컴포넌트 생성
* [ ] Layout에 공통 적용
* [ ] 텍스트 크기/색상 최소화

---

# **6. Skeleton UI & 플레이스홀더 전략**

### 목적

실제 콘텐츠 없이도 레이아웃·UX·리듬 검증 가능

### TODO

* [ ] 회색 박스 skeleton 적용
* [ ] 텍스트 줄 placeholder 적용
* [ ] 로딩 컴포넌트는 사용하지 않음(정적)

---

# **7. SEO 기본 설정**

## **7.1 Metadata 설정**

### 작업 대상

* `/app/about/page.tsx`
* `/app/work/page.tsx`
* `/app/contact/page.tsx`

### TODO

* [ ] title 설정
* [ ] description 설정
* [ ] OG 기본값 상속 확인

---

# **8. 반응형 & UX 점검**

## **8.1 반응형 규칙**

* Mobile: 모든 페이지 1열
* Desktop: Work 페이지 2열 grid

### TODO

* [ ] 모바일에서 섹션 간격 점검
* [ ] 긴 텍스트 overflow 방지
* [ ] 버튼 터치 영역 확인

---

# **9. 배포 & 검증**

### TODO

* [ ] main 브랜치 커밋
* [ ] Vercel Preview 확인
* [ ] 전체 페이지 탐색 테스트
* [ ] 콘솔 에러 0건

---

# **10. 완료 기준 (Definition of Done)**

* [ ] 모든 페이지 라우트 존재
* [ ] Header/Footer 공통 적용
* [ ] 메뉴 탐색 완전 연결
* [ ] Skeleton 기반 전체 UX 흐름 확인 가능
* [ ] 외부 사용자에게 공유 가능한 MVP 상태

---

# **3단계 전체 TODO 요약**

### 페이지

* [ ] /about
* [ ] /work
* [ ] /contact

### 컴포넌트

* [ ] ProjectCard
* [ ] Footer
* [ ] Page Title

### UX

* [ ] Skeleton UI
* [ ] 반응형

### SEO & 배포

* [ ] Metadata
* [ ] Production 배포

---

## 다음 단계 안내

👉 **4단계: 실제 콘텐츠 입력 & 프로젝트 상세 페이지 구현**
👉 **5단계: 인터랙션·모션(Framer Motion)**

원하시면 **4단계 상세 명세서**도 바로 이어서 작성해드릴게요.
