# ⚡ Quick Start Guide

## 🚀 한 번에 시작하기

### 서버 + 모바일 앱 실행

**터미널 1 (서버):**
```bash
cd server
npm run dev
```

**터미널 2 (모바일):**
```bash
cd mobile
npm start
```

---

## 📱 Expo 실행 방법

### Expo Go 사용 (권장 - MVP)
```bash
cd mobile
npm start
# 또는
npx expo start
```

스마트폰에서 QR 코드 스캔!

### Android 에뮬레이터
```bash
cd mobile
npm run android
```

### iOS 시뮬레이터 (macOS만)
```bash
cd mobile
npm run ios
```

---

## 🔧 자주 사용하는 명령어

### 서버
```bash
cd server

npm run dev       # 개발 모드 (자동 재시작)
npm start         # 프로덕션 모드
npm run init-db   # DB 초기화
npm run kill      # Port 3000 프로세스 종료
```

### 모바일
```bash
cd mobile

npm start         # Expo 시작
npm run android   # Android 실행
npm run ios       # iOS 실행

npx expo start -c # 캐시 클리어 후 시작
```

---

## 🐛 빠른 문제 해결

### Port 3000 사용 중
```bash
cd server
npm run kill
npm run dev
```

### 모바일 앱 연결 안 됨
1. `mobile/app.config.js` 열기
2. `apiUrl`을 내 IP로 변경
   ```javascript
   apiUrl: 'http://192.168.1.XXX:3000'
   ```
3. 앱 재시작 (Expo에서 `r` 키)

### 캐시 문제
```bash
cd mobile
npx expo start -c
```

---

## ✅ 정상 작동 확인

### 서버 확인
브라우저: `http://localhost:3000/api/health`
```json
{"status":"ok","message":"Quest MVP Server is running!"}
```

### 앱 확인
- 홈 화면에 "✅ Connected to server!" 표시
- 4개 탭 (홈, 통계, 스쿼드, MY) 동작

---

## 📍 현재 IP 주소 확인

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

`192.168.x.x` 형태의 주소 찾기!

---

## 🎯 프로젝트 구조

```
quest-mvp/
├── server/          # 백엔드 (Port 3000)
└── mobile/          # 모바일 앱 (Expo)
```

---

## 📚 더 많은 문서

- **START-HERE.md** - 상세 시작 가이드
- **TROUBLESHOOTING.md** - 문제 해결
- **README.md** - 프로젝트 개요
- **doc/** - 전체 문서

---

**꿀팁:** 터미널을 2개 열어서 하나는 서버, 하나는 모바일 앱을 실행하세요! 🚀
