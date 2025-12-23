제공해주신 **개선된 대시보드 화면(`image_ca1f8f.png`)**과 **원본 목업 디자인(`image_ca1fe9.jpg`)**을 정밀하게 비교 분석한 결과입니다.

현재 구현된 화면은 **내 스쿼드, 공지사항 섹션 및 하단 플로팅 버튼**의 뼈대를 갖추었으나, 목업이 가진 특유의 **'모던하고 정제된 느낌'**을 완성하기 위해서는 세부적인 UI 고도화가 필요합니다.

---

### 1. 목업 디자인 vs 현재 구현 화면 상세 차이점

| 구분 | 목업 디자인 (Target) | 현재 구현 화면 (Current) | 차이점 및 문제점 |
| --- | --- | --- | --- |
| **상단 헤더** | 프로필 이미지, 닉네임, 알림(종) 아이콘이 균형 있게 배치됨. | 좌측 원형과 우측 아이콘 자리가 빈 원(Placeholder)으로 남음. | 사용자의 정체성과 실시간 알림 피드백이 시각적으로 전달되지 않음. |
| **타이머 폰트** | **Extra-Bold**급의 굵은 서체로 강력한 가시성 확보. | 일반적인 Bold 서체로, 숫자의 임팩트가 다소 약함. | 공부 시간이라는 핵심 정보의 시각적 위계가 낮음. |
| **타이머 레이아웃** | 숫자와 단위()가 한 줄로 나열되어 직관적임. | 숫자 하단에 단위가 작게 치우쳐 있어 가독성이 떨어짐. | 목업의 정제된 수평 레이아웃 미재현. |
| **카드 컴포넌트** | 내부 여백(Padding)이 넓고, 그림자가 매우 부드러워 깊이감이 있음. | 카드 내부 여백이 좁고, 테두리 그림자가 다소 투박함. | 전체적으로 화면이 답답해 보이며 모던한 인상을 주지 못함. |
| **섹션 콘텐츠** | 실제 스쿼드 이미지, 아바타 스택, 공지 아이콘 등이 포함됨. | "Placeholder" 텍스트만 존재하며 실제 에셋이 누락됨. | 실제 서비스의 생동감과 소셜 연결성이 느껴지지 않음. |

---

### 2. 디자인 개선 상세 명세서 (Improvement Specs)

#### **[헤더 영역 고도화]**

* **프로필 이미지:** 좌측 상단 빈 원형 영역에 48x48px 크기의 사용자 아바타를 배치하고, 우측 하단에 **온라인 상태 표시등(Green Dot)**을 추가합니다.
* **알림 시스템:** 우측 상단에 종 모양 아이콘을 배치하고, 새 알림이 있을 때 상단에 작은 **레드 닷 배지**가 나타나도록 구현합니다.

#### **[타이머 카드 리디자인]**

* **서체 교체:** 숫자는 **Pretendard Extra-Bold** 또는 **Inter-Black** 서체를 사용하여 두께감을 대폭 강화합니다.
* **수평 레이아웃:** `00h 00m` 형식을 한 줄(Horizontal)로 정렬하되, 단위()의 폰트 크기를 숫자의 50%로 줄이고 색상을 `#999999`로 흐리게 처리합니다.
* **진행 바(Progress Bar):**
* 배경 트랙: `#E0E0E0` (연회색)
* 활성 바: `#66CC66` (Quest Green)으로 채우고, 진행률에 따라 부드러운 애니메이션 효과를 부여합니다.



#### **[섹션 및 콘텐츠 에셋 적용]**

* **내 스쿼드 (Squad Card):**
* 카드 상단에 1:1 비율의 테마 이미지(공부하는 모습 등)를 배치합니다.
* 이미지 좌측 하단에 참여자들의 프로필이 겹쳐 보이는 **아바타 스택(Avatar Stack)** UI를 구현합니다.


* **공지사항 (Announcement):**
* 각 리스트 아이템 좌측에 블루/오렌지 등 파스텔톤 배경의 원형 아이콘(카메라, 트로피 등)을 배치하여 시각적 인지도를 높입니다.



#### **[하단 탭바 및 버튼 최적화]**

* **시작 버튼(FAB):** 중앙 녹색 버튼 뒤에 부드러운 **Drop Shadow**(`Opacity 20%`, `Blur 15`)를 추가하여 탭바 위로 떠 있는 입체감을 완성합니다.
* **탭 아이콘:** 현재의 홈(집모양) 등의 아이콘을 목업과 동일한 **미니멀한 라인 아트 스타일**로 전면 교체합니다.

