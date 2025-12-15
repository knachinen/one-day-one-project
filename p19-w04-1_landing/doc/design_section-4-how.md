제공해주신 기획안(`plan_claude.md`)과 **How It Works 섹션 목업 이미지(`image_0b257c.jpg`)**를 참고하여 **Section 4: How It Works (작동 방식 섹션)**의 최종 디자인 상세 명세서를 작성해 드립니다.

이 섹션은 바이브코딩 워크숍의 체계적인 **3단계 프로세스**를 시각화하여, '일회성 교육'이 아닌 **'지속적인 성공 지원 시스템'**임을 강조하는 것이 목표입니다.

## ⚙️ Section 4: How It Works (작동 방식) 상세 명세서

### 1. 섹션 개요 (Overview)

- **목적:** 워크숍의 3단계 프로세스를 명확하게 시각화하여, 교육의 체계성과 후속 지원 시스템에 대한 신뢰를 구축합니다.
    
- **핵심 메시지:** "From zero coding knowledge to your own app in just 3 hours. Here is our proven roadmap to launch your MVP." (목업 이미지 참조)
    
- **타겟 감성:** 신뢰, 안정감, 체계적인 과정에 대한 확신.
    

---

### 2. 레이아웃 및 구조 (Layout & Structure)

- **구조:**
    
    - 상단: 중앙 정렬 헤드라인 및 설명.
        
    - 좌측: 3단계 아코디언 카드 (프로세스 설명).
        
    - 우측: 워크숍 현장 사진 갤러리 및 사회적 증거 (Join 400+ Makers) (목업 이미지 참조).
        
- **배경:** Soft Grey (`#F7F9FC`) (목업 이미지 참조).
    
- **여백:** 상하 `PY: 100px` (Desktop 기준).
    

---

### 3. 디자인 및 스타일 상세 (Design Specs)

#### 3.1 섹션 헤드라인

- **메인 헤드라인 (H2):**
    
    - **텍스트:** "How It Works" (목업 이미지와 일치)
        
    - **폰트:** Pretendard Bold (700), `36px` (Desktop)
        
    - **색상:** Dark Grey (`#2D3748`)
        
    - **서브 라벨:** 상단에 "THE ROADMAP" 라벨 (목업 이미지 참조)
        
- **서브 헤드라인:**
    
    - **텍스트:** "From zero coding knowledge to your own app in just 3 hours. Here is our proven roadmap to launch your MVP." (목업 이미지와 일치)
        
    - **폰트:** Body Regular (`18px`)
        
    - **색상:** Medium Grey (`#4A5568`)
        

#### 3.2 프로세스 카드 (좌측 영역)

3단계는 세로로 배치된 아코디언 형태로 디자인됩니다.

- **카드 기본 스타일:**
    
    - 배경: Pure White (`#FFFFFF`)
        
    - 구분선: 1px Solid Light Grey (`#E5E7EB`)
        
- **아이콘 및 제목:**
    
    - 각 스텝 번호 대신 **아이콘**을 사용하여 시각적 구분 (목업 이미지 참조).
        
        - Step 1: 🎓 (Primary Blue)
            
        - Step 2: 🔧 (Secondary Grey)
            
        - Step 3: 🚀 (Success Green)
            
    - **제목:** H3 스타일 (`20px` SemiBold)
        
    - **인디케이터:** 제목 우측에 확장/축소 상태를 나타내는 캐럿 아이콘 (^) (목업 이미지 참조).
        

|**스텝**|**제목 (H3)**|**내용 (아코디언 확장 시)**|
|---|---|---|
|**Step 1**|**3-Hour Offline Workshop**|"Join our intensive offline session where you will build a functional app prototype from scratch. No prior experience needed. We provide the laptops, the curriculum, and the coffee." (목업 이미지 참조)|
|**Step 2**|**Post-Debugging Training**|"Learn to fix errors and polish your code." (간략화된 설명)|
|**Step 3**|**Solo Founder Coaching**|"1:1 strategy session for your MVP." (간략화된 설명)|

