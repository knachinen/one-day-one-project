제공해주신 기획안(`plan_claude.md`)과 PRD 내용을 바탕으로, 디자이너와 퍼블리셔가 실제 작업에 착수할 수 있도록 구체화된 **디자인 요구사항 명세서 (DRD: Design Requirements Document)**를 작성해 드립니다.

---

# 바이브코딩 교육 워크숍 랜딩페이지 디자인 요구사항 명세서 (DRD)

## 문서 정보

문서 버전: 1.0

작성일: 2024년 12월 15일

프로젝트명: 바이브코딩 워크숍 인터랙티브 랜딩페이지

참조 문서: 바이브코딩 기획안 & PRD v1.0

---

## 1. 디자인 개요 (Design Overview)

### 1.1 디자인 컨셉: "Accessible Innovation"

코딩은 어렵고 딱딱하다는 편견을 깨고, **"친근하고, 쉽고, 빠르다"**는 느낌을 주는 것이 핵심입니다. 기술적인 전문성을 잃지 않으면서도 누구나 접근 가능한 따뜻한 톤앤매너를 유지합니다.

### 1.2 핵심 키워드

- **Friendly (친근한):** 위압감을 주지 않는 라운드 형태와 따뜻한 컬러 사용
    
- **Trustworthy (신뢰할 수 있는):** 명확한 데이터 시각화와 정돈된 레이아웃
    
- **Interactive (반응하는):** 사용자의 행동에 즉각 반응하여 "내가 통제하고 있다"는 느낌 부여
    

---

## 2. 비주얼 아이덴티티 시스템 (VIS)

### 2.1 컬러 팔레트 (Color Palette)

|**구분**|**색상 명**|**Hex Code**|**사용 용도**|**비고**|
|---|---|---|---|---|
|**Primary**|**Vibe Blue**|`#5B8FF9`|메인 버튼, 링크, 중요 아이콘|신뢰, 전문성|
|**Accent**|**Energy Orange**|`#FF9F40`|강조 텍스트, 그라데이션, 포인트|활력, 창의성|
|**Success**|**Fresh Green**|`#52C41A`|성공 메시지, 체크 아이콘|긍정, 완료|
|**Text**|**Dark Grey**|`#2D3748`|본문, 헤드라인|가독성 최우선|
|**Bg**|**Soft Grey**|`#F7F9FC`|섹션 배경, 카드 배경|눈의 피로도 감소|
|**White**|**Pure White**|`#FFFFFF`|카드 내부, 입력 필드 배경|깔끔함|

- **Gradient Rule:** `linear-gradient(135deg, #5B8FF9 0%, #FF9F40 100%)`은 Hero 섹션의 CTA 버튼과 주요 텍스트 하이라이트에만 제한적으로 사용하여 시선을 집중시킵니다.
    

### 2.2 타이포그래피 (Typography)

**Font Family:**

- **한글:** Pretendard (가독성, 현대적인 고딕)
    
- **영문/숫자:** Inter (UI 최적화)
    

**Type Scale:**

|**스타일**|**사이즈 (Desktop/Mobile)**|**Weight**|**Line Height**|**사용처**|
|---|---|---|---|---|
|**H1 Hero**|48px / 32px|Bold (700)|130%|메인 헤드라인|
|**H2 Section**|36px / 28px|Bold (700)|135%|섹션 타이틀|
|**H3 Card**|24px / 20px|SemiBold (600)|140%|카드 타이틀, 서브헤드|
|**Body L**|18px / 16px|Regular (400)|160%|리드 문구, 중요 본문|
|**Body M**|16px / 14px|Regular (400)|160%|일반 본문|
|**Caption**|14px / 12px|Regular (400)|150%|부가 설명, 라벨|

### 2.3 레이아웃 및 그리드 (Layout & Grid)

- **Desktop (1200px+):** 12 Column Grid / Gutter 24px / Max-width 1140px
    