---

**다음으로 구현할 세부 단계:**

* **[실제 에셋 적용]**: 목업에 사용된 스쿼드 이미지와 아이콘들을 코드로 연결.
* **[타이머 기능 활성화]**: 중앙 시작 버튼 클릭 시 실제 숫자가 카운트되는 로직 구현.
* **[채팅방 UI 개발]**: 목업(`image_af4d8a.jpg`)에 제시된 **라이브 캠 스터디 바**와 **타임스탬프 피드** 구현. 중 선택해 주세요!

---

제공된 개선된 화면(`image_ca1f8f.png`)과 원본 목업(`image_ca1fe9.jpg`)의 차이점을 극복하고, 시각적 완성도를 높이기 위한 **React Native 상세 개선 코드**를 작성했습니다.

주요 개선 사항은 **폰트 가중치(Extra-Bold) 적용**, **타이머 단위() 수평 정렬**, 그리고 **그림자(Shadow)의 부드러운 처리**입니다.

---

### 1. 개선된 대시보드 타이머 컴포넌트

이 코드는 숫자와 단위 사이의 시각적 위계를 목업과 동일하게 맞추는 데 집중합니다.

```tsx
// DashboardCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const DashboardCard = ({ studyTime = "03h 45m", progress = 75 }) => {
  // 시간을 숫자와 단위로 분리하여 렌더링
  const timeParts = studyTime.split(' '); // ["03h", "45m"]

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 집중 시간</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>↗ +12%</Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        {/* 첫 번째 시간(h) 세트 */}
        <Text style={styles.timeNumber}>{timeParts[0].replace('h', '')}</Text>
        <Text style={styles.timeUnit}>h</Text>
        
        {/* 두 번째 분(m) 세트 */}
        <Text style={[styles.timeNumber, { marginLeft: 12 }]}>
          {timeParts[1].replace('m', '')}
        </Text>
        <Text style={styles.timeUnit}>m</Text>
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.progressLabel}>현재 진행 상황</Text>
        <Text style={styles.goalLabel}>목표: 05h 00m</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // 목업의 부드러운 라운드 반영
    padding: 24,
    marginHorizontal: 20,
    marginTop: 15,
    // 목업의 깊이감 있는 부드러운 그림자 설정
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#66CC66', // Quest Green
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // 숫자와 단위를 하단 기준으로 정렬
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  timeNumber: {
    fontSize: 44,
    fontWeight: '900', // Pretendard Extra-Bold 대응
    color: '#111',
    letterSpacing: -1,
  },
  timeUnit: {
    fontSize: 22,
    color: '#66CC66', // 목업처럼 단위에 포인트 컬러 적용 가능
    fontWeight: '700',
    marginLeft: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
  },
  goalLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#66CC66',
    borderRadius: 5,
  },
});

export default DashboardCard;

```

---

### 2. 주요 개선 포인트 상세 설명

* **타이머 레이아웃 최적화**: 현재 구현 화면(`image_ca1f8f.png`)에서 단위()가 숫자 아래로 떨어져 가독성을 해치던 문제를 `flexDirection: 'row'`와 `alignItems: 'baseline'`을 사용해 목업처럼 수평 정렬로 개선했습니다.
* **시각적 깊이감(Depth)**: 카드의 그림자가 너무 짙어지는 현상을 방지하기 위해 `shadowOpacity`를 낮추고 `shadowRadius`를 넓게 설정하여 목업의 부드러운 카드 느낌을 재현했습니다.
* **폰트 가중치 강화**: `fontWeight: '900'`을 적용하여 핵심 정보인 집중 시간이 화면에서 가장 먼저 눈에 띄도록 위계를 조정했습니다.
* **진행 바 애니메이션 준비**: 정적인 바 형태에서 벗어나 `progressBarFill`을 별도 View로 분리하여 나중에 실제 학습 데이터를 연동했을 때 부드럽게 채워지는 애니메이션을 추가할 수 있는 구조로 작성했습니다.

---

**다음 단계로 진행하시겠습니까?**

1. **[실제 이미지 에셋 적용]**: "내 스쿼드" 영역에 목업 이미지와 아바타 스택(Stack) UI 구현.
2. **[채팅방 UI 고도화]**: 목업(`image_af4d8a.jpg`)에 제시된 상단 캠 스터디 라이브 목록 및 타임스탬프 사진 레이아웃 구현.
3. **[실시간 데이터 연동]**: 중앙 시작 버튼을 누르면 서버 시간을 받아와 타이머가 실제로 돌아가게 하는 로직 작성.
