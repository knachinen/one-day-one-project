# 🔧 문제 해결 가이드

## Port 3000 이미 사용 중 (EADDRINUSE)

### 문제
```
Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
```

### 해결 방법

#### 방법 1: npm 스크립트 사용 (권장)
```bash
cd server
npm run kill
npm run dev
```

#### 방법 2: 수동으로 프로세스 종료
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /F /PID <PID>
```

#### 방법 3: 셸 스크립트 직접 실행
```bash
cd server
./kill-server.sh
npm run dev
```

---

## Expo 플러그인 오류 (expo-camera)

### 문제
```
PluginError: Failed to resolve plugin for module "expo-camera"
```

### 해결 방법

#### 1. 패키지가 설치되었는지 확인
```bash
cd mobile
npm install react-native-screens react-native-safe-area-context expo-camera expo-image-picker expo-image-manipulator
```

#### 2. app.config.js 확인
**MVP에서는 Expo Go를 사용하므로 plugins 배열이 없어야 합니다.**

`mobile/app.config.js`가 다음과 같은지 확인:
```javascript
export default {
  expo: {
    // ... 다른 설정들
    extra: {
      apiUrl: process.env.API_URL || 'http://192.168.1.100:3000'
    }
    // ❌ plugins: [...] 없어야 함
  }
};
```

plugins 배열이 있다면 제거하세요. (개발 빌드에만 필요)

#### 3. 캐시 클리어 후 재시작
```bash
cd mobile
rm -rf .expo node_modules
npm install
npx expo start -c
```

---

## 모바일 앱 연결 실패

### 문제
앱 화면에 "❌ Connection failed" 표시

### 해결 방법

#### 1. 서버가 실행 중인지 확인
브라우저에서 확인:
```
http://localhost:3000/api/health
```

#### 2. 같은 WiFi 확인
- 스마트폰과 컴퓨터가 **같은 WiFi**에 연결되어 있는지 확인

#### 3. IP 주소 확인 및 설정

**내 IP 주소 확인:**
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig | findstr IPv4
```

**mobile/app.config.js 수정:**
```javascript
extra: {
  apiUrl: 'http://YOUR_IP_HERE:3000'  // 예: 'http://192.168.1.100:3000'
}
```

**앱 재시작:**
- Expo 터미널에서 `r` 키를 눌러 리로드

#### 4. 방화벽 확인
- 3000번 포트가 방화벽에 차단되어 있지 않은지 확인

**macOS:**
```bash
# 방화벽 상태 확인
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

**Windows:**
- 제어판 > Windows Defender 방화벽 > 고급 설정
- 인바운드 규칙에서 3000번 포트 허용

---

## Expo 캐시 문제

### 문제
앱이 업데이트되지 않거나 이상하게 동작

### 해결 방법
```bash
cd mobile
npx expo start -c  # 캐시 클리어 후 시작
```

또는 완전히 재설치:
```bash
rm -rf node_modules
rm -rf .expo
npm install
npx expo start
```

---

## 데이터베이스 오류

### 문제
SQLite 관련 오류 발생

### 해결 방법

#### 데이터베이스 재초기화
```bash
cd server
rm quest.db
npm run init-db
npm run dev
```

#### SQLite 패키지 재설치
```bash
cd server
rm -rf node_modules
npm install
npm run init-db
```

---

## 패키지 설치 오류

### 문제
npm install 실행 시 오류 발생

### 해결 방법

#### Node.js 버전 확인
```bash
node --version  # v18.0.0 이상 필요
npm --version   # v9.0.0 이상 필요
```

#### 캐시 클리어 후 재설치
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Expo Go 앱에서 QR 스캔 안 됨

### 문제
QR 코드를 스캔해도 앱이 실행되지 않음

### 해결 방법

#### 1. Expo Go 최신 버전 확인
- App Store / Play Store에서 업데이트 확인

#### 2. 수동 URL 입력
```bash
# Expo 터미널에서 URL 확인
exp://192.168.1.100:8081
```

Expo Go 앱에서:
- "Enter URL manually" 선택
- 위 URL 입력

#### 3. 터널 모드 사용
```bash
cd mobile
npx expo start --tunnel
```

---

## 서버가 자동으로 재시작되지 않음

### 문제
코드 변경 후 nodemon이 재시작하지 않음

### 해결 방법

#### nodemon 재설치
```bash
cd server
npm install --save-dev nodemon
```

#### 수동 재시작
서버를 종료하고 다시 시작:
```bash
# Ctrl+C로 종료
npm run dev
```

---

## 일반적인 디버깅 팁

### 1. 로그 확인
**서버:**
- 터미널에서 에러 메시지 확인
- `console.log()` 사용

**모바일:**
- Expo 터미널에서 로그 확인
- 크롬 개발자 도구: `j` 키

### 2. 재시작 순서
문제 발생 시 다음 순서로 재시작:

```bash
# 1. 서버 종료 및 재시작
cd server
npm run kill  # 또는 Ctrl+C
npm run dev

# 2. 모바일 앱 재시작
cd mobile
# Expo 터미널에서 'r' 키
```

### 3. 완전 초기화
모든 것이 안 될 때:

```bash
# 서버
cd server
rm -rf node_modules quest.db
npm install
npm run init-db
npm run dev

# 모바일 (새 터미널)
cd mobile
rm -rf node_modules .expo
npm install
npx expo start -c
```

---

## 도움이 더 필요한 경우

1. **에러 메시지 확인**
   - 정확한 에러 메시지를 복사해서 검색

2. **문서 참고**
   - `doc/mvp-setup-guide.md` - 상세 설정 가이드
   - `README.md` - 프로젝트 개요

3. **로그 저장**
   ```bash
   # 서버 로그
   cd server
   npm run dev > server.log 2>&1

   # 에러 발생 시 server.log 확인
   ```

---

## 빠른 체크리스트

서버 시작 전:
- [ ] Node.js v18+ 설치됨
- [ ] 3000번 포트가 비어있음
- [ ] `quest.db` 파일 존재

앱 연결 전:
- [ ] 서버가 실행 중
- [ ] 같은 WiFi 연결
- [ ] `app.config.js`의 IP 주소 확인
- [ ] 방화벽 3000번 포트 허용

---

**여전히 문제가 해결되지 않나요?**
- GitHub Issues에 문의
- 에러 로그와 함께 상세히 설명해주세요
