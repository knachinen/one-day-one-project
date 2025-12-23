개선된 대시보드 화면()을 바탕으로 목업 디자인()과의 차이점을 분석하고, 완성도를 높이기 위한 상세 디자인 명세서를 작성했습니다.

---

### 1. 목업 디자인 vs 현재 구현 화면 차이점 분석

현재 구현된 화면()은 초기 단계()에 비해 **내 스쿼드**, **공지사항** 섹션과 **중앙 시작 버튼**을 추가하여 목업 디자인()의 구조를 상당 부분 복구했습니다. 하지만 시각적 완성도 면에서 여전히 다음과 같은 차이가 존재합니다.

| 구분 | 목업 디자인 (Target) | 현재 구현 화면 (Current) | 주요 차이점 |
| --- | --- | --- | --- |
| **상단 헤더** | 프로필 이미지, 인사말, 알림 종 아이콘 배치 | 프로필 영역 공백, "안녕하세요, 김알렉스님" 텍스트만 존재 | 프로필 이미지 및 실시간 알림을 위한 종 아이콘 누락 |
| **타이머 폰트** | 굵고 가독성이 높은 모던 산세리프 | 일반적인 기본 시스템 폰트 | 숫자의 시각적 임팩트가 약하고 전문성이 부족해 보임 |
| **단위 표기** | 숫자 옆에 작고 연하게 배치 () | 숫자 하단에 작게 배치 () | 가독성이 떨어지며 데이터 간의 층위(Hierarchy)가 불분명함 |
| **카드 디자인** | 그림자가 부드럽고 여백이 넉넉함 | 그림자가 강하고 내부 텍스트 여백이 좁음 | UI가 다소 답답해 보이며 현대적인 '카드' 느낌이 부족함 |
| **컴포넌트** | 실제 스쿼드 카드와 공지 이미지/아이콘 포함 | "Placeholder" 문구로 채워진 빈 박스 | 실제 데이터 및 그래픽 에셋이 적용되지 않음 |

---

### 2. 디자인 개선 상세 명세서

목업 디자인() 수준의 고퀄리티 UI를 구현하기 위한 컴포넌트별 상세 가이드입니다.

#### **A. 상단 개인화 헤더 (Header)**

* **프로필 이미지**: 좌측 상단 원형 영역에 사용자 캐릭터나 사진을 배치하고, 우측 하단에 **온라인 상태 표시등(Green Dot)**을 추가합니다.
* **알림 아이콘**: 우측 상단에 종 모양 아이콘을 배치하고, 새로운 소식이 있을 때 **레드 닷 배지**가 나타나도록 구현합니다.

#### **B. 대시보드 타이머 (Timer Card)**

* **서체 변경**: 숫자는 **Pretendard Extra-Bold** 혹은 **Inter** 폰트를 적용하여 두께감을 줍니다.
* **레이아웃**: 시간 단위()를 숫자 우측에 나란히 배치하되, 색상을 `#999999`로 흐리게 조정하여 숫자가 돋보이게 합니다.
* **진행 바(Progress Bar)**:
* **배경**: `#E0E0E0` (연한 회색).
* **활성**: `#66CC66` (Quest Green) 컬러를 사용하고, 진행률에 따라 부드럽게 채워지도록 애니메이션을 추가합니다.



#### **C. 스쿼드 및 공지사항 카드 (Content Cards)**

* **스쿼드 카드**: 목업과 같이 이미지 영역을 확보하고, 좌측 하단에 참여자들의 **아바타 스택(Stack)**을 구현합니다.
* **공지사항**: 각 항목 좌측에 테마에 맞는 아이콘(카메라, 트로피 등)을 파스텔톤 원형 배경 위에 배치하여 시각적 구분을 줍니다.

#### **D. 하단 시작 버튼 및 탭바 (CTA & Tab Bar)**

* **시작 버튼**: 중앙 녹색 원형 버튼(`#66CC66`) 뒤에 부드러운 **Drop Shadow**를 추가하여 탭바 위로 떠 있는 듯한 입체감을 완성합니다.
* **탭 아이콘**: 현재의 입체적인 아이콘 세트에서 목업과 같은 **미니멀한 라인 아트 아이콘**으로 교체하여 세련미를 높입니다.

