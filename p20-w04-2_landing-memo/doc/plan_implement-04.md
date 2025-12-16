# Phase 3 구현 상세 명세서 – 플로팅 메모 카드 (정적 위치)

본 문서는 **메모앱 랜딩페이지 Phase 3**의 구현을 위한 상세 명세서이다. Phase 3의 목표는 **히어로 섹션의 비주얼 아이덴티티를 완성**하는 것이며, 아직 애니메이션이나 패럴럭스 없이 **정적 카드 배치**만을 구현한다.

> ⚠️ Phase 3에서는 **인터랙션·모션을 일절 포함하지 않는다.** 오직 배치와 시각적 완성도에 집중한다.

---

## 1. Phase 3 목표 정의

### 1.1 목적

* 메모앱의 성격을 직관적으로 보여주는 비주얼 요소 추가
* Hero 섹션의 빈 공간을 활용한 디자인 완성도 향상
* 이후 Phase 4(모션), Phase 6(패럴럭스)의 기반 확보

### 1.2 완료 기준 (Definition of Done)

* 플로팅 메모 카드가 Hero 영역에 정상 표시
* 데스크탑에서만 노출, 모바일에서는 숨김
* 레이아웃 깨짐 및 Hero 텍스트 가독성 저하 없음

---

## 2. 구현 범위

### 포함

* 메모 카드 UI 컴포넌트
* 카드 타입별 스타일
* Hero 내부 절대 위치 배치

### 제외 (명시적 비포함)

* Hover 효과
* 애니메이션
* 마우스 추적, 패럴럭스

---

## 3. 컴포넌트 구조

```
components/
 └─ hero/
    ├─ FloatingNotes.tsx
    ├─ NoteCard.tsx
    └─ cards/
       ├─ ChecklistCard.tsx
       ├─ TextNoteCard.tsx
       ├─ TagNoteCard.tsx
       ├─ CalendarNoteCard.tsx
       └─ VoiceNoteCard.tsx
```

---

## 4. HeroSection 구조 변경

### 4.1 HeroSection 확장 구조

```
<section className="relative">
  <HeroTitle />
  <HeroSubtitle />
  <HeroCTA />
  <FloatingNotes />
</section>
```

* `position: relative` 필수
* FloatingNotes는 Hero 콘텐츠 위에 겹쳐 배치

---

## 5. FloatingNotes 컴포넌트 명세

### 5.1 역할

* 모든 메모 카드를 묶는 컨테이너
* 배치 로직만 담당

### 5.2 표시 조건

* `md` 이상 화면에서만 표시

```tsx
<div className="hidden md:block absolute inset-0 pointer-events-none">
```

---

## 6. NoteCard 공통 스타일

### 6.1 카드 기본 스타일

| 항목         | 값                            |
| ---------- | ---------------------------- |
| Background | #FFFFFF (opacity 0.9)        |
| Radius     | 16px                         |
| Padding    | 16px                         |
| Shadow     | 0 10px 30px rgba(0,0,0,0.08) |
| Width      | 180~220px (카드별 상이)           |

### 6.2 공통 Tailwind 예시

```tsx
<div className="rounded-2xl bg-white/90 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
```

---

## 7. 카드 타입별 명세

### 7.1 ChecklistCard

* 제목 1줄
* 체크 아이템 3~4개
* 체크박스는 아이콘(SVG) 사용

---

### 7.2 TextNoteCard

* 텍스트 2~3줄
* 줄바꿈 자연스럽게

---

### 7.3 TagNoteCard

* 짧은 문장
* 해시태그 2~3개

---

### 7.4 CalendarNoteCard

* 날짜 강조 표시
* 일정 제목 1줄

---

### 7.5 VoiceNoteCard

* Waveform 아이콘(SVG)
* 재생 시간 텍스트

---

## 8. 카드 배치 가이드 (Desktop 기준)

| 카드        | 위치               |
| --------- | ---------------- |
| Checklist | 좌측 상단 (10%, 20%) |
| TagNote   | 좌측 하단 (15%, 65%) |
| TextNote  | 우측 상단 (75%, 18%) |
| Calendar  | 우측 중단 (70%, 45%) |
| VoiceNote | 중앙 하단 (45%, 70%) |

> 좌표는 `top / left` 퍼센트 기준

---

## 9. 접근성 & UX 기준

* 카드 내용은 **스크린 리더 무시 가능** (aria-hidden="true")
* 포인터 이벤트 비활성화
* Hero 주요 CTA 클릭 방해 금지

---

## 10. Phase 3 체크리스트

* [ ] 데스크탑에서 카드 정상 표시
* [ ] 모바일에서 카드 미노출
* [ ] Hero 텍스트 가독성 유지
* [ ] CTA 클릭 방해 없음

---

## 11. Phase 4 연결 가이드

Phase 4에서 추가될 요소:

* 카드 hover 효과
* Hero 콘텐츠 등장 애니메이션

> Phase 3 카드 구조는 **그대로 유지한 채 motion만 추가**

---

**Phase 3은 “정적인 완성도”를 확보하는 단계이며, 이후 모든 인터랙션은 이 위에 덧입힌다.**
