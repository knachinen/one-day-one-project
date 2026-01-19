아래는 **5단계 (인터랙션 & 마이크로 애니메이션 적용)**에 대한
**프레임워크 실무 기준 상세 구현 명세서 + 독립 실행 가능한 TODO 리스트**입니다.
목표는 **“과하지 않지만, 확실히 차별화되는 포트폴리오 경험”**입니다.

---

# **📌 5단계 상세 구현 명세서**

### **단계명**

**인터랙션 & 마이크로 애니메이션 (Framer Motion)**

---

## **단계 목표**

* 미니멀 디자인을 해치지 않는 **절제된 모션**
* 사용자 행동에 대한 즉각적 피드백 제공
* “정적인 웹 → 살아있는 포트폴리오” 전환

---

# **5단계 산출물 (Deliverables)**

* 페이지 전환 모션
* 섹션 진입 애니메이션
* 카드/버튼 hover 인터랙션
* UX 일관성 있는 모션 룰

---

# **1. 라이브러리 세팅**

## **1.1 Framer Motion 설치**

### TODO

* [ ] `framer-motion` 설치
* [ ] client component 위치 정리
* [ ] 공통 motion 설정 파일 생성

---

## **1.2 Motion Design Principle 정의**

### 기본 원칙

* duration: `0.2 ~ 0.4s`
* easing: `easeOut`
* distance: `8~20px`
* opacity 기반 전환 우선

---

# **2. 페이지 전환 애니메이션**

## **2.1 적용 대상**

* `/`
* `/about`
* `/work`
* `/work/[slug]`
* `/contact`

---

## **2.2 구현 전략**

### 방식

* `<AnimatePresence>` + `key={pathname}`
* opacity + y 이동

---

## **2.3 TODO**

* [ ] PageTransition 컴포넌트 생성
* [ ] route change 시 enter/exit 적용
* [ ] 뒤로가기 전환 자연스러움 검증

---

# **3. 섹션 진입 애니메이션**

## **3.1 적용 대상**

* About 섹션
* Project 리스트
* Project 상세 섹션

---

## **3.2 모션 패턴**

```
initial: { opacity: 0, y: 20 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true }
```

---

## **3.3 TODO**

* [ ] SectionWrapper 컴포넌트 생성
* [ ] 반복 사용 가능한 motion variant 정의
* [ ] 스크롤 시 과도한 애니메이션 방지

---

# **4. 카드 인터랙션 (Work)**

## **4.1 ProjectCard Hover**

### 적용 효과

* 살짝 위로 이동
* 그림자 강조
* 커서 변경

---

## **4.2 TODO**

* [ ] hover 시 y: -4 ~ -6px
* [ ] transition duration 통일
* [ ] 모바일에서는 hover 비활성화

---

# **5. 버튼 & 링크 마이크로 인터랙션**

## **5.1 버튼 상태**

* hover
* tap
* focus

---

## **5.2 TODO**

* [ ] tap 시 scale 0.98
* [ ] focus-visible 스타일 적용
* [ ] 외부 링크 아이콘 subtle 애니메이션

---

# **6. 프로젝트 상세 페이지 애니메이션**

## **6.1 적용 위치**

* Header 영역
* Description 텍스트
* Tech Stack 태그

---

## **6.2 TODO**

* [ ] 상단 Hero 진입 애니메이션
* [ ] 태그 stagger 애니메이션
* [ ] 페이지 로드 후 자연스러운 흐름

---

# **7. 접근성 & 성능 고려**

## **7.1 접근성**

* `prefers-reduced-motion` 지원

### TODO

* [ ] reduced-motion 시 애니메이션 제거
* [ ] motion 조건부 적용

---

## **7.2 성능**

* 애니메이션 수 최소화
* GPU-friendly transform 사용

---

# **8. 모션 QA 체크리스트**

### UX 기준

* [ ] “와, 좋다”이지 “어지럽다” 아님
* [ ] 반복 탐색 시 피로 없음
* [ ] 콘텐츠 가독성 우선

---

# **9. 배포 & 검증**

### TODO

* [ ] 모바일 실기기 테스트
* [ ] 저사양 디바이스 체크
* [ ] Production 배포

---

# **10. 완료 기준 (Definition of Done)**

* [ ] 모든 주요 페이지에 모션 적용
* [ ] hover/tap 인터랙션 일관성
* [ ] reduced-motion 대응 완료
* [ ] 성능 저하 없음

---

# **5단계 핵심 요약**

> **“디자인은 조용하지만, UX는 살아 있다”**

이 단계가 끝나면
**디자이너·프론트엔드 감도가 확실히 드러나는 포트폴리오**가 됩니다.

---

## 다음 단계 예고

👉 **6단계: 성능 최적화 & SEO/Lighthouse 90+**
👉 **7단계: Contact Form & 외부 연동**

원하시면 **6단계 상세 명세서** 바로 이어서 작성해드릴게요.
