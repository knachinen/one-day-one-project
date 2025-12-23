# 🚀 Quest MVP - 시작 가이드

## ✅ 설정 완료!

프로젝트가 성공적으로 설정되었습니다. 이제 실행할 준비가 되었습니다!

---

## 📍 지금 바로 시작하기

### 1단계: 서버 실행 (이미 실행 중!)

**터미널 1:**
```bash
cd server
npm run dev
```

✅ 서버 주소: `http://localhost:3000`
✅ Health check: `http://localhost:3000/api/health`

---

### 2단계: 모바일 앱 실행

**새 터미널을 열고:**

```bash
cd mobile

# Expo 패키지 설치 (처음 한 번만)
npx expo install react-native-screens react-native-safe-area-context

# 앱 실행
npx expo start
```

---

### 3단계: 스마트폰 연결

1. **Expo Go 앱 설치**
   - iOS: App Store에서 "Expo Go" 검색
   - Android: Play Store에서 "Expo Go" 검색

2. **QR 코드 스캔**
   - 터미널에 표시된 QR 코드를 Expo Go 앱으로 스캔

3. **앱 실행!**
   - Quest 앱이 스마트폰에서 실행됩니다

---

### 4단계: API 연결 설정 ⚠️ 중요!

모바일 앱이 서버와 통신하려면 **내 컴퓨터의 IP 주소**를 설정해야 합니다.

#### A. 내 IP 주소 확인:

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig | findstr IPv4
```

예: `192.168.1.100`

#### B. mobile/app.config.js 파일 수정:

```javascript
extra: {
  apiUrl: 'http://192.168.1.100:3000'  // 👈 여기에 내 IP 입력
}
```

#### C. 앱 재시작:

터미널에서 `r` 키를 눌러 앱을 리로드하세요.

---

## ✅ 작동 확인

### 서버 확인
브라우저에서 확인:
```
http://localhost:3000/api/health
```

응답:
```json
{
  "status": "ok",
  "timestamp": 1703318400000,
  "message": "Quest MVP Server is running!"
}
```

### 모바일 앱 확인
앱 홈 화면에서:
- ✅ "Connected to server!" 메시지 확인
- ✅ 서버 응답 메시지 표시
- ✅ 4개의 탭 (홈, 통계, 스쿼드, MY) 동작

---

## 🎯 프로젝트 구조

```
quest-mvp/
├── server/          # 백엔드 서버
│   ├── src/         # 소스 코드
│   ├── quest.db     # SQLite 데이터베이스
│   └── uploads/     # 파일 저장소
│
├── mobile/          # 모바일 앱
│   ├── src/         # 소스 코드
│   └── App.js       # 엔트리 포인트
│
└── doc/             # 문서
    └── mvp-setup-guide.md  # 상세 가이드
```

---

## 🐛 문제 해결

### "Connection failed" 오류
1. ✅ 서버가 실행 중인지 확인: `http://localhost:3000/api/health`
2. ✅ 스마트폰과 컴퓨터가 같은 WiFi에 연결되어 있는지 확인
3. ✅ `app.config.js`의 IP 주소가 올바른지 확인
4. ✅ 방화벽에서 3000번 포트를 허용했는지 확인

### 서버 포트 사용 중 오류
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /F /PID <PID>
```

### Expo 캐시 문제
```bash
cd mobile
npx expo start -c
```

---

## 📚 다음 단계

### 지금 할 수 있는 것:
- ✅ 서버와 앱이 통신하는지 확인
- ✅ 4개의 탭 화면 탐색
- ✅ 데이터베이스 테이블 확인

### 다음에 구현할 기능:
1. 회원가입 / 로그인
2. 학습 타이머
3. 스쿼드 관리
4. 실시간 채팅
5. 타임스탬프 사진
6. 리액션 기능

---

## 📖 상세 문서

더 자세한 내용은 다음 문서를 참고하세요:

- **[README.md](./README.md)** - 프로젝트 개요
- **[doc/mvp-setup-guide.md](./doc/mvp-setup-guide.md)** - 상세 설정 가이드
- **[doc/tech-stack-mvp.md](./doc/tech-stack-mvp.md)** - 기술 스택
- **[doc/data-models-mvp.md](./doc/data-models-mvp.md)** - 데이터베이스

---

## 🎉 축하합니다!

Quest MVP 프로젝트를 시작했습니다!

**개발 서버 실행:**
- 터미널 1: `cd server && npm run dev`
- 터미널 2: `cd mobile && npx expo start`

**행운을 빕니다! 🚀**
