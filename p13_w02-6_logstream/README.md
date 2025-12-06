# 📱 LogStream (로그 스트림)

## 프로젝트 소개

LogStream은 안드로이드 애플리케이션 개발자를 위한 실시간 Logcat 스트리밍 및 분석 도구입니다. 모바일 환경에 최적화된 사용자 인터페이스를 통해 기기에서 발생하는 로그를 실시간으로 확인하고, 필터링하며, 검색 및 분석할 수 있도록 설계되었습니다. 현장에서 빠르고 효율적인 디버깅을 가능하게 하는 것을 목표로 합니다.

## 주요 기능 (MVP)

*   **실시간 로그 스트리밍:** 네이티브 모듈을 통해 안드로이드 Logcat 데이터를 실시간으로 캡처하여 React Native 앱으로 스트리밍합니다.
*   **권한 관리:** `android.permission.READ_LOGS` 권한 부여를 위한 ADB 명령어 안내 기능을 제공합니다.
*   **로그 버퍼 선택:** `main`, `events`, `radio` 등 다양한 로그 버퍼를 선택하여 스트리밍할 수 있습니다.
*   **스트리밍 제어:** 로그 캡처 시작 및 중지 기능을 제공합니다.
*   **로그 필터링:**
    *   로그 레벨별 필터링 (Verbose, Debug, Info, Warning, Error, Fatal).
    *   로그 태그별 필터링.
    *   로그 메시지 내용 내 텍스트 검색.
*   **사용자 인터페이스:**
    *   가독성을 높이기 위한 색상 코드 적용 (로그 레벨별).
    *   사용자가 수동으로 스크롤하지 않을 경우 자동으로 최신 로그로 이동하는 기능 (현재 비활성화됨).
    *   수동 스크롤 시 자동 스크롤 일시 중지 기능.
    *   방대한 로그 데이터 처리 성능 최적화 (`FlashList` 사용).
    *   화면 하단으로 스크롤하는 플로팅 버튼 제공.
*   **데이터 영속성 및 공유:**
    *   캡처된 로그를 로컬 저장소에 `.txt` 파일로 저장.
    *   저장된 로그 파일을 모바일 공유 시트를 통해 공유.

## 사용 기술

*   **프레임워크:** React Native (Expo)
*   **언어:** TypeScript
*   **상태 관리:** Zustand
*   **내비게이션:** React Navigation
*   **UI 컴포넌트:** `@shopify/flash-list` (고성능 리스트 렌더링)
*   **네이티브 연동:** 커스텀 네이티브 모듈 (Java/Kotlin)
*   **파일 시스템:** Expo FileSystem, Expo Sharing

## 시작하기

### 1. 의존성 설치

프로젝트 루트에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다.

```bash
npm install
# 또는
yarn install
```

### 2. 개발 서버 시작

```bash
npm start
# 또는
yarn start
```

### 3. 애플리케이션 실행

*   **안드로이드:**
    ```bash
    npm run android
    # 또는
    yarn android
    ```
    *참고: MVP는 주로 안드로이드를 대상으로 합니다.*

*   **iOS:**
    ```bash
    npm run ios
    # 또는
    yarn ios
    ```

*   **웹:**
    ```bash
    npm run web
    # 또는
    yarn web
    ```

## 권한 설정 (안드로이드)

LogStream 앱은 기기의 Logcat 데이터를 읽기 위해 특별한 권한이 필요합니다. 앱을 실행하기 전에 PC에 연결된 상태에서 다음 ADB 명령어를 실행하여 권한을 부여해야 합니다.

```bash
adb shell pm grant com.logstream.app android.permission.READ_LOGS
```

## 개발 컨벤션

*   **TypeScript:** 프로젝트 전체에서 TypeScript를 사용합니다.
*   **모듈 구조:** `hooks`, `navigation`, `screens`, `store`, `utils` 디렉토리를 통해 명확하게 모듈을 분리합니다.
*   **성능:** 대량의 데이터를 리스트로 표시하는 경우 성능을 최우선으로 고려합니다.
*   **상태 관리:** Zustand를 사용하여 전역 상태를 관리합니다.
*   **네이티브 모듈:** 플랫폼별 기능 구현을 위해 네이티브 모듈을 개발합니다.

## 라이선스

[라이선스 정보 (예: MIT License)]
