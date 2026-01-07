아래는 **1단계(환경 구축 & 테스트 페이지 런칭)**에 대한 **상세 구현 명세서 + TODO 리스트**입니다.
개발자가 그대로 실행할 수 있도록 아주 구체적으로 작성했습니다.

---

# **📌 1단계 상세 구현 명세서**

### **목표**

Next.js 기반 개발 환경을 구축하고, Vercel로 배포한 테스트 페이지를 공개 URL에서 확인할 수 있는 상태로 만든다.

---

# ✅ **1. 개발 환경 준비**

## **1.1 필수 소프트웨어 설치**

**목표:** 로컬 개발 환경이 Next.js 최신 버전을 실행 가능한 상태인지 확인.

### 작업 목록

* [ ] Node.js LTS(>= 18) 설치
* [ ] npm 또는 yarn 설치 (기본 npm 사용 권장)
* [ ] VSCode 설치
* [ ] VSCode 확장 설치

  * [ ] ESLint
  * [ ] Prettier
  * [ ] Tailwind CSS IntelliSense
  * [ ] React/TS IntelliSense
* [ ] Git 설치 및 환경 설정

  * [ ] `git config --global user.name "…"`, `git config --global user.email "…"`

---

# ✅ **2. 프로젝트 생성**

## **2.1 Next.js 프로젝트 초기화**

### 작업 목록

* [ ] 터미널에서 프로젝트 생성

```bash
npx create-next-app@latest portfolio --ts --app
```

* [ ] 옵션 선택

  * ✔ TypeScript → Yes
  * ✔ ESLint → Yes
  * ✔ Tailwind → No (직접 설정 예정)
  * ✔ src/ 디렉토리 → No
  * ✔ App Router → Yes
  * ✔ import alias → Yes

## **2.2 디렉토리 구조 확인**

* [ ] `/app/page.tsx`
* [ ] `/public/`
* [ ] `/app/layout.tsx`
* [ ] `/app/globals.css`

---

# ✅ **3. Tailwind CSS 설정**

## **3.1 설치**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## **3.2 tailwind.config.js 설정**

* [ ] `content` 경로 지정

```js
content: ["./app/**/*.{js,ts,jsx,tsx}"];
```

## **3.3 글로벌 스타일 적용**

* [ ] `/app/globals.css` 상단에 Tailwind layer 추가

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# ✅ **4. 개발 환경 품질 설정**

## **4.1 ESLint & Prettier 세팅**

* [ ] `.prettierrc` 생성

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

* [ ] ESLint 규칙 점검

## **4.2 Git 설정**

* [ ] `.gitignore` 확인
* [ ] GitHub 저장소 생성
* [ ] 초기 커밋

```bash
git add .
git commit -m "chore: initial next.js project setup"
git push origin main
```

---

# ✅ **5. 테스트 페이지 추가**

## **5.1 `/test` 라우트 생성**

* [ ] `/app/test/page.tsx` 생성
* [ ] 기본 컴포넌트 작성

```tsx
export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Test Page OK</h1>
    </div>
  )
}
```

## **5.2 Tailwind 정상 적용 여부 테스트**

* [ ] 색상, 폰트, 패딩이 적용되는지 확인
* [ ] 클래스 적용 오류 시 tailwind config paths 재확인

---

# ✅ **6. 로컬 실행 & 점검**

## **6.1 개발 서버 실행**

```bash
npm run dev
```

## 점검 체크리스트

* [ ] [http://localhost:3000](http://localhost:3000) 정상 접속
* [ ] [http://localhost:3000/test](http://localhost:3000/test) 정상 접속
* [ ] Tailwind 스타일 정상 적용
* [ ] Hot Reload 정상 작동

---

# ✅ **7. 배포 준비**

## **7.1 Vercel 프로젝트 생성**

* [ ] vercel.com 로그인 (GitHub 연동 추천)
* [ ] “New Project” 클릭
* [ ] GitHub 저장소 선택
* [ ] Framework → 자동으로 Next.js 감지
* [ ] 환경 변수가 있다면 설정 (현재 없음)
* [ ] Deploy 클릭

## **7.2 배포 확인**

* [ ] [https://project-name.vercel.app/](https://project-name.vercel.app/) 접속
* [ ] [https://project-name.vercel.app/test](https://project-name.vercel.app/test) 접속

---

# ✅ **8. 완료 기준 (Definition of Done)**

### **환경 구축 완료**

* [ ] 로컬에서 개발이 가능한 Next.js/Tailwind 환경 구축
* [ ] GitHub에 코드 버전 관리
* [ ] ESLint/Prettier 정상 동작

### **테스트 페이지 성공 배포**

* [ ] `/test` 페이지가 Vercel 프로덕션 URL에서 정상 표시
* [ ] Tailwind 적용 확인
* [ ] 빌드 오류 없음
* [ ] 코드 구조 정돈된 초기 상태 유지

---

# 📄 **1단계 전체 TODO 리스트 (요약형)**

### 개발 환경 준비

* [ ] Node 설치
* [ ] Git 설정
* [ ] VSCode + 필수 확장 설치

### 프로젝트 생성

* [ ] Next.js 프로젝트 초기화
* [ ] 타입스크립트 구성 확인

### 스타일링

* [ ] Tailwind 설치
* [ ] config 설정
* [ ] 글로벌 스타일 연결

### 품질 도구

* [ ] ESLint/Prettier 구성

### 테스트 페이지 제작

* [ ] `/test` route 생성
* [ ] Tailwind 적용 테스트

### 배포

* [ ] GitHub repo 생성
* [ ] 코드 push
* [ ] Vercel 배포
* [ ] 공개 URL 점검

---

필요하면 다음도 작성해드릴 수 있어요:

🔥 **2단계 상세 명세서**
🔥 **2~8단계 전체 일정표(1주 단위)**
🔥 **기술 스택 설치 스크립트 자동화(shell script 작성)**
🔥 **프로젝트 초기 구조 설계(components/layout/ui/hooks 단위)**

원하시는 항목이 있을까요?
