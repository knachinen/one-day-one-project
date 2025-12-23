# Quest - 목표 달성형 학습 메신저 (MVP)

실시간 학습 공유 및 상호 감시를 통한 몰입 환경 제공

## 🎯 프로젝트 개요

Quest는 공시생, 취준생 등 장시간 집중과 학습 인증이 필요한 사용자를 위한 학습 메신저 앱입니다.

**핵심 기능:**
- ⏱️ 학습 타이머 및 통계
- 👥 스쿼드(그룹) 관리
- 💬 실시간 채팅
- 📸 타임스탬프 사진 인증
- 🔥 리액션 기능

## 📁 프로젝트 구조

```
quest-mvp/
├── doc/                    # 📚 문서
│   ├── README.md          # 문서 가이드
│   ├── mvp-setup-guide.md # 설정 가이드 ⭐
│   └── ...
│
├── server/                 # 🖥️ 백엔드
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── utils/
│   │   └── index.js
│   ├── uploads/           # 파일 저장소
│   ├── quest.db          # SQLite 데이터베이스
│   └── package.json
│
└── mobile/                 # 📱 모바일 앱
    ├── src/
    │   ├── screens/
    │   ├── components/
    │   ├── navigation/
    │   ├── api/
    │   └── constants/
    ├── App.js
    └── package.json
```

## 🚀 빠른 시작

### 1. 서버 시작

```bash
# 서버 폴더로 이동
cd server

# 패키지 이미 설치됨 (설치 완료)
# npm install

# 데이터베이스 이미 초기화됨
# npm run init-db

# 서버 실행
npm run dev
```

서버가 실행되면: `http://localhost:3000`

### 2. 모바일 앱 시작

**새 터미널을 열고:**

```bash
# 모바일 폴더로 이동
cd mobile

# 패키지 설치 (아직 안 했다면)
npm install

# Expo 패키지 설치 (필수)
npx expo install react-native-screens react-native-safe-area-context expo-camera expo-image-picker expo-image-manipulator

# 앱 실행
npx expo start
```

**스마트폰에서:**
1. App Store / Play Store에서 "Expo Go" 앱 설치
2. QR 코드 스캔
3. 앱 실행!

### 3. API URL 설정

모바일 앱이 서버와 통신하려면 로컬 IP 주소를 설정해야 합니다.

#### 내 컴퓨터의 IP 주소 확인:

**macOS/Linux:**
```bash
ifconfig | grep "inet "
# 192.168.x.x 형태의 주소 찾기
```

**Windows:**
```bash
ipconfig
# IPv4 주소 확인
```

#### mobile/app.config.js 수정:
```javascript
extra: {
  apiUrl: 'http://192.168.1.100:3000'  // 여기에 내 IP 입력
}
```

변경 후 앱을 다시 시작하세요!

## ✅ 설치 확인

### 서버 확인
브라우저에서 `http://localhost:3000/api/health` 접속
```json
{
  "status": "ok",
  "timestamp": 1703318400000,
  "message": "Quest MVP Server is running!"
}
```

### 모바일 앱 확인
- 앱 홈 화면에서 "✅ Connected to server!" 표시 확인
- 4개의 탭(홈, 통계, 스쿼드, MY) 동작 확인

## 🛠️ 기술 스택

### 백엔드
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: SQLite3
- **Real-time**: Socket.io
- **Auth**: JWT + bcrypt

### 모바일
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State**: Zustand
- **HTTP**: Axios
- **WebSocket**: Socket.io Client

## 📖 상세 문서

자세한 설정 및 개발 가이드는 `doc/` 폴더를 참고하세요:

- **[mvp-setup-guide.md](./doc/mvp-setup-guide.md)** - 상세 설정 가이드
- **[tech-stack-mvp.md](./doc/tech-stack-mvp.md)** - 기술 스택 설명
- **[data-models-mvp.md](./doc/data-models-mvp.md)** - 데이터베이스 스키마

## 🐛 문제 해결

### 서버가 시작되지 않음
```bash
# 포트 사용 확인
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# 프로세스 종료 후 재시작
```

### 모바일 앱이 서버에 연결 안 됨
1. ✅ 같은 WiFi에 연결되어 있는지 확인
2. ✅ `app.config.js`의 IP 주소가 올바른지 확인
3. ✅ 서버가 `0.0.0.0`로 리스닝하는지 확인 (이미 설정됨)
4. ✅ 방화벽에서 3000번 포트 허용

### Expo 캐시 문제
```bash
npx expo start -c
```

## 📋 개발 체크리스트

### 현재 완료된 사항
- [x] 프로젝트 구조 생성
- [x] 백엔드 서버 설정
- [x] SQLite 데이터베이스 초기화
- [x] 모바일 앱 기본 구조
- [x] 네비게이션 (Bottom Tabs)
- [x] 서버 연결 테스트

### 다음 단계 (Phase 1)
- [ ] 회원가입 / 로그인 API
- [ ] 로그인 화면 UI
- [ ] 학습 타이머 기능
- [ ] 스쿼드 생성 및 가입
- [ ] 실시간 채팅
- [ ] 타임스탬프 사진 업로드
- [ ] 리액션 기능

## 🔧 개발 명령어

### 서버
```bash
cd server
npm run dev       # 개발 모드 (nodemon)
npm start         # 프로덕션 모드
npm run init-db   # 데이터베이스 초기화
```

### 모바일
```bash
cd mobile
npx expo start    # 개발 서버 시작
npx expo start -c # 캐시 클리어 후 시작
npm run android   # Android 에뮬레이터
npm run ios       # iOS 시뮬레이터
```

## 📱 테스트 환경

- **Node.js**: v18.0.0 이상
- **npm**: v9.0.0 이상
- **Expo**: v51.0.0
- **React Native**: v0.74.0

## 🤝 기여하기

1. 이 저장소를 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이센스

This project is licensed under the MIT License.

## 📞 지원

문제가 발생하면:
1. [mvp-setup-guide.md](./doc/mvp-setup-guide.md)의 "문제 해결" 섹션 확인
2. GitHub Issues에 문의

---

**🎉 Quest MVP 프로젝트에 오신 것을 환영합니다!**

시작하려면: `cd server && npm run dev`
