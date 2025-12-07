# Pictory (픽토리) - 이미지 및 짧은 글 공유 커뮤니티 웹서비스

## 🌟 개요 (Overview)

Pictory는 사용자들이 **시각적 콘텐츠**와 **간결한 텍스트**를 공유하고, 타인과 **실시간으로 소통(DM)**하며 **안전하게 연결**되는 커뮤니티 플랫폼을 제공합니다. 일상, 취미, 관심사를 시각적으로 기록하고 공유하며, 개인적인 대화를 원하는 10대 후반 ~ 30대 사용자들을 대상으로 합니다.

## ✨ 주요 기능 (Key Features)

*   **회원가입 및 인증:** 이메일 또는 소셜 로그인(예정)을 통한 회원가입 및 JWT 기반 인증 시스템.
*   **콘텐츠 업로드 및 피드:** 이미지(최대 10장)와 짧은 글을 업로드하고, 다양한 이미지 비율 선택 기능을 제공합니다. 팔로우하는 사용자의 게시물을 무한 스크롤 피드 형태로 확인합니다.
*   **상호작용:** 게시물에 '좋아요'를 누르거나 댓글을 작성/삭제할 수 있으며, 다른 사용자를 팔로우/언팔로우할 수 있습니다.
*   **실시간 다이렉트 메시지 (DM):** Socket.IO를 활용한 1:1 실시간 채팅 기능 및 메시지 수신 알림.
*   **검색:** 키워드를 통해 다른 사용자나 게시물을 검색할 수 있습니다.

## 🚀 주요 기술 스택 (Key Technologies)

*   **프론트엔드 & 백엔드:** Next.js (React, TypeScript) - 통합된 API Route 활용
*   **스타일링:** Styled-components, Tailwind CSS
*   **ORM:** TypeORM
*   **데이터베이스:** PostgreSQL
*   **실시간 통신:** Socket.IO (예정)
*   **인증:** JWT 기반
*   **린팅:** ESLint

## 🛠️ 설치 및 실행 방법 (Setup & Run)

프로젝트를 로컬 환경에서 실행하기 위한 단계입니다.

1.  **프로젝트 디렉토리 이동:**
    ```bash
    cd client
    ```

2.  **의존성 설치:**
    ```bash
    pnpm install
    ```

3.  **.env.local 파일 설정:**
    `client` 디렉토리 내에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정합니다. 데이터베이스 연결 정보와 JWT 비밀 키를 본인의 환경에 맞게 변경해주세요.

    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_NAME=pictory
    JWT_SECRET=your_very_strong_and_random_secret_key_here
    ```

4.  **개발 서버 시작:**
    ```bash
    pnpm dev
    ```
    서버는 기본적으로 `http://localhost:3000`에서 실행됩니다 (포트가 사용 중일 경우 다른 포트로 자동 할당).

## 📂 프로젝트 구조 (Project Structure)

```
/client
├── .next/                    # Next.js 빌드 및 캐시 디렉토리
├── lib/
│   └── typeorm/
│       ├── config/           # TypeORM 설정
│       └── entities/         # TypeORM 엔티티 (예: User.ts)
├── public/                   # 정적 파일
├── src/
│   ├── app/                  # Next.js App Router 구조
│   │   ├── api/              # API Routes (예: auth/login, auth/register)
│   │   ├── login/            # 로그인 페이지
│   │   ├── register/         # 회원가입 페이지
│   │   └── ...
│   └── ...
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── ...
```
