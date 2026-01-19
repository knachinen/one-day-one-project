# 📌 데이터베이스 활용 2단계 상세 구현 명세서

### **단계명**
**CMS 구축 및 프론트엔드 데이터 연동**

### **개요**
1단계에서 구축한 Supabase 테이블(`projects`, `project_images`)을 기반으로,
1. 관리자가 데이터를 쉽고 안전하게 관리할 수 있는 **Admin(CMS) 페이지**를 구축하고,
2. 실제 **Public 웹사이트(Home, Work)**에 DB 데이터를 연동하여 동적인 포트폴리오를 완성한다.

---

## **1. Admin 인증 및 보안 (Auth)**

### **1.1 Middleware 설정**
- [x] `middleware.ts` 생성
- [x] `/admin` 하위 경로 접근 시 인증 여부 체크
- [x] 비로그인 상태면 `/admin/login`으로 리다이렉트
- [x] 로그인 상태면 요청 통과

### **1.2 로그인 페이지**
- [x] `/app/admin/login/page.tsx`
- [x] 이메일/비밀번호 입력 폼
- [x] `supabase.auth.signInWithPassword` 연동
- [x] 로그인 성공 시 `/admin/projects`로 이동

---

## **2. CMS 페이지 구현 (Admin)**

### **2.1 Admin 레이아웃**
- [x] `/app/admin/layout.tsx`
- [x] 사이드바 또는 상단 네비게이션 (Projects, Logout)
- [x] `auth.signOut()` 기능 구현

### **2.2 프로젝트 목록 (List)**
- [x] `/app/admin/projects/page.tsx`
- [x] DB에서 프로젝트 목록 `fetch`
- [x] 테이블 형태 UI (썸네일, 제목, 상태, 생성일, 관리 버튼)
- [x] **삭제 기능**: 확인 모달 후 `deleteProject` 호출

### **2.3 프로젝트 생성/수정 (Form)**
- [x] `/app/admin/projects/new/page.tsx` (생성)
- [x] `/app/admin/projects/[id]/page.tsx` (수정)
- [x] **입력 필드**:
  - Title (Text)
  - Summary (Textarea)
  - Role (Text)
  - Tech Stack (Multi-select or Tag input)
  - Status (Select: In Progress / Completed)
  - Thumbnail / Images (File Input)
- [x] **이미지 업로드**: `uploadProjectImage` 함수 활용하여 Storage 업로드 후 URL 저장

---

## **3. 프론트엔드 데이터 연동 (Public)**

### **3.1 Home (Hero & Recent Work)**
- [x] `/app/page.tsx` 수정
- [x] `getProjects()` (limit 적용) 호출하여 최신 프로젝트 표시 (선택 사항)
- [x] Hero 섹션 정적 텍스트 유지 (또는 DB 기반 프로필 텍스트로 변경 가능)

### **3.2 Work 목록 페이지**
- [x] `/app/work/page.tsx` 생성
- [x] `getProjects()` 호출 (전체 'Completed' 프로젝트)
- [x] 프로젝트 카드 그리드 UI 구현 (썸네일, 제목, 간단 설명)

### **3.3 Work 상세 페이지**
- [x] `/app/work/[id]/page.tsx` 생성 (Dynamic Route)
- [x] `getProjectById(id)` 호출
- [x] `generateStaticParams` 구현 (빌드 시 정적 페이지 생성 최적화)
- [x] 상세 내용 및 이미지 갤러리 UI 구현

---

## **4. 완료 기준 (Definition of Done)**

- [x] `/admin` 경로가 비로그인 사용자로부터 보호된다.
- [x] Admin 페이지에서 프로젝트를 생성, 수정, 삭제할 수 있다.
- [x] 이미지를 업로드하고 프로젝트에 연결할 수 있다.
- [x] `/work` 페이지에서 DB에 등록된 프로젝트 목록이 보인다.
- [x] `/work/[id]` 페이지에서 상세 정보가 올바르게 표시된다.
