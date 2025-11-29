# ⚛️ Atomizer MVP 구현 계획서

## 프로젝트 개요

**Atomizer**는 사용자가 큰 목표를 10초 단위의 원자적 행동으로 분해하여 실행하도록 돕는 React Native 기반 모바일 To-Do 앱입니다. 이 문서는 PRD를 바탕으로 MVP 개발을 위한 구체적인 구현 계획을 제시합니다.

## 기술 스택

### 프론트엔드
- **React Native** (최신 안정 버전)
- **TypeScript** (타입 안정성)
- **React Navigation** (화면 네비게이션)
- **React Context API** 또는 **Redux Toolkit** (상태 관리)

### 데이터베이스
- **Realm** (@realm/react) - 로컬 데이터베이스
- **AsyncStorage** (간단한 설정 저장)

### 네이티브 기능
- **react-native-push-notification** 또는 **@notifee/react-native** (로컬 푸시 알림)
- **react-native-haptic-feedback** (햅틱 피드백)
- **@react-native-community/async-storage** (로컬 저장소)

### 개발 도구
- **Expo** (선택사항, 빠른 프로토타이핑) 또는 **React Native CLI** (네이티브 모듈 제어)
- **ESLint + Prettier** (코드 품질)
- **Jest + React Native Testing Library** (테스트)

---

## 아키텍처 설계

### 데이터 모델

#### Realm 스키마

```typescript
// Goal 스키마
class Goal extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  createdAt!: Date;
  status!: string; // "active" | "completed"
  actions!: Realm.List<Action>;

  static schema = {
    name: 'Goal',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      createdAt: 'date',
      status: 'string',
      actions: 'Action[]',
    },
  };
}

// Action 스키마
class Action extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  status!: string; // "pending" | "completed"
  createdAt!: Date;
  completedAt?: Date;
  reminderTime?: Date;

  static schema = {
    name: 'Action',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      status: 'string',
      createdAt: 'date',
      completedAt: 'date?',
      reminderTime: 'date?',
    },
  };
}
```

#### AsyncStorage 키 구조

```typescript
{
  "current_goal_id": string,
  "current_action_id": string,
  "app_settings": {
    "notifications_enabled": boolean,
    "haptic_enabled": boolean
  }
}
```

### 폴더 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Timer.tsx
│   └── ActionCard.tsx
├── screens/            # 화면 컴포넌트
│   ├── GoalInputScreen.tsx
│   ├── ActionCreateScreen.tsx
│   ├── MainScreen.tsx
│   └── HistoryScreen.tsx
├── navigation/         # 네비게이션 설정
│   └── AppNavigator.tsx
├── services/           # 비즈니스 로직 및 API
│   ├── realm.ts
│   ├── storage.ts
│   └── notification.ts
├── hooks/              # 커스텀 훅
│   ├── useTimer.ts
│   ├── useGoal.ts
│   └── useAction.ts
├── context/            # 전역 상태 관리
│   ├── RealmContext.tsx
│   ├── GoalContext.tsx
│   └── ActionContext.tsx
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── utils/              # 유틸리티 함수
│   └── helpers.ts
└── constants/          # 상수 및 설정
    ├── colors.ts
    └── config.ts
```

---

## 구현 단계별 계획

### Phase 1: 프로젝트 초기 설정 (1-2일)

#### 1.1 프로젝트 생성
```bash
# React Native CLI 사용 (권장)
npx react-native init Atomizer --template react-native-template-typescript

# 또는 Expo 사용
npx create-expo-app Atomizer --template
```

#### 1.2 필수 패키지 설치
```bash
# Realm 데이터베이스
npm install realm @realm/react

# 로컬 저장소
npm install @react-native-async-storage/async-storage

# 네비게이션
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# 알림
npm install @notifee/react-native

# 햅틱
npm install react-native-haptic-feedback

# 개발 도구
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier
```

#### 1.3 Realm 데이터베이스 설정

**`src/services/realm.ts`**
```typescript
import Realm from 'realm';
import { Goal, Action } from '../models';

export const realmConfig: Realm.Configuration = {
  schema: [Goal, Action],
  schemaVersion: 1,
};

export const getRealm = async (): Promise<Realm> => {
  return await Realm.open(realmConfig);
};
```

**`src/context/RealmContext.tsx`**
```typescript
import React, { createContext, useContext } from 'react';
import { RealmProvider as RealmReactProvider } from '@realm/react';
import { Goal, Action } from '../models';

export const RealmContext = createContext<Realm | null>(null);

