# MVP 공유 플랫폼 (LaunchPad MVP)

창업가와 개발자들이 제품 아이디어를 공유하고, 커뮤니티 피드백을 통해 검증받으며, MVP부터 실제 제품 런칭까지 함께 성장하는 플랫폼입니다.

---

![Project Screenshot](https://raw.githubusercontent.com/user/repo/main/doc/15-03-1_0-landingpage.png) 
*실제 프로젝트 스크린샷으로 교체 예정*

## ✨ 주요 기능

- **🚀 아이디어 공유 및 검증**: 제품을 만들기 전, 아이디어를 공유하고 시장의 반응을 미리 확인하세요.
- **📈 성장 과정 기록**: 아이디어 등록부터 MVP 개발, 런칭까지의 모든 여정을 기록하고 공유할 수 있습니다.
- **💬 커뮤니티 피드백**: 투표와 댓글을 통해 잠재 고객으로부터 실질적인 피드백을 얻으세요.
- **👤 사용자 프로필**: 자신의 프로젝트와 커뮤니티 활동을 보여주는 프로필 페이지를 가질 수 있습니다.
- **🔍 새로운 아이디어 탐색**: 트렌딩, 최신, 카테고리별로 다양한 아이디어를 탐색하고 영감을 얻으세요.

## 🛠️ 주요 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 16 (App Router, React 19)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui (Radix UI 기반)

### 백엔드
- **런타임**: Bun
- **프레임워크**: Hono (API 라우트)
- **인증**: Lucia Auth
- **ORM**: Drizzle ORM

### 데이터베이스
- **개발 DB**: SQLite
- **프로덕션 DB**: Neon (PostgreSQL)

## 🚀 시작하기

프로젝트를 로컬 환경에서 실행하는 방법은 다음과 같습니다.

### 사전 준비
- Node.js (v20 이상)
- `bun`

### 설치 및 실행
1.  **레포지토리 클론**
    ```bash
    git clone https://github.com/your-repo/p15_mvp_platform.git
    cd p15_mvp_platform
    ```

2.  **의존성 설치**
    ```bash
    bun install
    ```

3.  **데이터베이스 마이그레이션** (필요한 경우)
    ```bash
    bun run drizzle:push
    ```

4.  **개발 서버 실행**
    ```bash
    bun dev
    ```

5.  브라우저에서 `http://localhost:3000` 주소로 접속합니다.

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면 언제든지 환영합니다! 이슈를 열거나 Pull Request를 보내주세요.

1.  프로젝트를 Fork 합니다.
2.  새로운 기능 브랜치를 생성합니다. (`git checkout -b feature/AmazingFeature`)
3.  변경 사항을 커밋합니다. (`git commit -m 'Add some AmazingFeature'`)
4.  브랜치에 푸시합니다. (`git push origin feature/AmazingFeature`)
5.  Pull Request를 생성합니다.

---

*이 README는 프로젝트의 현재 상태를 기반으로 작성되었으며, 기능 추가 및 변경에 따라 업데이트될 수 있습니다.*
