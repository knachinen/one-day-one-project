# 체크리스트

- **환경 설정 및 프로젝트 생성:**
  - Expo CLI 설치 확인 (필요시 설치) - 완료
  - React Native 프로젝트 `p01_w01-1` 생성 - 완료
  - 기본 앱 실행 확인 - 완료
- **UI 구성 (초기):**
  - 웹 주소를 입력할 수 있는 TextInput 컴포넌트를 추가합니다.
  - 무작위 단어 표시 영역 추가 - 완료
  - 글쓰기 입력창 추가 - 완료
  - 저장 버튼 추가 - 완료
- **핵심 기능 구현 (웹 콘텐츠):**
  - 웹 콘텐츠 Fetch 로직 개발 - 완료
  - 무작위 단어 추출 함수 개발 - 완료
  - 무작위 단어 제시 기능 연동 - 완료
- **핵심 기능 구현 (저장):**
  - Markdown 저장 기능 개발 (Expo FileSystem API) - 완료
- **핵심 기능 구현 (탐색/불러오기):**
  - 저장된 파일 목록 표시 기능 개발 - 완료
  - 파일 내용 불러오기 기능 개발 - 완료
- **디자인:**
  - 미니멀리즘 디자인 적용 - 완료

---

- **(추가) makeDirectoryAsync Deprecated 오류 수정:**
  - `p01_w01-1/App.tsx` 파일에서 `loadSavedFiles` 함수 내 `makeDirectoryAsync` 호출 변경 - 완료
  - `p01_w01-1/App.tsx` 파일에서 `handleSave` 함수 내 `makeDirectoryAsync` 호출 변경 - 완료
  - 수정된 코드 및 문서들을 커밋 - 완료

---

- **(추가) `commonWords.txt` 로딩 오류 (`TypeError`, `readAsStringAsync` 경고) 수정:**
  - `p01_w01-1/App.tsx` 파일에서 `Asset.fromModule` 및 `asset.downloadAsync()` 부분을 `Asset.loadAsync`로 변경 - 완료
  - `FileSystem.readAsStringAsync` 호출 시 `localUri`를 직접 사용하도록 변경 - 완료
  - 수정된 코드 및 문서들을 커밋 - 완료

---

- **(추가) 파일 저장 오류 (`TypeError: Cannot read property 'uri' of undefined`) 수정:**
  - 전역 상수 `WRITINGS_DIRECTORY` 제거 - 완료
  - `handleSave` 및 `loadSavedFiles` 함수 내에서 `FileSystem.documentDirectory` 유효성 검사 및 동적으로 `writingsDirUri` 구성 - 완료
  - `handleSave` 함수 내 `FileSystem.Directory` 및 `fileUri` 구성 시 `writingsDirUri` 사용 - 완료
  - `loadSavedFiles` 함수 내 `FileSystem.Directory`, `FileSystem.readDirectoryAsync`, `fileList` 구성 시 `writingsDirUri` 사용 - 완료
  - 수정된 코드 및 문서들을 커밋 - 완료

---

- **(추가) "문서 디렉토리를 찾을 수 없습니다." 오류 수정:**
  - 새로운 `useState` 변수 (`documentDirectoryUri`)를 추가하여 `FileSystem.documentDirectory` 값을 저장 - 완료
  - 컴포넌트가 마운트될 때 `useEffect` 훅 내에서 `FileSystem.documentDirectory` 값을 확인하고 `documentDirectoryUri` 상태 업데이트 - 완료
  - `handleSave` 및 `loadSavedFiles` 함수 내 `FileSystem.documentDirectory` 대신 `documentDirectoryUri` 상태 변수 사용 - 완료
  - `documentDirectoryUri`가 `null`이거나 `undefined`인 경우 오류 메시지 표시 및 함수 실행 중단 처리 - 완료
  - 수정된 코드 및 문서들을 커밋 - 완료

---

- **(추가) `App.tsx` 파일 분할:**
  - 디렉토리 구조 생성 (`src/components`, `src/hooks`, `src/utils`, `src/services`, `src/styles`) - 완료
  - `useFileSystem` Custom Hook 생성 및 관련 로직 이동 (`documentDirectoryUri` 상태 관리, `savedFiles`, `loadSavedFiles`, `handleSave`, `loadFileContent`) - 완료
  - `useWordFetcher` Custom Hook 생성 및 관련 로직 이동 (`webAddress`, `setWebAddress`, `randomWord`, `isLoading`, `fetchRandomWord`, `commonWordsList`) - 완료
  - `CommonWordsService` 유틸리티 함수 분리 및 관련 로직 이동 (`loadCommonWords` 함수) - 완료
  - `SavedFilesList` 컴포넌트 생성 및 관련 UI 이동 (`FlatList`를 사용한 저장된 파일 목록 렌더링) - 완료
  - `App.tsx` 업데이트 (분리된 훅과 컴포넌트 가져와 사용, 관련 `useState`와 `useEffect` 로직 제거) - 완료
  - 스타일 분리 (`styles` 객체를 `src/styles/AppStyles.ts` 파일로 분리) - 완료
  - 수정된 코드 및 문서들을 커밋 - 완료

---

- **(추가) `README.md` 파일 생성:**
  - `README.md` 파일 생성 및 내용 작성 - 완료
