아래는 **옵션 1 (Next.js + React 기반)**을 기준으로 한  
**프레임워크 기반 대중적인 기술 스택 상세 명세서**입니다.  
👉 _개인 포트폴리오 웹사이트_ / _미니멀·심플 콘셉트_ / _취업용 기준_으로 작성했습니다.

---

# 기술 스택 상세 명세서

**(Option 1: Next.js + React)**

---

## 1. 프로젝트 개요

- **프로젝트명**: Personal Portfolio Website
    
- **목적**:
    
    - 개인 역량 및 프로젝트 정리
        
    - 프론트엔드 실무 친화적 기술 스택 활용
        
    - SEO 및 유지보수 고려한 구조 설계
        
- **형태**: 정적 페이지 중심 + 일부 인터랙션
    
- **타겟**: 채용 담당자, 협업 파트너
    

---

## 2. 핵심 기술 스택

### 2.1 Frontend Framework

- **Next.js (v13+)**
    
    - App Router 기반
        
    - SSG(Static Site Generation) 중심 사용
        

**선정 이유**

- React 기반 프레임워크 중 가장 대중적
    
- SEO 및 성능 최적화에 유리
    
- 실무 서비스와 유사한 구조
    

---

### 2.2 UI Library

- **React (v18)**
    

**역할**

- 컴포넌트 기반 UI 구성
    
- 재사용 가능한 구조 설계
    
- 상태 관리 및 이벤트 처리
    

---

### 2.3 Language

- **TypeScript**
    

**사용 목적**

- 타입 안정성 확보
    
- 컴포넌트 인터페이스 명확화
    
- 협업 및 유지보수 용이
    

---

## 3. 스타일링

### 3.1 CSS 전략

- **CSS Modules**
    

**선정 이유**

- 컴포넌트 단위 스타일 캡슐화
    
- 전역 CSS 충돌 방지
    
- 미니멀 디자인에 적합
    

> 선택 대안: Tailwind CSS  
> (빠른 UI 제작이 목적일 경우)

---

### 3.2 디자인 원칙

- 컬러 최소화 (화이트 + 포인트 컬러 1)
    
- 여백 중심 레이아웃
    
- 애니메이션 최소 사용 (hover, fade 정도)
    

---

## 4. 폴더 구조 명세

```
src/
 ├ app/
 │   ├ layout.tsx
 │   ├ page.tsx
 │   ├ globals.css
 │   └ sections/
 │       ├ Hero.tsx
 │       ├ About.tsx
 │       ├ Projects.tsx
 │       ├ Skills.tsx
 │       └ Contact.tsx
 │
 ├ components/
 │   ├ Header.tsx
 │   ├ Footer.tsx
 │   └ ProjectCard.tsx
 │
 ├ styles/
 │   └ *.module.css
 │
 └ types/
     └ project.ts
```

---

## 5. 라우팅 전략

- **파일 기반 라우팅 (App Router)**
    
- 기본 구조:
    
    - `/` : 메인 포트폴리오 페이지
        
    - `/projects/[slug]` : 프로젝트 상세 (선택)
        
    - `/blog` : 블로그 확장 가능 (선택)
        

---

## 6. SEO & 성능 최적화

### 6.1 SEO

- `metadata` API 사용
    
- Open Graph 설정
    
- semantic HTML 사용
    

### 6.2 성능

- 정적 빌드(SSG)
    
- 이미지 최적화 (`next/image`)
    
- JS 사용 최소화
    

---

## 7. 상태 관리

- **React 기본 상태 관리**
    
    - `useState`
        
    - `useEffect`
        

> 전역 상태 관리 라이브러리 미사용  
> → 포트폴리오 규모에 불필요한 복잡도 제거

---

## 8. 배포 및 운영

### 8.1 배포

- **Vercel**
    
    - Next.js 공식 지원
        
    - 자동 CI/CD
        
    - 빠른 글로벌 CDN
        

### 8.2 버전 관리

- Git / GitHub
    
- main 브랜치 기준 배포
    

---

## 9. 개발 도구

- ESLint
    
- Prettier
    
- VS Code
    
- GitHub Issues (선택)
    

---

## 10. 기술 선택 요약

|항목|선택 기술|이유|
|---|---|---|
|프레임워크|Next.js|대중성 + SEO|
|UI|React|실무 표준|
|언어|TypeScript|안정성|
|스타일|CSS Modules|심플·관리 용이|
|배포|Vercel|Next.js 최적|

---

## 11. 포트폴리오용 기술 설명 문구 (활용 가능)

> “Next.js 기반으로 정적 생성과 SEO를 고려한 포트폴리오를 설계했으며,  
> 컴포넌트 단위 구조와 TypeScript를 통해 유지보수성과 가독성을 중시했습니다.”

---

## 한 줄 결론

> **“가장 대중적이면서도, 가장 안전한 선택”**

---

원하시면 다음 단계도 바로 이어서 도와줄게요:

- 📐 **와이어프레임 기준 컴포넌트 분해**
    
- 💻 **실제 초기 세팅 코드**
    
- 🧾 **포트폴리오 문서용 기술 명세 PDF 형식**
    
- 🎯 **학생/주니어 취업 기준으로 더 단순화한 버전**
    

다음으로 어떤 게 필요해요?