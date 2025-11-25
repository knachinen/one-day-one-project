# 05_gluestack_ui_plan.md

## Gluestack UI 통합 계획

### 목표
`p01_w01-1` 프로젝트에 `gluestack-ui` 라이브러리를 통합하여 UI 구성 요소를 활용할 수 있는 기반을 마련하고, 기존의 일부 UI 요소를 `gluestack-ui` 컴포넌트로 대체하여 통합을 검증합니다.

### 상세 계획

1.  **사전 요구사항 확인:**
    *   현재 `p01_w01-1` 프로젝트의 `react-native`, `expo`, `node` 버전을 확인합니다. `gluestack-ui`의 요구사항(`react-native >= 72.5`, `expo >= 50`, `node > 16`)을 충족하는지 검증합니다.

2.  **`gluestack-ui` 초기화:**
    *   `p01_w01-1` 프로젝트 디렉토리에서 `npx gluestack-ui init` 명령을 실행하여 `GluestackUIProvider`와 필수 구성 요소(아이콘, 오버레이, 토스트)를 프로젝트에 추가합니다. 이 과정에서 필요한 파일이 생성되거나 수정될 수 있습니다.

3.  **`GluestackUIProvider` 통합 확인:**
    *   `gluestack-ui` 문서에 따라 `GluestackUIProvider`가 메인 애플리케이션 구성 요소를 올바르게 감싸고 있는지 확인합니다. `init` 명령이 이를 처리해야 하지만, 확인하는 것이 중요합니다.

4.  **기존 UI 컴포넌트 대체 (예시):**
    *   `App.tsx` 또는 `src/components/SavedFilesList.tsx`와 같은 파일에서 간단한 UI 컴포넌트(예: React Native의 `View` 또는 `Text`)를 `gluestack-ui`의 해당 컴포넌트(`Box` 또는 `Text`)로 대체할 대상을 식별합니다.
    *   선택된 `gluestack-ui` 컴포넌트를 프로젝트에 추가하기 위해 `npx gluestack-ui add [컴포넌트명]` 명령을 실행합니다.
    *   관련 파일을 수정하여 `gluestack-ui` 컴포넌트를 가져와 사용하도록 변경합니다.

5.  **통합 테스트:**
    *   Expo 앱을 실행하여 빌드 및 실행에 오류가 없는지 확인합니다.
    *   `gluestack-ui` 컴포넌트가 화면에 올바르게 렌더링되는지 시각적으로 확인합니다.
