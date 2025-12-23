
# [Data Models - MVP] Quest SQLite Schema

## 1. 데이터베이스 개요

### MVP에서는 SQLite 사용
* **파일 기반**: `quest.db` 단일 파일로 모든 데이터 저장
* **별도 서버 불필요**: Node.js에서 직접 접근
* **간단한 설정**: 설치나 복잡한 구성 없음
* **제약사항**: 동시 쓰기 제한 (MVP 트래픽에는 충분)

---

## 2. SQLite 초기화 스크립트

### 2.1 데이터베이스 생성 (init-db.js)
```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../quest.db');
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
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
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
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE SET NULL
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
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
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
      FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE
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
      FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      UNIQUE(message_id, user_id, emoji)
    )
  `);

  // 인덱스 생성
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_squad_members_squad ON squad_members(squad_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_squad_members_user ON squad_members(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_user ON study_sessions(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON study_sessions(start_time DESC)');
  db.run('CREATE INDEX IF NOT EXISTS idx_messages_squad ON messages(squad_id, timestamp DESC)');
  db.run('CREATE INDEX IF NOT EXISTS idx_reactions_message ON reactions(message_id)');

  console.log('Database initialized successfully!');
});

db.close();
```

---

## 3. 테이블 상세 설명

### 3.1 Users (사용자)
```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,              -- UUID v4
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,           -- bcrypt hash
  username TEXT NOT NULL,
  profile_image_url TEXT,                -- 로컬 경로 (예: /uploads/profile/xxx.jpg)
  created_at INTEGER NOT NULL,           -- Unix timestamp (milliseconds)
  last_login_at INTEGER,
  is_active INTEGER DEFAULT 1,           -- 1 = active, 0 = inactive
  total_study_time INTEGER DEFAULT 0     -- 총 학습 시간 (초)
);
```

### 3.2 Squads (그룹/스쿼드)
```sql
CREATE TABLE squads (
  squad_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  owner_id TEXT NOT NULL,
  is_private INTEGER DEFAULT 0,          -- 1 = private, 0 = public
  max_members INTEGER DEFAULT 50,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
```

### 3.3 Squad_Members (멤버십)
```sql
CREATE TABLE squad_members (
  squad_member_id TEXT PRIMARY KEY,
  squad_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'member',            -- 'owner', 'admin', 'member'
  joined_at INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(squad_id, user_id)
);
```

### 3.4 Study_Sessions (학습 세션)
```sql
CREATE TABLE study_sessions (
  session_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  squad_id TEXT,                         -- nullable
  session_type TEXT DEFAULT 'free',      -- 'pomodoro' or 'free'
  start_time INTEGER NOT NULL,           -- Unix timestamp
  end_time INTEGER,                      -- nullable (진행 중이면 NULL)
  duration INTEGER,                      -- 초 단위 (서버 계산)
  is_valid INTEGER DEFAULT 1,            -- 조작 감지 플래그
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE SET NULL
);
```

### 3.5 Messages (채팅 메시지)
```sql
CREATE TABLE messages (
  message_id TEXT PRIMARY KEY,
  squad_id TEXT NOT NULL,
  user_id TEXT,                          -- nullable (시스템 메시지)
  message_type TEXT NOT NULL,            -- 'text', 'image', 'system'
  content TEXT,                          -- 텍스트 내용
  image_url TEXT,                        -- 이미지 경로
  timestamp INTEGER NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
```

### 3.6 Photos (타임스탬프 사진)
```sql
CREATE TABLE photos (
  photo_id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  squad_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  captured_at INTEGER NOT NULL,          -- 촬영 시각
  uploaded_at INTEGER NOT NULL,          -- 업로드 시각
  is_verified INTEGER DEFAULT 0,         -- 서버 검증 여부
  FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE
);
```

### 3.7 Reactions (리액션)
```sql
CREATE TABLE reactions (
  reaction_id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  emoji TEXT NOT NULL,                   -- '🔥', '💪', etc.
  created_at INTEGER NOT NULL,
  FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(message_id, user_id, emoji)
);
```

---

## 4. 데이터베이스 헬퍼 모듈

### 4.1 Database Wrapper (db.js)
```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    const dbPath = path.join(__dirname, '../../quest.db');
    this.db = new sqlite3.Database(dbPath);
  }

  // Promise 기반 query
  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // 단일 row 조회
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // INSERT, UPDATE, DELETE
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

---

## 5. 주요 쿼리 예시

### 5.1 사용자 생성
```javascript
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

async function createUser(email, password, username) {
  const userId = uuidv4();
  const passwordHash = await bcrypt.hash(password, 10);
  const now = Date.now();

  await db.run(
    `INSERT INTO users (user_id, email, password_hash, username, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, email, passwordHash, username, now]
  );

  return userId;
}
```

### 5.2 로그인 검증
```javascript
async function authenticateUser(email, password) {
  const user = await db.get(
    'SELECT * FROM users WHERE email = ? AND is_active = 1',
    [email]
  );

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  // 마지막 로그인 시간 업데이트
  await db.run(
    'UPDATE users SET last_login_at = ? WHERE user_id = ?',
    [Date.now(), user.user_id]
  );

  return user;
}
```

### 5.3 세션 시작
```javascript
async function startSession(userId, squadId = null) {
  const sessionId = uuidv4();
  const now = Date.now();

  await db.run(
    `INSERT INTO study_sessions (session_id, user_id, squad_id, start_time, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [sessionId, userId, squadId, now, now]
  );

  return { sessionId, startTime: now };
}
```

### 5.4 세션 종료
```javascript
async function endSession(sessionId) {
  const now = Date.now();

  const session = await db.get(
    'SELECT start_time FROM study_sessions WHERE session_id = ?',
    [sessionId]
  );

  if (!session) throw new Error('Session not found');

  const duration = Math.floor((now - session.start_time) / 1000); // 초 단위

  await db.run(
    `UPDATE study_sessions
     SET end_time = ?, duration = ?
     WHERE session_id = ?`,
    [now, duration, sessionId]
  );

  return { duration, endTime: now };
}
```

### 5.5 오늘의 학습 통계
```javascript
async function getTodayStats(userId) {
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);

  const result = await db.get(
    `SELECT
       COALESCE(SUM(duration), 0) as total_time,
       COUNT(*) as session_count
     FROM study_sessions
     WHERE user_id = ?
       AND start_time >= ?
       AND start_time <= ?
       AND is_valid = 1`,
    [userId, startOfDay, endOfDay]
  );

  return result;
}
```

### 5.6 스쿼드 멤버 조회
```javascript
async function getSquadMembers(squadId) {
  const members = await db.query(
    `SELECT
       u.user_id,
       u.username,
       u.profile_image_url,
       sm.joined_at,
       sm.role
     FROM squad_members sm
     JOIN users u ON sm.user_id = u.user_id
     WHERE sm.squad_id = ?
       AND sm.is_active = 1
     ORDER BY sm.joined_at ASC`,
    [squadId]
  );

  return members;
}
```

### 5.7 채팅 메시지 조회 (페이지네이션)
```javascript
async function getMessages(squadId, limit = 50, beforeTimestamp = null) {
  let sql = `
    SELECT
      m.message_id,
      m.message_type,
      m.content,
      m.image_url,
      m.timestamp,
      u.user_id,
      u.username,
      u.profile_image_url
    FROM messages m
    LEFT JOIN users u ON m.user_id = u.user_id
    WHERE m.squad_id = ?
      AND m.is_deleted = 0
  `;

  const params = [squadId];

  if (beforeTimestamp) {
    sql += ' AND m.timestamp < ?';
    params.push(beforeTimestamp);
  }

  sql += ' ORDER BY m.timestamp DESC LIMIT ?';
  params.push(limit);

  const messages = await db.query(sql, params);

  // 리액션 조회
  for (const message of messages) {
    const reactions = await db.query(
      `SELECT emoji, COUNT(*) as count
       FROM reactions
       WHERE message_id = ?
       GROUP BY emoji`,
      [message.message_id]
    );
    message.reactions = reactions;
  }

  return messages.reverse(); // 시간순 정렬
}
```

### 5.8 리액션 추가
```javascript
async function addReaction(messageId, userId, emoji) {
  const reactionId = uuidv4();
  const now = Date.now();

  try {
    await db.run(
      `INSERT INTO reactions (reaction_id, message_id, user_id, emoji, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [reactionId, messageId, userId, emoji, now]
    );
    return true;
  } catch (err) {
    // UNIQUE constraint 위반 (이미 같은 리액션 존재)
    if (err.message.includes('UNIQUE constraint')) {
      return false;
    }
    throw err;
  }
}
```

---

## 6. 메모리 저장소 (In-Memory Store)

### 6.1 온라인 유저 관리
```javascript
// stores/online-store.js
class OnlineStore {
  constructor() {
    this.onlineUsers = new Map(); // socketId -> { userId, squadId, connectedAt }
    this.userSockets = new Map(); // userId -> Set of socketIds
  }

