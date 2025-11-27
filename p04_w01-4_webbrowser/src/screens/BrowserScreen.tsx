import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrowserTab } from '../components/BrowserTab';
import { URLBar } from '../components/URLBar';
import { NavigationControls } from '../components/NavigationControls';
import { TabSwitcher } from '../components/TabSwitcher';
import { COLORS } from '../constants/theme';
import { Tab, Settings } from '../types';
import { getTabs, saveTabs, getActiveTabId, saveActiveTabId, addHistoryItem, getBookmarks, addBookmark } from '../utils/storage';

interface BrowserScreenProps {
    isDarkMode: boolean;
    searchEngine: Settings['defaultSearchEngine'];
}

const DEFAULT_URL = 'https://www.google.com';

export const BrowserScreen: React.FC<BrowserScreenProps> = ({ isDarkMode, searchEngine }) => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>('');
    const [showTabSwitcher, setShowTabSwitcher] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

    useEffect(() => {
        loadTabs();
        loadBookmarkedUrls();
    }, []);

    useEffect(() => {
        saveTabs(tabs);
    }, [tabs]);

    useEffect(() => {
        if (activeTabId) {
            saveActiveTabId(activeTabId);
        }
    }, [activeTabId]);

    const loadTabs = async () => {
        const savedTabs = await getTabs();
        const savedActiveTabId = await getActiveTabId();

        if (savedTabs.length > 0) {
            setTabs(savedTabs);
            setActiveTabId(savedActiveTabId || savedTabs[0].id);
        } else {
            createNewTab();
        }
    };

    const loadBookmarkedUrls = async () => {
        const bookmarks = await getBookmarks();
        setBookmarkedUrls(new Set(bookmarks.map(b => b.url)));
    };

    const handleBookmark = async () => {
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (!activeTab || !activeTab.url) return;

        if (bookmarkedUrls.has(activeTab.url)) {
            // Already bookmarked - visual feedback only
            return;
        }

        await addBookmark({
            url: activeTab.url,
            title: activeTab.title || activeTab.url,
        });

        setBookmarkedUrls(new Set([...bookmarkedUrls, activeTab.url]));
    };

    const createNewTab = () => {
        const newTab: Tab = {
            id: Date.now().toString(),
            url: DEFAULT_URL,
            title: 'New Tab',
            canGoBack: false,
            canGoForward: false,
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTab.id);
    };

    const closeTab = (tabId: string) => {
        const updatedTabs = tabs.filter(t => t.id !== tabId);

        if (updatedTabs.length === 0) {
            createNewTab();
        } else {
            setTabs(updatedTabs);
            if (activeTabId === tabId) {
                setActiveTabId(updatedTabs[0].id);
            }
        }
    };

    const updateTab = (updatedTab: Tab) => {
        setTabs(tabs.map(t => t.id === updatedTab.id ? updatedTab : t));

        // Add to history
        if (updatedTab.url && updatedTab.title) {
            addHistoryItem({
                url: updatedTab.url,
                title: updatedTab.title,
            });
        }
    };

    const navigateToUrl = (url: string) => {
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (activeTab) {
            updateTab({ ...activeTab, url });
        }
    };

    const handleBack = () => {
        // WebView handles this internally
    };

    const handleForward = () => {
        // WebView handles this internally
    };

    const handleReload = () => {
        // WebView handles this internally
    };

    const handleHome = () => {
        navigateToUrl(DEFAULT_URL);
    };

    const activeTab = tabs.find(t => t.id === activeTabId);

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.background },
            ]}
            edges={['top', 'left', 'right']}
        >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? COLORS.backgroundDark : COLORS.background}
                translucent={false}
            />

            <URLBar
                url={activeTab?.url || ''}
                onNavigate={navigateToUrl}
                isDarkMode={isDarkMode}
                searchEngine={searchEngine}
                onBookmark={handleBookmark}
                isBookmarked={activeTab?.url ? bookmarkedUrls.has(activeTab.url) : false}
            />

            <View style={styles.webviewContainer}>
                {tabs.map(tab => (
                    <BrowserTab
                        key={tab.id}
                        tab={tab}
                        isActive={tab.id === activeTabId}
                        onNavigationStateChange={updateTab}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </View>

            <NavigationControls
                canGoBack={activeTab?.canGoBack || false}
                canGoForward={activeTab?.canGoForward || false}
                onBack={handleBack}
                onForward={handleForward}
                onReload={handleReload}
                onHome={handleHome}
                onTabSwitch={() => setShowTabSwitcher(true)}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
            />

            <Modal
                visible={showTabSwitcher}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <TabSwitcher
                        tabs={tabs}
                        activeTabId={activeTabId}
                        onSelectTab={setActiveTabId}
                        onCloseTab={closeTab}
                        onNewTab={createNewTab}
                        onClose={() => setShowTabSwitcher(false)}
                        isDarkMode={isDarkMode}
                    />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webviewContainer: {
        flex: 1,
    },
});
