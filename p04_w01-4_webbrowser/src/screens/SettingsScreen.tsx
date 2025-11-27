import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { Settings } from '../types';

interface SettingsScreenProps {
    settings: Settings;
    onUpdateSettings: (settings: Settings) => void;
    isDarkMode: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
    settings,
    onUpdateSettings,
    isDarkMode,
}) => {
    const handleSearchEngineChange = (engine: Settings['defaultSearchEngine']) => {
        onUpdateSettings({ ...settings, defaultSearchEngine: engine });
    };

    const handleDarkModeToggle = (value: boolean) => {
        onUpdateSettings({ ...settings, isDarkMode: value });
    };

    const handleClearCacheToggle = (value: boolean) => {
        onUpdateSettings({ ...settings, clearCacheOnExit: value });
    };

    const renderSearchEngineOption = (
        engine: Settings['defaultSearchEngine'],
        label: string,
        icon: string
    ) => (
        <TouchableOpacity
            style={[
                styles.option,
                {
                    backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    borderColor: settings.defaultSearchEngine === engine ? COLORS.primary : 'transparent',
                },
            ]}
            onPress={() => handleSearchEngineChange(engine)}
        >
            <Ionicons
                name={icon as any}
                size={24}
                color={settings.defaultSearchEngine === engine ? COLORS.primary : (isDarkMode ? COLORS.textDark : COLORS.text)}
            />
            <Text
                style={[
                    styles.optionText,
                    {
                        color: settings.defaultSearchEngine === engine ? COLORS.primary : (isDarkMode ? COLORS.textDark : COLORS.text),
                    },
                ]}
            >
                {label}
            </Text>
            {settings.defaultSearchEngine === engine && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
        </TouchableOpacity>
    );

    const renderSettingRow = (
        icon: string,
        title: string,
        value: boolean,
        onToggle: (value: boolean) => void
    ) => (
        <View
            style={[
                styles.settingRow,
                {
                    backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    borderBottomColor: isDarkMode ? COLORS.borderDark : COLORS.border,
                },
            ]}
        >
            <View style={styles.settingLeft}>
                <Ionicons
                    name={icon as any}
                    size={24}
                    color={isDarkMode ? COLORS.textDark : COLORS.text}
                />
                <Text
                    style={[
                        styles.settingTitle,
                        { color: isDarkMode ? COLORS.textDark : COLORS.text },
                    ]}
                >
                    {title}
                </Text>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={value ? COLORS.primary : COLORS.textSecondary}
            />
        </View>
    );

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.background },
            ]}
            edges={['top', 'left', 'right']}
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
                    Settings
                </Text>
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                        ]}
                    >
                        SEARCH ENGINE
                    </Text>
                    {renderSearchEngineOption('google', 'Google', 'search')}
                    {renderSearchEngineOption('bing', 'Bing', 'search')}
                    {renderSearchEngineOption('duckduckgo', 'DuckDuckGo', 'shield-checkmark')}
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                        ]}
                    >
                        APPEARANCE
                    </Text>
                    {renderSettingRow('moon', 'Dark Mode', settings.isDarkMode, handleDarkModeToggle)}
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                        ]}
                    >
                        PRIVACY
                    </Text>
                    {renderSettingRow(
                        'trash',
                        'Clear Cache on Exit',
                        settings.clearCacheOnExit,
                        handleClearCacheToggle
                    )}
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                        ]}
                    >
                        ABOUT
                    </Text>
                    <View
                        style={[
                            styles.aboutCard,
                            { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card },
                        ]}
                    >
                        <Ionicons
                            name="browsers"
                            size={48}
                            color={COLORS.primary}
                        />
                        <Text
                            style={[
                                styles.appName,
                                { color: isDarkMode ? COLORS.textDark : COLORS.text },
                            ]}
                        >
                            Mobile Browser
                        </Text>
                        <Text
                            style={[
                                styles.version,
                                { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                            ]}
                        >
                            Version 1.0.0
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    section: {
        marginTop: SPACING.lg,
        paddingHorizontal: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xs,
        fontWeight: FONT_WEIGHTS.semibold,
        marginBottom: SPACING.sm,
        letterSpacing: 1,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderWidth: 2,
    },
    optionText: {
        flex: 1,
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        marginLeft: SPACING.md,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        marginLeft: SPACING.md,
    },
    aboutCard: {
        alignItems: 'center',
        padding: SPACING.xl,
        borderRadius: BORDER_RADIUS.lg,
    },
    appName: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        marginTop: SPACING.md,
    },
    version: {
        fontSize: FONT_SIZES.sm,
        marginTop: SPACING.xs,
    },
});
