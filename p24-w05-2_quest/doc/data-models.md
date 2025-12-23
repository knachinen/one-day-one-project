
# [Data Models] Quest Database Schema

## 1. 데이터베이스 구조 개요 (Database Architecture)

### 1.1 PostgreSQL (관계형 데이터)
- 사용자 정보
- 스쿼드 및 멤버십
- 학습 세션 이력
- 메시지 및 사진 기록

### 1.2 Redis (실시간 데이터)
- 온라인 유저 목록
- 진행 중인 세션 상태
- 실시간 리액션 카운트
- WebSocket 연결 매핑

### 1.3 AWS S3 (파일 스토리지)
- 프로필 이미지
- 타임스탬프 인증 사진
- 스쿼드 대표 이미지

---

## 2. PostgreSQL 스키마 (Schema Definitions)

### 2.1 Users (사용자)
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    total_study_time INTEGER DEFAULT 0, -- seconds

    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### 2.2 Squads (그룹/스쿼드)
```sql
CREATE TABLE squads (
    squad_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT,
    owner_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    is_private BOOLEAN DEFAULT false,
    max_members INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT max_members_check CHECK (max_members > 0 AND max_members <= 100)
);

CREATE INDEX idx_squads_owner ON squads(owner_id);
CREATE INDEX idx_squads_created_at ON squads(created_at DESC);
```

### 2.3 Squad_Members (스쿼드 멤버십)
```sql
CREATE TABLE squad_members (
    squad_member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    squad_id UUID NOT NULL REFERENCES squads(squad_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- 'owner', 'admin', 'member'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,

    UNIQUE(squad_id, user_id)
);

CREATE INDEX idx_squad_members_squad ON squad_members(squad_id);
CREATE INDEX idx_squad_members_user ON squad_members(user_id);
CREATE INDEX idx_squad_members_joined ON squad_members(joined_at DESC);
```

### 2.4 Study_Sessions (학습 세션)
```sql
CREATE TABLE study_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    squad_id UUID REFERENCES squads(squad_id) ON DELETE SET NULL,
    session_type VARCHAR(20) DEFAULT 'free', -- 'pomodoro', 'free'
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration INTEGER, -- seconds (server-calculated)
    is_valid BOOLEAN DEFAULT true, -- 조작 감지 플래그
    client_start_time TIMESTAMP WITH TIME ZONE, -- 클라이언트 보고 시간
    client_end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT duration_check CHECK (duration IS NULL OR duration >= 0),
    CONSTRAINT end_after_start CHECK (end_time IS NULL OR end_time > start_time)
);

CREATE INDEX idx_sessions_user ON study_sessions(user_id);
CREATE INDEX idx_sessions_squad ON study_sessions(squad_id);
CREATE INDEX idx_sessions_start_time ON study_sessions(start_time DESC);
CREATE INDEX idx_sessions_user_date ON study_sessions(user_id, start_time DESC);
```

### 2.5 Messages (채팅 메시지)
```sql
CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    squad_id UUID NOT NULL REFERENCES squads(squad_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    message_type VARCHAR(20) NOT NULL, -- 'text', 'image', 'system'
    content TEXT,
    image_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false,

    CONSTRAINT message_content_check CHECK (
        (message_type = 'text' AND content IS NOT NULL) OR
        (message_type = 'image' AND image_url IS NOT NULL) OR
        (message_type = 'system' AND content IS NOT NULL)
    )
);

CREATE INDEX idx_messages_squad ON messages(squad_id, timestamp DESC);
CREATE INDEX idx_messages_user ON messages(user_id);
```

### 2.6 Photos (타임스탬프 인증 사진)
```sql
CREATE TABLE photos (
    photo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    squad_id UUID NOT NULL REFERENCES squads(squad_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    captured_at TIMESTAMP WITH TIME ZONE NOT NULL, -- 촬영 시각 (워터마크)
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT false, -- 서버 검증 여부
    exif_data JSONB, -- EXIF 메타데이터

    UNIQUE(message_id)
);

CREATE INDEX idx_photos_user ON photos(user_id);
CREATE INDEX idx_photos_squad ON photos(squad_id);
CREATE INDEX idx_photos_captured_at ON photos(captured_at DESC);
```

### 2.7 Reactions (리액션)
```sql
CREATE TABLE reactions (
    reaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(message_id, user_id, emoji)
);

CREATE INDEX idx_reactions_message ON reactions(message_id);
CREATE INDEX idx_reactions_user ON reactions(user_id);
```

### 2.8 Notifications (알림)
```sql
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL, -- 'session_complete', 'squad_invite', 'reaction'
    title VARCHAR(200) NOT NULL,
    content TEXT,
    related_id UUID, -- related entity (session_id, squad_id, etc.)
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
```

