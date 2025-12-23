
# [Design Tokens] Quest Design System

## 1. 개요 (Overview)

이 문서는 Quest 앱의 모든 디자인 요소에 대한 표준 값을 정의합니다.
개발자와 디자이너가 일관된 UI/UX를 구현할 수 있도록 토큰 기반 시스템을 사용합니다.

---

## 2. 컬러 토큰 (Color Tokens)

### 2.1 Brand Colors
```javascript
const colors = {
  brand: {
    primary: '#66CC66',        // Quest Green - 메인 액션, 활성 상태
    primaryDark: '#52A352',    // 버튼 press 상태
    primaryLight: '#85D685',   // 연한 배경, hover 상태
  },

  secondary: {
    orange: '#FF7043',         // 경고, 강조
    red: '#FF4D4D',           // Live 배지, 알림
    vividRed: '#FF1744',      // 긴급 알림, 에러
  },

  success: {
    green: '#4CAF50',         // 성공 메시지, 증가 지표
    greenLight: '#81C784',    // 연한 성공 배경
  },
};
```

### 2.2 Background Colors
```javascript
const backgrounds = {
  light: {
    primary: '#F7F8F9',       // 메인 배경 (Light Gray)
    secondary: '#F8F9FA',     // 보조 배경 (Soft Grayish White)
    card: '#FFFFFF',          // 카드, 모달 배경
    elevated: '#FFFFFF',      // 높은 층위 요소 (그림자와 함께)
  },

  dark: {
    primary: '#1A1C1E',       // 다크모드 메인 배경 (Deep Charcoal)
    secondary: '#2C2E30',     // 다크모드 카드 배경
    elevated: '#363839',      // 다크모드 높은 층위
  },
};
```

### 2.3 Text Colors
```javascript
const text = {
  light: {
    primary: '#111111',       // 주요 텍스트 (Black/Dark Gray)
    secondary: '#666666',     // 보조 정보 (Medium Gray)
    tertiary: '#999999',      // 비활성, 메타 정보 (Light Gray)
    disabled: '#CCCCCC',      // 비활성화 상태
    inverse: '#FFFFFF',       // 어두운 배경 위 텍스트
  },

  dark: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#808080',
    disabled: '#4A4A4A',
    inverse: '#111111',
  },
};
```

### 2.4 Semantic Colors
```javascript
const semantic = {
  success: '#4CAF50',        // 성공, 완료
  warning: '#FFA726',        // 경고
  error: '#EF5350',          // 에러, 실패
  info: '#42A5F5',           // 정보, 힌트

  online: '#66CC66',         // 온라인 상태
  offline: '#999999',        // 오프라인 상태
  live: '#FF1744',          // 라이브 캠 표시
};
```

### 2.5 Border & Divider Colors
```javascript
const borders = {
  light: {
    subtle: '#E8E8E8',       // 얇은 구분선
    default: '#DDDDDD',      // 기본 테두리
    strong: '#CCCCCC',       // 강조 테두리
  },

  dark: {
    subtle: '#3A3A3A',
    default: '#4A4A4A',
    strong: '#5A5A5A',
  },
};
```

---

## 3. 타이포그래피 토큰 (Typography Tokens)

### 3.1 Font Families
```javascript
const fontFamilies = {
  primary: 'Pretendard',           // 본문, UI 텍스트
  secondary: 'Apple SD Gothic Neo', // Fallback
  mono: 'Roboto Mono',             // 숫자, 타이머, 코드
  monoAlt: 'JetBrains Mono',       // Alternative monospace
};
```

### 3.2 Font Sizes (React Native uses logical pixels)
```javascript
const fontSizes = {
  xs: 10,    // Caption small
  sm: 12,    // Caption, timestamp
  base: 14,  // Body text, chat message
  md: 16,    // Body emphasized
  lg: 18,    // Heading small
  xl: 20,    // Heading medium
  '2xl': 24, // Heading large
  '3xl': 28, // Dashboard label
  '4xl': 36, // Dashboard timer
  '5xl': 40, // Extra large timer
};
```

### 3.3 Font Weights
```javascript
const fontWeights = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};
```

### 3.4 Line Heights
```javascript
const lineHeights = {
  tight: 1.2,    // 타이머, 숫자
  normal: 1.5,   // 본문 텍스트
  relaxed: 1.75, // 긴 텍스트 블록
};
```

