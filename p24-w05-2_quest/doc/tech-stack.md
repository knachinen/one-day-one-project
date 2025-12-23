
## 1. 프론트엔드 (Mobile App)
다양한 기기 대응과 빠른 개발 속도를 위해 **크로스 플랫폼 프레임워크**를 추천합니다.

* **React Native**: JavaScript/TypeScript 기반으로 풍부한 라이브러리 생태계를 보유하고 있습니다.
* **주요 라이브러리**:
    * **카메라 및 이미지 처리**: `react-native-vision-camera` (고성능 카메라 제어) 및 `react-native-image-editor` (타임스탬프 워터마크 합성).
    * **상태 관리**: `Zustand` 또는 `Recoil` (학습 타이머 및 세션 상태의 가벼운 관리).
    * **실시간 통신**: `Socket.io-client` (실시간 채팅 및 리액션 수신).

## 2. 백엔드 (Server & API)
정확한 시간 관리와 실시간 동기화가 앱의 신뢰성을 결정합니다.

* **Node.js (NestJS)**: TypeScript 지원이 강력하며, 소켓 통신(Socket.io)과의 궁합이 매우 뛰어납니다.
* **실시간 통신**: `WebSockets / Socket.io` (채팅, 리액션, 온라인 인원 실시간 업데이트).
* **시간 동기화**: 서버 시간을 기준으로 모든 세션을 관리하여 기기 시간 조작을 방지합니다.

## 3. 데이터베이스 및 스토리지 (Database)
데이터의 성격에 따라 분산하여 관리하는 것이 효율적입니다.

* **RDBMS (PostgreSQL)**: 사용자 정보, 스쿼드 설정, 학습 세션 이력 등 구조화된 데이터 저장.
* **In-Memory DB (Redis)**: 실시간 온라인 유저 목록, 현재 진행 중인 타이머 정보, 실시간 리액션 데이터의 빠른 처리.
* **Cloud Storage (AWS S3)**: 타임스탬프가 합성된 인증 사진 저장.

## 4. 라이브 스트리밍 (Live Cam Bar)
비디오 데이터 전송을 위한 저지연 솔루션이 필요합니다.

* **WebRTC (Agora 또는 Twilio Video)**: 1:N 형태의 가벼운 영상 공유를 위해 직접 구축보다는 SDK 기반 솔루션을 추천합니다.
* **특징**: 음성을 제외한 영상 데이터만 전송하여 서버 부하와 데이터 소모를 최소화합니다.

## 5. 인증 및 보안 (Authentication & Security)
학습 시간 조작 방지와 사용자 데이터 보호가 핵심입니다.

### 5.1 인증 시스템
* **JWT (JSON Web Token)**: Stateless 인증 방식으로 확장성 확보
    * **Access Token**: 짧은 만료 시간 (1시간)
    * **Refresh Token**: 긴 만료 시간 (7일), HttpOnly 쿠키에 저장
* **비밀번호 암호화**: `bcrypt` 해싱 (salt rounds: 10)
* **OAuth 2.0 연동** (Phase 2): Google, Apple 소셜 로그인 지원

### 5.2 시간 조작 방지 (Anti-Cheat)
학습 시간의 신뢰성이 서비스의 핵심 가치입니다.

* **서버 시간 기준**: 모든 세션 시작/종료는 서버 타임스탬프로 기록
* **시간 동기화 검증**: 클라이언트와 서버 시간 차이가 5분 이상일 경우 경고 및 세션 무효화
* **이상 패턴 감지**:
    * 연속 세션이 12시간을 초과하는 경우
    * 하루에 24시간 이상 학습 기록
    * 클라이언트 시간이 과거로 되돌아가는 경우
* **타임스탬프 사진 검증**: EXIF 데이터의 촬영 시각과 업로드 시각 비교

### 5.3 데이터 보안
* **HTTPS 강제**: 모든 API 통신은 TLS 1.3 암호화
* **WebSocket 보안**: WSS(Secure WebSocket) 프로토콜 사용
* **Rate Limiting**:
    * IP 기반 요청 제한 (DDoS 방지)
    * 사용자별 메시지 전송 제한 (스팸 방지)
* **입력 검증**:
    * SQL Injection 방지 (Prepared Statements)
    * XSS 방지 (입력값 sanitization)
    * 파일 업로드 검증 (타입, 크기, 악성코드 스캔)

### 5.4 개인정보 보호
* **민감 데이터 암호화**: 이메일, 전화번호 등은 데이터베이스 레벨에서 암호화
* **로그 관리**: 개인 식별 정보는 로그에서 마스킹 처리
* **데이터 익명화**: 사용자 탈퇴 시 개인정보 삭제 및 통계 데이터 익명화
* **GDPR/개인정보보호법 준수**: 사용자 데이터 다운로드 및 삭제 기능 제공

## 6. 배포 및 인프라 (Deployment & Infrastructure)

### 6.1 클라우드 플랫폼
* **AWS (Amazon Web Services)** 권장:
    * **EC2**: 백엔드 서버 (Auto Scaling)
    * **RDS**: PostgreSQL 관리형 데이터베이스
    * **ElastiCache**: Redis 클러스터
    * **S3**: 이미지 파일 저장소
    * **CloudFront**: CDN (이미지 전송 최적화)
    * **ALB**: Application Load Balancer (트래픽 분산)

### 6.2 CI/CD 파이프라인
* **GitHub Actions** 또는 **GitLab CI**:
    * 코드 푸시 시 자동 테스트 실행
    * 테스트 통과 시 자동 배포 (Staging → Production)
* **Docker**: 컨테이너 기반 배포로 환경 일관성 확보
* **Kubernetes (선택)**: 대규모 트래픽 대비 오케스트레이션

### 6.3 모니터링 및 로깅
* **Application Monitoring**: Sentry (에러 추적), New Relic 또는 DataDog (성능 모니터링)
* **Logging**: CloudWatch Logs 또는 ELK Stack (Elasticsearch, Logstash, Kibana)
* **Real-time Dashboard**: Grafana + Prometheus (시스템 메트릭 시각화)

## 7. 버전 관리 및 협업 도구 (Development Tools)

* **Version Control**: Git + GitHub
* **API 문서화**: Swagger/OpenAPI (자동 생성 API 문서)
* **프로젝트 관리**: Jira, Linear, 또는 GitHub Projects
* **디자인 협업**: Figma (디자인 시스템 공유)
* **커뮤니케이션**: Slack 또는 Discord (개발팀 소통)
