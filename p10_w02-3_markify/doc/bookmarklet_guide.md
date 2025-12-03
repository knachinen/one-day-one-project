# Markify Bookmarklet

## 북마클릿 코드

브라우저 북마크에 다음 코드를 저장하세요:

```javascript
javascript:(function(){var h=document.documentElement.outerHTML;window.location.href='markify://convert?html='+encodeURIComponent(h);})();
```

## 설치 방법

### Android Chrome

1. **북마크 생성**
   - Chrome에서 아무 페이지나 북마크 추가
   - 북마크 이름: `Markify로 변환`

2. **코드 수정**
   - Chrome 메뉴 → 북마크 → 방금 만든 북마크 편집
   - URL 필드에 위의 JavaScript 코드 붙여넣기
   - 저장

3. **사용 방법**
   - 변환하고 싶은 웹페이지 열기
   - 주소창에 `markify` 입력
   - 자동완성에서 "Markify로 변환" 북마크 선택
   - Markify 앱이 자동으로 열리면서 HTML 전달

### iOS Safari

1. **임시 북마크 생성**
   - Safari에서 아무 페이지나 북마크 추가
   - 이름: `Markify로 변환`

2. **북마크 편집**
   - 설정 → Safari → 즐겨찾기
   - 방금 만든 북마크 선택
   - URL 필드의 내용을 모두 지우고 JavaScript 코드 붙여넣기
   - 완료

3. **사용 방법**
   - 변환하고 싶은 웹페이지 열기
   - 주소창 탭 → 북마크 아이콘
   - "Markify로 변환" 선택
   - Markify 앱이 자동으로 열림

## 작동 원리

1. 북마클릿이 현재 페이지의 HTML 전체를 가져옴
2. `markify://convert?html=...` 형식의 Deep Link 생성
3. Markify 앱이 자동으로 열리면서 HTML 수신
4. 앱에서 자동으로 Markdown으로 변환

## 주의사항

- 매우 큰 페이지(1MB 이상)는 URL 길이 제한으로 실패할 수 있음
- 이 경우 **HTML Text 모드**를 사용하세요