  addUser(socketId, userId, squadId = null) {
    this.onlineUsers.set(socketId, {
      userId,
      squadId,
      connectedAt: Date.now()
    });

    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId).add(socketId);
  }

  removeUser(socketId) {
    const user = this.onlineUsers.get(socketId);
    if (user) {
      const sockets = this.userSockets.get(user.userId);
      if (sockets) {
        sockets.delete(socketId);
        if (sockets.size === 0) {
          this.userSockets.delete(user.userId);
        }
      }
      this.onlineUsers.delete(socketId);
    }
  }

  getOnlineUsers(squadId) {
    const users = new Set();
    for (const [socketId, data] of this.onlineUsers.entries()) {
      if (data.squadId === squadId) {
        users.add(data.userId);
      }
    }
    return Array.from(users);
  }

  isOnline(userId) {
    return this.userSockets.has(userId) && this.userSockets.get(userId).size > 0;
  }
}

module.exports = new OnlineStore();
```

### 6.2 활성 세션 관리
```javascript
// stores/session-store.js
class SessionStore {
  constructor() {
    this.activeSessions = new Map(); // userId -> { sessionId, startTime }
  }

  startSession(userId, sessionId) {
    this.activeSessions.set(userId, {
      sessionId,
      startTime: Date.now()
    });
  }

