# 계획

1.  **React Native/Expo 프로젝트 초기 설정:**
    *   Expo CLI를 사용하여 새로운 React Native 프로젝트를 생성합니다. 프로젝트 이름을 'p01_w01-1'로 설정합니다.
    *   기본 설정을 확인하고 앱이 정상적으로 실행되는지 테스트합니다.
2.  **기본 UI 구성:**
    *   웹 주소를 입력할 수 있는 TextInput 컴포넌트를 추가합니다.
    *   무작위 단어를 표시할 Text 컴포넌트를 추가합니다.
    *   글쓰기 입력창 (TextInput) 컴포넌트를 추가합니다.
    *   저장 버튼을 추가합니다.
3.  **웹 콘텐츠 가져오기 기능 구현:**
    *   입력된 웹 주소에서 텍스트 콘텐츠를 비동기적으로 가져오는 로직을 구현합니다.
    *   가져온 텍스트에서 무작위 단어를 추출하는 함수를 작성합니다.
    *   무작위 단어 제시 기능을 구현하고 화면에 표시합니다.
4.  **글쓰기 및 마크다운 저장 기능 구현:**
    *   사용자가 입력창에 글을 작성할 수 있도록 합니다.
    *   작성된 글을 `.md` 형식으로 저장하는 기능을 구현합니다. (Expo FileSystem API 활용)
5.  **파일 탐색 및 불러오기 기능 구현:**
    *   저장된 마크다운 파일을 목록으로 보여주는 기능을 구현합니다.
    *   목록에서 파일을 선택하여 내용을 불러와 글쓰기 입력창에 표시하는 기능을 구현합니다.
6.  **미니멀리즘 디자인 적용:**
    *   전체적인 UI/UX를 미니멀리즘 원칙에 따라 디자인합니다.

## (추가) makeDirectoryAsync Deprecated 오류 수정 계획

### 목표
`p01_w01-1/App.tsx` 파일 내에서 더 이상 사용되지 않는 `expo-file-system`의 `makeDirectoryAsync` 메서드를 새로운 `FileSystem.Directory` API로 교체하여 "저장된 파일 목록 가져오기 실패: [Error: Method makeDirectoryAsync imported from \"expo-file-system\" is deprecated." 오류를 해결합니다.

### 세부 계획
1.  `p01_w01-1/App.tsx` 파일 내에서 `FileSystem.makeDirectoryAsync(WRITINGS_DIRECTORY, { intermediates: true });` 코드가 사용된 두 곳(`loadSavedFiles` 함수와 `handleSave` 함수)을 식별합니다.
2.  각각의 `makeDirectoryAsync` 호출을 다음과 같이 변경합니다:
    ```typescript
    const writingsDirectory = new FileSystem.Directory(FileSystem.documentDirectory, 'writings');
    await writingsDirectory.create();
    ```
    이 변경은 `WRITINGS_DIRECTORY`에 해당하는 디렉토리가 없으면 생성하고, 이미 존재하면 아무 작업도 하지 않도록 합니다.

## (추가) `commonWords.txt` 로딩 오류 (`TypeError`, `readAsStringAsync` 경고) 수정 계획

### 목표
`p01_w01-1/App.tsx` 파일 내 `loadCommonWords` 함수에서 발생하는 `TypeError: Cannot read property 'uri' of undefined` 오류 및 `readAsStringAsync` 경고를 해결하고 `commonWords.txt` 파일을 안정적으로 로드합니다.

### 세부 계획
1.  `p01_w01-1/App.tsx` 파일의 `loadCommonWords` 함수 내에서 `Asset.fromModule(require('./commonWords.txt'))` 및 `await asset.downloadAsync()` 부분을 `const [{ localUri }] = await Asset.loadAsync(require('./commonWords.txt'));` 로 변경합니다.
2.  `FileSystem.readAsStringAsync` 호출 시 `localUri`를 직접 사용하도록 변경합니다: `const text = await FileSystem.readAsStringAsync(localUri);`

## (추가) 파일 저장 오류 (`TypeError: Cannot read property 'uri' of undefined`) 수정 계획

### 목표
`p01_w01-1/App.tsx` 파일 내 `handleSave` 함수에서 발생하는 `TypeError: Cannot read property 'uri' of undefined` 오류를 해결하여 파일 저장 기능을 정상화합니다. 이 오류는 `FileSystem.documentDirectory`가 예상치 못하게 `undefined`일 때 발생하는 것으로 보입니다.

### 세부 계획
1.  **`WRITINGS_DIRECTORY` 정의 방식 변경:**
    *   현재 전역 상수로 정의된 `WRITINGS_DIRECTORY`를 제거합니다.
    *   `handleSave` 함수와 `loadSavedFiles` 함수 내에서 `FileSystem.documentDirectory`가 사용 가능할 때 동적으로 `writingsDirUri`를 구성합니다.
2.  **`handleSave` 함수 수정:**
    *   `handleSave` 함수 시작 부분에서 `FileSystem.documentDirectory`가 유효한지 확인하고, 유효하지 않을 경우 경고 메시지를 표시하고 함수 실행을 중단합니다.
    *   `const writingsDirUri = FileSystem.documentDirectory + 'writings/';`와 같이 `writingsDirUri`를 구성합니다.
    *   `FileSystem.Directory`를 사용하여 디렉토리를 생성할 때도 이 `writingsDirUri`를 기반으로 `Directory` 인스턴스를 생성합니다. (예: `const writingsDirectory = new FileSystem.Directory(FileSystem.documentDirectory, 'writings');`)
    *   `fileUri`를 구성할 때 `writingsDirUri + filename`을 사용합니다.
3.  **`loadSavedFiles` 함수 수정:**
    *   `loadSavedFiles` 함수 시작 부분에서 `FileSystem.documentDirectory`가 유효한지 확인하고, 유효하지 않을 경우 경고 메시지를 표시하고 함수 실행을 중단합니다.
    *   `const writingsDirUri = FileSystem.documentDirectory + 'writings/';`와 같이 `writingsDirUri`를 구성합니다.
    *   `FileSystem.Directory`를 사용하여 디렉토리를 생성할 때도 이 `writingsDirUri`를 기반으로 `Directory` 인스턴스를 생성합니다.
    *   `FileSystem.readDirectoryAsync` 및 `fileList` 구성 시 `writingsDirUri`를 사용합니다.
