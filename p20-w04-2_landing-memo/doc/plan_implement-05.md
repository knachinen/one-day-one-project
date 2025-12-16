# Phase 4 구현 상세 명세서 – 히어로 애니메이션 & 카드 Hover

본 문서는 **메모앱 랜딩페이지 Phase 4**의 구현을 위한 상세 명세서이다. Phase 4의 목표는 **Phase 3에서 완성한 정적 히어로를 ‘살아있는 화면’으로 전환**하는 것이며, 과도하지 않은 **미세 모션(Micro Interaction)**만을 추가한다.

> ⚠️ Phase 4는 **사용성에 영향을 주지 않는 애니메이션만 허용**하며, 모든 모션은 제거 가능해야 한다.

---

## 1. Phase 4 목표 정의

### 1.1 목적

* 첫 진입 시 시각적 몰입감 향상
* 메모 카드에 가벼운 생동감 부여
* 브랜드 인상을 강화하되 성능 저하 방지

### 1.2 완료 기준 (Definition of Done)

* Hero 콘텐츠가 자연스럽게 등장
* 카드 Hover 시 미세 반응 제공
* 모션 비활성화 시 UI 완전 동일 유지
* Lighthouse Performance 점수 저하 없음

---

## 2. 구현 범위

### 포함

* Hero 텍스트 등장 애니메이션
* CTA 버튼 미세 인터랙션
* 플로팅 카드 Hover 효과

### 제외 (명시적 비포함)

* 스크롤 트리거 애니메이션
* 패럴럭스
* 자동 반복(loop) 모션

---

## 3. 사용 라이브러리

| 구분        | 기술            | 비고            |
| --------- | ------------- | ------------- |
| Animation | Framer Motion | React 기반      |
| Easing    | 기본 easeOut    | 커스텀 곡선 사용 안 함 |

---

## 4. Hero 콘텐츠 진입 애니메이션

### 4.1 대상 컴포넌트

* HeroTitle
* HeroSubtitle
* HeroCTA

### 4.2 애니메이션 규칙

| 항목       | 값                    |
| -------- | -------------------- |
| Initial  | opacity: 0, y: 16    |
| Animate  | opacity: 1, y: 0     |
| Duration | 0.5s                 |
| Delay    | 0.0 / 0.1 / 0.2 (순차) |
| Easing   | easeOut              |

### 4.3 구현 방식

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

> 애니메이션은 **클라이언트 컴포넌트로만 분리 적용**

---

## 5. CTA 버튼 인터랙션

### 5.1 Hover / Tap 규칙

| 상태       | 효과          |
| -------- | ----------- |
| Hover    | scale: 1.03 |
| Tap      | scale: 0.97 |
| Duration | 0.15s       |

### 5.2 주의사항

* 색상 변경 없음
* 그림자 변화 없음
* 크기 변화만 허용

---

## 6. 플로팅 카드 Hover 효과

### 6.1 대상

* 모든 NoteCard 컴포넌트

### 6.2 효과 정의

| 항목         | 값              |
| ---------- | -------------- |
| TranslateY | -4px           |
| Rotate     | ±1deg (카드별 상이) |
| Shadow     | 약간 강화          |
| Duration   | 0.2s           |

### 6.3 구현 가이드

```tsx
whileHover={{ y: -4, rotate: 1 }}
```

> pointer-events는 **hover 가능 영역만 활성화**

---

## 7. 성능 & 접근성 기준

### 7.1 prefers-reduced-motion

* OS 설정 감지 시 모든 motion 제거

```tsx
const shouldReduceMotion = useReducedMotion()
```

### 7.2 성능 제한

* GPU 가속 가능한 transform만 사용
* opacity + transform 외 속성 금지

---

## 8. 파일 구조 변경

```
components/
 └─ hero/
    ├─ motion/
    │  ├─ HeroMotionWrapper.tsx
    │  └─ CardMotionWrapper.tsx
```

> 기존 컴포넌트를 감싸는 Wrapper 패턴 사용

---

## 9. Phase 4 체크리스트

* [ ] Hero 진입 애니메이션 자연스러움
* [ ] Hover 반응 과하지 않음
* [ ] prefers-reduced-motion 정상 동작
* [ ] Performance 점수 유지

---

## 10. Phase 5 연결 가이드

Phase 5에서 추가될 요소:

* Features 섹션 콘텐츠
* 스크롤 기반 레이아웃 확장

> Hero 및 카드 애니메이션은 **이 상태로 고정**

---

**Phase 4는 ‘느낌을 결정하는 단계’이며, 이 단계가 과하면 전체 서비스 신뢰도가 떨어진다.**
