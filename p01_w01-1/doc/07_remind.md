## 이전 문서 읽기

### 프로젝트 환경

프로젝트 환경설정과 관련된 다음 문서를 순서대로 읽기.

1. p00_w00-0/01_preplanning.md
2. p00_w00-0/02_regulation.md
3. p00_w00-0/03_plan.md
4. p00_w00-0/04_checklist.md

### 첫번째 프로젝트

첫번째 프로젝트와 관련된 다음 문서를 순서대로 읽기.

1. p01_w01-1/doc/01_spec.md
2. p01_w01-1/doc/02_plan.md
3. p01_w01-1/doc/03_checklist.md

#### ~~gluestack ui 적용~~ 취소됨

~~gluestack ui 를 적용과 관련된 다음 문서를 순서대로 읽기.~~

~~1. p01_w01-1/doc/05_gluestack_ui_plan.md~~
~~2. p01_w01-1/doc/06_gluestack_ui_checklist.md~~

#### kitten ui 적용

kitten ui 를 적용과 관련된 다음 문서를 순서대로 읽기.

1. p01_w01-1/doc/08_ui_kitten_plan.md
2. p01_w01-1/doc/09_ui_kitten_checklist.md

---

## 요약 브리핑

### 1. `p00_w00-0/01_preplanning.md`

"1일 1코딩" 계획을 구체화하기 위한 질의응답 문서입니다. 12주 동안 72개의 프로젝트를 만들고, 이 중 3개를 프로덕트로 발전시켜 100명의 실제 사용자를 확보하는 것을 최종 목표로 합니다. 계획 시간, 아이디어 소스, 알고리즘 수준, 회고 방식, 최종 목표 등이 상세하게 정의되어 있습니다.

### 2. `p00_w00-0/02_regulation.md`

프로젝트 진행을 위한 작업 규칙을 정의합니다. 한글 답변 사용, Git 환경 설정, 계획 및 체크리스트의 승인 및 문서 저장, 각 작업 완료 후 Git 커밋, 프로젝트 및 문서 넘버링 규칙 등이 포함됩니다.

### 3. `p00_w00-0/03_plan.md`

2025년 11월 24일자 단기 계획으로, Git 저장소 초기화, 사용자 정보 설정 (`knachinen`, `knachinen@gmail.com`), 현재 계획 및 체크리스트 문서 저장, 그리고 초기 커밋 수행을 목표로 합니다.

### 4. `p00_w00-0/04_checklist.md`

`p00_w00-0/03_plan.md`에 명시된 모든 초기 Git 환경 설정 및 문서 저장 작업, 초기 커밋이 완료되었음을 확인하는 체크리스트입니다.

### 5. `p01_w01-1/doc/01_spec.md`

첫 번째 프로젝트(`p01_w01-1`)의 사양을 정의합니다. 웹 주소에서 텍스트 콘텐츠를 가져와 무작위 단어를 제시하고, 해당 단어로 글을 작성하여 마크다운(.md) 형식으로 저장하는 앱을 React Native와 Expo로 개발합니다. 미니멀리즘 디자인을 지향하며, 파일 탐색 및 불러오기 기능도 포함됩니다.

### 6. `p01_w01-1/doc/02_plan.md`

`p01_w01-1` 프로젝트의 상세 개발 계획입니다. React Native/Expo 초기 설정부터 UI 구성, 웹 콘텐츠 가져오기, 마크다운 저장, 파일 관리 기능 구현을 다룹니다. 또한, `makeDirectoryAsync` Deprecated 오류, `commonWords.txt` 로딩 오류, 파일 저장 오류, "문서 디렉토리를 찾을 수 없습니다." 오류 등 여러 버그 수정 계획과 `App.tsx` 파일을 여러 컴포넌트, 훅, 서비스로 분리하는 리팩토링 계획이 포함되어 있습니다. `README.md` 생성 계획도 언급됩니다.

### 7. `p01_w01-1/doc/03_checklist.md`

`p01_w01-1` 프로젝트의 개발 전반에 대한 상세 체크리스트로, 초기 환경 설정, UI 구성, 핵심 기능 구현, 모든 오류 수정 및 `App.tsx` 파일 분할, `README.md` 생성 등 모든 항목이 완료된 것으로 표시되어 있습니다.

### 8. `p01_w01-1/doc/08_ui_kitten_plan.md`

`p01_w01-1` Expo 프로젝트에 UI Kitten을 통합하기 위한 계획을 설명합니다. 문서 파일 생성, 필수 의존성 설치 (`@ui-kitten/components`, `@eva-design/eva`, `react-native-svg`), `App.tsx` 설정 (ApplicationProvider로 래핑, 테마 및 아이콘 팩 설정), 그리고 Metro Bundler 재시작(`npm start -- --reset-cache`) 단계를 포함합니다.

### 9. `p01_w01-1/doc/09_ui_kitten_checklist.md`

UI Kitten 통합 계획의 진행 상황을 추적하는 체크리스트입니다. 문서 파일 생성, `@ui-kitten/components` 및 `@eva-design/eva` 설치, `react-native-svg` 설치, `App.tsx` 구성, Metro Bundler 재시작 등 모든 단계가 완료된 것으로 표시되어 있습니다.
