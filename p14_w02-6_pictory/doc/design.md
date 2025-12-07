# Pictory 디자인 요구사항 명세서 (DRD)

## 1. 디자인 컨셉 (Design Persona)
-   **Keywords:** Warm, Minimalist, Clean, Story-centric.
-   **Mood:** 편안하고 감성적인 분위기. 콘텐츠(이미지/글)에 집중할 수 있는 절제된 UI.
-   **Inspiration:** 감성적인 매거진, 깔끔한 갤러리 웹사이트.

---

## 2. 컬러 팔레트 (Color Palette)

### Primary Colors
-   **Warm Gold (Primary):** `#D4A373` (버튼, 활성 아이콘, 강조 텍스트)
-   **Soft Sand (Background/Accent):** `#FAEDCD` (카드 배경, 호버 효과)

### Neutral Colors
-   **Off-White (Base Background):** `#FEFAE0` (전체 배경색)
-   **Dark Charcoal (Text/Icons):** `#333333` (본문, 헤드라인)
-   **Soft Gray (Subtext/Border):** `#CCCCCC` (보조 텍스트, 경계선)
-   **System Error:** `#E63946` (에러 메시지, 삭제 버튼)
-   **System Success:** `#2A9D8F` (성공 알림)

---

## 3. 타이포그래피 (Typography)

### Font Family
-   **Primary Font:** `Inter` 또는 `Spoqa Han Sans Neo` (가독성 높은 산세리프)
-   **Secondary Font (Optional):** 필기체 느낌의 영문 폰트 (로고 또는 감성 문구용)

### Scale
-   **H1 (Page Title):** 28px / Bold / `#333333`
-   **H2 (Section Title):** 22px / SemiBold / `#333333`
-   **Body 1 (Main Text):** 16px / Regular / `#444444` (Line-height: 1.6)
-   **Body 2 (Sub Text):** 14px / Regular / `#888888`
-   **Caption:** 12px / Medium / `#AAAAAA`

---

## 4. UI 컴포넌트 시스템 (Component System)

### Buttons
-   **Primary Button:**
    -   Fill: `#D4A373`
    -   Text: `#FFFFFF`
    -   Radius: `8px` (Slightly Rounded) or `20px` (Pill shape - TBD based on final feel)
-   **Secondary Button:**
    -   Border: `1px solid #D4A373`
    -   Text: `#D4A373`
    -   Background: Transparent
-   **Text Button:**
    -   Text: `#888888` (Hover: `#333333`)

### Inputs & Forms
-   **Input Field:**
    -   Background: `#FFFFFF`
    -   Border: `1px solid #E0E0E0` (Focus: `#D4A373`)
    -   Radius: `8px`
    -   Padding: `12px 16px`
-   **Textarea:**
    -   Resize: None (Auto-expand preferred)

### Cards (Feed/Post)
-   **Background:** `#FFFFFF`
-   **Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.05)` (Very soft shadow)
-   **Corner Radius:** `12px`
-   **Spacing:** Inner padding `16px`, Margin `24px`

---

## 5. 레이아웃 및 그리드 (Layout & Grid)

### Desktop
-   **Max Width:** `1200px` (Centered)
-   **Sidebar:** Fixed width `240px` (Left)
-   **Content Area:** Flexible width (Right)
-   **Grid System:** 12 Column Grid for detailed positioning.

### Mobile (Responsive)
-   **Breakpoint:** `< 768px`
-   **Sidebar:** Converts to **Bottom Tab Bar** or **Hamburger Menu**.
-   **Padding:** `16px` horizontal padding.

---

## 6. 주요 화면별 디자인 상세 (Screen Specs)

### 6.1. 로그인/회원가입
-   **Layout:** Center Aligned Card or Split Screen (Image Left, Form Right).
-   **Social Login:** 가로로 긴 버튼 또는 원형 아이콘으로 깔끔하게 배치.
-   **Animation:** 입력 폼 전환 시 부드러운 페이드 효과.

### 6.2. 메인 피드 (Home)
-   **Card Style:**
    -   Header: User Avatar (Small Circle) + Nickname + Time.
    -   Media: Full width image (Ratio preserved).
    -   Action Bar: Heart, Comment, Share icons (Line style).
    -   Caption: 2 lines max (Read more...).

### 6.3. 글쓰기 (Create)
-   **Dropzone:** Dashed border area for drag & drop.
-   **Preview:** Selected image with ratio toggle buttons overlay.
-   **Filter:** Horizontal scroll list of usage presets.

### 6.4. 프로필 (Profile)
-   **Header:** Large Avatar (Centered), Bio text, Stats (Posts/Followers) row.
-   **Gallery:** 3-Column Grid. Images strictly cropped to 1:1 squares for consistency.
-   **Empty State:** "아직 게시물이 없습니다" with a soft illustration.