- **Tablet (768px~1199px):** 8 Column Grid / Gutter 20px / Fluid Width
    
- **Mobile (~767px):** 4 Column Grid / Gutter 16px / Side Margin 20px
    

---

## 3. UI 컴포넌트 가이드

### 3.1 버튼 (Buttons)

버튼은 사용자의 행동을 유도하는 가장 중요한 요소입니다.

- **Primary Button (CTA):**
    
    - 배경: Primary Gradient (`#5B8FF9` to `#FF9F40`) 또는 Solid Primary (`#5B8FF9`)
        
    - 텍스트: White, Bold, 18px
        
    - 형태: Fully Rounded (Pill shape) 또는 Radius 8px
        
    - 인터랙션: Hover 시 Y축 -2px 이동, Box-shadow 증가
        
- **Secondary Button:**
    
    - 배경: White
        
    - 테두리: 1px Solid `#5B8FF9`
        
    - 텍스트: Primary Color
        
    - 형태: Radius 8px
        
- **Ghost Button:**
    
    - 배경: Transparent
        
    - 텍스트: Dark Grey (Hover 시 Primary Color)
        
    - 밑줄: Hover 시 애니메이션
        

### 3.2 카드 (Cards)

"Problem Statement", "Success Stories" 등 정보 전달의 핵심 단위입니다.

- **기본 스타일:**
    
    - 배경: White
        
    - 테두리: 1px Solid `#E2E8F0` (매우 연한 회색)
        
    - Radius: 16px
        
    - Shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` (기본), Hover 시 `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
        

### 3.3 입력 폼 (Input Fields)

"Live Demo" 및 가입 폼에 사용됩니다.

- **Default:** 배경 `#F7F9FC`, 테두리 1px `#E2E8F0`
    
- **Focus:** 배경 White, 테두리 2px `#5B8FF9` (Primary), Ring Effect
    
- **Error:** 테두리 `#E53E3E` (Red), 하단 에러 메시지 표시
    

---

## 4. 섹션별 디자인 상세 (Section Specifics)

### 4.1 Hero Section

- **배경:** 3D 애니메이션이 돋보이도록 깔끔한 White 또는 아주 연한 Gradient 배경.
    
- **애니메이션 영역:** 우측 40% 영역에 노트북 목업 배치. 목업 내부 화면은 어두운 코드 에디터(VS Code 테마)에서 밝은 앱 화면으로 전환되는 과정을 보여줌.
    
- **타이핑 효과:** 메인 헤드라인 커서 깜빡임 효과 적용.
    

### 4.2 Problem Statement

- **공감 이모지:** 각 카드 하단에 위치한 '공감 버튼'은 누를 때마다 이모지가 위로 퐁퐁 솟아오르는 파티클 효과 적용.
    
- **카드 배치:** 지그재그 배치보다는 정렬된 그리드 배치를 권장하되, 스크롤 시 차례대로 올라오는(Staggered) 모션 적용.
    

### 4.3 Solution (Timeline)

- **시각적 대비:**
    
    - _Old Way:_ 채도가 낮은 회색조(Grayscale), 라인이 길고 지루해 보이게 디자인.
        
    - _Vibe Way:_ Primary Gradient 사용, 짧고 강렬하게, 끝부분에 반짝이는 아이콘(✨) 배치.
        
- **슬라이더(Optional):** "Drag to Compare" 핸들을 중앙에 배치. 핸들은 원형으로 디자인하고 화살표 아이콘 포함.
    

### 4.4 Live Demo (Mini Sandbox)

- **UI 컨셉:** 실제 SaaS 툴을 사용하는 듯한 느낌을 주기 위해 패널 디자인 적용.
    
- **좌측 패널 (컨트롤):**
    
    - 어두운 배경보다는 밝은 회색(`#F7F9FC`) 배경으로 구분감 형성.
        
    - 각 옵션(색상, 레이아웃)은 직관적인 아이콘이나 컬러 칩으로 표현.
        
