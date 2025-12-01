import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTime } from '../hooks/useTime';
import { formatTime } from '../utils/time';
import { ClockText } from '../components/ClockText';
import { AnimatedClockChar } from '../components/AnimatedClockChar';
import { SettingsModal } from '../components/SettingsModal';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';

export const MainScreen = () => {
    const time = useTime();
    const { is24Hour } = useStore();
    const { h, m, s } = formatTime(time, is24Hour);
    const [isDecoding, setIsDecoding] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const lastTap = useRef(0);

    const handleDecode = () => {
        setIsDecoding(true);
        setTimeout(() => setIsDecoding(false), 3000);
    };

    const handlePress = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            handleDecode();
        }
        lastTap.current = now;
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <LinearGradient
                colors={[COLORS.background, '#1a1a2e', COLORS.background]}
                style={styles.container}
            >
                <StatusBar style="light" />
                <View style={styles.clockContainer}>
                    {/* Hour */}
                    <AnimatedClockChar char={h} size={120} color={COLORS.neon.cyan} glow />

                    <View style={styles.row}>
                        {/* Minute */}
                        <View style={styles.pair}>
                            <AnimatedClockChar char={m[0]} size={80} color={COLORS.neon.purple} glow />
                            <AnimatedClockChar char={m[1]} size={80} color={COLORS.neon.purple} glow />
                        </View>

                        {/* Second */}
                        <View style={styles.pair}>
                            <AnimatedClockChar char={s[0]} size={80} color={COLORS.neon.white} glow />
                            <AnimatedClockChar char={s[1]} size={80} color={COLORS.neon.white} glow />
                        </View>
                    </View>

                    {isDecoding && (
                        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.decodeOverlay}>
                            <Text style={styles.decodeText}>
                                {time.toLocaleTimeString('en-US', { hour12: !is24Hour })}
                            </Text>
                        </Animated.View>
                    )}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleDecode} style={styles.button}>
                        <ClockText size={16} color={COLORS.text} style={{ opacity: 0.7 }}>DECODE</ClockText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.button}>
                        <ClockText size={16} color={COLORS.text} style={{ opacity: 0.7 }}>SETTINGS</ClockText>
                    </TouchableOpacity>
                </View>

                <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    pair: {
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
    },
    decodeOverlay: {
        position: 'absolute',
        bottom: -50,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    decodeText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Courier',
    },
});
