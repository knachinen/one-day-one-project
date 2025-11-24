# 체크리스트

*   **환경 설정 및 프로젝트 생성:**
    *   Expo CLI 설치 확인 (필요시 설치) - 완료
    *   React Native 프로젝트 `p01_w01-1` 생성 - 완료
    *   기본 앱 실행 확인 - 완료
*   **UI 구성 (초기):**
    *   웹 주소 입력창 추가 - 완료
    *   무작위 단어 표시 영역 추가 - 완료
    *   글쓰기 입력창 추가 - 완료
    *   저장 버튼 추가 - 완료
*   **핵심 기능 구현 (웹 콘텐츠):**
    *   웹 콘텐츠 Fetch 로직 개발 - 완료
    *   무작위 단어 추출 함수 개발 - 완료
    *   무작위 단어 제시 기능 연동 - 완료
*   **핵심 기능 구현 (저장):**
    *   Markdown 저장 기능 개발 (Expo FileSystem API) - 완료
*   **핵심 기능 구현 (탐색/불러오기):**
    *   저장된 파일 목록 표시 기능 개발 - 완료
    *   파일 내용 불러오기 기능 개발 - 완료
*   **디자인:**
    *   미니멀리즘 디자인 적용 - 완료

---

*   **(추가) makeDirectoryAsync Deprecated 오류 수정:**
    *   `p01_w01-1/App.tsx` 파일에서 `loadSavedFiles` 함수 내 `makeDirectoryAsync` 호출 변경 - 완료
    *   `p01_w01-1/App.tsx` 파일에서 `handleSave` 함수 내 `makeDirectoryAsync` 호출 변경 - 완료
    *   수정된 코드 및 문서들을 커밋 - 완료

---

*   **(추가) `commonWords.txt` 로딩 오류 (`TypeError`, `readAsStringAsync` 경고) 수정:**
    *   `p01_w01-1/App.tsx` 파일에서 `Asset.fromModule` 및 `asset.downloadAsync()` 부분을 `Asset.loadAsync`로 변경 - 완료
    *   `FileSystem.readAsStringAsync` 호출 시 `localUri`를 직접 사용하도록 변경 - 완료
    *   수정된 코드 및 문서들을 커밋 - 완료

---

*   **(추가) 파일 저장 오류 (`TypeError: Cannot read property 'uri' of undefined`) 수정:**
    *   전역 상수 `WRITINGS_DIRECTORY` 제거 - 완료
    *   `handleSave` 및 `loadSavedFiles` 함수 내에서 `FileSystem.documentDirectory` 유효성 검사 및 동적으로 `writingsDirUri` 구성 - 완료
    *   `handleSave` 함수 내 `FileSystem.Directory` 및 `fileUri` 구성 시 `writingsDirUri` 사용 - 완료
    *   `loadSavedFiles` 함수 내 `FileSystem.Directory`, `FileSystem.readDirectoryAsync`, `fileList` 구성 시 `writingsDirUri` 사용 - 완료
    *   수정된 코드 및 문서들을 커밋 - 미완료
