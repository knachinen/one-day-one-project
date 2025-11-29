# 🚀 배포 준비 가이드 (Deployment Guide)

이 문서는 Atomizer 앱을 스토어에 배포하기 위한 준비 과정을 안내합니다.

## 1. 앱 아이콘 및 스플래시 스크린 설정

현재 프로젝트에는 기본 Expo 아이콘이 포함되어 있습니다. 실제 배포를 위해서는 맞춤형 아이콘이 필요합니다.

### 1.1 이미지 에셋 준비
다음 규격의 이미지를 준비하여 `assets` 폴더에 덮어쓰세요.

- **icon.png**: 1024x1024px (앱 아이콘)
- **splash-icon.png**: 200x200px (스플래시 화면 중앙 로고)
- **adaptive-icon.png**: 1024x1024px (Android 적응형 아이콘)
- **favicon.png**: 48x48px (웹용 파비콘)

### 1.2 배경색 설정
`app.json` 파일에서 `backgroundColor`를 브랜드 컬러(`#4F46E5`)로 설정했습니다. 변경을 원하시면 `app.json`을 수정하세요.

## 2. iOS 배포 준비 (App Store)

### 2.1 Bundle Identifier 확인
`app.json`의 `ios.bundleIdentifier`가 `com.knachinen.atomizer`로 설정되어 있습니다. Apple Developer Account에 등록된 ID와 일치해야 합니다.

### 2.2 인증서 및 프로비저닝 프로파일
Xcode를 열어 Signing & Capabilities 탭에서 Team을 선택하고 인증서를 설정하세요.

### 2.3 빌드 및 아카이브
```bash
cd ios
pod install
open Atomizer.xcworkspace
```
Xcode에서 `Product > Archive`를 선택하여 빌드 후 App Store Connect에 업로드합니다.

## 3. Android 배포 준비 (Google Play)

### 3.1 Package Name 확인
`app.json`의 `android.package`가 `com.knachinen.atomizer`로 설정되어 있습니다.

### 3.2 서명 키 생성 (Keystore)
```bash
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
생성된 키스토어 파일을 `android/app` 폴더에 위치시키고 `android/gradle.properties`에 정보를 입력해야 합니다.

### 3.3 빌드 (AAB)
```bash
cd android
./gradlew bundleRelease
```
생성된 `android/app/build/outputs/bundle/release/app-release.aab` 파일을 Google Play Console에 업로드합니다.

## 4. 권한 설정 확인

`app.json`에 다음 권한이 추가되었습니다:
- `android.permission.VIBRATE`: 햅틱 피드백
- `android.permission.SCHEDULE_EXACT_ALARM`: 정확한 시간 알림
- `android.permission.POST_NOTIFICATIONS`: 알림 표시 (Android 13+)

iOS의 경우 `Info.plist`에 `UIBackgroundModes`가 설정되어 있습니다.