---

## 3. Redis 데이터 구조 (Redis Data Structures)

### 3.1 온라인 유저 (Sorted Set)
```redis
# Key: online:users:{squad_id}
# Value: user_id (Score: timestamp)
ZADD online:users:squad-uuid-123 1703318400 user-uuid-1
ZADD online:users:squad-uuid-123 1703318410 user-uuid-2

# 온라인 유저 조회 (최근 5분 이내)
ZRANGEBYSCORE online:users:squad-uuid-123 (NOW-300) +inf

# 오래된 연결 제거
ZREMRANGEBYSCORE online:users:squad-uuid-123 -inf (NOW-300)
```

### 3.2 라이브 캠 상태 (Set)
```redis
# Key: live:cam:{squad_id}
# Value: user_id
SADD live:cam:squad-uuid-123 user-uuid-1
SREM live:cam:squad-uuid-123 user-uuid-1

# 라이브 유저 조회
SMEMBERS live:cam:squad-uuid-123
```

### 3.3 진행 중인 세션 (Hash)
```redis
# Key: active:session:{user_id}
# Fields: session_id, start_time, squad_id
HSET active:session:user-uuid-1 session_id "session-uuid-123"
HSET active:session:user-uuid-1 start_time "2025-12-23T10:00:00Z"
HSET active:session:user-uuid-1 squad_id "squad-uuid-456"

# 세션 조회
HGETALL active:session:user-uuid-1

# 세션 종료 시 삭제
DEL active:session:user-uuid-1
```

### 3.4 실시간 리액션 카운트 (Hash)
```redis
# Key: reactions:{message_id}
# Fields: emoji (Value: count)
HINCRBY reactions:message-uuid-123 "🔥" 1
HINCRBY reactions:message-uuid-123 "💪" 1

# 리액션 조회
HGETALL reactions:message-uuid-123
```

### 3.5 WebSocket 연결 매핑 (String)
```redis
# Key: ws:connection:{socket_id}
# Value: user_id
SET ws:connection:socket-abc-123 user-uuid-1 EX 3600

# User → Socket 역매핑
SET ws:user:user-uuid-1 socket-abc-123 EX 3600
```

### 3.6 오늘의 학습 시간 캐시 (String)
```redis
# Key: study:today:{user_id}:{date}
# Value: seconds
SET study:today:user-uuid-1:2025-12-23 13500 EX 86400

# 증가
INCRBY study:today:user-uuid-1:2025-12-23 300
```

---

## 4. 데이터 관계도 (Entity Relationship)

```
Users (1) ──< (N) Squad_Members (N) >── (1) Squads
  │                                         │
  │                                         │
  └──< Study_Sessions >────────────────────┘
  │
  ├──< Messages >───────────────────────< Squads
  │      │
  │      ├──< Reactions
  │      └──< Photos
  │
  └──< Notifications
```

---

## 5. 주요 쿼리 패턴 (Query Patterns)

### 5.1 오늘의 학습 통계
```sql
SELECT
    SUM(duration) as total_study_time,
    COUNT(*) as session_count,
    AVG(duration) as avg_session_duration
FROM study_sessions
WHERE user_id = $1
  AND DATE(start_time AT TIME ZONE 'UTC') = CURRENT_DATE
  AND is_valid = true;
```

### 5.2 전일 대비 증감률
```sql
WITH today AS (
    SELECT COALESCE(SUM(duration), 0) as time
    FROM study_sessions
    WHERE user_id = $1
      AND DATE(start_time AT TIME ZONE 'UTC') = CURRENT_DATE
      AND is_valid = true
),
yesterday AS (
    SELECT COALESCE(SUM(duration), 0) as time
    FROM study_sessions
    WHERE user_id = $1
      AND DATE(start_time AT TIME ZONE 'UTC') = CURRENT_DATE - INTERVAL '1 day'
      AND is_valid = true
)
SELECT
    today.time as today_time,
    yesterday.time as yesterday_time,
    CASE
        WHEN yesterday.time = 0 THEN NULL
        ELSE ROUND((today.time - yesterday.time)::numeric / yesterday.time * 100, 1)
    END as change_percentage
FROM today, yesterday;
```

