아래는 **제공하신 목업 디자인을 기반으로 작성한 ‘상세 UI 디자인 명세서(Design Specification)’**입니다.
실제 디자이너–개발자 협업 시 바로 전달 가능한 수준으로 **타이포, 컬러, 컴포넌트, 그리드, 인터랙션, 반응형 규칙**까지 모두 정리했습니다.

---

# 🎨 **포트폴리오 웹페이지 – 상세 디자인 명세서 (Design Specification)**

**Version 1.0**

---

# 1. **레이아웃 & 그리드 시스템**

### 1.1 전체 레이아웃

* **Max-width:** 1200px
* **좌·우 패딩:** 24–40px (반응형에 따라 유동)
* **섹션 간 간격:** 120–160px
* **Header 높이:** 72px

### 1.2 그리드

* **12-column grid**
* **Gutter:** 24px
* Hero 섹션은 **좌측 텍스트(7 columns) + 우측 이미지(5 columns)** 구조.

---

# 2. **타이포그래피 (Typography)**

### 2.1 폰트

* **Family:** Pretendard 또는 Inter
* **사용 굵기:** Regular, Medium, Bold, ExtraBold
* **기본 줄간격:** 140–160%

### 2.2 실제 화면 내 텍스트 스펙

| 요소                        | 폰트 크기 | 굵기        | 색상                                    |
| ------------------------- | ----- | --------- | ------------------------------------- |
| 로고 텍스트 (MINJUN.)          | 20px  | Bold      | #0F172A                               |
| Header 메뉴                 | 16px  | Medium    | #1E293B                               |
| Hero 상단 라벨 (“AVAILABLE…”) | 12px  | Medium    | #3B82F6                               |
| Hero 메인 타이틀               | 48px  | ExtraBold | #0F172A                               |
| Hero 타이틀 강조(이름)           | 48px  | ExtraBold | #3B82F6                               |
| Hero 소개 문단                | 16px  | Regular   | #475569                               |
| 버튼 텍스트                    | 16px  | Medium    | #FFFFFF(Primary) / #0F172A(Secondary) |
| 태그                        | 14px  | Medium    | #64748B                               |
| Status 카드 소제목             | 12px  | Medium    | #94A3B8                               |
| Status 카드 본문              | 16px  | Medium    | #0F172A                               |
| Footer                    | 14px  | Regular   | #94A3B8                               |

---

# 3. **컬러 시스템 (Color System)**

### 3.1 핵심 컬러

| 목적              | 색상          | HEX         |
| --------------- | ----------- | ----------- |
| Primary         | Blue        | **#3B82F6** |
| Primary Hover   | Dark Blue   | #2563EB     |
| Heading Text    | Dark Slate  | **#0F172A** |
| Body Text       | Slate       | **#475569** |
| Sub Text        | Gray        | #94A3B8     |
| Line / Divider  | Light Slate | #CBD5E1     |
| Background      | Light Gray  | **#F8FAFC** |
| Card Background | White       | #FFFFFF     |

---

# 4. **컴포넌트 상세 스펙**

---

## 4.1 **Header**

### Layout

* 높이: **72px**
* 좌측: 로고
* 우측: 메뉴(About, Work, Contact) + CTA 버튼(Let’s Talk)

### Interaction

* 메뉴 Hover: 글자색 **#0F172A → #3B82F6** (0.15s ease)
* CTA 버튼 Hover:

  * 배경: #000000 → #1E293B
  * 텍스트: 유지

---

## 4.2 **Hero Section**

### 구성요소

* 상단 라벨
* 타이틀 + 강조 이름 색상
* 소개 문단 2줄
* 버튼 2개
* 키워드 태그
* 우측 프로필 이미지
* 이미지 하단 Status Card

### 거리 스펙

* 라벨 → 타이틀: 16px
* 타이틀 → 설명: 24px
* 설명 → 버튼 그룹: 32px
* 버튼 → 태그: 28px

---

## 4.3 **Buttons**

### Primary Button (파란 버튼)

