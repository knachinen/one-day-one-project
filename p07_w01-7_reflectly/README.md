# Reflectly - 데일리 성찰 저널

Reflectly는 매일 의미 있는 질문을 통해 자신을 돌아보고 성장의 기록을 남기는 모바일 저널링 앱입니다. React Native와 Expo를 사용하여 개발되었으며, 사용자의 프라이버시를 위해 모든 데이터는 로컬 기기에 안전하게 저장됩니다.

## ✨ 주요 기능

- **일일 성찰 질문**: 매일 3개의 새로운 질문이 제공되어 무엇을 쓸지 고민할 필요가 없습니다.
- **감정 기록**: 오늘의 기분을 이모지로 간단하게 기록하고 추적할 수 있습니다.
- **자동 저장**: 작성 중인 내용은 자동으로 임시 저장되어 데이터 손실을 방지합니다.
- **기록 보관함**: 과거의 모든 기록을 날짜순으로 모아볼 수 있습니다.
- **감정 추이 시각화**: 지난 7일 또는 30일간의 감정 변화를 그래프로 확인할 수 있습니다.
- **일일 알림**: 매일 정해진 시간에 저널링을 잊지 않도록 알림을 받을 수 있습니다.
- **완벽한 프라이버시**: 인터넷 연결 없이도 작동하며, 데이터는 오직 내 폰에만 저장됩니다.

## 🛠 기술 스택

- **Framework**: React Native, Expo (SDK 51+)
- **Language**: TypeScript
- **Database**: SQLite (expo-sqlite)
- **Navigation**: Expo Router (File-based routing)
- **Visualization**: react-native-chart-kit
- **Storage**: AsyncStorage (for drafts), SQLite (for persistent data)

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js (LTS 버전 권장)
- npm 또는 yarn
- iOS Simulator (Mac) 또는 Android Emulator
- Expo Go 앱 (실기기 테스트 시)

### 설치 단계

1. 저장소 클론
   ```bash
   git clone <repository-url>
   cd reflectly
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 앱 실행
   ```bash
   npm run ios     # iOS 시뮬레이터
   npm run android # Android 에뮬레이터
   ```

## 📂 프로젝트 구조

```
reflectly/
├── app/                  # 화면 및 라우팅 (Expo Router)
│   ├── (tabs)/           # 탭 네비게이션 화면 (오늘, 기록, 회고, 설정)
│   ├── journal/          # 저널 상세 화면
│   └── _layout.tsx       # 루트 레이아웃 및 DB 초기화
├── components/           # 재사용 가능한 UI 컴포넌트
├── constants/            # 상수 (색상, 폰트, 질문 데이터)
├── database/             # SQLite 데이터베이스 관련 로직
├── hooks/                # 커스텀 훅 (알림, 자동저장 등)
├── types/                # TypeScript 타입 정의
└── utils/                # 유틸리티 함수 (날짜, 감정 분석 등)
```

## 💾 데이터 모델

### Journal (저널)
- `id`: 고유 ID
- `date`: 날짜 (YYYY-MM-DD)
- `emotionTag`: 감정 태그 (happy, excited, calm, anxious, sad)
- `questions`: 질문 목록 (JSON)
- `answers`: 답변 목록 (JSON)

### Settings (설정)
- `notificationTime`: 알림 시간 (HH:mm)
- `notificationEnabled`: 알림 활성화 여부

## 📝 라이선스

This project is licensed under the MIT License.
