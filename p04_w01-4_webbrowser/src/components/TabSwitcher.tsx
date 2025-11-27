import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../constants/theme';
import { Tab } from '../types';
import { extractDomain } from '../utils/urlUtils';

interface TabSwitcherProps {
    tabs: Tab[];
    activeTabId: string;
    onSelectTab: (tabId: string) => void;
    onCloseTab: (tabId: string) => void;
    onNewTab: () => void;
    onClose: () => void;
    isDarkMode: boolean;
}

const { width } = Dimensions.get('window');
const TAB_WIDTH = width * 0.45;

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tabs,
    activeTabId,
    onSelectTab,
    onCloseTab,
    onNewTab,
    onClose,
    isDarkMode,
}) => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.background },
            ]}
        >
            <View
                style={[
                    styles.header,
                    { borderBottomColor: isDarkMode ? COLORS.borderDark : COLORS.border },
                ]}
            >
                <Text
                    style={[
                        styles.title,
                        { color: isDarkMode ? COLORS.textDark : COLORS.text },
                    ]}
                >
                    Tabs ({tabs.length})
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons
                        name="close"
                        size={28}
                        color={isDarkMode ? COLORS.textDark : COLORS.text}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.tabsContainer}
                showsVerticalScrollIndicator={false}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.tabCard,
                            {
                                backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                                borderColor: tab.id === activeTabId ? COLORS.primary : 'transparent',
                            },
                            SHADOWS.md,
                        ]}
                        onPress={() => {
                            onSelectTab(tab.id);
                            onClose();
                        }}
                    >
                        <View style={styles.tabContent}>
                            <View style={styles.tabHeader}>
                                <Ionicons
                                    name="globe-outline"
                                    size={16}
                                    color={isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.tabDomain,
                                        { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {extractDomain(tab.url)}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.tabTitle,
                                    { color: isDarkMode ? COLORS.textDark : COLORS.text },
                                ]}
                                numberOfLines={2}
                            >
                                {tab.title || 'New Tab'}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.closeTabButton}
                            onPress={(e) => {
                                e.stopPropagation();
                                onCloseTab(tab.id);
                            }}
                        >
                            <Ionicons name="close-circle" size={24} color={COLORS.error} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.newTabButton,
                    { backgroundColor: COLORS.primary },
                    SHADOWS.lg,
                ]}
                onPress={() => {
                    onNewTab();
                    onClose();
                }}
            >
                <Ionicons name="add" size={32} color={COLORS.background} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    closeButton: {
        padding: SPACING.xs,
    },
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: SPACING.md,
        paddingBottom: 100,
    },
    tabCard: {
        width: TAB_WIDTH,
        height: 140,
        margin: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 2,
    },
    tabContent: {
        flex: 1,
    },
    tabHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    tabDomain: {
        fontSize: FONT_SIZES.xs,
        marginLeft: SPACING.xs,
        flex: 1,
    },
    tabTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
    },
    closeTabButton: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
    },
    newTabButton: {
        position: 'absolute',
        bottom: SPACING.xl,
        right: SPACING.xl,
        width: 64,
        height: 64,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