### 3.5 Text Styles (Combined Tokens)
```javascript
const textStyles = {
  // Dashboard
  dashboardTimer: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.extraBold,
    lineHeight: lineHeights.tight,
    color: text.light.primary,
  },

  dashboardLabel: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    color: text.light.primary,
  },

  // Headings
  h1: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },

  h2: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },

  h3: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.normal,
  },

  // Body
  body: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },

  bodyEmphasized: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },

  // Caption
  caption: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
    color: text.light.secondary,
  },

  // Timestamp (in photo watermark)
  timestamp: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: text.light.inverse,
  },
};
```

---

## 4. 간격 토큰 (Spacing Tokens)

### 4.1 Spacing Scale (4px base unit)
```javascript
const spacing = {
  0: 0,
  1: 4,      // 4px
  2: 8,      // 8px
  3: 12,     // 12px
  4: 16,     // 16px
  5: 20,     // 20px
  6: 24,     // 24px
  7: 28,     // 28px
  8: 32,     // 32px
  10: 40,    // 40px
  12: 48,    // 48px
  16: 64,    // 64px
  20: 80,    // 80px
};
```

### 4.2 Component Spacing
```javascript
const componentSpacing = {
  cardPadding: spacing[4],        // 16px
  cardMargin: spacing[3],         // 12px
  sectionGap: spacing[6],         // 24px
  listItemGap: spacing[2],        // 8px
  inputPadding: spacing[3],       // 12px
  buttonPadding: spacing[4],      // 16px
  screenPadding: spacing[5],      // 20px
};
```

---

## 5. 테두리 및 그림자 토큰 (Border & Shadow Tokens)

### 5.1 Border Radius
```javascript
const borderRadius = {
  none: 0,
  sm: 4,       // Small elements, chips
  base: 8,     // Cards, buttons
  md: 12,      // Large cards
  lg: 16,      // Modals
  xl: 24,      // Special elements
  full: 9999,  // Fully rounded (circles, pills)
};
```

### 5.2 Border Width
```javascript
const borderWidth = {
  none: 0,
  thin: 1,     // Default borders
  medium: 2,   // Emphasized borders (active, live)
  thick: 4,    // Strong emphasis
};
```

### 5.3 Shadows (Elevation)
```javascript
const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  fab: { // Floating Action Button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};
```

---

## 6. 아이콘 토큰 (Icon Tokens)

### 6.1 Icon Sizes
```javascript
const iconSizes = {
  xs: 16,
  sm: 20,
  base: 24,     // Default icon size
  md: 28,
  lg: 32,
  xl: 40,
  '2xl': 48,
};
```

### 6.2 Icon Style
```javascript
const iconStyle = {
  strokeWidth: 2,        // Line thickness
  lineCap: 'round',      // Round cap for stroke
  lineJoin: 'round',     // Round join for stroke
};
```

---

## 7. 레이아웃 토큰 (Layout Tokens)

### 7.1 Breakpoints (for responsive design)
```javascript
const breakpoints = {
  xs: 320,   // Small phones
  sm: 375,   // Standard phones
  md: 414,   // Large phones
  lg: 768,   // Tablets
  xl: 1024,  // Large tablets
};
```

### 7.2 Container Widths
```javascript
const containerWidths = {
  maxCardWidth: 400,     // Maximum card width on tablets
  maxContentWidth: 800,  // Maximum content width
};
```

### 7.3 Component Heights
```javascript
const heights = {
  tabBar: 60,            // Bottom tab bar height
  header: 56,            // Screen header height
  button: {
    sm: 32,
    base: 44,            // Minimum touch target
    lg: 56,
  },
  input: 48,             // Text input height
  fab: 65,               // Floating action button diameter
  liveBarItem: 48,       // Live cam bar user item
};
```

---

## 8. 애니메이션 토큰 (Animation Tokens)

### 8.1 Duration
```javascript
const duration = {
  instant: 0,
  fast: 150,        // Quick interactions
  base: 250,        // Default transition
  slow: 400,        // Complex animations
  slower: 600,      // Page transitions
};
```

### 8.2 Easing Functions
```javascript
const easing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
```

