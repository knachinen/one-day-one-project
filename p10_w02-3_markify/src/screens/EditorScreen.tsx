import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditorScreen() {
    // ... existing code ...

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Copy" onPress={handleCopy} />
                    <Button title="Share" onPress={handleShare} />
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.toggleContainer}>
                    <Button
                        title="Edit"
                        onPress={() => setIsPreview(false)}
                        color={!isPreview ? theme.colors.primary : '#999'}
                    />
                    <Button
                        title="Preview"
                        onPress={() => setIsPreview(true)}
                        color={isPreview ? theme.colors.primary : '#999'}
                    />
                </View>
                <ScrollView style={styles.scrollView}>
                    {isPreview ? (
                        <Markdown style={markdownStyles}>{content}</Markdown>
                    ) : (
                        <TextInput
                            style={styles.editor}
                            multiline
                            value={content}
                            onChangeText={setContent}
                            textAlignVertical="top"
                        />
                    )}
                </ScrollView>
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
        padding: theme.spacing.m,
    },
    // ... existing styles, remove the old container style
});

