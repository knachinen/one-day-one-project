## 리마인더 앱 개발 체크리스트 (p02_w01-2)

### 1. 프로젝트 초기 설정
   - [x] Expo CLI 설치 확인 (설치되어 있지 않다면 설치).
   - [x] `expo init p02_w01-2-reminder-app` 명령어를 사용하여 새 React Native 프로젝트 생성.
   - [x] 프로젝트 디렉토리로 이동.
   - [x] Git 저장소 초기화 및 `.gitignore` 설정.
   - [x] 필요한 React Native 및 Expo 관련 라이브러리 설치 (예: `expo-notifications`, `expo-sqlite` 또는 `realm`).
   - [x] 기본 폴더 구조 생성 (예: `src/components`, `src/screens`, `src/data`, `src/services`, `src/utils`).

### 2. 데이터 저장 (기반 작업이므로 선행)
   - [x] SQLite 또는 Realm 중 사용할 로컬 데이터베이스 결정. (초기에는 SQLite 사용 고려)
   - [x] 데이터베이스 초기화 및 연결 로직 구현.
   - [x] 리마인더 데이터 모델 정의 (ID, 제목, 내용, 기한(Timestamp), 반복 패턴, 위치 정보(Lat/Lng, 반경), 상태(Pending/Completed)).
   - [x] CRUD(생성, 조회, 수정, 삭제) 작업을 위한 데이터베이스 서비스 함수 구현.

### 3. 핵심 기능 구현 (리마인더 생성/관리)
   - [x] 리마인더 생성 화면 (Create Reminder Screen) 구성.
     - [x] 제목(`TextInput`) 및 내용(`TextInput`) 입력 필드 구현.
     - [x] 날짜/시간 선택기(`DateTimePicker`) 컴포넌트 통합.
     - [x] 반복 패턴 선택 UI 구현을 위한 `@react-native-picker/picker` 라이브러리 설치.
     - [x] `CreateReminderScreen.tsx`에 반복 패턴 선택(`Picker`) 컴포넌트 통합.
     - [x] 리마인더 저장 버튼 및 데이터베이스 연동.
   - [x] 리마인더 목록 조회 화면 (Reminder List Screen) 구성.
     - [x] 저장된 리마인더 목록 표시 UI 구현 (`FlatList` 사용).
     - [x] 각 리마인더 아이템의 UI (제목, 시간, 상태 등) 구현.
     - [x] 활성/완료 상태별 필터링 UI 및 로직 구현.
   - [x] 리마인더 상세/수정 화면 (Reminder Detail/Edit Screen) 구성.
     - [x] 선택된 리마인더의 상세 정보 표시.
     - [x] 리마인더 정보 수정 기능 (제목, 내용, 날짜/시간, 반복 패턴).
     - [x] 리마인더 삭제 기능.

### 4. 알림 스케줄링 및 발송
   - [x] `expo-notifications` 라이브러리 설정 및 권한 요청 로직 구현.
   - [x] 시간 기반 단일 알림 스케줄링 함수 구현.
   - [x] 반복 알림 스케줄링 함수 구현 (일/주/월).
   - [x] 알림 발생 시 로컬 알림 송출 로직 연동.
   - [x] 알림 취소 로직 구현.
   - [x] 스누즈(Snooze) 기능 UI 및 로직 구현 (5분, 10분, 30분 옵션).

### 5. 사용자 인터페이스 (UI/UX) 개선
   - [x] 메인 화면 UI/UX 개선 (현재/예정 리마인더 시각화).
   - [x] 완료 목록 화면 UI/UX 개선 (완료된 리마인더 아카이빙).
   - [x] 새 리마인더 생성 UI/UX 개선 (단계별 흐름 또는 직관적인 단일 화면).
   - [x] 리마인더 완료 시 애니메이션 또는 시각적 효과 추가.

### 6. 테스트 및 디버깅
   - [ ] 각 기능별 유닛 테스트 및 통합 테스트 작성.
   - [ ] 전반적인 앱 동작 테스트 및 버그 수정.

### 7. 문서화
   - [ ] 개발 과정 및 중요한 결정 사항 문서화.
   - [ ] README.md 파일 업데이트.