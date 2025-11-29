# 📦 설치 및 실행 가이드

이 문서는 Atomizer 앱을 로컬 개발 환경에서 실행하기 위한 가이드입니다.

## 필수 요구사항 (Prerequisites)

- **Node.js** (v18 이상 권장)
- **npm** 또는 **yarn**
- **CocoaPods** (iOS 개발 시, macOS 필요)
- **Xcode** (iOS 개발 시, macOS 필요)
- **Android Studio** (Android 개발 시)
- **JDK 17** (Android 개발 시)

## 설치 (Installation)

1. 저장소를 클론합니다.
   ```bash
   git clone <repository-url>
   cd Atomizer
   ```

2. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. (iOS Only) iOS 의존성을 설치합니다.
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 실행 (Running the App)

이 앱은 Realm과 Notifee 같은 네이티브 모듈을 사용하므로 **Expo Go** 앱에서는 실행되지 않습니다. 반드시 **Development Build**를 생성하여 실행해야 합니다.

### iOS 실행 (Mac Only)
```bash
npm run ios
# 또는
npx expo run:ios
```

### Android 실행
```bash
npm run android
# 또는
npx expo run:android
```

## 문제 해결 (Troubleshooting)

### Realm 관련 오류
만약 Realm 관련 빌드 오류가 발생한다면, 다음을 시도해보세요:
1. `node_modules` 삭제 후 재설치
2. `ios/Pods` 삭제 후 `pod install` 재실행
3. Android의 경우 `android/app/build` 폴더 삭제 후 재빌드

### Metro Bundler 연결 문제
앱이 실행되었으나 Metro Bundler에 연결되지 않는 경우:
1. 터미널에서 `r` 키를 눌러 리로드
2. 기기를 흔들어(Shake) 개발자 메뉴에서 'Reload' 선택