export const RealmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RealmReactProvider schema={[Goal, Action]} schemaVersion={1}>
      {children}
    </RealmReactProvider>
  );
};
```

---

### Phase 2: 디자인 시스템 구축 (1일)

#### 2.1 색상 팔레트 정의

**`src/constants/colors.ts`**
```typescript
export const Colors = {
  primary: '#4F46E5',      // 인디고 (시작 유도)
  success: '#10B981',      // 그린 (완료)
  background: '#FFFFFF',
  backgroundDark: '#1F2937',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  focus: '#818CF8',        // 집중 모드
  error: '#EF4444',
};
```

#### 2.2 공통 컴포넌트 구현

**Button 컴포넌트**
- Primary, Secondary 스타일
- 로딩 상태
- 햅틱 피드백 통합

**Input 컴포넌트**
- 자동 포커스 지원
- 유효성 검증 표시
- 키보드 최적화

**Timer 컴포넌트**
- 원형 프로그레스 바
- 카운트다운 애니메이션
- 완료 시 햅틱 피드백

---

### Phase 3: 핵심 화면 구현 (3-4일)

#### 3.1 목표 입력 화면 (`GoalInputScreen`)

**기능**
- 큰 목표 입력 필드
- 입력 시 자동 키보드 포커스
- 저장 버튼 (Firestore + AsyncStorage)
- 입력 유효성 검증 (빈 값 방지)

**UI 요구사항**
- 미니멀 디자인
- 중앙 정렬된 입력 필드
- 명확한 CTA 버튼

**구현 포인트**
```typescript
import { useRealm } from '@realm/react';
import { Goal } from '../models/Goal';

const saveGoal = async (title: string) => {
  const realm = useRealm();
  
  const newGoal = realm.write(() => {
    return realm.create('Goal', {
      _id: new Realm.BSON.ObjectId(),
      title,
      createdAt: new Date(),
      status: 'active',
      actions: [],
    });
  });
  
  await AsyncStorage.setItem('current_goal_id', newGoal._id.toString());
};
```

#### 3.2 원자 행동 생성 화면 (`ActionCreateScreen`)

**기능**
- 10초 행동 입력 필드
- 리마인드 시간 설정 (DateTimePicker)
- 저장 시 로컬 알림 스케줄링
- 저장 버튼

**UI 요구사항**
- 모달 또는 전체 화면
- 키보드 자동 올라오기
- 간결한 입력 폼

**구현 포인트**
```typescript
import { useRealm, useQuery } from '@realm/react';
import { Action } from '../models/Action';

const createAction = async (description: string, reminderTime: Date, goalId: string) => {
  const realm = useRealm();
  const goal = realm.objectForPrimaryKey('Goal', new Realm.BSON.ObjectId(goalId));
  
  const newAction = realm.write(() => {
    const action = realm.create('Action', {
      _id: new Realm.BSON.ObjectId(),
      description,
      status: 'pending',
      createdAt: new Date(),
      reminderTime,
    });
    
    goal?.actions.push(action);
    return action;
  });
  
  // 로컬 알림 스케줄링
  await scheduleNotification(newAction._id.toString(), description, reminderTime);
  
  await AsyncStorage.setItem('current_action_id', newAction._id.toString());
};
```

#### 3.3 메인 화면 (`MainScreen`)

**기능**
- 현재 원자 행동 표시
- 10초 타이머 UI
- 타이머 시작 버튼
- 완료 버튼
- 햅틱 피드백

**UI 요구사항**
- 집중 모드: 타이머 실행 시 다른 요소 최소화
- 상태별 색상 변화 (대기: 인디고, 진행: 포커스, 완료: 그린)
- 큰 타이머 디스플레이

**구현 포인트**
```typescript
const useTimer = (duration: number = 10) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
  }, [isRunning, timeLeft]);
  
  const handleTimerComplete = async () => {
    ReactNativeHapticFeedback.trigger('notificationSuccess');
    await completeAction();
  };
  
  return { timeLeft, isRunning, start: () => setIsRunning(true) };
};
```

---

### Phase 4: 로컬 푸시 알림 구현 (2일)

#### 4.1 알림 권한 요청

**iOS**
```typescript
import notifee, { AuthorizationStatus } from '@notifee/react-native';

const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();
  
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission granted');
  }
};
```

**Android**
- Android 13+ 에서는 런타임 권한 필요
- `AndroidManifest.xml`에 권한 추가

#### 4.2 로컬 알림 스케줄링

```typescript
import notifee, { TriggerType } from '@notifee/react-native';

