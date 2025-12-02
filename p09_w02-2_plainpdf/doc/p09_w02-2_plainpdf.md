
# 📄 Plain PDF (미니멀 PDF) 제품 요구사항 명세서

프로젝트명: Plain PDF ($\text{미니멀 PDF}$)
버전: 1.0 ($\text{MVP}$)
플랫폼: $\text{React Native / Expo}$ ($\text{iOS}$ 및 $\text{Android}$)
작성일: 2025년 11월 29일
기술 환경: $\text{Expo Managed Workflow}$ 및 Local Database ($\text{SQLite}$ 기반)

## 1. 개요 및 목표

### 1.1. 제품 비전

문서를 단순히 읽는 것을 넘어, 주석, 하이라이트, 필기를 통해 사용자가 콘텐츠와 **적극적으로 상호작용**하며 지식을 습득하고 정리할 수 있는 가장 빠르고 쉬운 **모바일 기반** $\text{PDF}$ 도구.

### 1.2. $\text{MVP}$ 핵심 목표

1. **네이티브 성능 확보:** $\text{React Native}$ 네이티브 모듈을 사용하여 $\text{PDF}$ 파일을 안정적이고 빠르게 렌더링하는 기능 검증.
2. **정확한 터치 주석:** 모바일 터치 환경에서 주석, 하이라이트, 필기 입력 시 좌표 오차 없이 정확하게 저장/로드되는지 검증.
3. **데이터 영속성:** 주석 데이터가 **로컬 $\text{DB}$**에 안전하게 저장되고, 동일한 문서 재접근 시 정확히 로드되는지 확인.

## 2. 핵심 기능 및 요구사항 (Core Features)

### 2.1. $\text{PDF}$ 뷰어 및 렌더링 ($\text{Viewer and Rendering}$)

|   |   |   |
|---|---|---|
|**ID**|**요구사항**|**세부사항 (React Native/Expo 고려사항)**|
|$\text{F1.1}$|$\text{PDF}$ **파일 로드**|$\text{Expo Document Picker}$ 또는 $\text{File System}$을 사용하여 로컬 $\text{PDF}$ 파일을 선택하고 읽어옴.|
|$\text{F1.2}$|**기본 렌더링**|**네이티브** $\text{PDF}$ **뷰어 컴포넌트** (예: $\text{react-native-pdf}$ 또는 $\text{Expo}$가 지원하는 $\text{PDF}$ 뷰어 모듈)를 사용하여 문서의 텍스트와 레이아웃을 표시.|
|$\text{F1.3}$|**페이지 탐색**|페이지 번호 입력, 좌우 스와이프, 스크롤을 통한 페이지 이동 지원.|
|$\text{F1.4}$|**줌/팬 기능**|터치스크린의 **핀치 투 줌/드래그 제스처**를 통한 화면 확대/축소 및 이동 지원.|

### 2.2. 주석 도구 ($\text{Annotation Tools}$)

**주석은** $\text{PDF}$ **뷰어 컴포넌트 위에 $\text{Absolute Position}$으로 오버레이된 별도의** $\text{View}$ **또는** $\text{SVG}$ **레이어로 렌더링되어야 합니다.**

|   |   |   |
|---|---|---|
|**ID**|**요구사항**|**세부사항 (React Native/Expo 고려사항)**|
|$\text{F2.1}$|**하이라이트**|텍스트 선택 기능 없이, 터치 드래그 영역에 **투명도가 적용된** $\text{View}$ **컴포넌트 오버레이**를 추가. (정확한 텍스트 하이라이트 기능은 $\text{MVP}$에서 제외)|
|$\text{F2.2}$|**텍스트 주석 (메모)**|$\text{PDF}$의 특정 위치를 탭하면 **메모 아이콘 ($\text{Icon}$ 컴포넌트)**을 추가하고, 모달을 열어 주석 내용을 입력/저장.|
|$\text{F2.3}$|**자유 필기**|`react-native-svg`나 $\text{Gesture Handler}$를 활용하여 터치 이벤트를 캡처, 사용자가 $\text{PDF}$ 위에 직접 선을 그릴 수 있는 펜 도구 제공. (단색, 굵기 고정)|
|$\text{F2.4}$|**주석 선택 및 삭제**|이미 추가된 주석을 탭하여 선택하고 삭제하는 기능 제공.|

