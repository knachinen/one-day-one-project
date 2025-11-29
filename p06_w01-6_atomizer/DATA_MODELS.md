# 📊 데이터 모델 문서 (Realm Schema)

Atomizer 앱은 로컬 데이터베이스인 **Realm**을 사용하여 데이터를 관리합니다.
주요 데이터 모델은 `Goal`(목표)과 `Action`(원자 행동)입니다.

## 1. Goal (목표)

사용자가 설정한 큰 목표를 나타냅니다.

| 필드명 | 타입 | 설명 | 비고 |
|:---:|:---:|:---|:---|
| `_id` | `ObjectId` | 고유 식별자 | Primary Key |
| `title` | `string` | 목표 제목 | 필수 |
| `createdAt` | `date` | 생성 일시 | 필수 |
| `status` | `string` | 목표 상태 | `'active'` \| `'completed'` |
| `actions` | `List<Action>` | 하위 행동 목록 | 1:N 관계 |

```typescript
// 예시 데이터
{
  _id: ObjectId("..."),
  title: "책 한 권 읽기",
  createdAt: ISODate("2023-11-29T10:00:00Z"),
  status: "active",
  actions: [ ... ]
}
```

## 2. Action (원자 행동)

목표를 달성하기 위한 10초 단위의 작은 행동입니다.

| 필드명 | 타입 | 설명 | 비고 |
|:---:|:---:|:---|:---|
| `_id` | `ObjectId` | 고유 식별자 | Primary Key |
| `description` | `string` | 행동 설명 | 필수 |
| `status` | `string` | 행동 상태 | `'pending'` \| `'completed'` |
| `createdAt` | `date` | 생성 일시 | 필수 |
| `completedAt` | `date?` | 완료 일시 | 선택 (완료 시 기록) |
| `reminderTime` | `date?` | 알림 설정 시간 | 선택 |

```typescript
// 예시 데이터
{
  _id: ObjectId("..."),
  description: "책장 앞에서 책 꺼내기",
  status: "pending",
  createdAt: ISODate("2023-11-29T10:05:00Z"),
  reminderTime: ISODate("2023-11-29T10:06:00Z")
}
```

## 3. 데이터 관계

- **Goal**과 **Action**은 **1:N** 관계입니다.
- 하나의 `Goal`은 여러 개의 `Action`을 가질 수 있습니다.
- `Action`은 독립적으로 존재할 수 있지만, 앱 로직상 항상 특정 `Goal`에 종속되어 생성됩니다.

## 4. 주요 쿼리 (Queries)

앱에서 자주 사용되는 Realm 쿼리 패턴입니다.

### 활성 목표 조회
```typescript
const goals = realm.objects('Goal')
  .filtered('status == "active"')
  .sorted('createdAt', true);
const activeGoal = goals[0];
```

### 특정 목표의 대기 중인 행동 조회
```typescript
const pendingActions = activeGoal.actions
  .filtered('status == "pending"');
```
