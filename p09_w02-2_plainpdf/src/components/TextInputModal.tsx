import React, { useState } from 'react';
import { Modal, StyleSheet, View, TextInput, Button } from 'react-native';

interface TextInputModalProps {
    visible: boolean;
    onSave: (text: string) => void;
    onCancel: () => void;
}

export const TextInputModal: React.FC<TextInputModalProps> = ({ visible, onSave, onCancel }) => {
    const [text, setText] = useState('');

    const handleSave = () => {
        onSave(text);
        setText('');
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter note..."
                        value={text}
                        onChangeText={setText}
                        autoFocus
                    />
                    <View style={styles.buttons}>
                        <Button title="Cancel" onPress={onCancel} />
                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