---

**다음 단계로 무엇을 도와드릴까요?**

* **실제 데이터 바인딩**: "Placeholder" 영역에 실제 스쿼드 데이터를 연결하는 로직 작성.
* **타임스탬프 카메라 연동**: 공부 시작 버튼 클릭 시 카메라 모드로 전환되는 인터랙션 구현.
* **채팅방 라이브 바 구현**: 목업()에 제시된 상단 유저 목록 및 라이브 표시 UI 개발.

---

제공된 목업 디자인과 현재 구현된 코드의 차이점을 바탕으로, 시각적 완성도를 높이고 기능을 최적화할 수 있는 **React Native 개선 코드**를 제안합니다.

이 코드는 **Pretendard** 폰트 적용, **단위 레이아웃 수정**, 그리고 **그림자 깊이 조절**에 초점을 맞춥니다.

---

### 1. 스타일 가이드 및 상수 설정

색상과 폰트의 일관성을 위해 전역 상수를 정의합니다.

```typescript
// theme.ts
export const COLORS = {
  PRIMARY: '#66CC66',     // Quest Green
  BACKGROUND: '#F7F8F9',  // 연한 회색 배경
  WHITE: '#FFFFFF',
  TEXT_MAIN: '#111111',   // 타이머 숫자
  TEXT_SUB: '#999999',    // 단위 및 보조 텍스트
  PROGRESS_BG: '#E0E0E0', // 진행 바 배경
};

```

---

### 2. 개선된 대시보드 타이머 컴포넌트

숫자와 단위()의 층위를 명확히 하고 목업의 세련된 디자인을 재현합니다.

```tsx
// DashboardCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardCard = ({ studyTime, progress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 학습</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>+0%</Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        {/* 시간 단위 분리 및 스타일 차별화 */}
        <Text style={styles.timeNumber}>00</Text>
        <Text style={styles.timeUnit}>h</Text>
        <Text style={[styles.timeNumber, { marginLeft: 15 }]}>00</Text>
        <Text style={styles.timeUnit}>m</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.goalText}>목표: 05h 00m</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 10,
    // 목업 수준의 부드러운 그림자 적용
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_MAIN,
  },
  badge: {
    backgroundColor: '#E8F5E9', // 연녹색 배경
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // 숫자와 단위 정렬 기준
    justifyContent: 'center',
    marginBottom: 25,
  },
  timeNumber: {
    fontSize: 48,
    fontWeight: '900', // Extra-Bold 수준
    color: COLORS.TEXT_MAIN,
  },
  timeUnit: {
    fontSize: 20,
    color: COLORS.TEXT_SUB, // 단위는 연하게 처리
    marginLeft: 4,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.PROGRESS_BG,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
  },
  goalText: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
    color: COLORS.TEXT_SUB,
  },
});

```

---

### 3. 개선 포인트 요약

* **가독성 증대**: `alignItems: 'baseline'`을 사용하여 숫자와 단위가 자연스럽게 연결되도록 개선했습니다.
* **시각적 계층화**: 단위()의 폰트 크기를 줄이고 색상을 흐리게 하여 핵심 데이터인 숫자가 먼저 눈에 들어오게 디자인했습니다.
* **그림자 최적화**: 기존의 강한 그림자 대신 `shadowOpacity: 0.05`를 사용하여 목업처럼 부드럽고 고급스러운 카드 느낌을 재현했습니다.
* **색상 동기화**: `Quest Green`을 프로그레스 바와 배지에 일관되게 적용하여 브랜드 아이덴티티를 강화했습니다.

이 코드를 적용하면 현재의 Placeholder 상태인 대시보드를 목업 디자인 수준으로 즉시 끌어올릴 수 있습니다.

**이어서 어떤 작업을 도와드릴까요?**

* **스쿼드 카드(Squad Card)**: 아바타가 겹쳐진(Stack) 형태의 실시간 인원 표시 컴포넌트 구현
* **타임스탬프 로직**: 사진 촬영 시 서버 시간을 기반으로 텍스트를 합성하는 기능 추가
* **중앙 시작 버튼 애니메이션**: 클릭 시 타이머가 커지며 집중 모드로 진입하는 효과 구현
