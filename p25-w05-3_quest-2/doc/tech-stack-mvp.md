
# [Tech Stack - MVP] Quest 최소 기능 제품

## 개요 (Overview)
MVP 단계에서는 **로컬 개발 환경**에서 빠르게 프로토타입을 만드는 것이 목표입니다.
클라우드 서비스, 복잡한 인프라, CI/CD 없이 핵심 기능만 구현합니다.

---

## 1. 프론트엔드 (Mobile App)

### 1.1 프레임워크
* **React Native** (Expo 권장)
    * Expo Go 앱으로 즉시 테스트 가능
    * 네이티브 빌드 없이 빠른 개발
    * 필요시 `expo prebuild`로 bare workflow 전환 가능

### 1.2 주요 라이브러리
```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "react-native": "0.74.0",
    "react-navigation": "^6.0.0",
    "@react-navigation/native": "^6.0.0",
    "@react-navigation/bottom-tabs": "^6.0.0",
    "zustand": "^4.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "expo-camera": "~15.0.0",
    "expo-image-picker": "~15.0.0",
    "react-native-svg": "^14.0.0"
  }
}
```

### 1.3 상태 관리
* **Zustand**: 가볍고 간단한 전역 상태 관리
* AsyncStorage: 로컬 데이터 저장 (토큰, 설정)

---

## 2. 백엔드 (Server & API)

### 2.1 프레임워크
* **Node.js + Express.js**
    * 가장 간단하고 빠른 REST API 구축
    * Socket.io와 쉽게 통합
    * 별도의 복잡한 설정 없이 바로 시작

```javascript
// server.js 기본 구조
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// REST API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Socket.io for real-time
io.on('connection', (socket) => {
  console.log('Client connected');
});

server.listen(3000);
```

### 2.2 실시간 통신
* **Socket.io**: WebSocket 기반 실시간 채팅 및 상태 동기화
* HTTP polling fallback 자동 지원

---

## 3. 데이터베이스 (Database)

### 3.1 로컬 파일 기반 데이터베이스
* **SQLite** (서버 사이드)
    * 파일 하나로 전체 데이터베이스 관리 (`quest.db`)
    * 별도의 데이터베이스 서버 불필요
    * 설치 및 설정이 매우 간단

```javascript
// SQLite 사용 예시
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./quest.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL
  )`);
});
```

### 3.2 실시간 데이터 저장
* **메모리 기반 저장소** (In-Memory Store)
    * Node.js 객체로 온라인 유저 관리
    * 서버 재시작 시 초기화되지만 MVP에는 충분

```javascript
// In-memory store
const onlineUsers = new Map(); // socketId -> userId
const activeSessions = new Map(); // userId -> sessionData
```

### 3.3 파일 저장
* **로컬 파일 시스템**
    * 이미지는 `uploads/` 폴더에 저장
    * S3 없이 간단하게 관리

```javascript
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
```

---

## 4. 인증 (Authentication)

### 4.1 간단한 JWT 인증
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'your-secret-key-change-this';

// 회원가입
app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // DB에 저장
  db.run(
    'INSERT INTO users (user_id, email, password_hash, username) VALUES (?, ?, ?, ?)',
    [generateId(), email, hashedPassword, username]
  );
});

// 로그인
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token, user });
  });
});

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## 5. 개발 환경 설정

### 5.1 필요한 도구
* **Node.js** (v18 이상)
* **npm** 또는 **yarn**
* **Expo CLI**: `npm install -g expo-cli`
* **코드 에디터**: VS Code 권장

### 5.2 프로젝트 구조
```
quest-mvp/
├── mobile/                 # React Native (Expo)
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── store/         # Zustand stores
│   │   └── api/           # API calls
│   ├── app.json
│   └── package.json
│
├── server/                 # Node.js + Express
│   ├── src/
│   │   ├── routes/        # REST API routes
│   │   ├── controllers/
│   │   ├── models/        # SQLite models
│   │   ├── middleware/
│   │   └── socket/        # Socket.io handlers
│   ├── uploads/           # Local file storage
│   ├── quest.db           # SQLite database file
│   └── package.json
│
└── README.md
```

---

## 6. 실행 방법

### 6.1 백엔드 서버 시작
```bash
cd server
npm install
node src/index.js
# 또는 개발 중 자동 재시작
npm install -g nodemon
nodemon src/index.js
```

### 6.2 모바일 앱 실행
```bash
cd mobile
npm install
expo start
# 또는
npx expo start
```

스마트폰에서 Expo Go 앱을 설치하고 QR 코드 스캔

### 6.3 로컬 네트워크 연결
* 서버와 모바일이 같은 WiFi에 연결되어 있어야 함
* API 주소: `http://192.168.x.x:3000` (내 컴퓨터의 로컬 IP)

---

## 7. MVP에서 제외되는 기능

### 7.1 인프라
❌ AWS (S3, EC2, RDS, CloudFront)
❌ Docker / Kubernetes
❌ GitHub Actions / CI/CD
❌ Nginx / Load Balancer
❌ CDN

### 7.2 데이터베이스
❌ PostgreSQL (SQLite로 대체)
❌ Redis (메모리 저장소로 대체)
❌ Database migration tools
❌ Replication / Backup 자동화

