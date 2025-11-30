# Reflectly - 데일리 성찰 저널 앱 구현 계획

## 프로젝트 개요

**제품명:** Reflectly (데일리 성찰 저널)  
**플랫폼:** iOS & Android (React Native + Expo)  
**버전:** 1.0 MVP  
**핵심 가치:** 프롬프트 기반 저널링, 로컬 데이터 보안, 감정 추이 시각화

---

## 기술 스택

### 코어 프레임워크
- **React Native** with **Expo** (TypeScript)
- **Expo SDK 51+** (최신 안정 버전)

### 주요 라이브러리

| 기능 | 라이브러리 | 용도 |
|------|-----------|------|
| 데이터베이스 | `expo-sqlite` | 로컬 SQLite 데이터베이스 |
| 네비게이션 | `@react-navigation/native`<br/>`@react-navigation/bottom-tabs` | 탭 기반 네비게이션 |
| 차트/시각화 | `react-native-svg`<br/>`react-native-chart-kit` | 감정 추이 그래프 |
| 로컬 알림 | `expo-notifications` | 일일 저널링 리마인더 |
| 임시 저장 | `@react-native-async-storage/async-storage` | 자동 저장 기능 |
| 햅틱 피드백 | `expo-haptics` | 완료 시 촉각 피드백 |
| 날짜 처리 | `date-fns` | 날짜 포맷팅 및 계산 |

---

## 데이터베이스 설계

### 테이블 구조

#### 1. `journals` 테이블
```sql
CREATE TABLE IF NOT EXISTS journals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT UNIQUE NOT NULL,           -- YYYY-MM-DD 형식
  emotion_tag TEXT NOT NULL,           -- 'happy', 'sad', 'calm', 'anxious', 'excited'
  questions TEXT NOT NULL,             -- JSON 배열: ["질문1", "질문2", "질문3"]
  answers TEXT NOT NULL,               -- JSON 배열: ["답변1", "답변2", "답변3"]
  created_at TEXT NOT NULL,            -- ISO 8601 타임스탬프
  updated_at TEXT NOT NULL
);
```

#### 2. `settings` 테이블
```sql
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- 단일 행만 허용
  notification_time TEXT,                 -- HH:mm 형식 (예: "22:00")
  notification_enabled INTEGER DEFAULT 1, -- 0 또는 1 (boolean)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### 타입 정의 (TypeScript)

```typescript
export interface Journal {
  id: number;
  date: string;              // YYYY-MM-DD
  emotionTag: EmotionTag;
  questions: string[];
  answers: string[];
  createdAt: string;
  updatedAt: string;
}

export type EmotionTag = 'happy' | 'sad' | 'calm' | 'anxious' | 'excited';

