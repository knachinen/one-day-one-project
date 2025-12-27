기획한 랜딩 페이지를 실제 디자인과 개발로 옮기기 위해 필요한 **UI/UX 디자인 명세서(Design Specification)** 템플릿입니다. 디자이너와 개발자가 혼선 없이 작업할 수 있도록 핵심 요소를 구조화했습니다.

---

## [프로젝트명] UI/UX 디자인 명세서

### 1. 디자인 원칙 및 컨셉 (Design Principle)

* **핵심 키워드:** (예: 신뢰감, 심플함, 역동적인, 친근한)
* **디자인 방향:** 사용자가 복잡한 수치 대신 시각적인 그래프를 통해 직관적으로 정보를 파악할 수 있도록 함.
* **주요 타겟:** 3040 직장인 (가독성 높은 폰트 크기와 명확한 버튼 UI 강조)

### 2. 스타일 가이드 (Visual Identity)

#### 🎨 컬러 시스템 (Colors)

| 구분 | 컬러 코드 (HEX/RGB) | 용도 |
| --- | --- | --- |
| **Primary** | `#007BFF` | 메인 CTA 버튼, 강조 텍스트, 브랜드 로고 |
| **Secondary** | `#6C757D` | 보조 버튼, 비활성화 텍스트 |
| **Background** | `#F8F9FA` | 전체 페이지 배경색 |
| **Point** | `#FFC107` | 할인율, 알림, 중요 강조 아이콘 |

#### ✍️ 타이포그래피 (Typography)

* **Font Family:** Pretendard (Sandoll Gothic 대용 가능)
* **Hierarchy:**
* **H1 (Hero):** 48px / Bold / Line-height 1.2
* **H2 (Section Title):** 32px / Bold / Line-height 1.4
* **Body:** 16px / Regular / Line-height 1.6
* **Caption:** 12px / Medium / Line-height 1.5



---

### 3. 주요 컴포넌트 상세 (Component Details)

#### 🔘 버튼 (Buttons)

* **Primary Button:**
* Style: Fill, Corner Radius 8px
* Interaction: Hover 시 밝기 10% 감소, Click 시 scale 0.98 소폭 축소


* **Ghost Button:**
* Style: Outline (1px), Transparent background
* Interaction: Hover 시 배경색 약하게 채워짐



#### ⌨️ 입력 폼 (Input Fields)

* **Default:** Border `#CED4DA`, Placeholder 텍스트 노출
* **Focus:** Border `#007BFF`, 두께 2px로 변경
* **Error:** Border `#DC3545`, 하단에 붉은색 에러 메시지 노출

---

### 4. 레이아웃 및 그리드 (Grid System)

* **데스크톱:** 12컬럼 그리드 (Gutter 24px, Max-width 1200px)
* **모바일:** 4컬럼 그리드 (Margin 16px, Gutter 12px)
* **반응형 대응:** 768px 미만일 경우 모바일 레이아웃(상하 스택 구조)으로 전환

---

### 5. 사용자 경험 상세 (UX Logic & Interaction)

| 섹션 | 인터렉션 및 로직 명세 |
| --- | --- |
| **GNB (네비게이션)** | 스크롤 시 상단 고정(Sticky), 스크롤 위치에 따라 투명도 변화 |
| **Hero Section** | 메인 이미지는 페이지 진입 시 Fade-in 효과 (0.5s) |
| **Social Proof** | 숫자 카운팅 애니메이션 (0부터 목표 수치까지 1초간 상승) |
| **CTA 버튼** | 버튼 클릭 시 페이지 내 하단 상담 폼으로 부드럽게 스크롤(Anchor) |
| **FAQ** | 질문 클릭 시 답변이 아래로 슬라이딩하며 열림 (Accordion UI) |

---

### 6. 에셋 관리 (Assets)

* **아이콘:** Lucide Icon 세트 사용 (Line 두께 2px 고정)
* **이미지 포맷:** 무손실 압축된 WebP 권장 (배경 투명 필요 시 PNG)
* **로고:** SVG 포맷 사용

---

**이 명세서를 기반으로 특정 섹션(예: 상담 신청 폼)의 상세 와이어프레임을 텍스트로 설계해 드릴까요?** 혹은 특정 디자인 도구(Figma 등)를 위한 가이드라인이 더 필요하신지 알려주세요!
