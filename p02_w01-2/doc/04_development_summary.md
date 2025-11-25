# 프로젝트 02 (p02_w01-2) - 리마인더 앱 개발 요약

## 1. 프로젝트 목표
- 사용자 친화적인 리마인더 앱 개발 (생성, 관리, 알림 기능 포함).

## 2. 기술 스택
- **플랫폼:** Android
- **프레임워크:** React Native
- **개발 환경:** Expo
- **네비게이션:** Expo Router (React Navigation 기반)
- **데이터베이스:** Expo SQLite (로컬 데이터 저장)
- **알림:** Expo Notifications (로컬 알림 스케줄링)
- **날짜/시간 선택:** `@react-native-community/datetimepicker`
- **반복 패턴 선택:** `@react-native-picker/picker`
- **UI 애니메이션:** `react-native-reanimated` (간단한 시각적 효과)

## 3. 개발 과정 및 주요 결정 사항

### 3.1. 프로젝트 초기 설정
- `npx create-expo-app`을 사용하여 프로젝트 초기화.
- Git 저장소 초기화는 상위 디렉토리에서 관리되므로 건너뜀.
- `src` 디렉토리 내에 `components`, `screens`, `data`, `services`, `utils`와 같은 표준 React Native 폴더 구조 설정.

### 3.2. 데이터 저장 (SQLite)
- **데이터베이스 선택:** 로컬 데이터 저장을 위해 `expo-sqlite`를 선택. Realm 대신 SQLite를 사용하기로 결정하여 종속성 관리를 단순화.
- **`DatabaseService.ts` 구현:**
    - `initDatabase` 함수를 통해 데이터베이스 초기화 및 `reminders` 테이블 생성 (ID, 제목, 내용, 날짜, 시간, 반복 패턴, 완료 여부).
    - CRUD(생성, 조회, 수정, 삭제) 작업을 위한 `addReminder`, `getReminders`, `updateReminder`, `deleteReminder` 함수 구현.
- **`ReminderModel.ts` 정의:** 리마인더 데이터 구조를 위한 TypeScript 인터페이스 `Reminder` 정의.

### 3.3. 핵심 기능 구현 (리마인더 생성/관리)

#### 3.3.1. 리마인더 생성 화면 (`CreateReminderScreen.tsx`)
- **입력 필드:** 제목(`TextInput`), 내용(`TextInput`).
- **날짜/시간 선택:** `@react-native-community/datetimepicker` 통합.
- **반복 패턴 선택:** `@react-native-picker/picker`를 사용하여 '없음', '매일', '매주', '매월' 옵션 제공.
- **저장 기능:** 헤더의 "Done" 버튼을 통해 `addReminder` 호출 및 데이터베이스에 저장. 성공/실패 시 `Alert` 메시지 표시.

#### 3.3.2. 리마인더 목록 조회 화면 (`ReminderListScreen.tsx`)
- **데이터 로딩:** `useFocusEffect`를 사용하여 화면에 포커스될 때마다 `getReminders`를 통해 리마인더 목록을 가져옴.
- **목록 표시:** `FlatList`를 사용하여 리마인더 목록 렌더링.
- **필터링:** '전체', '보류 중', '완료됨' 필터 옵션 버튼 제공 및 필터링된 데이터 표시. `getReminders` 함수를 확장하여 쿼리 및 매개변수 사용.
- **상세/수정 화면 연결:** `Pressable` 컴포넌트를 사용하여 각 리마인더 항목을 탭하면 `ReminderDetailScreen`으로 이동(`router.push('/detail/${item.id}')`).
- **완료 상태 토글:** 각 리마인더 항목에 '완료'/'미완료' 버튼을 추가하여 `updateReminder`를 통해 상태를 직접 변경할 수 있도록 함.

#### 3.3.3. 리마인더 상세/수정 화면 (`ReminderDetailScreen.tsx`)
- **데이터 로딩:** `useLocalSearchParams`를 통해 `id`를 받아 `getReminders`를 사용하여 특정 리마인더 정보 로딩.
- **수정 기능:** 생성 화면과 유사한 입력 필드 및 선택기를 통해 리마인더 정보 수정. `updateReminder` 호출.
- **삭제 기능:** "Delete Reminder" 버튼을 통해 `deleteReminder` 호출 및 확인 `Alert` 추가.
- **스누즈 기능:** 5분, 10분, 30분 스누즈 옵션 버튼 추가. `scheduleSnoozeNotification` 호출.

### 3.4. 알림 스케줄링 및 발송 (`NotificationService.ts`)
- **권한 요청:** `registerForPushNotificationsAsync` 함수를 통해 `expo-notifications` 권한 요청 및 Android 채널 설정.
- **단일 알림:** `scheduleSingleReminderNotification` 함수를 통해 특정 날짜/시간에 단일 알림 예약. 과거 시간은 예약하지 않도록 처리.
- **반복 알림:** `scheduleRecurringReminderNotification` 함수를 통해 일별, 주별, 월별 반복 알림 예약.
- **알림 취소:** `cancelScheduledReminderNotification` 함수를 통해 `identifier`로 특정 알림 취소.
- **스누즈 알림:** `scheduleSnoozeNotification` 함수를 통해 현재 시간으로부터 일정 시간 후 알림 재예약.

### 3.5. 사용자 인터페이스 (UI/UX) 개선
- **메인 화면 개선:** 리마인더 항목에 `Pressable` 애니메이션(`react-native-reanimated`) 및 완료 상태에 따른 시각적 피드백(borderLeftColor) 추가.
- **완료 목록 화면:** `CompletedRemindersScreen.tsx`를 별도로 구현하여 완료된 리마인더 아카이빙 기능 제공.
- **생성 화면 개선:** "Done" 버튼을 헤더에 통합하여 저장 액션을 명확히 함.
- **애니메이션:** 리마인더 완료 시 `react-native-reanimated`를 이용한 스케일 애니메이션 추가 (눌렀을 때의 피드백).

### 3.6. 네비게이션 (`app/_layout.tsx`)
- **앱 초기화:** `useEffect` 훅을 사용하여 `initDatabase` 및 `registerForPushNotificationsAsync`를 앱 시작 시 호출. 로딩 및 에러 상태 관리.
- **라우팅:** Expo Router의 `Stack` 컴포넌트를 사용하여 `index` (리마인더 목록), `create` (생성), `detail/[id]` (상세/수정), `completed` (완료 목록) 라우트 설정.
- **알림 리스너:** `addNotificationReceivedListener` (앱 포그라운드 시) 및 `addNotificationResponseReceivedListener` (알림 상호작용 시) 설정.

## 4. 향후 개선 사항
- **알림 관리:** 특정 리마인더의 알림(단일/반복/스누즈)을 모두 취소할 수 있는 기능.
- **위치 기반 알림:** (초기 Spec에 있었으나 제외) 위치 기반 알림 기능 구현.
- **UI/UX:** 맞춤형 디자인 시스템 적용 (예: Gluestack UI 또는 UI Kitten).
- **테스트:** 단위 및 통합 테스트 코드 작성.

## 5. 결론
이 프로젝트를 통해 기본적인 React Native, Expo, SQLite, Expo Notifications, Expo Router 기반의 리마인더 앱의 핵심 기능을 구현하고 UI/UX를 개선했습니다.