### 2.3. 데이터 영속성 및 저장 ($\text{Data Persistence}$)

|   |   |   |
|---|---|---|
|**ID**|**요구사항**|**세부사항 (React Native/Expo 고려사항)**|
|$\text{F3.1}$|**로컬 DB 저장**|$\text{Expo-SQLite}$ 또는 유사 모듈을 사용하여 주석 데이터를 로컬 $\text{SQLite}$ 데이터베이스에 저장. **클라우드 동기화는 $\text{MVP}$에서 제외.**|
|$\text{F3.2}$|**데이터 모델**|주석 객체는 페이지 번호, 유형, **PDF의 원본 크기에 정규화된 좌표/크기**를 $\text{JSON}$ 문자열 형태로 저장.|
|$\text{F3.3}$|**주석 로드**|$\text{PDF}$ 로드 시, **로컬 $\text{DB}$**에서 해당 문서의 주석을 불러와 현재 뷰포트 크기에 맞춰 좌표를 역정규화하여 정확하게 재현해야 함.|
|$\text{F3.4}$|**자동 저장**|주석 추가/수정 후 **5초 이내** 또는 $\text{App State}$ 변경 시 자동 저장 이벤트 발생.|

## 3. 기술 스택 및 데이터 모델 (Tech Stack & Data Model)

### 3.1. 기술 스택

- **프론트엔드:** $\text{React Native}$  
- **프레임워크:** $\text{Expo}$ (Managed Workflow)
- $\text{PDF}$ **렌더링:** $\text{react-native-pdf}$ 또는 $\text{Expo}$ 호환 가능한 $\text{PDF}$ 뷰어 모듈
- **주석 레이어:** $\text{react-native-svg}$ 및 $\text{react-native-gesture-handler}$  
- **데이터베이스:** **Local Database (**$\text{SQLite}$ **기반)**

### 3.2. 로컬 DB 데이터 모델 (Annotation Table)

모든 주석은 단일 `ANNOTATIONS` 테이블에 저장됩니다.

|   |   |   |   |
|---|---|---|---|
|**테이블**|**필드**|**데이터 타입**|**설명**|
|$\text{ANNOTATIONS}$|$\text{id}$|$\text{INTEGER}$ ($\text{PK}$, $\text{AUTOINCREMENT}$)|주석의 고유 $\text{ID}$|
||$\text{docId}$|$\text{TEXT}$|$\text{PDF}$ 파일의 고유 해시 값 ($\text{FK}$)|
||$\text{page}$|$\text{INTEGER}$|주석이 위치한 페이지 번호|
||$\text{type}$|$\text{TEXT}$|주석 유형 (`highlight`, `text`, `draw`)|
||$\text{data}$|$\text{TEXT}$|정규화된 좌표, 크기, 내용 등 ($\text{JSON}$ $\text{String}$)|
||$\text{timestamp}$|$\text{REAL}$|주석 생성 또는 수정 시각|

## 4. $\text{MVP}$ 제외 기능 ($\text{Out of Scope for MVP - Phase 2}$)

- 텍스트 검색 및 책갈피 기능.
- **텍스트 영역 기반의 자동 하이라이트** (현재는 드래그 기반 사각형 오버레이만 지원).
- 주석 내보내기 ($\text{PDF}$에 주석을 포함하여 출력).
- 다양한 필기 도구 옵션 (지우개, 색상 팔레트, 굵기 조절).
- 외부 계정 $(\text{Google/SNS})$ 로그인 기능 및 **클라우드 동기화**.
