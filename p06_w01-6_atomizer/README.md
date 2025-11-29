# ⚛️ Atomizer

**Atomizer**는 큰 목표를 10초 단위의 원자적 행동(Atomic Action)으로 쪼개어 실행할 수 있도록 돕는 React Native 기반의 생산성 앱입니다.

<p align="center">
  <img src="https://via.placeholder.com/300x600?text=Atomizer+App" alt="Atomizer App Screenshot" width="300" />
</p>

## ✨ 주요 기능

- **🎯 목표 설정**: 달성하고 싶은 큰 목표를 설정하고 관리합니다.
- **⚡️ 원자 행동 생성**: 목표를 이루기 위한 '지금 당장 할 수 있는' 10초 단위의 행동을 만듭니다.
- **⏱ 10초 타이머**: 행동을 시작할 때 10초 타이머가 작동하여 즉각적인 실행을 유도합니다.
- **🔔 로컬 알림**: 설정한 시간에 행동을 상기시켜주는 알림을 받습니다.
- **🔒 프라이버시 중심**: 모든 데이터는 기기 내부에만 저장됩니다 (Realm Database).

## 🛠 기술 스택

- **Framework**: React Native (0.73+)
- **Language**: TypeScript
- **Database**: Realm (@realm/react)
- **State Management**: Custom Hooks (Business Logic Separation)
- **Navigation**: React Navigation
- **Notifications**: Notifee
- **UI/UX**: Custom Components, Haptic Feedback

## 🚀 시작하기

설치 및 실행 방법은 [INSTALL.md](./INSTALL.md)를 참고하세요.

## 📂 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트 (Button, Input, Timer 등)
├── screens/        # 화면 컴포넌트 (GoalInput, ActionCreate, Main)
├── navigation/     # 네비게이션 설정
├── hooks/          # 커스텀 훅 (비즈니스 로직, 데이터 접근)
├── models/         # Realm 데이터 모델 스키마
├── services/       # 외부 서비스 연동 (Realm, Notification)
└── constants/      # 상수 값 (Colors, Typography)
```

## 📝 라이선스

This project is licensed under the MIT License.
