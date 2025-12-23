
# [MVP Setup Guide] Quest 프로젝트 시작하기

## 목차
1. [개발 환경 준비](#1-개발-환경-준비)
2. [백엔드 서버 설정](#2-백엔드-서버-설정)
3. [모바일 앱 설정](#3-모바일-앱-설정)
4. [통합 테스트](#4-통합-테스트)
5. [문제 해결](#5-문제-해결)

---

## 1. 개발 환경 준비

### 1.1 필수 도구 설치

#### Node.js 설치
```bash
# Node.js v18 이상 필요
# https://nodejs.org 에서 다운로드

# 설치 확인
node --version  # v18.0.0 이상
npm --version   # 9.0.0 이상
```

#### Expo CLI 설치
```bash
npm install -g expo-cli

# 설치 확인
expo --version
```

#### Git 설치
```bash
# macOS (Homebrew)
brew install git

# Windows
# https://git-scm.com/download/win

# 설치 확인
git --version
```

### 1.2 에디터 설정 (VS Code 권장)
```bash
# VS Code 다운로드
# https://code.visualstudio.com/

# 권장 확장 프로그램
- ESLint
- Prettier
- React Native Tools
- SQLite Viewer
```

### 1.3 스마트폰 준비
```bash
# iOS: App Store에서 "Expo Go" 설치
# Android: Play Store에서 "Expo Go" 설치
```

---

## 2. 백엔드 서버 설정

### 2.1 프로젝트 폴더 생성
```bash
mkdir quest-mvp
cd quest-mvp
mkdir server
cd server
```

### 2.2 package.json 생성
```bash
npm init -y
```

### 2.3 필수 패키지 설치
```bash
npm install express socket.io sqlite3 bcrypt jsonwebtoken multer cors dotenv uuid
npm install --save-dev nodemon
```

### 2.4 폴더 구조 생성
```bash
mkdir -p src/{routes,controllers,models,middleware,socket,utils}
mkdir uploads
```

### 2.5 환경 변수 설정 (.env)
```bash
# 프로젝트 루트에 .env 파일 생성
cat > .env << EOF
PORT=3000
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development
DATABASE_PATH=./quest.db
UPLOAD_DIR=./uploads
EOF
```

### 2.6 데이터베이스 초기화 스크립트 생성
`src/utils/init-db.js`:
```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../quest.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log('Creating tables...');

  // Users 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      username TEXT NOT NULL,
      profile_image_url TEXT,
      created_at INTEGER NOT NULL,
      last_login_at INTEGER,
      is_active INTEGER DEFAULT 1,
      total_study_time INTEGER DEFAULT 0
    )
  `);

  // Squads 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS squads (
      squad_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      owner_id TEXT NOT NULL,
      is_private INTEGER DEFAULT 0,
      max_members INTEGER DEFAULT 50,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES users(user_id)
    )
  `);

  // Squad_Members 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS squad_members (
      squad_member_id TEXT PRIMARY KEY,
      squad_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      joined_at INTEGER NOT NULL,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      UNIQUE(squad_id, user_id)
    )
  `);

  // Study_Sessions 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      session_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      squad_id TEXT,
      session_type TEXT DEFAULT 'free',
      start_time INTEGER NOT NULL,
      end_time INTEGER,
      duration INTEGER,
      is_valid INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id)
    )
  `);

  // Messages 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      message_id TEXT PRIMARY KEY,
      squad_id TEXT NOT NULL,
      user_id TEXT,
      message_type TEXT NOT NULL,
      content TEXT,
      image_url TEXT,
      timestamp INTEGER NOT NULL,
      is_deleted INTEGER DEFAULT 0,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `);

  // Photos 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS photos (
      photo_id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL UNIQUE,
      user_id TEXT NOT NULL,
      squad_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      thumbnail_url TEXT,
      captured_at INTEGER NOT NULL,
      uploaded_at INTEGER NOT NULL,
      is_verified INTEGER DEFAULT 0,
      FOREIGN KEY (message_id) REFERENCES messages(message_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id)
    )
  `);

  // Reactions 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS reactions (
      reaction_id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      emoji TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (message_id) REFERENCES messages(message_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      UNIQUE(message_id, user_id, emoji)
    )
  `);

  // 인덱스 생성
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_user ON study_sessions(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_messages_squad ON messages(squad_id, timestamp DESC)');

  console.log('✅ Database initialized successfully!');
  console.log('Database file: quest.db');
});

