# Atomizer MVP Walkthrough

## 1. 프로젝트 개요
Atomizer는 큰 목표를 10초 단위의 작은 행동으로 쪼개어 실행할 수 있도록 돕는 생산성 앱입니다.
이 MVP 버전은 핵심 기능인 목표 설정, 원자 행동 생성, 10초 타이머, 그리고 로컬 알림 기능을 포함하고 있습니다.

## 2. 구현된 기능
- **목표 관리**: 큰 목표를 입력하고 Realm 데이터베이스에 저장합니다.
- **원자 행동 관리**: 목표를 달성하기 위한 10초 단위 행동을 생성하고 관리합니다.
- **10초 타이머**: 행동 실행을 위한 10초 타이머를 제공하며, 시각적/청각적 피드백을 줍니다.
- **로컬 알림**: 행동 실행 시간을 리마인드해주는 로컬 푸시 알림을 제공합니다.
- **데이터 지속성**: Realm과 AsyncStorage를 사용하여 앱을 껐다 켜도 데이터가 유지됩니다.

## 3. 실행 방법

### 필수 요구사항
- Node.js
- npm 또는 yarn
- CocoaPods (iOS)
- Android Studio / Xcode

### 설치 및 실행
1. 의존성 설치:
   ```bash
   npm install
   ```

2. iOS 실행 (Mac Only):
   ```bash
   npx expo run:ios
   ```

3. Android 실행:
   ```bash
   npx expo run:android
   ```

**주의**: 이 앱은 Realm과 Notifee 같은 네이티브 모듈을 사용하므로 **Expo Go**에서는 실행되지 않습니다. 반드시 `run:ios` 또는 `run:android`를 통해 Development Build를 생성하여 실행해야 합니다.

## 4. 검증 결과
- **정적 분석**: TypeScript 컴파일러(`tsc`)를 통과하여 타입 안정성을 확인했습니다.
- **코드 구조**: 비즈니스 로직을 커스텀 훅(`useGoalLogic`, `useActionLogic`)으로 분리하여 유지보수성을 높였습니다.
- **네비게이션**: 앱의 상태(목표 유무, 행동 유무)에 따라 적절한 화면으로 자동 라우팅됩니다.

## 5. 주요 화면 스크린샷 (예상)
*(실제 기기 실행 후 스크린샷을 여기에 추가할 수 있습니다)*

- **GoalInputScreen**: 깔끔한 목표 입력 UI
- **ActionCreateScreen**: 행동 입력 및 시간 설정 모달
- **MainScreen**: 10초 타이머와 집중 모드 UI
