# Plain PDF (미니멀 PDF)

Plain PDF는 React Native와 Expo를 사용하여 개발된 미니멀한 디자인의 PDF 뷰어 및 주석 도구입니다. 사용자는 PDF 문서를 불러와 하이라이트, 필기, 텍스트 메모를 추가할 수 있으며, 모든 데이터는 로컬 데이터베이스에 안전하게 저장됩니다.

## ✨ 주요 기능

- **PDF 뷰어**: `react-native-pdf`를 활용한 고성능 네이티브 PDF 렌더링.
- **주석 도구**:
  - **하이라이트**: 드래그하여 텍스트 강조 (형광펜 효과).
  - **자유 필기**: 펜 도구를 사용한 자유로운 드로잉.
  - **텍스트 메모**: 원하는 위치에 텍스트 노트 추가.
- **데이터 영속성**: `expo-sqlite`를 사용하여 주석 데이터를 기기에 로컬 저장. 앱을 재시작해도 주석이 유지됩니다.
- **커스텀 페이징**: 주석 레이어와 PDF 페이지의 정확한 동기화를 위한 커스텀 페이징 시스템 구현.

## 🛠 기술 스택

- **Framework**: React Native, Expo (Managed Workflow)
- **Language**: TypeScript
- **PDF Rendering**: react-native-pdf
- **Graphics**: react-native-svg
- **Database**: expo-sqlite
- **File System**: expo-document-picker, expo-file-system

## 🚀 설치 및 실행 방법

이 프로젝트는 네이티브 모듈(`react-native-pdf`, `expo-sqlite` 등)을 사용하므로 **Expo Go** 앱에서는 정상적으로 작동하지 않을 수 있습니다. **Development Build**를 사용하여 실행하는 것을 권장합니다.

### 1. 저장소 복제 및 의존성 설치

```bash
git clone <repository-url>
cd p09_w02-2_plainpdf
npm install
```

### 2. 실행 (Development Build)

Android Studio 또는 Xcode가 설치되어 있어야 합니다.

**Android:**
```bash
npx expo run:android
```

**iOS:**
```bash
npx expo run:ios
```

## 📱 사용 방법

1. 앱 실행 후 **"Open PDF"** 버튼을 눌러 디바이스에 저장된 PDF 파일을 선택합니다.
2. 하단 툴바에서 원하는 도구(**Highlight, Text, Draw**)를 선택합니다.
3. 화면에 터치 또는 드래그하여 주석을 추가합니다.
   - **Highlight**: 드래그하여 영역 강조.
   - **Draw**: 손가락으로 자유롭게 그리기.
   - **Text**: 화면을 탭하여 메모 입력.
4. **View** 모드로 전환하여 스크롤하거나 페이지를 넘길 수 있습니다.

## 📝 라이선스

MIT License