db.close();
```

### 2.7 데이터베이스 래퍼 생성
`src/utils/db.js`:
```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    const dbPath = path.join(__dirname, '../../quest.db');
    this.db = new sqlite3.Database(dbPath);

    // 성능 최적화
    this.db.run('PRAGMA journal_mode = WAL');
    this.db.run('PRAGMA synchronous = NORMAL');
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = new Database();
```

### 2.8 서버 메인 파일 생성
`src/index.js`:
```javascript
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// TODO: Add routes here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/sessions', require('./routes/sessions'));
// app.use('/api/squads', require('./routes/squads'));

// Socket.io
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.io ready`);
});
```

### 2.9 package.json 스크립트 추가
```json
{
  "scripts": {
    "init-db": "node src/utils/init-db.js",
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

### 2.10 데이터베이스 초기화 실행
```bash
npm run init-db
```

### 2.11 서버 실행
```bash
npm run dev
```

브라우저에서 확인:
```
http://localhost:3000/api/health
```

응답이 `{"status":"ok","timestamp":...}` 이면 성공!

---

## 3. 모바일 앱 설정

### 3.1 Expo 프로젝트 생성
```bash
cd ..  # quest-mvp 폴더로 이동
npx create-expo-app mobile
cd mobile
```

### 3.2 필수 패키지 설치
```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# State management
npm install zustand

# API & WebSocket
npm install axios socket.io-client

# Camera & Image
npx expo install expo-camera expo-image-picker expo-image-manipulator

# Utils
npm install date-fns
```

### 3.3 앱 설정 파일 생성
`app.config.js`:
```javascript
export default {
  expo: {
    name: 'Quest',
    slug: 'quest-mvp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#66CC66'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.quest.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#66CC66'
      },
      package: 'com.quest.app'
    },
    extra: {
      apiUrl: process.env.API_URL || 'http://192.168.1.100:3000'
    }
  }
};
```

### 3.4 프로젝트 구조 생성
```bash
mkdir -p src/{screens,components,navigation,store,api,constants}
```

### 3.5 디자인 토큰 파일 생성
`src/constants/theme.js`:
```javascript
export const colors = {
  primary: '#66CC66',
  primaryDark: '#52A352',
  background: '#F7F8F9',
  card: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#666666',
  textTertiary: '#999999',
  success: '#4CAF50',
  error: '#EF5350',
  online: '#66CC66',
  live: '#FF1744',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 36,
};

export const borderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  full: 9999,
};
```

### 3.6 API 설정
`src/api/config.js`:
```javascript
import Constants from 'expo-constants';
import axios from 'axios';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 설정 함수
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
```

### 3.7 간단한 홈 화면 생성
`src/screens/HomeScreen.js`:
```javascript
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest MVP</Text>
      <Text style={styles.subtitle}>오늘도 화이팅!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});
```

### 3.8 네비게이션 설정
`src/navigation/MainNavigator.js`:
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={HomeScreen} />
      <Tab.Screen name="Squad" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
```

### 3.9 App.js 수정
```javascript
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
```

### 3.10 앱 실행
```bash
npx expo start
```

스마트폰에서 Expo Go 앱으로 QR 코드 스캔!

---

## 4. 통합 테스트

### 4.1 로컬 IP 주소 확인

#### macOS/Linux:
```bash
ifconfig | grep "inet "
# 192.168.x.x 형태의 IP 찾기
```

#### Windows:
```bash
ipconfig
# IPv4 주소 확인
```

### 4.2 모바일 앱에서 서버 주소 설정
`app.config.js`에서:
```javascript
extra: {
  apiUrl: 'http://192.168.1.100:3000'  // 여기에 내 컴퓨터의 IP 입력
}
```