  endSession(userId) {
    this.activeSessions.delete(userId);
  }

  getSession(userId) {
    return this.activeSessions.get(userId);
  }

  hasActiveSession(userId) {
    return this.activeSessions.has(userId);
  }
}

module.exports = new SessionStore();
```

---

## 7. 시드 데이터 (테스트용)

### 7.1 샘플 데이터 삽입 (seed.js)
```javascript
const db = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  const now = Date.now();
  const password = await bcrypt.hash('test1234', 10);

  // 테스트 사용자 생성
  const user1Id = uuidv4();
  const user2Id = uuidv4();

  await db.run(
    `INSERT INTO users (user_id, email, password_hash, username, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [user1Id, 'test1@quest.app', password, '김철수', now]
  );

  await db.run(
    `INSERT INTO users (user_id, email, password_hash, username, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [user2Id, 'test2@quest.app', password, '이영희', now]
  );

  // 테스트 스쿼드 생성
  const squadId = uuidv4();
  await db.run(
    `INSERT INTO squads (squad_id, name, description, owner_id, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [squadId, '공시 화이팅', '공무원 시험 준비 모임', user1Id, now]
  );

  // 멤버 추가
  await db.run(
    `INSERT INTO squad_members (squad_member_id, squad_id, user_id, role, joined_at)
     VALUES (?, ?, ?, ?, ?)`,
    [uuidv4(), squadId, user1Id, 'owner', now]
  );

  await db.run(
    `INSERT INTO squad_members (squad_member_id, squad_id, user_id, role, joined_at)
     VALUES (?, ?, ?, ?, ?)`,
    [uuidv4(), squadId, user2Id, 'member', now]
  );

  console.log('Seed data inserted!');
  console.log('Test users:');
  console.log('  - test1@quest.app / test1234');
  console.log('  - test2@quest.app / test1234');
}

seed().catch(console.error);
```

---

## 8. 데이터베이스 백업

### 8.1 백업 스크립트
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_FILE="./quest.db"

mkdir -p $BACKUP_DIR

# SQLite 파일 복사
cp $DB_FILE "$BACKUP_DIR/quest_$DATE.db"

# SQL dump 생성
sqlite3 $DB_FILE .dump > "$BACKUP_DIR/quest_$DATE.sql"

echo "Backup created: quest_$DATE.db"

# 7일 이상 된 백업 삭제
find $BACKUP_DIR -name "quest_*.db" -mtime +7 -delete
find $BACKUP_DIR -name "quest_*.sql" -mtime +7 -delete
```

### 8.2 복구
```bash
# .db 파일 복구
cp ./backups/quest_20251223.db ./quest.db

# 또는 .sql 파일에서 복구
sqlite3 quest.db < ./backups/quest_20251223.sql
```

---

## 9. SQLite 주의사항

### 9.1 제약사항
* **동시 쓰기 제한**: 한 번에 하나의 쓰기 트랜잭션만 가능
* **락(Lock)**: 쓰기 중에는 다른 연결이 대기
* **트래픽 제한**: 소규모 MVP에는 충분하지만 대규모 서비스에는 부적합

### 9.2 성능 최적화
```javascript
// WAL 모드 활성화 (성능 향상)
db.run('PRAGMA journal_mode = WAL');

// 동기화 설정 (속도 vs 안정성)
db.run('PRAGMA synchronous = NORMAL');

// 캐시 크기 증가
db.run('PRAGMA cache_size = -64000'); // 64MB
```

### 9.3 트랜잭션 사용
```javascript
async function transferData() {
  await db.run('BEGIN TRANSACTION');
  try {
    await db.run('INSERT INTO ...');
    await db.run('UPDATE ...');
    await db.run('COMMIT');
  } catch (err) {
    await db.run('ROLLBACK');
    throw err;
  }
}
```

---

## 10. PostgreSQL로 마이그레이션 (Phase 2)

MVP가 성공하면 PostgreSQL로 전환:
1. 스키마는 거의 동일 (INTEGER → TIMESTAMP, TEXT → UUID)
2. 마이그레이션 도구: `sqlite3-to-postgres`
3. 데이터 백업 후 변환

---

**MVP 데이터베이스 체크리스트**:
- [x] SQLite 파일 기반
- [x] 간단한 스키마
- [x] 기본 인덱스
- [x] Promise 기반 래퍼
- [x] 메모리 저장소 (온라인 유저)
- [x] 백업 스크립트
