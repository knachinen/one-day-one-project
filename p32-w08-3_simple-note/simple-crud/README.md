# Simple Note CRUD with Supabase

이 프로젝트는 Next.js와 Supabase를 사용하여 만든 간단한 노트 관리 애플리케이션입니다.

## 주요 기능
- **노트 목록 조회**: 작성된 모든 노트를 최신순으로 확인
- **노트 작성**: 제목과 내용을 입력하여 새 노트 생성
- **노트 수정**: 기존 노트의 내용 변경
- **노트 삭제**: 불필요한 노트 삭제
- **데이터 백업**: Supabase의 데이터를 JSON 파일로 로컬에 저장

## 시작하기

### 1. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local` 파일을 만들고 Supabase 정보를 입력하세요.
```bash
cp .env.example .env.local
```

### 2. 의존성 설치
```bash
pnpm install
```

### 3. 개발 서버 실행
```bash
pnpm dev
```

## 주요 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm test`: Vitest를 이용한 테스트 실행
- `pnpm lint`: 코드 스타일 및 오류 검사
- `pnpm export:notes`: Supabase의 데이터를 `data/notes_backup.json`으로 백업

## 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Testing**: Vitest, React Testing Library
- **CI/CD**: GitHub Actions