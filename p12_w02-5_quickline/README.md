# QuickLine 프로젝트 개요

QuickLine은 개인 안전 및 긴급 상황 대응을 위해 설계된 Expo React Native 애플리케이션입니다.

## 1. 프로젝트 목적 및 주요 기술

**목적:** QuickLine은 사용자가 긴급 상황을 빠르고 효율적으로 처리할 수 있도록 돕는 모바일 애플리케이션입니다. 미리 설정된 긴급 연락처로 SMS를 통해 위치를 전송하고 긴급 전화를 걸 수 있는 기능을 제공합니다. 또한, ICE(In Case of Emergency) 연락처 및 의료 프로필을 저장하고 관리하며, 민감한 데이터는 암호화됩니다.

**주요 기술:**

- **프레임워크:** React Native with Expo
- **언어:** TypeScript
- **내비게이션:** React Navigation (`@react-navigation/stack`)
- **상태 관리:** Zustand
- **로컬 저장소:**
  - `expo-sqlite`: 구조화된 데이터 저장 (예: ICE 연락처, 의료 프로필).
  - `@react-native-async-storage/async-storage`: 간단한 키-값 쌍 저장 (예: `hasLaunched` 플래그).
- **위치 서비스:** `expo-location`
- **보안:** `expo-crypto` (의료 프로필 암호화용)
- **UI/UX:** 커스텀 테마 (`src/constants/theme.ts`) 및 구조화된 컴포넌트 아키텍처 활용.

## 2. 아키텍처 및 주요 기능

이 애플리케이션은 표준 React Native 아키텍처를 따르며, 컴포넌트, 훅, 전역 상태 관리를 위한 전용 스토어를 활용합니다.

**구현된 주요 기능:**

- **긴급 버튼:** 메인 화면에 긴급 작업을 시작하기 위한 눈에 띄는 버튼.
- **위치 추적:** 사용자 현재 위치를 수집하여 긴급 연락처와 공유.
- **SMS 전송:** 위치 정보를 포함한 사전 정의된 긴급 메시지를 ICE 연락처로 전송.
- **긴급 전화:** 긴급 서비스 (예: 112/119)로 직접 연결.
- **온보딩 흐름:** 새 사용자가 권한을 포함한 초기 설정을 완료하도록 안내.
- **ICE 연락처 관리:** 사용자가 SQLite에 안전하게 저장된 긴급 연락처를 추가, 편집, 삭제할 수 있도록 허용.
- **의료 프로필:** `expo-crypto`로 암호화되고 SQLite에 저장되는 중요한 의료 정보 저장.
- **사용자 인터페이스:** 메인 작업, 연락처 관리, 의료 프로필 설정 및 온보딩 화면을 포함하는 직관적인 UI.

## 3. 빌드 및 실행

이 프로젝트는 Expo를 사용하여 빌드 및 실행 과정을 간소화합니다.

**사전 요구 사항:**

- Node.js 및 npm/yarn
- Expo CLI (`npm install -g expo-cli` 또는 `yarn global add expo-cli`)

**명령어:**

- **종속성 설치:**

  ```bash
  npm install
  # 또는
  yarn install
  ```

- **개발 서버 시작:**

  ```bash
  npm start
  # 또는
  yarn start
  ```

  이 명령어는 브라우저에서 Expo Developer Tools를 엽니다. 여기서 다음을 수행할 수 있습니다:

  - Android 에뮬레이터/기기에서 실행 (`a`)
  - iOS 시뮬레이터/기기에서 실행 (`i`)
  - 웹 브라우저에서 실행 (`w`)

- **Android에서 실행:**

  ```bash
  npm run android
  # 또는
  yarn android
  ```

- **iOS에서 실행:**

  ```bash
  npm run ios
  # 또는
  yarn ios
  ```

- **웹 브라우저에서 실행:**

  ```bash
  npm run web
  # 또는
  yarn web
  ```