* 배경: #3B82F6
* 텍스트: #FFFFFF
* 패딩: 12px 20px
* 라운드: 8px
* 그림자: 없음
* Icon: 16px 오른쪽 정렬
* Hover: #2563EB

### Secondary Button (연한 회색)

* 배경: #FFFFFF
* 테두리: 1px (#E2E8F0)
* 텍스트: #0F172A
* 패딩 동일
* Hover: 배경 #F1F5F9

---

## 4.4 **Tag Chips**

* 텍스트만 있는 형태
* 컬러: #64748B
* 아이콘 없음
* 간격: 16px

---

## 4.5 **Profile Image**

* 비율: 4:5
* 사이즈: **Height 480px 기준**
* 모서리 라운드: **24px**
* 그림자 없음 (미니멀 유지)

---

## 4.6 **Status Card**

### 스타일

* 배경: #FFFFFF
* 그림자: 0 4px 12px rgba(0,0,0,0.04)
* 라운드: 16px
* 패딩: 20px
* 아이콘(파란 원형): #3B82F6
* 제목: 12px #94A3B8
* 본문: 16px #0F172A

---

# 5. **인터랙션 (Micro Interaction)**

### Fade-in Animation

* Hero 구역 요소 순차 진입

  * 라벨 → 타이틀 → 설명 → 버튼 → 이미지
* 0.2–0.3s, ease-out

### Hover Rules

* 모든 텍스트 링크:

  * 색상: #0F172A → #3B82F6
  * underline 없음
  * transition 0.15s

### Button Press

* Primary: 살짝 음영 변화
* Secondary: border 색 진해짐 (#94A3B8)

---

# 6. **아이콘 사용 규칙**

* 모든 아이콘 사이즈: **16px 또는 20px**
* 선 굵기: 1.5–2px
* 색상:

  * Primary icon: #FFFFFF 또는 #3B82F6
  * Default icon: #475569

---

# 7. **반응형 가이드 (Responsive Guide)**

## Mobile (<768px)

* 레이아웃 1단
* 타이틀 48px → 32px
* 버튼 세로 스택
* 이미지 가로 100%, 높이는 비율 유지
* Header 메뉴 ‘햄버거 메뉴’로 축소

## Tablet (768–1024px)

* 1단 또는 2단 자동 적응
* 라인 간격 유지
* 버튼 2개는 가로 유지 가능

## Desktop (>1024px)

* 원본 디자인 유지
* Hero 좌/우 7:5 비율 유지

---

# 8. **여백(spacing) 시스템**

* 8px grid 시스템
* 기본 단위: 8 / 16 / 24 / 32 / 48 / 64
* 카드 내부 padding: 20px
* 섹션 간격: 120–160px

---

# 9. **에셋(asset) 명세**

| 이름            | 형식      | 용도        | 권장 크기       |
| ------------- | ------- | --------- | ----------- |
| Logo Symbol   | SVG     | Header    | 32×32       |
| Profile Image | JPG/PNG | Hero      | 960×1200 이상 |
| Status Icon   | SVG     | Status 카드 | 20×20       |

---

# 10. **개발자 전달 규칙 (Handoff Rules)**

* CSS 단위는 px 또는 rem (prefer rem 1rem=16px)
* 컬러는 Hex 기반
* Icon은 SVG inline으로 삽입
* Grid는 CSS Grid 또는 flex + max-width 조합
* 모든 텍스트는 line-height 140–160%
* 버튼 최소 터치 영역 44px

---

# 11. **추가 제공 가능 항목**

원하시면 아래도 만들어드릴게요:

✅ **Figma용 컴포넌트 세트**
✅ **Full Layout (Hero/About/Work/Contact) UI 시안 1:1 제작**
✅ **Next.js + Tailwind로 실제 구현 코드 템플릿**
✅ **디자인 시스템(토큰·컴포넌트) 문서**

---

필요하시면 지금 쓰신 목업에 맞춰
➡ **전체 페이지 UI**
➡ **컴포넌트 라이브러리**
➡ **디자인 시스템 토큰**
까지 확장해서 제작해드릴까요?