### 7.3 보안 고급 기능
❌ Rate limiting (기본적인 것만)
❌ DDOS 방어
❌ 이미지 악성코드 스캔
❌ 복잡한 시간 조작 방지 (기본 검증만)

### 7.4 모니터링
❌ Sentry / Error tracking
❌ Analytics
❌ Performance monitoring
❌ Log aggregation

### 7.5 라이브 스트리밍
❌ WebRTC / Agora / Twilio
→ MVP에서는 "온라인" 상태만 표시하고 실제 캠 스트리밍은 Phase 2로 연기

---

## 8. MVP 핵심 기능 (구현할 것)

### ✅ Phase 1 - MVP 구현 범위
1. **사용자 인증**
   - 회원가입 / 로그인
   - JWT 토큰 기반 인증

2. **학습 타이머**
   - 세션 시작 / 종료
   - 오늘의 누적 시간 표시
   - 간단한 통계 (오늘 vs 어제)

3. **스쿼드 (그룹)**
   - 스쿼드 생성 / 가입
   - 멤버 목록 보기
   - 온라인 상태 표시 (녹색 점)

4. **채팅**
   - 실시간 텍스트 메시지
   - 타임스탬프 표시
   - 시스템 메시지 (입장/퇴장)

5. **타임스탬프 사진**
   - 카메라로 사진 촬영
   - 날짜/시각 워터마크 합성
   - 채팅방에 업로드

6. **리액션**
   - 메시지/사진에 이모지 추가
   - 실시간 업데이트

7. **UI/UX**
   - 하단 탭 내비게이션
   - 중앙 플로팅 시작 버튼
   - 대시보드 카드

---

## 9. 배포 (MVP용 간단한 방법)

### 9.1 테스트용 배포
* **백엔드**:
    * 개인 컴퓨터에서 실행 (포트 포워딩으로 외부 접근)
    * 또는 무료 호스팅: **Render.com** (무료 플랜)
    * 또는 **Railway.app** (무료 플랜)

* **모바일**:
    * Expo Go로 계속 테스트
    * 필요시 Expo EAS Build로 APK/IPA 생성

### 9.2 데이터베이스 백업
```bash
# SQLite 파일 복사
cp quest.db quest_backup_$(date +%Y%m%d).db

# 또는 dump
sqlite3 quest.db .dump > backup.sql
```

---

## 10. 추천 개발 순서

### Week 1: 기본 설정
- [ ] Expo 프로젝트 초기화
- [ ] Express 서버 기본 구조
- [ ] SQLite 데이터베이스 설정
- [ ] 하단 탭 내비게이션 구현

### Week 2: 인증 & 타이머
- [ ] 회원가입 / 로그인 API
- [ ] JWT 인증 미들웨어
- [ ] 학습 세션 시작/종료 API
- [ ] 타이머 화면 UI

### Week 3: 스쿼드 & 채팅
- [ ] 스쿼드 CRUD API
- [ ] Socket.io 실시간 채팅
- [ ] 온라인 상태 동기화
- [ ] 채팅 UI

### Week 4: 사진 & 리액션
- [ ] 카메라 통합
- [ ] 타임스탬프 워터마크
- [ ] 파일 업로드 API
- [ ] 리액션 기능

### Week 5: 테스트 & 개선
- [ ] 버그 수정
- [ ] UI/UX 개선
- [ ] 통계 화면 구현
- [ ] 최종 테스트

---

## 11. 필수 npm 패키지 목록

### 11.1 서버 (server/package.json)
```json
{
  "name": "quest-server-mvp",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "socket.io": "^4.6.0",
    "sqlite3": "^5.1.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

### 11.2 모바일 (mobile/package.json)
```json
{
  "name": "quest-mobile-mvp",
  "version": "1.0.0",
  "dependencies": {
    "expo": "~51.0.0",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "expo-camera": "~15.0.0",
    "expo-image-picker": "~15.0.0",
    "expo-image-manipulator": "~12.0.0",
    "react-native-svg": "^14.1.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## 12. 환경 변수 (.env)

### 12.1 서버 (.env)
```bash
PORT=3000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
DATABASE_PATH=./quest.db
UPLOAD_DIR=./uploads
```

### 12.2 모바일 (app.config.js)
```javascript
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL || 'http://192.168.1.100:3000',
    }
  }
}
```

---

## 13. MVP 성공 기준

### ✅ 완료 체크리스트
- [ ] 2명 이상이 동시에 접속하여 채팅 가능
- [ ] 타이머로 학습 시간 기록 가능
- [ ] 타임스탬프 사진 업로드 및 확인 가능
- [ ] 스쿼드에서 온라인 유저 표시
- [ ] 앱이 크래시 없이 30분 이상 안정적으로 작동
- [ ] 서버 재시작 후에도 사용자 데이터 유지

---

## 14. Phase 2로 미뤄질 기능

다음 단계에서 추가할 고급 기능:
* PostgreSQL 마이그레이션
* Redis 실시간 성능 최적화
* AWS 클라우드 배포
* 실제 라이브 캠 스트리밍 (WebRTC)
* CI/CD 파이프라인
* 모니터링 및 로깅
* 고급 보안 기능
* 앱스토어 배포

---

**MVP 철학**: "완벽하지 않아도 작동하는 것이 중요하다."
빠르게 만들고, 테스트하고, 피드백을 받아 개선하는 것이 목표입니다.
