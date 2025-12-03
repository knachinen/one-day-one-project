# 마키파이 (Markify)

## 프로젝트 소개

Markify는 웹 콘텐츠(HTML/URL)를 마크다운(Markdown) 형식으로 변환하고, 편집 및 로컬 저장을 지원하는 React Native (Expo) 모바일 애플리케이션입니다. 브라우저의 공유 확장 프로그램 또는 북마클릿을 통해 웹 페이지 콘텐츠를 쉽게 앱으로 가져와 마크다운으로 변환하고 관리할 수 있습니다.

## 주요 기능

*   **HTML/URL을 마크다운으로 변환**: 웹 페이지의 HTML 또는 URL을 마크다운 형식으로 변환합니다.
*   **공유 확장 프로그램 통합**: 다른 앱에서 URL을 Markify 앱으로 직접 공유하여 변환할 수 있습니다.
*   **북마클릿 기능**: 브라우저에서 실행되는 북마클릿을 통해 현재 웹 페이지의 HTML 콘텐츠를 앱으로 전송하여 마크다운으로 변환합니다.
*   **마크다운 에디터**: 변환된 마크다운 콘텐츠를 편집하고 실시간으로 미리보기할 수 있습니다.
*   **마크다운 복사 및 공유**: 편집된 마크다운 콘텐츠를 클립보드에 복사하거나 다른 앱으로 공유할 수 있습니다.
*   **로컬 노트 관리**: 변환 및 편집된 마크다운 노트를 로컬에 저장하고, 목록에서 확인하며 삭제할 수 있습니다. (메인 화면은 '노트' 화면입니다.)
*   **간편한 설정 메뉴**: '노트' 화면과 '에디터' 화면의 상단 내비게이션 바에 메뉴를 통해 '북마클릿 설정' 화면으로 이동할 수 있습니다.

## 기술 스택

*   **프레임워크**: React Native (Expo Managed Workflow)
*   **언어**: TypeScript
*   **내비게이션**: React Navigation
*   **상태 관리**: Zustand (영구 스토리지 포함)
*   **네트워킹**: Axios
*   **마크다운 변환**: Turndown (HTML to Markdown)
*   **아이콘**: Lucide React Native
*   **기타 Expo 모듈**: `expo-clipboard`, `expo-sharing`, `expo-share-intent`, `react-native-markdown-display`

## 설치 및 실행

### 필수 요구 사항

*   Node.js 및 npm/yarn
*   Expo CLI ( `npm install -g expo-cli` 또는 `npx expo` 사용)
*   Android Studio (Android 개발 환경의 경우) 또는 Xcode (iOS 개발 환경의 경우)

### 개발 환경 설정

1.  **종속성 설치**:
    ```bash
    npm install
    # 또는
    yarn install
    ```
2.  **네이티브 프로젝트 파일 생성/업데이트**:
    ```bash
    npx expo prebuild --clean
    ```
3.  **개발 서버 시작**:
    ```bash
    npx expo start
    # 또는
    yarn start
    ```
    Expo 개발 서버가 시작되면, Expo Go 앱을 사용하거나 에뮬레이터/시뮬레이터에서 앱을 실행할 수 있습니다.

### Android 릴리스 빌드 (APK)

1.  **Android 디렉토리로 이동**:
    ```bash
    cd android
    ```
2.  **릴리스 APK 빌드**:
    ```bash
    ./gradlew assembleRelease
    ```
    빌드가 성공하면 `android/app/build/outputs/apk/release/` 경로에서 APK 파일을 찾을 수 있습니다.

## 알려진 문제 및 향후 계획

현재 `turndown` 및 `domino` 라이브러리가 JavaScript 엔진(Hermes 및 JSC)과 호환성 문제를 일으켜 릴리스 빌드 실패(Hermes 사용 시) 및 개발/릴리스 빌드 앱 실행 중 충돌(JSC 사용 시)을 유발하고 있습니다.

*   **현재 해결책**: 개발 빌드에서는 Hermes를 사용하고, 릴리스 빌드에서는 JSC를 사용하도록 `app.config.js`를 통해 조건부로 `jsEngine`을 설정해야 합니다. (이 부분은 아직 구현되지 않았습니다.)
*   **향후 계획**: `turndown` 및 `domino`를 대체할 수 있는 Hermes/JSC 호환 HTML-to-마크다운 변환 라이브러리를 찾아 통합해야 합니다.

---
[README.md (Korean)]