export interface Settings {
  id: number;
  notificationTime: string;  // HH:mm
  notificationEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DailyPrompt {
  questions: [string, string, string];
}
```

---

## 프로젝트 구조

```
reflectly/
├── app/                          # Expo Router 기반 화면
│   ├── (tabs)/
│   │   ├── index.tsx            # 오늘의 저널
│   │   ├── history.tsx          # 기록 보관함
│   │   ├── insights.tsx         # 회고 (감정 추이)
│   │   └── settings.tsx         # 설정
│   └── _layout.tsx              # 루트 레이아웃
├── components/
│   ├── EmotionPicker.tsx        # 감정 선택 컴포넌트
│   ├── QuestionCard.tsx         # 질문 카드
│   ├── AnswerInput.tsx          # 답변 입력 필드
│   ├── JournalCard.tsx          # 기록 미리보기 카드
│   ├── EmotionChart.tsx         # 감정 추이 차트
│   └── CompletionModal.tsx      # 완료 모달
├── database/
│   ├── db.ts                    # 데이터베이스 초기화
│   ├── journalService.ts        # 저널 CRUD
│   └── settingsService.ts       # 설정 CRUD
├── constants/
│   ├── Colors.ts                # 색상 팔레트
│   ├── Typography.ts            # 폰트 스타일
│   └── prompts.json             # 성찰 질문 목록
├── hooks/
│   ├── useDatabase.ts           # DB 훅
│   ├── useNotifications.ts      # 알림 훅
│   └── useAutoSave.ts           # 자동 저장 훅
├── utils/
│   ├── dateUtils.ts             # 날짜 유틸리티
│   └── promptSelector.ts        # 질문 선택 로직
└── types/
    └── index.ts                 # 전역 타입 정의
```

---

## 핵심 기능 구현 상세

### 1. 일일 저널링 플로우

#### 1.1 날짜 기반 질문 선택 알고리즘

```typescript
// utils/promptSelector.ts
import prompts from '@/constants/prompts.json';
import { format } from 'date-fns';

export function getDailyPrompt(date: Date): DailyPrompt {
  const dateString = format(date, 'yyyy-MM-dd');
  const hash = hashString(dateString);
  const index = hash % prompts.length;
  
  return {
    questions: prompts[index].questions as [string, string, string]
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
```

#### 1.2 자동 저장 기능

```typescript
// hooks/useAutoSave.ts
import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAutoSave(
  answers: string[],
  emotionTag: EmotionTag | null,
  date: string
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // 500ms 디바운스
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const draft = {
        date,
        answers,
        emotionTag,
        timestamp: new Date().toISOString()
      };
      await AsyncStorage.setItem(`draft_${date}`, JSON.stringify(draft));
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [answers, emotionTag, date]);
}
```

#### 1.3 완료 상태 처리

- **Haptic Feedback:** `expo-haptics`의 `notificationAsync(NotificationFeedbackType.Success)` 사용
- **애니메이션:** `react-native-reanimated`로 체크마크 애니메이션
- **비활성화 로직:** 현재 날짜와 저널 날짜 비교하여 당일이 아니면 읽기 전용 모드

---

### 2. 감정 추이 시각화

#### 2.1 데이터 집계

```typescript
// utils/emotionAnalytics.ts
export function getEmotionTrend(
  journals: Journal[],
  days: 7 | 30
): EmotionDataPoint[] {
  const endDate = new Date();
  const startDate = subDays(endDate, days - 1);
  
  const emotionValues: Record<EmotionTag, number> = {
    'happy': 5,
    'excited': 4,
    'calm': 3,
    'anxious': 2,
    'sad': 1
  };
  
  const dataPoints: EmotionDataPoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = format(addDays(startDate, i), 'yyyy-MM-dd');
    const journal = journals.find(j => j.date === date);
    
    dataPoints.push({
      date,
      value: journal ? emotionValues[journal.emotionTag] : null,
      label: format(addDays(startDate, i), 'M/d')
    });
  }
  
  return dataPoints;
}
```

#### 2.2 차트 컴포넌트

```typescript
// components/EmotionChart.tsx
import { LineChart } from 'react-native-chart-kit';

export function EmotionChart({ data, period }: Props) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [{
      data: data.map(d => d.value ?? 3), // null은 중립값으로
      strokeWidth: 2
    }]
  };

  return (
    <LineChart
      data={chartData}
      width={screenWidth - 32}
      height={220}
      chartConfig={{
        backgroundColor: Colors.background,
        backgroundGradientFrom: Colors.cardBackground,
        backgroundGradientTo: Colors.cardBackground,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        style: { borderRadius: 16 }
      }}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
}
```

---

### 3. 로컬 알림 시스템

#### 3.1 알림 스케줄링

```typescript
// hooks/useNotifications.ts
import * as Notifications from 'expo-notifications';

