# 📝 MVP Notepad (React Native + TypeScript)

심플하고 모던한 디자인의 MVP 메모장 애플리케이션입니다. React Native (Expo)와 TypeScript를 사용하여 개발되었으며, 글래스모피즘(Glassmorphism) 디자인과 다크/라이트 모드를 지원합니다.

## ✨ 주요 기능

-   **메모 관리 (CRUD)**: 메모 작성, 조회, 수정, 삭제 기능.
-   **데이터 영구 저장**: `AsyncStorage`를 사용하여 앱을 재시작해도 데이터가 유지됩니다.
-   **다크/라이트 모드**: 사용자의 취향에 따라 테마를 전환할 수 있습니다 (설정 자동 저장).
-   **프리미엄 디자인**: 글래스모피즘 효과와 부드러운 인터랙션을 적용했습니다.
-   **안전한 레이아웃**: 노치 디자인이 있는 최신 기기에서도 완벽하게 동작합니다 (`SafeArea` 지원).
-   **삭제 방지**: 실수로 메모를 삭제하지 않도록 확인 알림을 제공합니다.

## 🛠️ 기술 스택

-   **Framework**: React Native (Expo SDK 54)
-   **Language**: TypeScript
-   **Storage**: @react-native-async-storage/async-storage
-   **Styling**: StyleSheet, React Native Safe Area Context

## 🚀 실행 방법

### 1. 프로젝트 클론 및 이동
```bash
git clone <repository-url>
cd p03_w01-3_notepad
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 앱 실행
```bash
npx expo start
```
-   **iOS 시뮬레이터**: 터미널에서 `i` 입력
-   **Android 에뮬레이터**: 터미널에서 `a` 입력
-   **실물 디바이스**: Expo Go 앱으로 QR 코드 스캔

## 📂 프로젝트 구조

```
p03_w01-3_notepad/
├── App.tsx                 # 메인 진입점 및 상태 관리
├── src/
│   ├── components/         # UI 컴포넌트
│   │   ├── NoteList.tsx    # 메모 목록
│   │   └── NoteEditor.tsx  # 메모 작성/수정 에디터
│   ├── styles/             # 스타일 정의
│   │   └── theme.ts        # 테마(다크/라이트) 및 공통 스타일
│   └── utils/              # 유틸리티 함수
│       └── storage.ts      # 데이터 저장 로직 (AsyncStorage)
├── assets/                 # 이미지 및 아이콘 리소스
└── package.json            # 프로젝트 설정 및 의존성
```

## 📝 라이선스

This project is licensed under the MIT License.
