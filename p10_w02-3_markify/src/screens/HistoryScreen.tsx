import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
    // ... existing code ...

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>History</Text>
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent} // Use flatListContent here
                    ListEmptyComponent={<Text style={styles.emptyText}>No saved notes</Text>}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    title: {
        fontSize: theme.textVariants.header.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    flatListContent: { // New style for FlatList content
        flexGrow: 1, // Allow content to grow
        width: '100%', // Ensure it takes full width
        paddingBottom: theme.spacing.xl,
    },
    item: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.m,
        borderRadius: 8,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        width: '100%', // Ensure items take full width of their container
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: theme.spacing.xl,
    },
});
