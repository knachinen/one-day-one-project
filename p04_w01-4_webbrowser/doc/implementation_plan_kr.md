# 모바일 웹 브라우저 - React Native + Expo

React Native, Expo, TypeScript로 구축된 세련되고 현대적인 모바일 웹 브라우저입니다. 탭 관리, 북마크, 방문 기록 추적, 그리고 전체 WebView 기능을 갖춘 프리미엄 사용자 인터페이스를 특징으로 합니다.

## 구현 접근 방식

**TypeScript**와 모든 기능을 갖춘 `react-native-webview` 구현을 사용합니다. 이는 개발 빌드(Expo Go와 호환되지 않음)가 필요합니다.

## 제안된 변경 사항

### 핵심 종속성

#### [수정] [package.json](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/package.json)
필수 종속성 추가:
- `react-native-webview` - 웹 페이지 렌더링용
- `@react-navigation/native` - 네비게이션 프레임워크
- `@react-navigation/bottom-tabs` - 하단 탭 네비게이션
- `@expo/vector-icons` - 아이콘 라이브러리
- `react-native-safe-area-context` - 안전 영역 처리
- `react-native-screens` - 네이티브 화면 최적화
- `@react-native-async-storage/async-storage` - 북마크/방문 기록을 위한 영구 저장소

---

### 프로젝트 구조

#### [신규] [src/](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/)
체계적인 소스 디렉토리 구조 생성:
- `components/` - 재사용 가능한 UI 컴포넌트
- `screens/` - 메인 화면 컴포넌트
- `utils/` - 유틸리티 함수 및 헬퍼
- `constants/` - 테마, 색상 및 상수

---

### 테마 및 디자인 시스템

#### [신규] [theme.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/constants/theme.js)
현대적이고 세련된 디자인 시스템:
- **색상 팔레트**: 프리미엄 그라디언트 색상 (보라/파랑 테마)
- **타이포그래피**: 사용자 정의 글꼴 크기 및 두께
- **간격**: 일관된 간격 스케일
- **그림자**: 입체적인 카드 효과
- **다크 모드**: 부드러운 전환이 있는 전체 다크 모드 지원

---

### 핵심 컴포넌트

#### [신규] [BrowserTab.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/BrowserTab.js)
WebView 래퍼 컴포넌트:
- URL 로딩 및 네비게이션
- 진행 표시기
- 오류 처리
- JavaScript 주입 지원

#### [신규] [URLBar.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/URLBar.js)
세련된 URL 입력 바:
- 자동 완성 제안
- 검색/URL 감지
- 보안 연결 표시기
- 부드러운 애니메이션

#### [신규] [NavigationControls.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/NavigationControls.js)
브라우저 네비게이션 컨트롤:
- 상태 관리가 포함된 뒤로/앞으로 버튼
- 로딩 애니메이션이 있는 새로고침 버튼
- 홈 버튼
- 탭 전환 버튼

#### [신규] [TabSwitcher.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/TabSwitcher.js)
아름다운 탭 관리 UI:
- 열린 탭의 그리드 레이아웃
- 탭 미리보기 썸네일
- 스와이프로 닫기 애니메이션
- 플로팅 액션이 있는 새 탭 버튼

#### [신규] [BookmarkItem.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/BookmarkItem.js)
북마크 목록 아이템:
- 파비콘 표시
- 제목 및 URL
- 스와이프 액션 (편집/삭제)
- 길게 누르기 메뉴

---

### 메인 화면

#### [신규] [BrowserScreen.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/BrowserScreen.js)
메인 브라우저 인터페이스:
- WebView 통합
- 상단 URL 바
- 하단 네비게이션 컨트롤
- 탭 관리
- 부드러운 페이지 전환

#### [신규] [BookmarksScreen.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/BookmarksScreen.js)
북마크 관리자:
- 저장된 북마크 목록
- 검색 기능
- 폴더 정리
- 추가/편집/삭제 작업

#### [신규] [HistoryScreen.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/HistoryScreen.js)
방문 기록:
- 시간순 목록
- 날짜별 그룹화
- 방문 기록 검색
- 방문 기록 지우기 옵션

#### [신규] [SettingsScreen.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/SettingsScreen.js)
앱 설정:
- 기본 검색 엔진
- 개인정보 설정
- 캐시/쿠키 지우기
- 다크 모드 토글
- 정보 섹션

---

### 데이터 관리

#### [신규] [storage.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/utils/storage.js)
AsyncStorage 래퍼:
- 북마크 영구 저장
- 방문 기록 추적
- 설정 저장
- 탭 상태 복원

#### [신규] [urlUtils.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/utils/urlUtils.js)
URL 처리 유틸리티:
- URL 유효성 검사
- 검색 쿼리 감지
- 프로토콜 처리
- 도메인 추출

---

### 메인 앱

#### [수정] [App.js](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/App.js)
루트 컴포넌트 설정:
- 네비게이션 컨테이너
- 하단 탭 네비게이터
- 테마 제공자
- 초기 상태 로딩

#### [신규] [README.md](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/README.md)
프로젝트 문서:
- 기능 개요
- 설치 지침
- 앱 실행 방법
- 프로덕션 빌드

## 검증 계획

### 자동화 테스트
이 MVP에는 자동화 테스트가 작성되지 않습니다. 수동 검증에 중점을 둡니다.

### 수동 검증

1. **설치 및 실행**
   ```bash
   cd /Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser
   npm install
   npx expo start
   ```
   - Expo Go 앱으로 QR 코드 스캔
   - 오류 없이 앱 로드 확인

2. **브라우저 기능**
   - URL 입력 (예: `https://www.google.com`) 및 페이지 로드 확인
   - 뒤로/앞으로 네비게이션 버튼 테스트
   - 새로고침 기능 테스트
   - URL 바 업데이트 확인

3. **탭 관리**
   - 여러 탭 열기
   - 탭 간 전환
   - 탭 닫기
   - 탭 상태 유지 확인

4. **북마크**
   - 현재 페이지에서 북마크 추가
   - 북마크 화면으로 이동
   - 북마크 열기
   - 북마크 삭제
   - 앱 재시작 후 북마크 유지 확인

5. **방문 기록**
   - 여러 페이지 탐색
   - 방문 기록 화면에 방문한 페이지 표시 확인
   - 방문 기록 지우기
   - 방문 기록 삭제 확인

6. **UI/UX**
   - 부드러운 애니메이션 확인
   - 다크 모드 토글 테스트
   - 반응형 레이아웃 확인
   - 프리미엄 디자인 미학 확인

7. **설정**
   - 다크 모드 토글
   - 기본 검색 엔진 변경
   - 캐시/쿠키 지우기
   - 설정 유지 확인
