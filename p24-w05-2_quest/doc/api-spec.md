
# [API Specification] Quest API

## 1. API 아키텍처 개요 (Architecture Overview)

* **Base URL:** `https://api.quest.app/v1`
* **Protocol:** REST API + WebSocket
* **Authentication:** JWT Bearer Token
* **Response Format:** JSON
* **Timestamp Format:** ISO 8601 (UTC)

---

## 2. 인증 (Authentication)

### 2.1 회원가입
```http
POST /auth/register
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "securePassword123!",
  "username": "김철수",
  "profileImage": "base64_encoded_image" // optional
}

Response: 201 Created
{
  "success": true,
  "data": {
    "userId": "uuid-v4",
    "email": "user@example.com",
    "username": "김철수",
    "createdAt": "2025-12-23T10:30:00Z"
  }
}
```

### 2.2 로그인
```http
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "securePassword123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600,
    "user": {
      "userId": "uuid-v4",
      "email": "user@example.com",
      "username": "김철수"
    }
  }
}
```

### 2.3 토큰 갱신
```http
POST /auth/refresh
Content-Type: application/json

Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "expiresIn": 3600
  }
}
```

---

## 3. 사용자 관리 (User Management)

### 3.1 내 프로필 조회
```http
GET /users/me
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "userId": "uuid-v4",
    "username": "김철수",
    "email": "user@example.com",
    "profileImage": "https://cdn.quest.app/profile/...",
    "totalStudyTime": 18000, // seconds
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

### 3.2 프로필 수정
```http
PATCH /users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "username": "김철수_수정",
  "profileImage": "base64_encoded_image"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "userId": "uuid-v4",
    "username": "김철수_수정",
    "profileImage": "https://cdn.quest.app/profile/..."
  }
}
```

---

## 4. 학습 세션 (Study Sessions)

### 4.1 세션 시작
```http
POST /sessions/start
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "squadId": "squad-uuid", // optional
  "sessionType": "pomodoro" // or "free"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "sessionId": "session-uuid",
    "userId": "user-uuid",
    "startTime": "2025-12-23T10:00:00Z",
    "serverTime": "2025-12-23T10:00:00Z", // 조작 방지용
    "sessionType": "pomodoro"
  }
}
```

### 4.2 세션 종료
```http
POST /sessions/{sessionId}/end
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "endTime": "2025-12-23T11:30:00Z" // client time
}

Response: 200 OK
{
  "success": true,
  "data": {
    "sessionId": "session-uuid",
    "startTime": "2025-12-23T10:00:00Z",
    "endTime": "2025-12-23T11:30:00Z",
    "duration": 5400, // seconds (server-calculated)
    "isValid": true // 조작 감지 여부
  }
}
```

### 4.3 오늘의 학습 통계
```http
GET /sessions/today
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "date": "2025-12-23",
    "totalStudyTime": 13500, // seconds
    "goalTime": 18000, // seconds (5 hours)
    "completionRate": 75, // percentage
    "sessions": [
      {
        "sessionId": "uuid-1",
        "startTime": "2025-12-23T09:00:00Z",
        "endTime": "2025-12-23T10:30:00Z",
        "duration": 5400
      }
    ],
    "comparisonToYesterday": {
      "change": 12, // percentage
      "trend": "up" // or "down" or "same"
    }
  }
}
```

### 4.4 학습 기록 조회 (기간별)
```http
GET /sessions/history?startDate=2025-12-01&endDate=2025-12-23
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2025-12-01",
      "endDate": "2025-12-23"
    },
    "totalStudyTime": 180000,
    "averageDailyTime": 7826,
    "dailyBreakdown": [
      {
        "date": "2025-12-01",
        "totalTime": 14400,
        "sessionCount": 3
      }
    ]
  }
}
```

---

## 5. 스쿼드 (Squad/Group)

### 5.1 스쿼드 생성
```http
POST /squads
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "name": "공시 화이팅",
  "description": "공무원 시험 준비 모임",
  "image": "base64_encoded_image",
  "isPrivate": false,
  "maxMembers": 20
}

Response: 201 Created
{
  "success": true,
  "data": {
    "squadId": "squad-uuid",
    "name": "공시 화이팅",
    "ownerId": "user-uuid",
    "createdAt": "2025-12-23T10:00:00Z"
  }
}
```

### 5.2 스쿼드 목록 조회
```http
GET /squads?page=1&limit=20
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "squads": [
      {
        "squadId": "squad-uuid",
        "name": "공시 화이팅",
        "memberCount": 15,
        "onlineCount": 4,
        "image": "https://cdn.quest.app/squad/...",
        "isJoined": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
}
```

### 5.3 스쿼드 가입
```http
POST /squads/{squadId}/join
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "squadId": "squad-uuid",
    "userId": "user-uuid",
    "joinedAt": "2025-12-23T10:00:00Z"
  }
}
```

### 5.4 스쿼드 멤버 조회
```http
GET /squads/{squadId}/members
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "members": [
      {
        "userId": "user-uuid",
        "username": "김철수",
        "profileImage": "https://cdn.quest.app/profile/...",
        "isOnline": true,
        "isLive": true, // 캠 켜짐 여부
        "todayStudyTime": 7200
      }
    ]
  }
}
```

---

## 6. 채팅 및 인증 사진 (Chat & Verification)

### 6.1 메시지 전송
```http
POST /squads/{squadId}/messages
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "type": "text", // or "image" or "system"
  "content": "오늘도 화이팅!",
  "timestamp": "2025-12-23T10:30:00Z"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "messageId": "message-uuid",
    "userId": "user-uuid",
    "username": "김철수",
    "type": "text",
    "content": "오늘도 화이팅!",
    "timestamp": "2025-12-23T10:30:00Z"
  }
}
```

### 6.2 타임스탬프 사진 업로드
```http
POST /squads/{squadId}/photos
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

