# LexiClock 프로젝트 개요

LexiClock은 React Native와 Expo를 사용하여 구축된 미니멀리스트 시계 애플리케이션입니다. 주요 기능은 시간, 분, 초를 사용자 정의된 영숫자 표현으로 변환하는 독특한 시간 표시 시스템입니다.

## 주요 기능:
- **독특한 시간 표시:** 시간은 단일 대문자(A-X)로 표시되며, 분과 초는 소문자를 사용하는 두 자리 Base-26 시스템(예: 00 -> "aa", 59 -> "ch")으로 변환됩니다.
- **미니멀리스트 UI:** 네온 스타일의 시각 효과가 있는 어두운 테마를 특징으로 합니다.
- **디코딩 기능:** 사용자는 더블 탭 제스처 또는 전용 버튼을 통해 표준 디지털 시간을 일시적으로 표시할 수 있습니다.
- **사용자 정의:** 12시간 또는 24시간 형식 간 전환을 허용합니다.

## 사용 기술:
- **React Native:** 모바일 애플리케이션 구축을 위한 프레임워크.
- **Expo:** 개발을 단순화하는 유니버설 React 애플리케이션을 위한 프레임워크 및 플랫폼.
- **TypeScript:** 타입이 안전한 JavaScript를 위한 언어.
- **Zustand:** React를 위한 작고 빠르며 확장 가능한 상태 관리 솔루션.
- **`react-native-reanimated` 및 `expo-linear-gradient`:** 부드러운 애니메이션 및 UI 효과를 위한 라이브러리.

## 프로젝트 구조:
프로젝트는 `doc/implementation_plan.md`에 설명된 대로 TypeScript와 함께 표준 Expo Managed Workflow 구조를 따릅니다:
- `/src/assets`: 폰트, 이미지
- `/src/components`: 재사용 가능한 UI 구성 요소 (예: `AnimatedClockChar`, `ClockText`, `SettingsModal`)
- `/src/constants`: 색상, 테마, 폰트
- `/src/hooks`: 사용자 정의 훅 (예: `useTime`)
- `/src/screens`: 주요 애플리케이션 화면 (예: `MainScreen`)
- `/src/store`: 앱 상태를 위한 Zustand 스토어 (예: `useStore`)
- `/src/utils`: 시간 변환 로직을 포함한 유틸리티 함수 (예: `time.ts`)

## 프로젝트 빌드 및 실행

LexiClock 애플리케이션을 실행하려면 다음 `npm` 스크립트를 사용하십시오:

- **`npm start`**: Expo 개발 서버를 시작합니다.
- **`npm run android`**: Android 기기 또는 에뮬레이터에서 새 Expo Go 앱으로 프로젝트를 엽니다.
- **`npm run ios`**: iOS 기기 또는 시뮬레이터에서 새 Expo Go 앱으로 프로젝트를 엽니다.
- **`npm run web`**: 웹 브라우저에서 프로젝트를 엽니다.

## 개발 규칙

- **언어:** 모든 JavaScript 코드에는 TypeScript가 엄격하게 사용됩니다.
- **상태 관리:** Zustand는 `AsyncStorage`에서 처리되는 영속성과 함께 애플리케이션 상태 관리에 사용됩니다.
- **스타일링:** `react-native`의 `StyleSheet`가 구성 요소별 스타일링에 사용되며, 종종 배경 효과를 위해 `expo-linear-gradient`를 통합합니다.
- **테스트:** Jest는 특히 `src/utils/time.ts`의 핵심 시간 변환 로직에 대한 단위 테스트를 위해 구성됩니다.
- **코드 포맷팅:** 별도의 구성 파일로 명시적으로 정의되지는 않았지만, 표준 TypeScript 및 React Native 모범 사례가 따릅니다.

## 핵심 로직: 시간 변환 (`src/utils/time.ts`)

`src/utils/time.ts` 파일에는 표준 시간을 LexiClock의 고유한 형식으로 변환하는 핵심 로직이 포함되어 있습니다:

-   `getHourChar(hour: number)`: 시간을 (0-23) 단일 대문자(A-X)로 변환합니다.
-   `getBase26(val: number)`: 숫자를 (0-59) 소문자를 사용하는 두 자리 Base-26 문자열로 변환합니다.
-   `formatTime(date: Date, is24Hour: boolean)`: 주어진 `Date` 객체에 대한 전체 LexiClock 표시를 제공하기 위해 위의 함수들을 조정하며, `is24Hour` 설정을 존중합니다.
