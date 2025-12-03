import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../constants/theme';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

const BOOKMARKLET_CODE = `javascript:(function(){var h=document.documentElement.outerHTML;window.location.href='markify://convert?html='+encodeURIComponent(h);})();`;

export default function BookmarkletScreen() {
    const handleCopy = async () => {
        await Clipboard.setStringAsync(BOOKMARKLET_CODE);
        Alert.alert('복사 완료', '북마클릿 코드가 클립보드에 복사되었습니다!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>북마클릿 설정</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📌 북마클릿이란?</Text>
                    <Text style={styles.text}>
                        브라우저에서 웹페이지의 HTML을 Markify 앱으로 바로 전송할 수 있는 기능입니다.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1️⃣ 코드 복사</Text>
                    <TouchableOpacity style={styles.codeContainer} onPress={handleCopy}>
                        <Text style={styles.code} numberOfLines={3}>
                            {BOOKMARKLET_CODE}
                        </Text>
                        <Text style={styles.copyHint}>탭하여 복사</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2️⃣ 브라우저 설정</Text>

                    <Text style={styles.subtitle}>Android Chrome:</Text>
                    <Text style={styles.step}>• 아무 페이지나 북마크 추가</Text>
                    <Text style={styles.step}>• 북마크 편집 → URL에 복사한 코드 붙여넣기</Text>
                    <Text style={styles.step}>• 이름: "Markify로 변환"</Text>

                    <Text style={[styles.subtitle, styles.marginTop]}>iOS Safari:</Text>
                    <Text style={styles.step}>• 아무 페이지나 북마크 추가</Text>
                    <Text style={styles.step}>• 설정 → Safari → 즐겨찾기</Text>
                    <Text style={styles.step}>• 북마크 편집 → URL에 복사한 코드 붙여넣기</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3️⃣ 사용 방법</Text>
                    <Text style={styles.step}>• 변환하고 싶은 웹페이지 열기</Text>
                    <Text style={styles.step}>• 북마크에서 "Markify로 변환" 선택</Text>
                    <Text style={styles.step}>• Markify 앱이 자동으로 열림!</Text>
                </View>

                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>💡 참고</Text>
                    <Text style={styles.noteText}>
                        매우 큰 페이지는 URL 길이 제한으로 실패할 수 있습니다.
                        이 경우 "HTML Text" 모드를 사용하세요.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    section: {
        marginBottom: theme.spacing.l,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    text: {
        fontSize: 16,
        color: theme.colors.text,
        lineHeight: 24,
    },
    codeContainer: {
        backgroundColor: '#2d2d2d',
        padding: theme.spacing.m,
        borderRadius: 8,
        marginTop: theme.spacing.s,
    },
    code: {
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    copyHint: {
        color: '#888',
        fontSize: 12,
        marginTop: theme.spacing.s,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.s,
    },
    step: {
        fontSize: 14,
        color: theme.colors.text,
        marginLeft: theme.spacing.m,
        marginBottom: 4,
        lineHeight: 20,
    },
    marginTop: {
        marginTop: theme.spacing.l,
    },
    noteContainer: {
        backgroundColor: '#fff3cd',
        padding: theme.spacing.m,
        borderRadius: 8,
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.xl,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: theme.spacing.s,
    },
    noteText: {
        fontSize: 14,
        color: '#856404',
        lineHeight: 20,
    },
});