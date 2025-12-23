
# [Design Specification] 목표 달성형 메신저 'Quest'

## 1. 디자인 원칙 (Design Principles)
* **Zero Distraction:** 공부에 방해되는 화려한 장식은 배제하고 콘텐츠(시간, 대화, 캠)에 집중합니다.
* **Visual Trust:** 조작할 수 없는 기록이라는 느낌을 주도록 폰트와 레이아웃을 정교하고 정직하게 설계합니다.
* **Positive Tension:** 적절한 긴장감(라이브 표시)과 성취감(애니메이션)이 공존해야 합니다.

---

## 2. 컬러 시스템 (Color System)
* **Primary:** `Quest Green (#66CC66)` - 공부 시작, 활성화 상태.
* **Secondary:** `Focus Orange (#FF7043)` - 공부 종료, 경고, 강한 강조.
* **Background:** * Light: `#F8F9FA` (Soft Grayish White)
    * Dark: `#1A1C1E` (Deep Charcoal) - **몰입 모드 진입 시 필수 전환.**
* **Point:** `#FF1744` (Vivid Red) - 오직 'LIVE' 배지에만 사용하여 시선을 유도합니다.

---

## 3. 타이포그래피 (Typography)
* **Main Font:** `Pretendard` 또는 `Noto Sans KR` (산세리프 계열).
* **Number Font:** `Roboto Mono` 또는 `JetBrains Mono` (모노스페이스).
    * *이유:* 스톱워치 숫자가 변할 때 글자 폭이 흔들리지 않아야 함.
* **Hierarchy:**
    * Heading: 22pt, Bold (오늘의 공부 시간)
    * Body: 16pt, Regular (채팅 메시지)
    * Caption: 12pt, Medium (타임스탬프 정보, 날짜)

---

## 4. 주요 화면별 UI 구성 요소 (Key Components)

### A. 홈 화면 (Dashboard)
* **Study Card:** 8pt~12pt의 Corner Radius를 가진 카드형 UI. 
* **Start FAB:** 화면 하단 중앙에 위치. 그림자(Drop Shadow)를 활용하여 층위(Z-index)를 높임.
* **Progress Indicator:** 그룹 카드 하단에 4pt 높이의 얇은 프로그레스 바.

### B. 채팅 및 인증 화면 (Chat & Feed)
* **Live Bar:** 최상단에 고정. 유저 프로필 원형 크기는 48x48px. 캠이 켜진 유저는 테두리에 Green 보더 적용.
* **Timestamp Photo:** 1:1 또는 4:3 비율의 이미지. 하단에 반투명(#000000, 50%) 블랙 띠를 두르고 흰색 모노스페이스 폰트로 시간 각인.
* **Reaction Bubble:** 메시지 우측 하단에 작게 붙는 칩(Chip) 형태.

---

## 5. 인터랙션 및 애니메이션 가이드 (Motion)
* **Focus Transition:** '공부 시작' 버튼 클릭 시, 배경색이 `#F8F9FA`에서 `#1A1C1E`로 **0.5s Ease-in-out**으로 전환될 것.
* **Stamping Effect:** 타임스탬프 텍스트가 나타날 때 `Scale 1.5 -> 1.0`으로 빠르게 수축하며 강렬하게 나타날 것.
* **Floating Cheers:** 리액션 아이콘은 클릭 시 하단에서 상단으로 **S자 곡선**을 그리며 투명해질 것.

---

## 6. 아이콘 스타일 (Iconography)
* **Style:** `2pt Line Icons` (Round Cap/Join).
* **Size:** 기본 24x24px, 클릭 영역(Touch Target)은 최소 44x44px 확보.
* **Mood:** 너무 귀엽기보다는 전문적이고 모던한 느낌의 라인 아이콘.

---

## 7. 디자이너에게 보내는 특별 요청 (Special Request)
1.  **다크 모드 최적화:** 다크 모드가 단순히 검은색인 것이 아니라, '집중을 위한 암실' 같은 느낌이 나도록 채도를 조정해 주세요.
2.  **가독성 우선:** 채팅방 내에서 시스템 메시지(입퇴장)와 유저 메시지, 인증 사진이 명확히 구분되도록 간격을 설계해 주세요.
3.  **에셋 수출:** iOS/Android 대응을 위해 모든 아이콘과 그래픽 요소는 SVG 또는 3x 배율의 PNG로 준비해 주세요.
