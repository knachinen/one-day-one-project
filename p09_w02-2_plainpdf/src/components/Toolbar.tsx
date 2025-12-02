import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AnnotationType } from '../types';

interface ToolbarProps {
    activeTool: AnnotationType | null;
    onSelectTool: (tool: AnnotationType | null) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onSelectTool }) => {
    const tools: { label: string; value: AnnotationType | null }[] = [
        { label: 'View', value: null },
        { label: 'Highlight', value: 'highlight' },
        { label: 'Text', value: 'text' },
        { label: 'Draw', value: 'draw' },
    ];

    return (
        <View style={styles.container}>
            {tools.map((tool) => (
                <TouchableOpacity
                    key={tool.label}
                    style={[
                        styles.button,
                        activeTool === tool.value && styles.activeButton,
                    ]}
                    onPress={() => onSelectTool(tool.value)}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            activeTool === tool.value && styles.activeButtonText,
                        ]}
                    >
                        {tool.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#333',
        fontWeight: '600',
    },
    activeButtonText: {
        color: '#fff',
    },
});
