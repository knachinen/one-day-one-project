import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    // ... existing code ...

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Markify</Text>

            {/* ... existing content ... */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center', // Remove this line
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    // ... existing styles ...
});