const scheduleNotification = async (
  actionId: string,
  description: string,
  reminderTime: Date
) => {
  const channelId = await notifee.createChannel({
    id: 'atomizer-reminders',
    name: 'Atomizer Reminders',
  });
  
  await notifee.createTriggerNotification(
    {
      id: actionId,
      title: '⚛️ 10초 행동 시간!',
      body: description,
      android: {
        channelId,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      ios: {
        categoryId: 'atomizer-action',
      },
      data: {
        actionId,
        type: 'action-reminder',
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: reminderTime.getTime(),
    }
  );
};
```

#### 4.3 딥 링크 처리

```typescript
// App.tsx
useEffect(() => {
  const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const actionId = detail.notification?.data?.actionId;
      if (actionId) {
        navigation.navigate('Main', { actionId });
      }
    }
  });
  
  return () => unsubscribe();
}, []);
```

---

### Phase 5: 데이터 관리 및 쿼리 최적화 (1일)

#### 5.1 Realm 쿼리 최적화

**전략**
1. Realm은 기본적으로 로컬 데이터베이스이므로 별도 동기화 불필요
2. 효율적인 쿼리를 위한 인덱싱 및 필터링
3. Realm의 반응형 쿼리 활용

```typescript
import { useQuery } from '@realm/react';
import { Goal } from '../models/Goal';

// 활성 목표 가져오기
const useActiveGoal = () => {
  const goals = useQuery(Goal, (goals) => {
    return goals.filtered('status == "active"').sorted('createdAt', true);
  });
  
  return goals[0] || null;
};

// 완료되지 않은 액션 가져오기
const usePendingActions = (goalId: string) => {
  const goal = useQuery(Goal, (goals) => {
    return goals.filtered('_id == $0', new Realm.BSON.ObjectId(goalId));
  })[0];
  
  return goal?.actions.filtered('status == "pending"') || [];
};
```

#### 5.2 데이터 백업 (선택사항)

```typescript
// Realm 데이터를 JSON으로 내보내기
const exportData = async () => {
  const realm = await getRealm();
  const goals = realm.objects('Goal');
  
  const data = goals.map(goal => ({
    ...goal.toJSON(),
    actions: goal.actions.map(action => action.toJSON()),
  }));
  
  await AsyncStorage.setItem('backup_data', JSON.stringify(data));
};
```

---

### Phase 6: 상태 관리 (1일)

#### 6.1 Context API 구조

**GoalContext**
```typescript
import { useQuery, useRealm } from '@realm/react';
import { Goal } from '../models/Goal';

interface GoalContextType {
  currentGoal: Goal | null;
  createGoal: (title: string) => Promise<void>;
  completeGoal: (goalId: string) => Promise<void>;
}

