# 아티스트 포트폴리오 상세 디자인 명세서 (Design Spec)

프로젝트명: Futurist Artist Portfolio (Next Senses)

버전: v1.0

디자인 컨셉: Digital Sanctuary / Future-Oriented Identity

## 1. 디자인 시스템 (Design System)

### 1.1 Color Palette

|   |   |   |   |
|---|---|---|---|
|**구분**|**컬러 이름**|**HEX Code**|**사용처**|
|**Primary**|Deep Space Black|`#050505`|메인 배경, 섹션 구분|
|**Secondary**|Obsidian Dark|`#121212`|카드 배경, 모달창|
|**Accent 1**|Cyber Cyan|`#00F0FF`|포인트 컬러, 활성화 상태, 링크|
|**Accent 2**|Plasma Purple|`#BF00FF`|그라데이션, 특수 강조|
|**Text (Main)**|Pure White|`#FFFFFF`|헤드라인, 강조 텍스트|
|**Text (Sub)**|Silver Mist|`#A0A0A0`|본문, 캡션, 비활성 텍스트|
|**Border**|Glass Edge|`rgba(255, 255, 255, 0.1)`|카드 테두리, 구분선|

### 1.2 Typography (Font Stack)

- **Header (제목용):** `Orbitron`, Sans-serif (Google Fonts)
    
    - H1: 64px / Bold / Letter-spacing: 0.1em (Landing Title)
        
    - H2: 40px / Semi-bold (Section Title)
        
    - H3: 24px / Medium (Project Title)
        
- **Body (본문용):** `Pretendard`, sans-serif
    
    - P: 16px / Regular / Line-height: 1.6
        
    - Caption: 12px / Medium / Letter-spacing: 0.05em
        
- **Mono (데이터용):** `JetBrains Mono`
    
    - Code, AI Prompts, Metadata: 14px / Regular
        

## 2. 컴포넌트 상세 명세 (Component Specs)

### 2.1 Navigation Bar (Floating Type)

- **위치:** 상단 고정 (Sticky), 상단에서 40px 여백.
    
- **스타일:** 배경 `rgba(5, 5, 5, 0.7)`, Backdrop-filter: blur(20px).
    
- **인터랙션:** 마우스 호버 시 텍스트 아래에 `Cyber Cyan` 색상의 2px 언더라인이 왼쪽에서 오른쪽으로 확장(300ms, ease-in-out).
    

### 2.2 Global Buttons (Primary)

- **사이즈:** Padding 12px 24px, Border-radius: 4px.
    
- **기본 상태:** Background: Transparent, Border: 1px solid `#00F0FF`, Color: `#00F0FF`.
    
- **호버 상태:** Background: `#00F0FF`, Color: `#050505`, Box-shadow: `0 0 15px rgba(0, 240, 255, 0.5)`.
    
- **전환:** Transition: 200ms ease.
    

### 2.3 Project Card (Gallery)

- **구조:** Aspect Ratio 16:9, Image 컨테이너 + Overlay 정보.
    
- **오버레이:** 평상시 Opacity 0. 호버 시 Opacity 1로 전환되며 글래스모피즘 효과 적용.
    
- **텍스트:** 프로젝트 제목(H3) + 기술 스택(Mono 폰트) 노출.
    

## 3. 페이지별 레이아웃 명세

### 3.1 랜딩 페이지 (Landing)

- **Hero Section:** * 전체 화면 높이(100vh).
    
    - 중앙 `One-Sentence Identity` 배치.
        
    - 배경에 `p5.js` 또는 `Three.js`를 활용한 실시간 인터랙티브 파티클 배경 배치.
        
- **Scroll Indicator:** 화면 하단 중앙에 'Scroll to Explore' 텍스트와 함께 아래로 흐르는 애니메이션 아이콘.
    

### 3.2 갤러리 섹션 (Works)

- **Grid:** 2-Column Grid (Desktop), 1-Column (Mobile).
    
- **Spacing:** Gap 40px.
    
- **Scroll Experience:** 세로 스크롤 시 각 카드가 아래에서 위로 `fade-in-up` (Duration: 800ms, Delay: 100ms per item).
    

## 4. 애니메이션 및 모션 가이드 (Motion Spec)

- **Page Transition:**
    
    - 페이지 이동 시 기존 콘텐츠 Opacity 0 처리 후 새로운 콘텐츠가 픽셀 단위로 조립되는 듯한 효과(Shader 효과 권장).
        
- **Cursor Interaction:**
    
    - 커스텀 커서 사용. 기본: 8px 원형.
        
    - 인터랙티브 요소(버튼, 링크) 호버 시 커서가 40px로 확대되며 내부가 반전(Invert) 처리됨.
        
- **Scroll Smoothing:**
    
    - 사용자 경험을 위해 `Lenis` 혹은 `GSAP ScrollSmoother` 라이브러리를 사용한 부드러운 스크롤 적용.
        

## 5. 기술적 요구 사항 (Technical Requirements)

1. **반응형 대응:** * Desktop: 1920px 기준 가변 레이아웃.
    
    - Tablet: 1024px ~ 768px (2컬럼 그리드 유지).
        
    - Mobile: 768px 이하 (1컬럼 그리드, 햄버거 메뉴 전환).
        
2. **이미지 최적화:** * 모든 작품 이미지는 `WebP` 포맷 사용.
    
    - 썸네일(800px), 상세(2400px) 등 사이즈별 대응 (srcset 활용).
        
3. **접근성:** * 포인트 컬러와 배경색의 대비율(Contrast Ratio) 4.5:1 이상 유지.
    
    - 모든 이미지에 `alt` 태그 및 `aria-label` 적용.