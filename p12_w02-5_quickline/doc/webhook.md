# Discord Webhook

디스코드 웹훅(Webhook)을 이용하여 긴급 메시지를 보내는 방법은 서버 기반 통신을 활용하는 핵심적인 방법입니다.

이 방법을 상세한 4단계로 나누어 설명해 드립니다.

---

## ⚙️ 4단계: 디스코드 웹훅을 통한 메시지 전송

이 방법은 리액트 네이티브 앱이 **위치 데이터를 백엔드 서버로 전송**하면, 서버가 이 데이터를 가공하여 디스코드 서버로 보내는 방식입니다.

### 1단계: 디스코드 웹훅 URL 생성 (Setup)

가장 먼저, 메시지를 받을 \*\*디스코드 채널에 '직통 URL'\*\*을 만들어야 합니다.

1. **채널 선택:** 긴급 연락망이 모여 있는 디스코드 서버에서 알림을 받을 채널(예: `#긴급-알림`)을 선택합니다.
2. **웹훅 생성:**
   - 채널 설정($\text{Channel Settings}$) $\rightarrow$ 통합($\text{Integrations}$) $\rightarrow$ 웹훅 보기($\text{View Webhooks}$) $\rightarrow$ 새로운 웹훅($\text{New Webhook}$)을 클릭합니다.
   - 웹훅 이름($\text{Quick Line Alarm}$ 등)을 지정합니다.
3. **URL 복사:** 생성된 웹훅의 **웹훅 URL 복사($\text{Copy Webhook URL}$)** 버튼을 눌러 URL을 저장합니다.
   - _이 URL이 백엔드 서버가 메시지를 보낼 최종 목적지입니다._

### 2단계: 시스템 흐름 정의 (Workflow)

긴급 상황 발생 시 데이터가 이동하는 경로입니다.

$$\text{앱 (React Native)} \xrightarrow{\text{1. 긴급 트리거 및 위치 전송}} \text{백엔드 서버 (Node.js, Python 등)} \xrightarrow{\text{2. HTTP POST 요청}} \text{디스코드 웹훅 URL}$$

### 3단계: 백엔드 서버 구현 (The Core Logic)

백엔드 서버가 앱으로부터 위치 데이터(위도 $Lat$, 경도 $Lon$)를 수신하면, 디스코드가 이해할 수 있는 **JSON 형식**으로 데이터를 만들고 웹훅 URL로 $\text{HTTP POST}$ 요청을 보냅니다.

| 항목             | 상세 내용                                                       |
| :--------------- | :-------------------------------------------------------------- |
| **요청 방식**    | $\text{HTTP POST}$                                              |
| **요청 URL**     | 1단계에서 복사한 **웹훅 URL**                                   |
| **Content-Type** | $\text{application/json}$                                       |
| **JSON Payload** | 메시지 본문과 (선택적으로) $\text{Embeds}$ 데이터를 포함합니다. |

### 4단계: JSON Payload 구조 예시 (Embedding Location Data)

단순한 텍스트보다 **$\text{Embeds}$** 기능을 사용하면 지도 링크나 중요 정보를 시각적으로 깔끔하게 보여줄 수 있어 긴급 상황에 훨씬 효과적입니다.

```json
{
  "username": "Quick Line 긴급 알림",
  "content": "@here [긴급 상황 발생] 위치를 확인하고 즉시 대응해주세요!",
  "embeds": [
    {
      "title": "📍 사용자 현재 위치 정보",
      "color": 15158332, // 빨간색 (긴급 상황 강조)
      "fields": [
        {
          "name": "위도/경도",
          "value": "37.5665 / 126.9780", // 서버에서 받은 Lat/Lon 삽입
          "inline": true
        },
        {
          "name": "발생 시간",
          "value": "2025-12-05 16:15:00 KST",
          "inline": true
        }
      ],
      "url": "https://www.google.com/maps/search/?api=1&query=37.5665,126.9780", // 구글 지도 링크
      "footer": {
        "text": "위치 정보는 1분 전 기준입니다."
      }
    }
  ]
}
```

- **`content`:** 채널 전체에 알림을 보내는 `@here` 또는 `@everyone` 태그를 포함하여 즉각적인 주의를 환기시킵니다.
- **`embeds`:** 구조화된 정보 블록입니다. 여기에 위치 좌표와 함께 좌표 기반의 **구글 지도 링크**를 직접 넣어주면, 연락망의 누군가가 클릭 한 번으로 바로 지도 앱을 열어볼 수 있습니다.

이처럼 서버 측에서 **위치 데이터를 지도 링크로 변환**하고 $\text{Embeds}$를 구성하여 웹훅으로 보내면, 모바일 디바이스의 정책 제한 없이 가장 빠르고 정확하게 긴급 상황을 공유할 수 있습니다.
