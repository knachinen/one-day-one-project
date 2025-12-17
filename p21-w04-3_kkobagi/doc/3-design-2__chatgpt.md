# 1. 화면 개요

본 문서는 **Kkobagi – 새 습관 만들기(Create Habit)** 화면의 UI/UX 디자인 상세 명세서이다.  
해당 화면의 목적은 사용자가 **부담 없이, 최소한의 결정 피로로 새로운 습관을 정의하고 생성**하도록 돕는 것이다.

- 화면 유형: 입력 폼 기반 설정 화면
    
- 핵심 UX 목표:
    
    - “작게 시작”을 자연스럽게 유도
        
    - 한 화면 내에서 모든 설정 완료
        
    - 친근한 캐릭터와 가벼운 인터랙션으로 심리적 허들 완화
        

---

# 2. 디자인 컨셉

## 2.1 키워드

- ✏️ 간단함 (Simplicity)
    
- 🧸 친절한 가이드 (Friendly Guide)
    
- 🌱 작은 시작 (Tiny Habit)
    
- ✅ 명확한 완료감
    

## 2.2 컨셉 설명

- 입력 필드 수를 최소화하고 **선택형 UI 중심**으로 구성
    
- 캐릭터 말풍선을 활용한 **행동 유도형 마이크로 카피**
    
- 노란색 포인트 컬러로 “지금 이 행동이 중요함”을 지속적으로 강조
    

---

# 3. 컬러 시스템 (Color System)

## 3.1 Primary Color

- Primary Yellow: `#FFD900`
    
    - 주요 CTA 버튼
        
    - 선택 상태 강조 (요일, 아이콘, 기간)
        

## 3.2 Neutral Colors

- Background: `#FFFEF7`
    
- Card Background: `#FFFFFF`
    
- Border: `#EFEFEF`
    
- Disabled: `#DADADA`
    

## 3.3 Text Colors

- Primary Text: `#1E1E1E`
    
- Secondary Text: `#8A8A8A`
    

---

# 4. 타이포그래피

- 기본 폰트: Pretendard / Noto Sans KR
    

|용도|크기|두께|
|---|---|---|
|상단 타이틀|20px|SemiBold|
|섹션 라벨|14px|Medium|
|입력값|16px|Medium|
|보조 설명|12px|Regular|

---

# 5. 레이아웃 & 구조

## 5.1 전체 구조

- Single Column
    
- 최대 폭: 720px
    
- 콘텐츠 정렬: Center
    

## 5.2 공통 여백

- 섹션 간 간격: 32px
    
- 카드 내부 패딩: 20–24px
    
- 입력 요소 간 간격: 12–16px
    

---

# 6. 주요 컴포넌트 상세 명세

## 6.1 상단 네비게이션

- 좌측: 뒤로가기 아이콘
    
- 중앙: 페이지 타이틀 `새 습관 만들기`
    
- 높이: 56px
    

---

## 6.2 습관 이름 입력 영역

### 구성

- 캐릭터 아바타 + 말풍선
    
- 텍스트 입력 필드
    

### 입력 필드

- Placeholder: `예: 매일 물 2L 마시기`
    
- 최대 글자 수: 30자 (우측 카운트 표시)
    
- Focus 상태:
    
    - Border: Primary Yellow
        

### UX 가이드

- 입력 시 말풍선 문구 Fade-out
    
- 미입력 상태에서는 하단 CTA 비활성화
    

---

## 6.3 아이콘 선택

### 레이아웃

- Grid: 5 × N
    
- 아이콘 크기: 24px
    
- 터치 영역: 56px 원형
    

### 상태

|상태|설명|
|---|---|
|기본|White + Gray Icon|
|Hover|Border 강조|
|선택|Yellow Background + Shadow|

- 마지막 아이콘: `+` (커스텀 아이콘 추가)
    

---

## 6.4 반복 요일 선택

- 버튼 형태: Pill Button
    
- 크기: 최소 40px
    

|상태|디자인|
|---|---|
|선택|Yellow Fill + Bold Text|
|미선택|White + Gray Border|

- 최소 1일 이상 선택 필수
    

---

## 6.5 알림 시간 설정

### 시간 선택

- Dropdown 방식
    
- 24시간제
    
- 기본값: 09:00
    

### 인터랙션

- 선택 시 하단 요약 텍스트 변경
    

---

## 6.6 하루 빈도 설정

- 구성: `- / 현재 값 / +`
    
- 기본값: 하루 1회
    
- 최대값 제한 가능 (예: 10회)
    

버튼 인터랙션:

- Tap 시 Scale 0.95 → 1
    

---

## 6.7 목표 기간 선택

- 옵션:
    
    - 30일 (기본 선택)
        
    - 66일
        
    - 무제한
        
- 선택 방식: Segmented Control
    

|상태|설명|
|---|---|
|선택|Yellow Fill|
|미선택|Text Only|

---

## 6.8 하단 CTA 버튼

### 습관 생성 완료 버튼

- 위치: 하단 고정
    
- 높이: 64px
    
- Radius: 32px
    
- 컬러: Primary Yellow
    

상태:

- 비활성: Gray + Disabled Text
    
- 활성: Shadow + 강조
    

클릭 시:

- 로딩 스피너 → 생성 완료 → 대시보드 이동
    

---

# 7. 인터랙션 & 모션 가이드

- 기본 Easing: ease-out
    
- Duration: 150–300ms
    

|상황|효과|
|---|---|
|선택 토글|Scale + Color Transition|
|CTA 클릭|Ripple + 미세 진동|
|에러|Shake (X축 6px)|

---

# 8. 유효성 & 에러 처리

- 습관명 미입력: 입력 필드 하단 안내 문구 노출
    
- 요일 미선택: CTA 클릭 시 Toast 안내
    

---

# 9. 접근성

- 모든 버튼 최소 터치 영역 44px
    
- 색상 외 텍스트/아이콘으로 상태 구분
    
- 스크린리더용 Label 제공
    

---

# 10. 확장 고려 사항

- 추천 습관 템플릿
    
- AI 기반 습관 이름 자동 제안
    
- 난이도 선택 (Easy / Normal)
    

---

**본 문서는 새 습관 생성 플로우의 디자인·개발 기준 문서로 사용한다.**