- **Step 1 추가 요소:** 워크숍 정보 Chip (목업 이미지 참조)
    
    - `Offline` (Blue chip), `Gangnam Station` (Grey chip), `3 Hours` (Primary chip)
        
    - **CTA Link:** "See Curriculum Details →" (클릭 시 커리큘럼 섹션으로 스크롤 또는 모달 팝업)
        
- **최종 CTA (아코디언 하단):**
    
    - **버튼 텍스트:** "Start Your Journey →" (목업 이미지 참조)
        
    - **스타일:** Primary CTA (Gradient)
        
    - **기능:** 최종 CTA 섹션으로 스크롤.
        

#### 3.3 비주얼 및 신뢰 요소 (우측 영역)

- **갤러리/슬라이드쇼:**
    
    - **메인 이미지:** 워크숍 현장 사진 (실제 교육 중인 모습) (목업 이미지 참조)
        
    - **라벨:** 이미지 좌측 상단에 "LIVE WORKSHOP" 배지.
        
    - **서브 이미지:** 2개의 작은 섬네일 (멘토링, 화이트보드 설명 등) (목업 이미지 참조).
        
- **사회적 증거 카드:**
    
    - **컨셉:** 수강생 아바타 그룹 + 별점/참여 수 (목업 이미지 참조).
        
    - **내용:** "Join 400+ Makers"
        
    - **아이콘:** 4-5개의 겹쳐진 아바타 이미지.
        
    - **별점:** 5.0 / 5 stars 표시.
        
    - **스타일:** 배경 White, 부드러운 Radius, 가벼운 그림자.
        

---

### 4. 인터랙션 및 모션 (Interaction & Motion)

#### 4.1 아코디언 인터랙션

- **클릭/탭:** 제목 영역 클릭 시, 해당 스텝의 세부 내용이 부드러운 애니메이션(`0.3s ease-in-out`)으로 **확장(Expand)**됩니다.
    
- **상태 표시:** 확장된 카드의 캐럿 아이콘(^)은 아래로 회전하여(Rotate 180deg) '열림' 상태를 표시합니다.
    
- **단일 확장:** 모바일 환경에서는 한 번에 하나의 스텝만 확장되도록 합니다 (다른 스텝은 자동으로 접힘).
    

#### 4.2 스크롤 진입 애니메이션

- **좌/우 분리:**
    
    - 좌측 프로세스 카드: 순차적으로 **Fade-in Up** (Step 1 → Step 2 → Step 3).
        
    - 우측 갤러리 영역: 오른쪽에서 **Slide-in Left**.
        
- **프로그레스 인디케이터 (Process Flow):**
    
    - 3개의 스텝 아이콘을 연결하는 얇은 수직선이 스크롤 진행에 따라 위에서 아래로 그려지는 애니메이션 효과 (목업 이미지 참조).
        

#### 4.3 이미지 갤러리 효과

- **Hover:** 메인 이미지를 마우스 오버할 경우, 주변의 작은 섬네일이 살짝 확대되며 `translateY(-4px)` 부양 효과.
    

---

### 5. 퍼블리싱 가이드 (Development Guide)

- **HTML 구조:**
    
    - 좌측 프로세스: `<dl>`(Definition List) 또는 `<section>`/`<article>`을 사용하여 구조화.
        
    - 아코디언 헤더: `<button>` 태그 사용 필수.
        
- **접근성 (매우 중요):**
    
    - 아코디언 헤더 버튼에 `aria-expanded` (true/false) 속성 명시.
        
    - 확장되는 내용 컨테이너에 `aria-controls` 속성 연결.
        
    - 키보드 네비게이션: `Tab`, `Enter`, `Space` 키로 아코디언 제어 가능하도록 구현.
        
- **반응형:**
    
    - Desktop: 좌/우 4:6 또는 5:5 비율 유지.
        
    - Mobile: 좌측 아코디언 전체 너비, 우측 갤러리 이미지는 아코디언 아래에 전체 너비로 배치.
        

---

**다음 단계:** 이제 **Live Demo (라이브 데모) 섹션**에 대한 상세 명세서를 작성할 차례입니다. 이 섹션은 사용자의 전환에 가장 결정적인 영향을 미칩니다. 이어서 진행할까요?