- **우측 패널 (프리뷰):**
    
    - 스마트폰 목업 프레임 필수.
        
    - 내부 UI는 그림자 없이 플랫(Flat)하게 디자인하여 수정 사항이 즉각 반영되는 느낌 강조.
        
    - "내 앱 만들기" 버튼은 프리뷰 화면 내부가 아닌 별도의 플로팅 버튼으로 강조.
        

### 4.5 Comparison Table

- **강조 기법:** '바이브코딩' 열(Column) 전체에 연한 Primary Color 배경(`rgba(91, 143, 249, 0.05)`)을 깔고, 상단 테두리를 진하게 처리하여 시선 집중.
    
- **아이콘:** 체크(✓)는 굵고 선명한 Green, 엑스(✗)는 얇은 Grey로 처리하여 긍정적 대비 극대화.
    

---

## 5. 인터랙션 및 모션 가이드 (Interaction & Motion)

### 5.1 스크롤 트리거 (Scroll Trigger)

- 모든 섹션 진입 시 요소들은 `translateY(20px)`에서 `0`으로 이동하며 `opacity`가 `0`에서 `1`로 변하는 Fade-in Up 효과를 기본으로 함.
    
- 타이밍: `duration: 0.6s`, `ease: cubic-bezier(0.16, 1, 0.3, 1)` (부드러운 감속).
    

### 5.2 마이크로 인터랙션 (Micro-interactions)

- **Hover:** 버튼이나 카드 호버 시 물리적인 느낌(Scale up, Shadow increase)을 주어 클릭 가능함을 명확히 함.
    
- **Confetti:** 커뮤니티 가입 완료 시 화면 전체에 축하 컨페티(종이가루) 애니메이션 적용.
    

### 5.3 반응형 대응 (Responsive)

- 모바일에서는 복잡한 3D 효과나 Parallax Scrolling을 비활성화하거나 단순화하여 퍼포먼스 확보.
    
- Live Demo 섹션의 경우, 모바일에서는 좌우 배치가 아닌 "상단 프리뷰 - 하단 컨트롤" 구조로 변경하거나, 탭(Tab) 형태로 분리.
    

---

## 6. 접근성 가이드 (Accessibility Standards)

- **색상 대비:** 텍스트와 배경의 명도 대비는 최소 4.5:1 이상을 유지 (WCAG AA 기준). 특히 오렌지색 텍스트 사용 시 배경색과의 대비 주의.
    
- **대체 텍스트:** 모든 이미지, 특히 '타임라인'이나 '비교표' 같은 정보성 그래픽에는 적절한 `alt` 텍스트 제공.
    
- **키보드 포커스:** 모든 인터랙티브 요소(버튼, 폼, 링크)는 키보드 탭(Tab) 키로 접근 가능해야 하며, 포커스 상태(`:focus-visible`)에서 명확한 아웃라인 표시.
    

---

## 7. 산출물 및 전달 포맷 (Deliverables)

1. **Figma Design File:** 모든 페이지 및 컴포넌트, 스타일 가이드 포함.
    
2. **Assets Export:**
    
    - 이미지: WebP (2x 해상도 대응)
        
    - 아이콘: SVG
        
    - 애니메이션: Lottie JSON 파일
        
3. **Style Guide Document:** 개발자 핸드오프를 위한 컬러, 타이포, 스페이싱 토큰 정의서.
    

---

## 다음 단계 (Next Steps)

이 명세서를 바탕으로 구체적인 디자인 시안 작업이 가능합니다. 어떤 작업을 먼저 도와드릴까요?

1. **Live Demo 섹션의 상세 UI 와이어프레임** (컨트롤 패널과 프리뷰 화면 배치도)
    
2. **Hero 섹션의 카피와 비주얼 배치 시안** (텍스트와 3D 요소의 조화)
    
3. **성공 사례 카드 디자인 상세** (사회적 증거를 강조하는 레이아웃)