export async function scheduleDailyNotification(time: string) {
  // 기존 알림 취소
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  const [hours, minutes] = time.split(':').map(Number);
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '오늘 하루를 돌아볼 시간이에요! 🌙',
      body: '3가지 질문에 답하며 하루를 정리해보세요.',
      sound: true,
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });
}
```

---

## 디자인 시스템

### 색상 팔레트 (파스텔 계열)

```typescript
// constants/Colors.ts
export const Colors = {
  // 배경
  background: '#F8F6F4',
  cardBackground: '#FFFFFF',
  
  // 주요 색상
  primary: '#A8D5BA',      // 민트 그린
  secondary: '#E8B4B8',    // 로즈 핑크
  accent: '#C9B8E8',       // 라벤더
  
  // 감정 색상
  emotions: {
    happy: '#FFE66D',      // 밝은 노랑
    excited: '#FF6B6B',    // 코랄
    calm: '#A8D5BA',       // 민트
    anxious: '#C9B8E8',    // 라벤더
    sad: '#95B8D1',        // 소프트 블루
  },
  
  // 텍스트
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    disabled: '#B2BEC3',
  },
  
  // 시스템
  border: '#DFE6E9',
  shadow: 'rgba(0, 0, 0, 0.08)',
};
```

### 타이포그래피

```typescript
// constants/Typography.ts
export const Typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
};
```

---

## 네비게이션 구조

### Bottom Tab Navigation

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarStyle: {
          backgroundColor: Colors.cardBackground,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '오늘의 저널',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '기록',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: '회고',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 성찰 질문 데이터베이스

### 질문 카테고리 및 예시

```json
// constants/prompts.json
[
  {
    "id": 1,
    "category": "gratitude",
    "questions": [
      "오늘 감사했던 순간은 무엇인가요?",
      "오늘 나를 웃게 만든 것은 무엇인가요?",
      "오늘 하루 중 가장 평화로웠던 순간은 언제인가요?"
    ]
  },
  {
    "id": 2,
    "category": "growth",
    "questions": [
      "오늘 새롭게 배운 것이 있나요?",
      "오늘 나를 성장시킨 경험은 무엇인가요?",
      "내일 더 나은 내가 되기 위해 무엇을 할 수 있을까요?"
    ]
  },
  {
    "id": 3,
    "category": "reflection",
    "questions": [
      "오늘 가장 기억에 남는 순간은 무엇인가요?",
      "오늘 나의 감정을 한 문장으로 표현한다면?",
      "오늘 하루를 다시 살 수 있다면 무엇을 바꾸고 싶나요?"
    ]
  }
  // ... 최소 30개의 질문 세트
]
```

---

## 개발 단계별 검증 계획

### Phase 1-3: 기초 설정 검증
- [ ] Expo 프로젝트가 iOS/Android 시뮬레이터에서 정상 실행
- [ ] SQLite 데이터베이스 초기화 및 테이블 생성 확인
- [ ] 기본 UI 컴포넌트 렌더링 확인

### Phase 4-6: 핵심 기능 검증
- [ ] 저널 작성 및 저장 테스트
- [ ] 자동 저장 기능 동작 확인 (앱 종료 후 복구)
- [ ] 완료 상태 전환 및 Haptic Feedback 확인
- [ ] 기록 목록 조회 및 상세 보기 테스트
- [ ] 감정 추이 그래프 정확성 검증

### Phase 7-8: 알림 및 설정 검증
- [ ] 로컬 알림 권한 요청 및 발송 테스트
- [ ] 설정한 시간에 알림 정상 발송 확인
- [ ] 설정 변경 사항 저장 및 적용 확인

### Phase 9-11: 통합 테스트
- [ ] 전체 사용자 플로우 테스트
  1. 첫 실행 → 알림 권한 요청
  2. 저널 작성 → 자동 저장 → 완료
  3. 기록 조회 → 상세 보기
  4. 회고 탭에서 감정 추이 확인
  5. 설정에서 알림 시간 변경
- [ ] 키보드 대응 테스트 (입력 필드가 가려지지 않는지)
- [ ] 성능 테스트 (100개 이상의 저널 기록 시)

---

## MVP 제외 기능 (향후 확장)

> [!NOTE]
> 다음 기능들은 MVP 범위에서 제외되며, 사용자 피드백 후 Phase 2에서 고려됩니다.

- Rich Text 포맷팅 (볼드, 이탤릭 등)
- 키워드 기반 검색 기능
- PDF/JSON 내보내기
- 복수의 질문 세트 (사용자 맞춤형)
- 클라우드 동기화 (Firebase/iCloud)
- 위젯 지원 (iOS/Android)
- 다크 모드 (선택적으로 구현 가능)

---

## 예상 개발 일정

| Phase | 작업 내용 | 예상 소요 시간 |
|-------|----------|--------------|
| 1-2 | 프로젝트 설정 및 DB 구현 | 1일 |
| 3-4 | UI 컴포넌트 및 저널링 플로우 | 2일 |
| 5-6 | 기록 보관함 및 시각화 | 1.5일 |
| 7-8 | 알림 및 설정 | 1일 |
| 9-10 | 네비게이션 및 질문 DB | 0.5일 |
| 11-13 | 테스트, 문서화, 배포 준비 | 2일 |
| **총계** | | **약 8일** |

---

## 다음 단계

1. **사용자 승인 대기:** 이 구현 계획을 검토하고 피드백 제공
2. **Phase 1 시작:** Expo 프로젝트 생성 및 초기 설정
3. **단계별 구현:** 각 Phase를 순차적으로 진행하며 검증