### 8.3 Animation Presets
```javascript
const animations = {
  fadeIn: {
    duration: duration.base,
    easing: easing.easeOut,
    opacity: [0, 1],
  },

  scaleIn: {
    duration: duration.fast,
    easing: easing.easeOut,
    scale: [0.8, 1],
  },

  slideUp: {
    duration: duration.base,
    easing: easing.easeOut,
    translateY: [20, 0],
  },

  // 타임스탬프 각인 효과
  stampEffect: {
    duration: duration.fast,
    easing: easing.bounce,
    scale: [1.5, 1.0],
  },

  // 배경 전환 (몰입 모드)
  darkModeTransition: {
    duration: duration.slow,
    easing: easing.easeInOut,
  },

  // 리액션 플로팅
  floatingReaction: {
    duration: duration.slower,
    easing: easing.easeOut,
    translateY: [-100, 0],
    opacity: [1, 0],
  },
};
```

---

## 9. Z-Index 토큰 (Layering Tokens)

```javascript
const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 100,
  overlay: 500,
  modal: 1000,
  toast: 2000,
  tooltip: 3000,
  fab: 50,           // Floating action button
  liveBar: 10,       // Live cam bar
};
```

---

## 10. 투명도 토큰 (Opacity Tokens)

```javascript
const opacity = {
  disabled: 0.4,
  subtle: 0.6,
  medium: 0.75,
  strong: 0.9,

  // Overlay backgrounds
  overlayLight: 0.5,
  overlayDark: 0.7,

  // Timestamp watermark
  watermarkBg: 0.6,
};
```

---

## 11. 사용 예시 (Usage Examples)

### 11.1 React Native StyleSheet
```javascript
import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from './design-tokens';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgrounds.light.card,
    padding: spacing[4],
    borderRadius: borderRadius.base,
    ...shadows.base,
  },

  primaryButton: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    borderRadius: borderRadius.base,
    ...shadows.sm,
  },

  timerText: {
    ...textStyles.dashboardTimer,
  },
});
```

### 11.2 Styled Components (if using)
```javascript
import styled from 'styled-components/native';
import { colors, spacing, borderRadius } from './design-tokens';

export const Card = styled.View`
  background-color: ${colors.backgrounds.light.card};
  padding: ${spacing[4]}px;
  border-radius: ${borderRadius.base}px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${colors.brand.primary};
  padding: ${spacing[4]}px ${spacing[6]}px;
  border-radius: ${borderRadius.base}px;
`;
```

---

## 12. 접근성 고려사항 (Accessibility)

### 12.1 Color Contrast Ratios
모든 텍스트는 WCAG 2.1 AA 기준을 충족해야 합니다:
- **Normal text (14-18pt)**: 최소 4.5:1 대비
- **Large text (18pt+ or 14pt+ bold)**: 최소 3:1 대비

### 12.2 Touch Targets
- **최소 크기**: 44x44 logical pixels
- **권장 크기**: 48x48 logical pixels
- **간격**: 최소 8px 여백

### 12.3 Color Independence
- 색상에만 의존하지 않고 아이콘, 레이블, 패턴으로 정보 전달
- 예: 온라인 상태는 녹색 점 + "온라인" 텍스트

---

## 13. 플랫폼별 차이 (Platform Differences)

### 13.1 iOS vs Android
```javascript
import { Platform } from 'react-native';

const platformSpecific = {
  shadow: Platform.select({
    ios: shadows.base,
    android: { elevation: 2 },
  }),

  fontFamily: Platform.select({
    ios: fontFamilies.primary,
    android: fontFamilies.primary,
  }),
};
```

---

## 14. 다크 모드 전환 (Dark Mode Toggle)

### 14.1 Theme Provider Structure
```javascript
export const theme = {
  light: {
    colors: {
      background: backgrounds.light.primary,
      card: backgrounds.light.card,
      text: text.light.primary,
      // ...
    },
  },

  dark: {
    colors: {
      background: backgrounds.dark.primary,
      card: backgrounds.dark.secondary,
      text: text.dark.primary,
      // ...
    },
  },
};
```

---

## 15. 토큰 업데이트 가이드라인

### 15.1 변경 시 주의사항
1. **기존 값 수정**: 앱 전체에 영향을 미치므로 신중히 검토
2. **새 토큰 추가**: 기존 토큰으로 표현 불가능한 경우에만 추가
3. **Deprecated 토큰**: 주석으로 표시하고 대체 토큰 안내

### 15.2 버전 관리
```javascript
// design-tokens.js
export const VERSION = '1.0.0';

// Breaking changes 발생 시 major version up
// 새 토큰 추가 시 minor version up
// 값 조정 시 patch version up
```

---

**마지막 업데이트:** 2025-12-23
**버전:** 1.0.0
