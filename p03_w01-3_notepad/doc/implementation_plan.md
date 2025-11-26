# MVP 메모장 구현 계획 (현재 상태)

## 목표 설명
React Native와 TypeScript 기반의 MVP 메모장 앱입니다.
기능: CRUD 작업, 로컬 저장소, 다크/라이트 모드, 프리미엄 글래스모피즘 디자인.

## 구현된 변경 사항

### 프로젝트 구조
디렉토리: `/Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad`

#### [App.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad/App.tsx)
- 메인 진입점.
- `notes` 상태 및 `themeMode` 상태 관리.
- 레이아웃 수정을 위한 `SafeAreaProvider` 처리.
- 테마 토글 구현 (☀️/🌙).

#### [src/components/NoteList.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad/src/components/NoteList.tsx)
- 메모 목록 표시.
- 적절한 패딩을 위해 `useSafeAreaInsets` 사용.
- 삭제 확인을 위한 `Alert.alert` 구현.
- 동적 스타일링을 위한 `theme` prop 수신.

#### [src/components/NoteEditor.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad/src/components/NoteEditor.tsx)
- 메모 작성 및 수정 인터페이스.
- 제목 자동 포커스.
- 동적 스타일링을 위한 `theme` prop 수신.

#### [src/utils/storage.ts](file:///Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad/src/utils/storage.ts)
- `saveNotes` / `loadNotes`: AsyncStorage에 메모 저장.
- `saveTheme` / `loadTheme`: 테마 설정 저장.

#### [src/styles/theme.ts](file:///Users/salgu/Workspace/1_project/ritual_code/p03_w01-3_notepad/src/styles/theme.ts)
- `ThemeColors` 인터페이스 정의.
- `THEMES` 내보내기 (다크/라이트).
- 동적 테마 생성을 위한 `createCommonStyles` 내보내기.

## 검증
- [x] Expo에서 앱 실행 (Android/iOS).
- [x] CRUD 작업 동작 확인.
- [x] 재시작 후 데이터 유지 확인.
- [x] 노치 디바이스에서 레이아웃 안전 확인.
- [x] 삭제 확인 기능 동작 확인.
- [x] 다크/라이트 모드 토글 및 유지 확인.
