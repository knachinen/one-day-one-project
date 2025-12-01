import React from 'react';
import { View, StyleSheet, Modal, Switch, TouchableOpacity } from 'react-native';
import { ClockText } from './ClockText';
import { COLORS } from '../constants/theme';
import { useStore } from '../store/useStore';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
    const { is24Hour, toggle24Hour } = useStore();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ClockText size={24} style={styles.title}>SETTINGS</ClockText>

                    <View style={styles.row}>
                        <ClockText size={18}>24-Hour Clock</ClockText>
                        <Switch
                            trackColor={{ false: "#767577", true: COLORS.neon.purple }}
                            thumbColor={is24Hour ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={toggle24Hour}
                            value={is24Hour}
                        />
                    </View>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <ClockText size={16} color={COLORS.background}>CLOSE</ClockText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: '#1a1a2e',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.neon.cyan,
    },
    title: {
        marginBottom: 20,
        color: COLORS.neon.cyan,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: COLORS.neon.white,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginTop: 10,
    },
});