### 4.3 연결 테스트
모바일 앱에서 API 호출 테스트:

`src/screens/HomeScreen.js`:
```javascript
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../api/config';

export default function HomeScreen() {
  const [status, setStatus] = useState('connecting...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await api.get('/health');
      setStatus('✅ Connected to server!');
      console.log('Server response:', response.data);
    } catch (error) {
      setStatus('❌ Connection failed');
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest MVP</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}
```

---

## 5. 문제 해결

### 5.1 서버가 시작되지 않을 때
```bash
# 포트가 이미 사용 중인지 확인
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# 프로세스 종료
kill -9 <PID>  # macOS/Linux
taskkill /F /PID <PID>  # Windows
```

### 5.2 모바일 앱이 서버에 연결되지 않을 때
1. **같은 WiFi에 연결되어 있는지 확인**
2. **방화벽 확인** (3000번 포트 허용)
3. **IP 주소가 올바른지 확인**
4. **서버가 `0.0.0.0`으로 리슨하는지 확인**

```javascript
// src/index.js
server.listen(PORT, '0.0.0.0', () => {  // ✅ 올바름
  // ...
});

// ❌ 잘못된 예
server.listen(PORT, 'localhost', () => {  // localhost는 외부 접근 불가
  // ...
});
```

### 5.3 SQLite 에러
```bash
# SQLite 재설치
npm uninstall sqlite3
npm install sqlite3

# 데이터베이스 파일 삭제 후 재생성
rm quest.db
npm run init-db
```

### 5.4 Expo 캐시 문제
```bash
# 캐시 삭제
npx expo start -c
```

### 5.5 패키지 설치 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 6. 개발 워크플로우

### 6.1 매일 개발 시작 시
```bash
# 터미널 1: 백엔드 서버
cd quest-mvp/server
npm run dev

# 터미널 2: 모바일 앱
cd quest-mvp/mobile
npx expo start
```

### 6.2 코드 변경 시
* **서버 코드**: nodemon이 자동으로 재시작
* **모바일 코드**: Expo가 자동으로 리로드 (저장만 하면 됨)

### 6.3 Git 설정
```bash
# .gitignore 생성
cat > .gitignore << EOF
# Dependencies
node_modules/

# Environment
.env

# Database
*.db

# Uploads
uploads/

# Expo
.expo/
.expo-shared/

# OS
.DS_Store
EOF

# Git 초기화
git init
git add .
git commit -m "Initial commit: Quest MVP setup"
```

---

## 7. 다음 단계

### 7.1 기능 구현 순서
1. ✅ 환경 설정 완료
2. 🔄 인증 시스템 (회원가입/로그인)
3. 🔄 학습 타이머
4. 🔄 스쿼드 관리
5. 🔄 실시간 채팅
6. 🔄 타임스탬프 사진
7. 🔄 리액션 기능

### 7.2 참고 문서
* `tech-stack-mvp.md`: 기술 스택 상세
* `data-models-mvp.md`: 데이터베이스 스키마
* `api-spec.md`: API 명세
* `design-tokens.md`: 디자인 시스템

---

## 8. 체크리스트

### 설치 완료 체크
- [ ] Node.js 설치 완료
- [ ] Expo CLI 설치 완료
- [ ] VS Code 설치 완료
- [ ] Expo Go 앱 설치 완료 (스마트폰)

### 백엔드 설정 체크
- [ ] 서버 프로젝트 생성
- [ ] 패키지 설치 완료
- [ ] 데이터베이스 초기화 완료
- [ ] 서버 실행 확인 (http://localhost:3000/api/health)

### 모바일 설정 체크
- [ ] Expo 프로젝트 생성
- [ ] 패키지 설치 완료
- [ ] 앱 실행 확인 (Expo Go)

### 통합 테스트 체크
- [ ] 로컬 IP 확인
- [ ] 모바일에서 서버 연결 성공
- [ ] Health check API 응답 확인

---

**🎉 설정 완료! 이제 개발을 시작할 준비가 되었습니다!**

문제가 발생하면 [문제 해결](#5-문제-해결) 섹션을 확인하세요.