Request:
- photo: [image file]
- capturedAt: "2025-12-23T10:30:22Z"

Response: 201 Created
{
  "success": true,
  "data": {
    "photoId": "photo-uuid",
    "userId": "user-uuid",
    "imageUrl": "https://cdn.quest.app/photos/...",
    "timestamp": "2025-12-23T10:30:22Z",
    "isVerified": true // 서버 검증 결과
  }
}
```

### 6.3 리액션 추가
```http
POST /messages/{messageId}/reactions
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "emoji": "🔥"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "reactionId": "reaction-uuid",
    "messageId": "message-uuid",
    "userId": "user-uuid",
    "emoji": "🔥",
    "createdAt": "2025-12-23T10:30:00Z"
  }
}
```

### 6.4 채팅 기록 조회
```http
GET /squads/{squadId}/messages?limit=50&before={messageId}
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "messages": [
      {
        "messageId": "message-uuid",
        "userId": "user-uuid",
        "username": "김철수",
        "profileImage": "https://cdn.quest.app/profile/...",
        "type": "text",
        "content": "오늘도 화이팅!",
        "timestamp": "2025-12-23T10:30:00Z",
        "reactions": [
          {
            "emoji": "🔥",
            "count": 3,
            "users": ["user-uuid-1", "user-uuid-2"]
          }
        ]
      }
    ],
    "hasMore": true
  }
}
```

---

## 7. WebSocket 이벤트 (Real-time Events)

### 7.1 연결
```javascript
// Client connection
const socket = io('wss://api.quest.app', {
  auth: {
    token: 'Bearer_token_here'
  }
});
```

### 7.2 스쿼드 참여
```javascript
// Client → Server
socket.emit('squad:join', {
  squadId: 'squad-uuid'
});

// Server → Client
socket.on('squad:joined', {
  squadId: 'squad-uuid',
  onlineMembers: [
    {
      userId: 'user-uuid',
      username: '김철수',
      isLive: true
    }
  ]
});
```

### 7.3 실시간 메시지 수신
```javascript
// Server → Client
socket.on('message:new', {
  messageId: 'message-uuid',
  userId: 'user-uuid',
  username: '김철수',
  type: 'text',
  content: '오늘도 화이팅!',
  timestamp: '2025-12-23T10:30:00Z'
});
```

### 7.4 온라인 상태 업데이트
```javascript
// Server → Client
socket.on('members:online', {
  squadId: 'squad-uuid',
  onlineCount: 12,
  members: [
    {
      userId: 'user-uuid',
      isOnline: true,
      isLive: false
    }
  ]
});
```

### 7.5 라이브 캠 상태 변경
```javascript
// Client → Server
socket.emit('cam:status', {
  squadId: 'squad-uuid',
  isLive: true
});

// Server → All squad members
socket.on('member:cam:changed', {
  userId: 'user-uuid',
  username: '김철수',
  isLive: true
});
```

### 7.6 리액션 실시간 알림
```javascript
// Server → Client
socket.on('reaction:added', {
  messageId: 'message-uuid',
  emoji: '🔥',
  userId: 'user-uuid',
  username: '김철수'
});
```

---

## 8. 에러 코드 (Error Codes)

### 8.1 HTTP 상태 코드
| Code | Description |
|------|-------------|
| 200 | OK - 요청 성공 |
| 201 | Created - 리소스 생성 성공 |
| 400 | Bad Request - 잘못된 요청 |
| 401 | Unauthorized - 인증 실패 |
| 403 | Forbidden - 권한 없음 |
| 404 | Not Found - 리소스 없음 |
| 409 | Conflict - 중복 데이터 |
| 429 | Too Many Requests - 요청 제한 초과 |
| 500 | Internal Server Error - 서버 오류 |

### 8.2 커스텀 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "AUTH_TOKEN_EXPIRED",
    "message": "인증 토큰이 만료되었습니다.",
    "details": {
      "expiredAt": "2025-12-23T10:00:00Z"
    }
  }
}
```

### 8.3 주요 에러 코드
| Error Code | Description |
|------------|-------------|
| `AUTH_TOKEN_EXPIRED` | 토큰 만료 |
| `AUTH_INVALID_CREDENTIALS` | 잘못된 인증 정보 |
| `SESSION_ALREADY_ACTIVE` | 이미 세션 진행 중 |
| `SESSION_TIME_INVALID` | 세션 시간 조작 감지 |
| `SQUAD_FULL` | 스쿼드 정원 초과 |
| `SQUAD_NOT_MEMBER` | 스쿼드 멤버 아님 |
| `RATE_LIMIT_EXCEEDED` | 요청 제한 초과 |

---

## 9. 보안 고려사항 (Security Considerations)

### 9.1 시간 조작 방지
* 모든 세션 시작/종료는 서버 시간 기준으로 기록
* 클라이언트 시간과 서버 시간 차이가 5분 이상일 경우 경고
* 세션 duration은 서버에서 계산하여 응답

### 9.2 Rate Limiting
* 메시지 전송: 10 requests / minute
* 세션 시작: 20 requests / hour
* 리액션 추가: 30 requests / minute

### 9.3 이미지 검증
* 최대 파일 크기: 10MB
* 허용 포맷: JPG, PNG, WebP
* 타임스탬프 워터마크 서버 검증 (EXIF 데이터 확인)

---

## 10. 버전 관리 (Versioning)

* API 버전은 URL에 포함 (`/v1`, `/v2`)
* Breaking changes 발생 시 새 버전 릴리즈
* 구버전은 최소 6개월 지원
