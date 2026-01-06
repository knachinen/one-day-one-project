# 단계 2: 정적 구조 및 라우팅 구현 상세 명세서

본 문서는 포트폴리오의 전체적인 페이지 구조를 설계하고, Next.js 16 (App Router) 및 React 19의 최신 패턴을 활용하여 사용자 흐름을 구축하기 위한 가이드입니다.

## 1. 라우팅 전략 (Routing Strategy)

Next.js App Router 구조를 따라 다음과 같이 파일 시스템 기반 라우팅을 구성합니다.

- `app/page.tsx`: 랜딩 페이지 (Hero + Featured Works)
- `app/works/page.tsx`: 전체 작품 목록 (Gallery + Category Filter)
- `app/works/[id]/page.tsx`: 작품 상세 페이지 (Dynamic Route, **Async Params**)
- `app/about/page.tsx`: 아티스트 프로필 및 작가 노트
- `app/contact/page.tsx`: 문의 폼 및 연락처

## 2. 데이터 모킹 (Mock Data Structure)

단계 4의 CMS 연동 전까지 사용할 임시 데이터 구조를 정의합니다. `src/data/works.json` 형태로 관리합니다.

```json
[
  {
    "id": "neural-senses-01",
    "title": "Neural Senses v1",
    "category": "AI Art",
    "year": "2024",
    "thumbnail": "/images/work1-thumb.webp",
    "description": "인공신경망의 신호를 시각화한 미디어 아트 프로젝트입니다.",
    "tech": ["Python", "Stable Diffusion", "TouchDesigner"],
    "images": ["/images/work1-1.webp", "/images/work1-2.webp"],
    "video": "https://vimeo.com/..."
  }
]
```

## 3. 핵심 컴포넌트 구현 상세

### 3.1 Works Gallery (`components/works/WorksGallery.tsx`)
- **Type:** Client Component (`"use client"`)
- **역할:** 카테고리 필터링 상태 관리 및 그리드 렌더링.
- **레이아웃:** Tailwind CSS `grid grid-cols-1 md:grid-cols-2 gap-10`.
- **기능:**
  - `All`, `AI Art`, `Interactive`, `Web` 등 카테고리 탭 제공.
  - 선택된 카테고리에 따라 `WorkCard` 목록 필터링.

### 3.2 Work Card (`components/works/WorkCard.tsx`)
- **Type:** Client Component (`"use client"`)
- **역할:** 개별 작품 카드 인터랙션.
- **구조:** `Link` 컴포넌트로 감싸진 `relative` 컨테이너.
- **디자인:** 16:9 비율 유지, 호버 시 `Cyber Cyan` 테두리 및 글래스모피즘 오버레이.
- **애니메이션:** `framer-motion` 사용 (`whileHover={{ scale: 1.02 }}`).

### 3.3 Mobile Menu (`components/layout/MobileMenu.tsx`)
- **Type:** Client Component (`"use client"`)
- **트리거:** Navbar 우측 햄버거 아이콘 (Lucide `Menu`).
- **상태 관리:** `isOpen` (boolean), 경로 변경 시 자동 닫힘 (`useEffect`).
- **UX:** 메뉴 열림 시 `body` 스크롤 잠금 (`overflow: hidden`).
- **애니메이션:** `AnimatePresence` 사용, 상단 슬라이드 다운/업.
  - `initial={{ y: "-100%" }}`, `animate={{ y: 0 }}`, `exit={{ y: "-100%" }}`

## 4. 페이지 전환 애니메이션 (Motion Experience)

`framer-motion`과 `FrozenRouter` 패턴(기구현)을 활용합니다.

- **Page Wrapper:** `template.tsx` 내 `motion.main` 사용.
- **Transition 효과:** (Blur 효과로 성능 최적화)
    - `initial`: `{ opacity: 0, filter: "blur(10px)" }`
    - `animate`: `{ opacity: 1, filter: "blur(0px)" }`
    - `exit`: `{ opacity: 0, filter: "blur(10px)" }`
    - `transition`: `{ duration: 0.5, ease: "easeInOut" }`

## 5. 상세 페이지 (Dynamic Route) 구현 가이드

Next.js 15+ 및 React 19에서는 **params가 Promise**입니다. 반드시 `await` 처리해야 합니다.

### 5.1 Page Component (`app/works/[id]/page.tsx`)

```tsx
import { notFound } from "next/navigation";
import works from "@/data/works.json";
// ... imports

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params; // 🚨 MUST await
  const work = works.find((w) => w.id === id);
  
  if (!work) notFound();

  return (
    <main>
       {/* Header, Visual, Content, Process */}
       <RelatedWorks currentId={work.id} category={work.category} />
    </main>
  );
}
```

### 5.2 Metadata Generation

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // 🚨 MUST await
  const work = works.find((w) => w.id === id);
  return {
    title: `${work?.title ?? "Work"} | Futurist Artist`,
    description: work?.description,
  };
}
```

### 5.3 관련 작품 (Related Works)
- **로직:** 동일 `category`를 가진 작품 중 현재 작품을 제외하고 최대 2개 추천.
- **컴포넌트:** `RelatedWorks` (Server Component).

## 6. 단계 2 독립적 실행 및 검증 방법

1. **실행:** `npm run dev`
2. **검증 체크리스트:**
    - [ ] `/works` 진입 시 갤러리 그리드가 보이고, 카테고리 탭 클릭 시 필터링되는가?
    - [ ] 작품 클릭 시 `/works/[id]` 상세 페이지로 이동하며, 콘솔에 async params 에러가 없는가?
    - [ ] 모바일 뷰에서 메뉴 열기/닫기가 부드럽고, 메뉴 열린 상태에서 스크롤이 잠기는가?
    - [ ] 페이지 이동 시 Blur 트랜지션이 적용되는가?
    - [ ] `lsp_diagnostics` 실행 시 TypeScript 에러(특히 params 관련)가 0인가?
