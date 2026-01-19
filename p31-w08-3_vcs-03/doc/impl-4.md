아래는 **4단계 (콘텐츠 실데이터 적용 + 프로젝트 상세 페이지)**에 대한
**실무용 상세 구현 명세서 + 독립 실행 가능한 TODO 리스트**입니다.
3단계에서 만든 Skeleton 구조를 **“진짜 포트폴리오”로 전환**하는 단계입니다.

---

# **📌 4단계 상세 구현 명세서**

### **단계명**

**콘텐츠 실데이터 적용 & 프로젝트 상세 페이지 구축**

---

## **단계 목표**

* 더미/스켈레톤 UI → **실제 콘텐츠 전환**
* Work 페이지에서 **프로젝트 클릭 → 상세 페이지 진입**
* “이 사람이 실제로 무엇을 했는지”를 명확히 전달

---

# **4단계 산출물 (Deliverables)**

* 실제 텍스트 콘텐츠 반영
* 프로젝트 데이터 구조 정의
* `/work/[slug]` 상세 페이지 생성
* Work → Detail 네비게이션 완성
* SEO용 상세 페이지 메타데이터

---

# **1. 콘텐츠 데이터 구조 설계**

## **1.1 프로젝트 데이터 정의**

### 파일

```
/data/projects.ts
```

### 데이터 스키마 (예시)

```ts
export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  role: string
  techStack: string[]
  period: string
  links?: {
    demo?: string
    github?: string
  }
}
```

---

## **1.2 TODO**

* [ ] 프로젝트 타입 정의
* [ ] 최소 2–3개 프로젝트 데이터 작성
* [ ] 실제/유사 콘텐츠 적용 (가짜 lorem 금지)

---

# **2. Work 페이지 실데이터 연결**

## **2.1 변경 사항**

* Skeleton 제거
* `projects.ts` 데이터 바인딩

### TODO

* [ ] 더미 배열 제거
* [ ] map으로 프로젝트 렌더링
* [ ] ProjectCard에 실제 데이터 전달
* [ ] 카드 클릭 시 상세 페이지 이동

---

## **2.2 ProjectCard 개선**

### 추가 요소

* 역할(Role)
* 기술 스택 태그

### TODO

* [ ] hover 시 클릭 가능 UX 강화
* [ ] 카드 전체 clickable 처리
* [ ] 모바일에서 터치 영역 확보

---

# **3. 프로젝트 상세 페이지 구현**

## **3.1 라우트 구조**

```
/app/work/[slug]/page.tsx
```

---

## **3.2 페이지 섹션 구조**

```
[Project Header]
 ├─ Title
 ├─ Summary
 ├─ Meta (Role / Period)

[Project Content]
 ├─ Description
 ├─ Tech Stack
 ├─ Contribution

[Project Links]
 ├─ Demo
 ├─ GitHub
```

---

## **3.3 TODO**

* [ ] dynamic route 생성
* [ ] slug 기반 프로젝트 찾기
* [ ] 프로젝트 없을 경우 404 처리
* [ ] 뒤로가기 링크 추가

---

# **4. SEO & 메타데이터 강화**

## **4.1 상세 페이지 Metadata**

### 설정 항목

* title: `Project Name | Portfolio`
* description: summary 기반
* OG 기본 이미지 사용

### TODO

* [ ] generateMetadata 구현
* [ ] slug 기반 메타 데이터 생성

---

# **5. About 페이지 실콘텐츠 적용**

## **5.1 콘텐츠 구성**

* 실제 자기소개 문장
* 작업 철학 또는 키워드

### TODO

* [ ] placeholder 제거
* [ ] 문단 가독성 조정
* [ ] 핵심 키워드 강조

---

# **6. Contact 페이지 정보 확정**

## **6.1 적용 항목**

* 실제 이메일 주소
* 실제 링크 (GitHub, LinkedIn 등)

### TODO

* [ ] 가짜 주소 제거
* [ ] 외부 링크 새 탭 처리
* [ ] 접근성 aria-label 추가

---

# **7. UX & 콘텐츠 검증**

### 체크리스트

* [ ] 프로젝트 클릭 → 상세 진입 자연스러움
* [ ] 텍스트 줄 길이 과도하지 않음
* [ ] 모바일 가독성 확보
* [ ] 정보 우선순위 명확

---

# **8. 배포 & 공유 준비**

### TODO

* [ ] main 브랜치 병합
* [ ] Production 배포
* [ ] 실제 URL로 포트폴리오 공유 가능

---

# **9. 완료 기준 (Definition of Done)**

* [ ] 모든 프로젝트 실데이터 적용
* [ ] Work → Detail 흐름 완성
* [ ] About/Contact 실정보 반영
* [ ] SEO 메타데이터 정상 작동
* [ ] 외부 공개 가능한 포트폴리오 상태

---

# **4단계 핵심 요약**

> **“UI 데모 사이트 → 실제 나를 보여주는 포트폴리오”**

이 단계가 끝나면
**채용 담당자·클라이언트에게 바로 공유 가능한 상태**가 됩니다.

---

## 다음 단계 예고

👉 **5단계: 인터랙션 & 마이크로 애니메이션 (Framer Motion)**
👉 **6단계: 성능 최적화 & Lighthouse 90+**

원하시면 **5단계 상세 명세서** 바로 이어서 작성해드릴게요.
