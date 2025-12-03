# Markify (웹 to MD 변환 앱) 제품 요구사항 명세서

프로젝트명: Markify
버전: 1.0 ($\text{MVP}$)
플랫폼: $\text{React Native / Expo}$ ($\text{iOS}$ 및 $\text{Android}$)
작성일: 2025년 11월 29일
핵심 기술: $\text{Expo Managed Workflow}$, $\text{Local Storage}$

## 1. 개요 및 목표

### 1.1. 제품 비전

복잡한 웹 콘텐츠를 **단일 탭**만으로 군더더기 없는 $\text{Markdown}$ **형식**의 텍스트로 변환하여, 사용자가 아이디어와 정보를 가장 빠르게 정리하고 저장할 수 있도록 돕는 도구.

### 1.2. $\text{MVP}$ 핵심 목표

1. **변환 핵심 검증:** 클라이언트 $\text{JavaScript}$ 환경에서 **정적인 웹페이지**의 $\text{HTML}$을 성공적으로 가져와 $\text{Markdown}$으로 변환하는 핵심 로직의 안정성 검증.
2. **간편한 공유:** 변환된 $\text{Markdown}$ 텍스트를 즉시 **클립보드에 복사**하거나 공유하는 기능을 통해 **생산성 루프** 확립.
3. **오프라인 접근성:** 변환된 노트를 로컬에 저장하여 언제든 접근 가능하도록 보장.

## 2. 기술적 접근 방식 및 아키텍처 (Technology & Architecture)

|**ID**|**요구사항**|**세부사항**|
|---|---|---|
|$\text{A1.1}$|**변환 방식 채택**|**클라이언트(앱) 기반 처리** 방식을 $\text{MVP}$의 기본 아키텍처로 채택. (정적 $\text{HTML}$ 페이지 우선)|
|$\text{A1.2}$|**HTML 추출**|$\text{React Native}$의 $\text{Fetch API}$ 또는 `axios`를 사용하여 입력된 $\text{URL}$의 $\text{HTML}$ 소스를 가져옴.|
|$\text{A1.3}$|**변환 라이브러리**|클라이언트 측에서 실행 가능한 $\text{JavaScript}$ 기반의 **`html-to-markdown`** 또는 이와 유사한 라이브러리를 사용하여 변환 로직 구현.|
|$\text{A1.4}$|**향후 계획**|동적 페이지 및 복잡한 웹사이트 처리를 위해 $\text{Phase 2}$에서 $\text{Serverless Function}$ 또는 별도의 $\text{Node.js}$ **서버 기반 아키텍처로 전환**하는 것을 고려.|

## 3. 핵심 기능 및 요구사항 (Core Features)

### 3.1. URL 입력 및 변환 ($\text{Input & Conversion}$)

|**ID**|**요구사항**|**세부사항 (React Native/Expo 고려사항)**|
|---|---|---|
|$\text{F1.1}$|**URL 입력**|사용자가 $\text{URL}$을 입력할 수 있는 $\text{Text Input}$ 제공. (클립보드에서 $\text{URL}$을 감지하여 자동 채우기 $\text{MVP}$ 제외)|
|$\text{F1.2}$|**변환 실행**|입력된 $\text{URL}$에 대해 비동기적으로 $\text{HTML}$ 추출 및 $\text{Markdown}$ 변환을 시작하는 **명확한 버튼** 제공.|
|$\text{F1.3}$|**진행 상태**|변환 작업 중 $\text{Activity Indicator}$ (로딩 스피너)를 표시하여 사용자에게 대기 시간을 알림. (처리 시간 3초 이상 지연 시, 사용자에게 경고 메시지 표시)|
|$\text{F1.4}$|**오류 처리**|$\text{URL}$ 형식 오류, $\text{CORS}$ 제한, 페이지 접속 오류 등 실패 원인에 따라 적절한 에러 메시지를 사용자에게 표시.|

### 3.2. 결과 표시 및 편집 ($\text{Output & Editor}$)

|**ID**|**요구사항**|**세부사항**|
|---|---|---|
|$\text{F2.1}$|$\text{MD}$ **뷰어**|변환된 $\text{Markdown}$ 텍스트를 스크롤 가능한 $\text{Textarea}$ 컴포넌트에 표시.|
|$\text{F2.2}$|**제목 자동 지정**|변환된 $\text{MD}$의 첫 번째 $\text{h1}$ 태그 또는 웹페이지의 $\text{<title>}$ 태그를 사용하여 노트의 기본 제목을 자동으로 지정.|
|$\text{F2.3}$|**수동 편집**|변환된 $\text{MD}$ 텍스트를 사용자가 자유롭게 수정할 수 있도록 허용.|
|$\text{F2.4}$|**복사/공유**|편집된 $\text{MD}$ 텍스트를 $\text{Clipboard}$에 복사하거나, 모바일 공유 시트를 통해 다른 앱으로 공유하는 기능 제공.|

### 3.3. 로컬 저장소 관리 ($\text{Local Storage Management}$)

|**ID**|**요구사항**|**세부사항 (React Native/Expo 고려사항)**|
|---|---|---|
|$\text{F3.1}$|**로컬 저장**|편집 완료된 노트를 $\text{Expo-SQLite}$ 또는 $\text{AsyncStorage}$를 사용하여 로컬 기기에 저장.|
|$\text{F3.2}$|**저장 목록**|저장된 노트의 제목과 저장 시각을 표시하는 '보관함' 탭 제공.|
|$\text{F3.3}$|**로드 및 삭제**|보관함에서 노트를 탭하면 편집 화면으로 로드하여 수정 가능. 노트 삭제 기능 제공.|

## 4. $\text{MVP}$ 제외 기능 ($\text{Out of Scope for MVP - Phase 2}$)

- **동적 웹페이지 처리:** $\text{JavaScript}$를 통해 로드되는 $\text{SPA}$ ($\text{Single Page Application}$) 페이지의 $\text{HTML}$ 처리.
- $\text{PDF}$ 또는 다른 형식으로 내보내기 ($\text{Export}$).
- $\text{Google/SNS}$ 계정을 통한 사용자 인증 및 클라우드 동기화.
- $\text{MD}$ 텍스트를 미리 볼 수 있는 렌더링 뷰어 (오직 원본 $\text{MD}$ 텍스트만 표시).
- 이미지 포함 처리 (웹페이지 내 이미지는 링크 형태로만 $\text{MD}$에 포함되며, 로컬 다운로드는 제외).
