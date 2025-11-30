import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function CompletionModal({ visible, onClose }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark" size={40} color="white" />
                    </View>
                    <Text style={styles.title}>작성 완료!</Text>
                    <Text style={styles.message}>
                        오늘의 성찰이 저장되었습니다.{'\n'}내일 또 만나요!
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: Colors.cardBackground,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        ...Typography.title,
        fontSize: 24,
        marginBottom: 10,
        color: Colors.text.primary,
    },
    message: {
        ...Typography.body,
        textAlign: 'center',
        marginBottom: 24,
        color: Colors.text.secondary,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 30,
        elevation: 2,
    },
    buttonText: {
        ...Typography.heading,
        color: 'white',
        fontSize: 16,
    },
});
