아래는 제공해주신 **포트폴리오 About 섹션 목업 디자인**을 기준으로 한  
👉 **UI/UX 목업 디자인 상세 명세서**입니다.  
실제 **개발 전달용(FE 핸드오프)** 또는 **포트폴리오 문서**에 바로 쓸 수 있게 구조화했습니다.

---

# 포트폴리오 웹페이지

## About 섹션 목업 디자인 상세 명세서

---

## 1. 화면 개요

- **페이지명**: About
    
- **페이지 목적**
    
    - 개인 정체성 및 디자인 철학 전달
        
    - 신뢰감 있는 첫 인상 제공
        
    - 이력서(Resume) 행동 유도
        
- **레이아웃 타입**:
    
    - Desktop 기준 2-Column Layout
        
    - 좌측: 이미지 / 우측: 텍스트 정보
        

---

## 2. 전체 레이아웃 구조

```
Header (Global Navigation)
──────────────────────────
Main Content
 ├ Profile Image (Left)
 └ About Content (Right)
     ├ Section Label
     ├ Main Headline
     ├ Description Text
     ├ Info Grid (4 items)
     └ Resume CTA Box
──────────────────────────
Footer
```

---

## 3. Header (상단 네비게이션)

### 구성 요소

- Logo (좌측)
    
- Navigation Menu
    
    - Work
        
    - About (Active)
        
    - Contact
        
- CTA Button
    
    - Resume (우측)
        

### 디자인 명세

- 높이: 약 72px
    
- 배경색: #FFFFFF
    
- 구분선: 하단 1px 라인 (#EAEAEA)
    
- Active 메뉴: Primary Color 강조
    

---

## 4. 메인 콘텐츠 영역

### 4.1 프로필 이미지 영역 (좌측)

- 이미지 형태: 세로 직사각형
    
- Border-radius: 16px
    
- 흑백 처리 → 전문성 강조
    
- 그림자: 매우 약한 shadow (Depth 최소화)
    

#### 하단 정보

- 위치 아이콘 + 텍스트  
    `Seoul, South Korea`
    
- 아이콘 버튼 2개
    
    - Email
        
    - External Link
        

---

### 4.2 About 콘텐츠 영역 (우측)

#### (1) 섹션 라벨

- 텍스트: `ABOUT ME`
    
- 스타일:
    
    - 대문자
        
    - Letter-spacing 적용
        
    - Capsule 형태 배경
        
- 색상: Primary Color (연한 톤)
    

---

#### (2) 메인 헤드라인

```
사용자 경험을 먼저 생각하는
디자이너 김철수입니다.
```

- 폰트 사이즈: 매우 큼 (Hero급)
    
- 강조 방식:
    
    - 이름 부분 Primary Color 적용
        
- 줄 간격 넉넉하게 설정
    

---

#### (3) 설명 텍스트 (Description)

- 문단 수: 2단락
    
- 톤: 전문적이되 부드러운 자기소개
    
- 가독성 중심:
    
    - 최대 줄 길이 제한
        
    - Line-height 여유
        

---

## 5. 정보 카드 영역 (Info Grid)

### 그리드 구조

- 2 x 2 Grid
    
- 각 항목:
    
    - 아이콘
        
    - 제목
        
    - 상세 텍스트
        

---

### 5.1 관심 분야

- UI/UX 디자인
    
- 타이포그래피
    
- 마이크로 인터랙션
    
- 디자인 시스템
    

---

### 5.2 작업 스타일

- 사용자 경험 중심
    
- 간결한 문제 해결
    
- 논리적 설계
    
- 데이터 기반 의사결정
    

---

### 5.3 주요 도구

- Figma
    
- Protopie
    
- React
    
- Framer
    

---

### 5.4 학력

- 한국대학교 시각디자인과 졸업
    
- 2018.03 – 2022.02
    

---

## 6. Resume CTA 영역

### 구성

- 좌측:
    
    - 질문형 텍스트  
        `더 자세한 이력이 궁금하신가요?`
        
    - 보조 설명  
        `PDF 형식의 전체 이력서를 확인해보세요.`
        
- 우측:
    
    - CTA 버튼: `이력서 다운로드`
        

### 디자인 포인트

- 카드 형태
    
- Border-radius 적용
    
- Primary Button 강조
    
- 클릭 시 PDF 다운로드
    

---

## 7. Footer

- Copyright
    
    - `© 2024 Kim Cheol-su. All rights reserved.`
        
- 외부 링크
    
    - LinkedIn
        
    - Behance
        
    - Instagram
        

---

## 8. 컬러 시스템

|용도|색상|
|---|---|
|Background|#FFFFFF|
|Primary|Blue 계열|
|Text Main|#111111|
|Text Sub|#555555|
|Border|#EAEAEA|

---

## 9. 타이포그래피

- Font Family: Sans-serif (Pretendard / Noto Sans KR)
    
- Headline: Bold
    
- Body: Regular
    
- Caption: Medium
    

---

## 10. UX 설계 포인트

- 정보 밀도 조절 → 여백 적극 활용
    
- 스크롤 흐름 자연스럽게
    
- CTA는 과하지 않지만 명확하게
    
- “읽는 포트폴리오” 지향
    

---

## 11. 한 줄 요약 (문서용)

> **심플한 레이아웃과 명확한 정보 구조를 통해 디자이너의 정체성과 전문성을 전달하는 About 페이지 UI**

---

### 다음 단계로 가능:

- 🎨 **컬러/폰트 토큰 정리 (Design Token)**
    
- 💻 **Next.js 기준 컴포넌트 명세**
    
- 📐 **Figma → 개발 핸드오프용 명세**
    
- 🧾 **포트폴리오 제출용 PDF 문서화**
    

어디까지 필요하신가요?