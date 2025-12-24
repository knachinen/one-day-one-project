
### 1. 프로젝트 초기 설정 (Project Setup)

* **프레임워크:** React Native (CLI 방식 권장, Native 모듈 제어 최적화)
* **언어:** TypeScript (타입 안정성 확보)
* **주요 라이브러리 설치:**
    * `react-navigation/native`: 내비게이션 기본 프레임워크
    * `react-navigation/bottom-tabs`: 하단 탭바 구현
    * `react-native-svg`: 벡터 아이콘 및 그래픽 처리
    * `styled-components` 또는 `Tailwind CSS (NativeWind)`: 일관된 스타일링 관리

### 2. 테마 및 상수 정의 (Global Constants)

* **Colors:**
    * `Primary`: `#66CC66` (Quest Green)
    * `Background`: `#F7F8F9` (Light Gray)
    * `Card`: `#FFFFFF`
    * `Text_Primary`: `#111111`
    * `Text_Secondary`: `#999999`
* **Typography:**
    * `Pretendard` 폰트 에셋 적용 및 초기 설정

### 3. 내비게이션 구조 설계 (Navigation Architecture)

* **RootStack:** 앱 전체의 화면 전환 관리
* **MainTabNavigator:** 하단 탭바를 포함한 4개 메인 화면 연결
    1.  **홈 (Home):** 대시보드 및 리스트
    2.  **통계 (Stats):** 학습 데이터 분석
    3.  **스쿼드 (Squad):** 그룹 탐색 및 관리
    4.  **MY (Profile):** 개인 설정

### 4. 메인 탭바 상세 구현 (Tab Bar UI)

* **레이아웃 구성:**
    * 높이: 60dp ~ 70dp (기기별 safe area 대응 필수)
    * 배경색: `#FFFFFF`
    * 상단 경계선: `1px` 두께의 연한 회색 혹은 미세한 그림자(Elevation) 적용
* **탭 아이콘 스타일:**
    * 목업 디자인에 따라 홈, 통계, 스쿼드, MY 각각의 라인 아이콘 적용
    * `Active`: Quest Green 컬러로 강조 및 아이콘 채우기(Filled)
    * `Inactive`: Light Gray 컬러로 처리
* **중앙 시작 버튼 (Start FAB):**
    * **형태:** 지름 약 65dp의 정원형 버튼
    * **위치:** 탭바 중앙에 배치되되, 탭바 상단 경계선 위로 약 1/3 정도 튀어나오도록 설정 (Floating 효과)
    * **스타일:** `Quest Green` 배경에 흰색 `▶` 아이콘 중앙 배치
    * **그림자:** 버튼 주변에 부드러운 `Drop Shadow`를 적용하여 입체감 부여

### 5. 화면별 스켈레톤 구성 (Placeholder Screens)

각 탭 클릭 시 전환되는 화면은 초기 단계이므로 제목(Header)과 배경색만 우선 적용합니다.

* **Home Screen:** 상단 사용자 프로필 바와 대시보드 카드가 들어갈 빈 영역 확보
* **Squad Screen:** 목업에 명시된 '내 스쿼드' 타이틀 레이아웃 배치

### 6. 개발자 가이드 (Technical Notes)

* **Safe Area:** iPhone의 Notch 및 Android의 Navigation Bar 영역을 고려하여 `SafeAreaView`를 최상단에 배치합니다.
* **Z-Index:** 중앙 시작 버튼이 다른 탭 아이콘이나 화면 콘텐츠보다 항상 위에 오도록 `zIndex` 값을 높게 설정합니다.
* **Interactive:** 버튼 클릭 시 시각적 피드백(Opacity 변화 등)을 주어 유저가 클릭했음을 인지하게 합니다.

---

**1단계 검증 포인트:**
1. 앱 실행 시 하단 탭바가 정상적으로 노출되는가?
2. 4개의 탭을 클릭했을 때 각 화면(Home, Stats, Squad, MY)으로 부드럽게 전환되는가?
3. 중앙의 시작 버튼이 디자인대로 탭바 중앙에 플로팅되어 있는가?