export const GoalProvider: React.FC = ({ children }) => {
  const realm = useRealm();
  const goals = useQuery(Goal, (goals) => {
    return goals.filtered('status == "active"').sorted('createdAt', true);
  });
  
  const currentGoal = goals[0] || null;
  
  const createGoal = async (title: string) => {
    realm.write(() => {
      realm.create('Goal', {
        _id: new Realm.BSON.ObjectId(),
        title,
        createdAt: new Date(),
        status: 'active',
        actions: [],
      });
    });
  };
  
  const completeGoal = async (goalId: string) => {
    const goal = realm.objectForPrimaryKey('Goal', new Realm.BSON.ObjectId(goalId));
    realm.write(() => {
      if (goal) goal.status = 'completed';
    });
  };
  
  return (
    <GoalContext.Provider value={{ currentGoal, createGoal, completeGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
```

**ActionContext**
```typescript
interface ActionContextType {
  currentAction: Action | null;
  createAction: (description: string, reminderTime: Date) => Promise<void>;
  completeAction: () => Promise<void>;
  loadCurrentAction: () => Promise<void>;
}
```

---

### Phase 7: 네비게이션 설정 (1일)

#### 7.1 네비게이션 플로우

```
App Start
  ↓
Realm 초기화
  ↓
Goal Check (Realm Query)
  ↓
├─ No Goal → GoalInputScreen
└─ Has Goal → Action Check
                ↓
                ├─ No Action → ActionCreateScreen
                └─ Has Action → MainScreen
```

#### 7.2 React Navigation 설정

```typescript
type RootStackParamList = {
  GoalInput: undefined;
  ActionCreate: { goalId: string };
  Main: { actionId?: string };
  History: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { currentGoal } = useGoal();
  const currentAction = currentGoal?.actions.filtered('status == "pending"')[0];
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentGoal ? (
        <Stack.Screen name="GoalInput" component={GoalInputScreen} />
      ) : !currentAction ? (
        <Stack.Screen name="ActionCreate" component={ActionCreateScreen} />
      ) : (
        <Stack.Screen name="Main" component={MainScreen} />
      )}
    </Stack.Navigator>
  );
};
```

---

## 검증 계획

### 자동화 테스트

#### 단위 테스트
- [ ] Timer 훅 테스트
- [ ] Realm 쿼리 함수 테스트
- [ ] 데이터 CRUD 로직 테스트

#### 통합 테스트
- [ ] 목표 생성 → 행동 생성 플로우
- [ ] 타이머 실행 → 완료 플로우
- [ ] Realm 데이터 지속성 테스트

### 수동 테스트

#### iOS
- [ ] 알림 권한 요청 및 수신
- [ ] 알림 탭 시 딥 링크 동작
- [ ] 햅틱 피드백 작동
- [ ] 데이터 지속성 확인
- [ ] 다양한 화면 크기 (iPhone SE, iPhone 14 Pro Max)

#### Android
- [ ] 알림 권한 요청 및 수신
- [ ] 알림 탭 시 딥 링크 동작
- [ ] 햅틱 피드백 작동
- [ ] 데이터 지속성 확인
- [ ] 다양한 화면 크기 및 Android 버전

### 성능 테스트
- [ ] 앱 시작 시간 < 2초
- [ ] 타이머 정확도 (10초 ± 0.1초)
- [ ] 메모리 사용량 모니터링
- [ ] 배터리 소모 테스트

---

## 배포 계획

### iOS (TestFlight)

1. **Xcode 설정**
   - Bundle Identifier 설정
   - Signing & Capabilities 설정
   - Push Notification Capability 추가

2. **Archive 및 업로드**
   ```bash
   cd ios
   pod install
   cd ..
   npx react-native run-ios --configuration Release
   ```

3. **App Store Connect**
   - 앱 정보 입력
   - 스크린샷 준비
   - TestFlight 내부 테스터 초대

### Android (Google Play Console - 내부 테스트)

1. **Gradle 설정**
   - `android/app/build.gradle` 버전 코드/이름 설정
   - Signing 설정

2. **APK/AAB 빌드**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

3. **Google Play Console**
   - 앱 생성
   - 내부 테스트 트랙 설정
   - AAB 업로드

---

## 타임라인 (예상)

| Phase | 작업 내용 | 예상 기간 |
|-------|----------|----------|
| 1 | 프로젝트 초기 설정 | 1-2일 |
| 2 | 디자인 시스템 구축 | 1일 |
| 3 | 핵심 화면 구현 | 3-4일 |
| 4 | 로컬 푸시 알림 | 2일 |
| 5 | 데이터 관리 최적화 | 1일 |
| 6 | 상태 관리 | 1일 |
| 7 | 네비게이션 | 1일 |
| 8 | 테스트 및 버그 수정 | 2-3일 |
| 9 | 배포 준비 | 1일 |
| **총계** | | **13-16일** |

---

## 위험 요소 및 대응 방안

### 1. 알림 신뢰성 문제
**위험**: iOS/Android에서 로컬 알림이 정확한 시간에 발송되지 않을 수 있음

**대응**:
- @notifee/react-native 사용 (더 안정적)
- 알림 테스트 자동화
- 사용자에게 알림 설정 가이드 제공

### 2. 데이터 마이그레이션
**위험**: Realm 스키마 변경 시 데이터 마이그레이션 필요

**대응**:
- 스키마 버전 관리 철저히
- 마이그레이션 함수 미리 작성
- 개발 중 스키마 변경 시 앱 재설치로 테스트

### 3. 성능 이슈
**위험**: 타이머 애니메이션으로 인한 성능 저하

**대응**:
- React Native Reanimated 사용
- 불필요한 리렌더링 방지 (useMemo, useCallback)
- 프로파일링 도구 활용

---

## 다음 단계 (MVP 이후)

1. **사용자 피드백 수집**
   - 베타 테스터 모집
   - 사용성 테스트 진행

2. **기능 개선**
   - 반복 알림 패턴
   - 통계 및 분석 대시보드
   - 위젯 지원

3. **확장**
   - 클라우드 동기화 (Realm Sync 또는 자체 백엔드)
   - 다국어 지원
   - 소셜 기능 (목표 공유)
