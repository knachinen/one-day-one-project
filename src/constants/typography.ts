// 타이포그래피 설정
export const Typography = {
    // 폰트 크기
    fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    // 폰트 굵기
    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },

    // 줄 높이
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

// 간격 시스템
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
};

// 테두리 반경
export const BorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
};
