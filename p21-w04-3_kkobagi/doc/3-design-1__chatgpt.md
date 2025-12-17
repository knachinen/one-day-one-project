# 1. 개요

본 문서는 **습관 형성 웹 플랫폼 ‘Kkobagi’의 메인 대시보드 화면**에 대한 디자인 상세 명세서이다.  
목표는 사용자가 **매일 습관을 부담 없이 체크하고, 감정적으로 보상받으며, 장기적으로 습관을 유지**하도록 돕는 것이다.

- 화면 성격: 메인 대시보드 (Daily Habit Dashboard)
    
- 주요 사용자 행동: 오늘의 습관 확인 → 완료 체크 → 진행도/성취감 확인
    
- 톤앤매너: 친근함, 응원, 밝음, 부드러움
    

---

# 2. 디자인 컨셉

## 2.1 키워드

- 🌱 성장 (Grow)
    
- 😊 정서적 보상 (Emotional Reward)
    
- ✔️ 즉각적 성취감 (Instant Feedback)
    
- ✨ 가벼운 동기부여
    

## 2.2 컨셉 설명

- 전반적으로 **둥근 형태 + 여백 중심 레이아웃**
    
- 노란색을 중심으로 한 **긍정·활력 컬러 시스템**
    
- 캐릭터와 진행바를 활용한 **시각적 응원 메시지**
    

---

# 3. 컬러 시스템 (Color System)

## 3.1 Primary Colors

- Primary Yellow: `#FFD900`
    
    - 주요 CTA 버튼 (습관 추가)
        
    - 체크 완료 상태 강조
        
- Soft Yellow Background: `#FFFBEA`
    
    - 메인 배경 그라데이션
        

## 3.2 Secondary Colors

- Green (성장/레벨): `#4CD964`
    
- Blue (물 마시기): `#4A90E2`
    
- Purple (독서): `#9B51E0`
    
- Gray (비활성): `#CFCFCF`
    

## 3.3 Text Colors

- Primary Text: `#1C1C1C`
    
- Secondary Text: `#7A7A7A`
    
- Disabled Text: `#BDBDBD`
    

---

# 4. 타이포그래피 (Typography)

## 4.1 폰트

- 기본 폰트: **Pretendard / Noto Sans KR (Fallback)**
    

## 4.2 텍스트 스타일

|용도|크기|두께|비고|
|---|---|---|---|
|메인 인사|24px|Bold|사용자 이름 강조|
|카드 타이틀|18px|SemiBold|섹션 제목|
|본문|14–16px|Regular|설명 텍스트|
|서브 정보|12px|Regular|연속일, 완료 수|

---

# 5. 레이아웃 구조

## 5.1 전체 구조

- 최대 콘텐츠 폭: 1200px
    
- 레이아웃: 2 Column
    
    - 좌측: 메인 콘텐츠 (인사, 오늘의 습관)
        
    - 우측: 요약 정보 (습관 나무, 주간 달성률)
        

## 5.2 여백 규칙

- 카드 간 간격: 16–24px
    
- 카드 내부 패딩: 20–24px
    
- 전체 화면 여백: 32px
    

---

# 6. 주요 컴포넌트 명세

## 6.1 상단 헤더

- 좌측: 로고 + 서비스명 `Kkobagi`
    
- 우측: 알림 아이콘, 프로필 아이콘
    
- 높이: 64px
    

---

## 6.2 인사 카드 (Greeting Card)

### 구성 요소

- 캐릭터 이미지
    
- 오늘 달성률 배지
    
- 응원 문구
    
- 진행 바 (Progress Bar)
    

### 진행 바

- 높이: 8px
    
- Radius: 999px
    
- Fill Color: Primary Yellow
    
- 애니메이션: width 0 → 목표치 (ease-out, 0.6s)
    

---

## 6.3 습관 나무 카드

- 현재 레벨 표시
    
- 성장 상태 텍스트
    
- 진행도 하단 바 (Green)
    

> 레벨 상승 시 나무 아이콘이 변경되며, 짧은 Scale + Fade 애니메이션 적용

---

## 6.4 주간 달성률 카드

- 원형 Progress Chart
    
- 중앙 퍼센트 텍스트
    
- 보조 설명 텍스트
    

애니메이션:

- Stroke-dasharray 기반 순차 드로잉 (0.8s)
    

---

## 6.5 오늘의 습관 리스트

### 습관 카드 구조