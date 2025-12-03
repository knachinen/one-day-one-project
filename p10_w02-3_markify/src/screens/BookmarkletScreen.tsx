import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookmarkletScreen() {
    // ... existing code ...

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>북마클릿 설정</Text>

                {/* ... existing content ... */}
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
    // ... existing styles ...
});