### 5.3 스쿼드 멤버 및 온라인 상태
```sql
SELECT
    u.user_id,
    u.username,
    u.profile_image_url,
    sm.joined_at,
    EXISTS(
        SELECT 1 FROM study_sessions ss
        WHERE ss.user_id = u.user_id
          AND ss.end_time IS NULL
          AND ss.start_time > NOW() - INTERVAL '6 hours'
    ) as is_studying,
    COALESCE(SUM(ss.duration), 0) as today_study_time
FROM squad_members sm
JOIN users u ON sm.user_id = u.user_id
LEFT JOIN study_sessions ss ON ss.user_id = u.user_id
    AND DATE(ss.start_time AT TIME ZONE 'UTC') = CURRENT_DATE
    AND ss.is_valid = true
WHERE sm.squad_id = $1
  AND sm.is_active = true
GROUP BY u.user_id, u.username, u.profile_image_url, sm.joined_at
ORDER BY is_studying DESC, today_study_time DESC;
```

### 5.4 채팅 메시지 페이지네이션
```sql
SELECT
    m.message_id,
    m.message_type,
    m.content,
    m.image_url,
    m.timestamp,
    u.user_id,
    u.username,
    u.profile_image_url,
    (
        SELECT json_agg(json_build_object(
            'emoji', r.emoji,
            'count', COUNT(*),
            'users', json_agg(r.user_id)
        ))
        FROM reactions r
        WHERE r.message_id = m.message_id
        GROUP BY r.emoji
    ) as reactions
FROM messages m
LEFT JOIN users u ON m.user_id = u.user_id
WHERE m.squad_id = $1
  AND m.is_deleted = false
  AND ($2::uuid IS NULL OR m.message_id < $2)
ORDER BY m.timestamp DESC
LIMIT $3;
```

---

## 6. 데이터 보존 정책 (Data Retention)

### 6.1 PostgreSQL
- **Users:** 영구 보존 (탈퇴 시 익명화 처리)
- **Study_Sessions:** 3년 보존 후 통계만 유지
- **Messages:** 1년 보존 (image_url은 6개월 후 S3에서 삭제)
- **Photos:** 6개월 보존
- **Reactions:** 1년 보존
- **Notifications:** 3개월 보존

### 6.2 Redis
- **Online Users:** TTL 5분
- **Active Sessions:** TTL 12시간
- **WebSocket Connections:** TTL 1시간
- **Reaction Counts:** TTL 24시간

### 6.3 S3
- **Profile Images:** 영구 보존
- **Squad Images:** 영구 보존
- **Timestamp Photos:** 6개월 보존 후 Glacier로 이동

---

## 7. 인덱스 최적화 전략 (Index Strategy)

### 7.1 주요 인덱스
```sql
-- 복합 인덱스: 사용자별 최근 세션 조회
CREATE INDEX idx_sessions_user_recent
ON study_sessions(user_id, start_time DESC)
WHERE is_valid = true;

-- 부분 인덱스: 진행 중인 세션
CREATE INDEX idx_sessions_active
ON study_sessions(user_id, session_id)
WHERE end_time IS NULL;

-- 전문 검색 인덱스: 스쿼드 이름 검색
CREATE INDEX idx_squads_name_search
ON squads USING gin(to_tsvector('english', name));
```

---

## 8. 마이그레이션 가이드 (Migration Guide)

### 8.1 초기 설정
```bash
# PostgreSQL 확장 설치
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- 유사 문자열 검색용

# 타임존 설정
SET timezone = 'UTC';
```

### 8.2 시드 데이터
```sql
-- 테스트 사용자
INSERT INTO users (email, password_hash, username) VALUES
('test@quest.app', '$2b$10$...', '테스트유저'),
('admin@quest.app', '$2b$10$...', '관리자');

-- 테스트 스쿼드
INSERT INTO squads (name, description, owner_id) VALUES
('공시 화이팅', '공무원 시험 준비 모임', (SELECT user_id FROM users WHERE email = 'admin@quest.app'));
```

---

## 9. 백업 및 복구 (Backup & Recovery)

### 9.1 PostgreSQL 백업
```bash
# 매일 자동 백업 (cron)
pg_dump -h localhost -U quest_user quest_db | gzip > backup_$(date +%Y%m%d).sql.gz

# 특정 테이블만 백업
pg_dump -h localhost -U quest_user -t study_sessions quest_db > sessions_backup.sql
```

### 9.2 Redis 백업
```bash
# RDB 스냅샷 생성
SAVE

# AOF 로그 활성화 (redis.conf)
appendonly yes
appendfsync everysec
```

---

## 10. 성능 모니터링 (Performance Monitoring)

### 10.1 주요 모니터링 지표
- PostgreSQL 슬로우 쿼리 (> 1초)
- Redis 메모리 사용률 (< 80%)
- 테이블 크기 및 인덱스 비율
- 동시 접속자 수

### 10.2 슬로우 쿼리 확인
```sql
-- PostgreSQL에서 느린 쿼리 조회
SELECT
    query,
    calls,
    total_time,
    mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```
