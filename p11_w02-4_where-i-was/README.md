# Where I Was 📍

내가 방문했던 장소를 기록하고 관리하는 위치 저널링 앱입니다.

## 주요 기능

### 🗺️ 지도 기반 위치 저장
- **수동 위치 저장**: 지도의 십자선을 원하는 위치에 맞추고 저장
- **현재 위치로 이동**: 버튼 클릭으로 내 위치로 지도 이동
- **장소 검색**: OpenStreetMap Nominatim API를 사용한 실시간 장소 검색
- **역 지오코딩**: 좌표를 자동으로 장소 이름으로 변환

### 📝 기록 관리
- **장소 이름 편집**: 저장된 위치의 이름 수정 가능
- **노트 추가**: 각 위치에 메모 작성
- **기록 삭제**: 불필요한 기록 삭제
- **시간 정보**: 각 기록의 저장 시간 자동 기록

### 💾 데이터 관리
- **Export**: 모든 기록을 JSON 파일로 내보내기
- **Import**: JSON 파일에서 기록 가져오기
- **중복 처리**: Import 시 중복 데이터 자동 감지 및 건너뛰기
- **로컬 저장**: SQLite 데이터베이스를 사용한 안전한 로컬 저장

### 🎨 사용자 인터페이스
- **투명 네비게이션 바**: 지도를 더 넓게 볼 수 있는 반투명 헤더
- **플로팅 검색창**: 지도 위에 떠있는 검색 UI
- **아이콘 버튼**: 직관적인 아이콘 기반 인터페이스
- **모달 편집**: 깔끔한 모달 UI로 기록 편집

## 기술 스택

### 프레임워크 & 언어
- **React Native** - 크로스 플랫폼 모바일 앱 개발
- **Expo** - React Native 개발 플랫폼
- **TypeScript** - 타입 안전성

### 주요 라이브러리
- **React Navigation** - 화면 네비게이션
- **expo-location** - 위치 정보 접근
- **expo-sqlite** - 로컬 데이터베이스
- **react-native-webview** - Leaflet 지도 렌더링
- **axios** - HTTP 요청 (장소 검색)
- **expo-file-system** - 파일 시스템 접근
- **expo-sharing** - 파일 공유
- **expo-document-picker** - 파일 선택

### 지도 & 위치 서비스
- **Leaflet.js** - 오픈소스 지도 라이브러리
- **OpenStreetMap** - 무료 지도 타일
- **Nominatim API** - 장소 검색 및 역 지오코딩

## 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn
- Android Studio (Android 개발용)
- Xcode (iOS 개발용, macOS만 해당)

### 설치
```bash
# 의존성 설치
npm install

# 또는
yarn install
```

### 개발 모드 실행
```bash
# Expo Go로 실행
npm start

# Android 개발 빌드
npx expo run:android

# iOS 개발 빌드
npx expo run:ios
```

### 릴리즈 빌드
```bash
# Android APK 빌드
eas build --platform android --profile production

# iOS 빌드
eas build --platform ios --profile production
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── constants/          # 상수 및 설정
├── db/                 # 데이터베이스 관련 코드
│   ├── index.ts       # DB 초기화
│   └── locations.ts   # 위치 CRUD 함수
├── navigation/         # 네비게이션 설정
├── screens/           # 화면 컴포넌트
│   ├── MainMapScreen.tsx      # 메인 지도 화면
│   └── LocationListScreen.tsx # 히스토리 화면
├── services/          # 백그라운드 서비스
├── types/             # TypeScript 타입 정의
└── utils/             # 유틸리티 함수
    ├── disableConsole.ts  # 콘솔 로그 비활성화
    ├── geocoding.ts       # 역 지오코딩
    ├── mapTemplate.ts     # Leaflet 지도 HTML
    └── search.ts          # 장소 검색
```

## 데이터베이스 스키마

### locations 테이블
```sql
CREATE TABLE locations (
  id TEXT PRIMARY KEY,
  name TEXT,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  duration INTEGER DEFAULT 0,
  startTime INTEGER NOT NULL,
  userNote TEXT
);
```

## 환경 설정

### 콘솔 로그 비활성화/활성화
`src/utils/disableConsole.ts` 파일에서 설정:
```typescript
const ENABLE_LOGS = false; // true로 변경하면 로그 활성화
```

### React Native New Architecture
`app.json`에서 활성화됨:
```json
"experiments": {
  "modernRuntime": true,
  "newArchEnabled": true
}
```

## 권한

### Android
- `ACCESS_FINE_LOCATION` - 정확한 위치 접근
- `ACCESS_COARSE_LOCATION` - 대략적인 위치 접근
- `ACCESS_BACKGROUND_LOCATION` - 백그라운드 위치 접근 (미사용)

### iOS
- `NSLocationWhenInUseUsageDescription` - 앱 사용 중 위치 접근
- `NSLocationAlwaysAndWhenInUseUsageDescription` - 항상 위치 접근 (미사용)

## 사용 방법

### 위치 저장하기
1. 지도를 원하는 위치로 이동 (드래그 또는 검색)
2. 십자선이 저장하려는 위치에 오도록 조정
3. 상단 우측의 북마크 아이콘(📑) 클릭
4. 자동으로 장소 이름이 지정되고 저장됨

### 장소 검색하기
1. 상단의 검색창 클릭
2. 장소 이름 입력 (예: "서울역", "강남역")
3. 검색 결과에서 원하는 장소 선택
4. 지도가 해당 위치로 이동

### 기록 편집하기
1. 히스토리 화면(📋)으로 이동
2. 편집하려는 기록 클릭
3. 장소 이름 또는 노트 수정
4. "Save" 버튼 클릭

### 데이터 백업하기
1. 히스토리 화면에서 공유 아이콘(📤) 클릭
2. JSON 파일이 생성되고 공유 메뉴 표시
3. 원하는 앱으로 파일 저장 (Drive, 이메일 등)

### 데이터 복원하기
1. 히스토리 화면에서 다운로드 아이콘(📥) 클릭
2. 이전에 백업한 JSON 파일 선택
3. 자동으로 기록이 가져와짐 (중복은 건너뜀)

## 개발 히스토리

### 주요 업데이트
- ✅ 수동 위치 저장 기능
- ✅ 장소 검색 기능 (Nominatim API)
- ✅ 데이터 Export/Import
- ✅ 기록 편집 (장소 이름, 노트)
- ✅ 투명 네비게이션 바
- ✅ 아이콘 버튼 UI 개선
- ✅ 커스텀 앱 아이콘 및 스플래시 화면
- ✅ React Native New Architecture 적용
- ✅ 콘솔 로그 비활성화 옵션

## 라이선스

MIT License

## 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.
