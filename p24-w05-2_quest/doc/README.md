
# Quest 문서 가이드

## 📚 문서 개요

Quest 프로젝트의 모든 문서는 **MVP 단계**와 **Production 단계**로 구분되어 있습니다.

---

## 🚀 MVP 단계 (지금 시작하기)

빠른 프로토타입과 로컬 개발을 위한 간소화된 문서입니다.

### 필수 문서 (읽어야 할 순서)
1. **[mvp-setup-guide.md](./mvp-setup-guide.md)** ⭐ 시작점
   - 개발 환경 설정
   - 서버 및 앱 설정
   - 단계별 실행 가이드

2. **[tech-stack-mvp.md](./tech-stack-mvp.md)**
   - 간소화된 기술 스택
   - SQLite + Express + Expo
   - 클라우드 서비스 제외

3. **[data-models-mvp.md](./data-models-mvp.md)**
   - SQLite 스키마
   - 샘플 코드
   - 쿼리 예시

### 참고 문서
- **[phase-1.md](./phase-1.md)** - UI 구현 가이드
- **[design-tokens.md](./design-tokens.md)** - 디자인 시스템
- **[design-1-dashboard.md](./design-1-dashboard.md)** - 화면별 디자인

---

## 🏢 Production 단계 (나중에 참고)

서비스 확장과 배포를 위한 전체 문서입니다.

### 기획 문서
- **[prd.md](./prd.md)** - 제품 요구사항
- **[design-0-overview.md](./design-0-overview.md)** - 디자인 원칙

### 기술 문서 (고급)
- **[tech-stack.md](./tech-stack.md)** - 전체 기술 스택 (AWS, Docker, CI/CD)
- **[data-models.md](./data-models.md)** - PostgreSQL 스키마 (확장용)
- **[api-spec.md](./api-spec.md)** - 전체 API 명세

---

## 📖 문서 읽기 가이드

### "처음 시작하는 경우"
```
1. mvp-setup-guide.md (설정)
   ↓
2. tech-stack-mvp.md (기술 이해)
   ↓
3. data-models-mvp.md (데이터 구조)
   ↓
4. phase-1.md (UI 구현)
```

### "MVP 기능 구현 중"
```
- design-tokens.md (스타일링)
- design-1-dashboard.md (화면 디자인)
- data-models-mvp.md (쿼리 참고)
```

### "서비스 확장 준비"
```
- tech-stack.md (인프라 계획)
- data-models.md (DB 마이그레이션)
- api-spec.md (API 문서화)
```

---

## 🎯 문서별 목적

| 문서 | 용도 | 대상 |
|------|------|------|
| mvp-setup-guide.md | 환경 설정 및 실행 | 개발자 (필수) |
| tech-stack-mvp.md | MVP 기술 스택 이해 | 개발자 |
| data-models-mvp.md | SQLite 스키마 및 쿼리 | 백엔드 개발자 |
| design-tokens.md | UI 스타일 가이드 | 프론트엔드 개발자 |
| phase-1.md | UI 구현 가이드 | 프론트엔드 개발자 |
| prd.md | 제품 이해 | 전체 팀 |
| api-spec.md | API 명세 | 백엔드/프론트엔드 |
| tech-stack.md | 프로덕션 인프라 | DevOps/백엔드 |
| data-models.md | PostgreSQL 스키마 | 백엔드 (확장 시) |

---

## ⚡ 빠른 시작

```bash
# 1. mvp-setup-guide.md를 열고 따라하기
open mvp-setup-guide.md

# 2. 서버 시작
cd server
npm run init-db
npm run dev

# 3. 앱 시작
cd mobile
npx expo start
```

---

## 🔄 MVP에서 Production으로 전환

### MVP 완료 기준
- [ ] 사용자 인증 작동
- [ ] 타이머 기능 작동
- [ ] 실시간 채팅 작동
- [ ] 사진 업로드 작동
- [ ] 2명 이상 동시 접속 테스트 완료

### Production 준비 체크리스트
- [ ] SQLite → PostgreSQL 마이그레이션
- [ ] 로컬 파일 → S3 마이그레이션
- [ ] 메모리 저장소 → Redis 전환
- [ ] HTTP → HTTPS 적용
- [ ] 도메인 및 서버 구매
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 시스템 구축

---

## 📁 문서 구조

```
doc/
├── README.md                    # 이 파일 (가이드)
│
├── MVP 문서 (지금 사용)
│   ├── mvp-setup-guide.md      ⭐ 시작점
│   ├── tech-stack-mvp.md       # 간소화된 기술 스택
│   └── data-models-mvp.md      # SQLite 스키마
│
├── 기획 및 디자인
│   ├── prd.md                   # 제품 요구사항
│   ├── design-0-overview.md     # 디자인 원칙
│   ├── design-1-dashboard.md    # 화면별 디자인
│   ├── design-tokens.md         # 디자인 시스템
│   └── phase-1.md              # Phase 1 구현 가이드
│
└── Production 문서 (나중에)
    ├── tech-stack.md            # 전체 기술 스택
    ├── data-models.md           # PostgreSQL 스키마
    └── api-spec.md             # 전체 API 명세
```

---

## 💡 팁

### MVP 개발 시
- ❌ "완벽하게" 만들려고 하지 마세요
- ✅ "작동하는" 것을 빠르게 만드세요
- ✅ 기능 하나씩 완성하며 테스트하세요
- ✅ 문제가 생기면 mvp-setup-guide.md의 "문제 해결" 참고

### 코드 작성 시
- ✅ design-tokens.md의 값을 그대로 사용하세요
- ✅ data-models-mvp.md의 쿼리 예시를 복사하세요
- ✅ 복잡한 기능은 Phase 2로 미루세요

---

## 🆘 도움이 필요한 경우

1. **설정 문제**: mvp-setup-guide.md의 "5. 문제 해결" 참고
2. **기술 질문**: tech-stack-mvp.md 참고
3. **디자인 질문**: design-tokens.md, design-1-dashboard.md 참고
4. **데이터베이스 질문**: data-models-mvp.md 참고

---

## 📌 문서 버전

- **최종 업데이트**: 2025-12-23
- **문서 버전**: 1.0.0-mvp
- **프로젝트 단계**: MVP (Phase 1)

---

**🎉 Quest 프로젝트를 시작합니다!**

`mvp-setup-guide.md`부터 시작하세요 →
