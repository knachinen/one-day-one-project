import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../constants/theme';
import { Tab } from '../types';

interface BrowserTabProps {
    tab: Tab;
    isActive: boolean;
    onNavigationStateChange: (tab: Tab) => void;
    onLoadStart: () => void;
    onLoadEnd: () => void;
    isDarkMode: boolean;
}

export const BrowserTab: React.FC<BrowserTabProps> = ({
    tab,
    isActive,
    onNavigationStateChange,
    onLoadStart,
    onLoadEnd,
    isDarkMode,
}) => {
    const webViewRef = useRef<WebView>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isActive && webViewRef.current && tab.url) {
            // Load the URL when tab becomes active
            webViewRef.current.reload();
        }
    }, [isActive]);

    const handleNavigationStateChange = (navState: any) => {
        const updatedTab: Tab = {
            ...tab,
            url: navState.url,
            title: navState.title || tab.title,
            canGoBack: navState.canGoBack,
            canGoForward: navState.canGoForward,
        };
        onNavigationStateChange(updatedTab);
    };

    const handleLoadStart = () => {
        setLoading(true);
        onLoadStart();
    };

    const handleLoadEnd = () => {
        setLoading(false);
        onLoadEnd();
    };

    if (!isActive) {
        return null;
    }

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: tab.url }}
                onNavigationStateChange={handleNavigationStateChange}
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
                style={[
                    styles.webview,
                    { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.background },
                ]}
                startInLoadingState
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                )}
                allowsBackForwardNavigationGestures
                javaScriptEnabled
                domStorageEnabled
                sharedCookiesEnabled
            />
            {loading && (
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { backgroundColor: COLORS.primary },
                        ]}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: COLORS.border,
    },
    progressFill: {
        height: '100%',
        width: '30%',
    },
});
