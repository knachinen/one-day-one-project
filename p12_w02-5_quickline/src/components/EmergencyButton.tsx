import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Vibration,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { COLORS, LAYOUT, FONT_SIZE } from "../constants/theme";

interface EmergencyButtonProps {
  onActivate: () => void;
  disabled?: boolean;
}

const ACTIVATION_TIME = 0; // 3 seconds

export const EmergencyButton = React.memo<EmergencyButtonProps>(
  ({ onActivate, disabled }) => {
    const [isPressing, setIsPressing] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      if (disabled) return; // Prevent interaction when disabled
      setIsPressing(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      Animated.timing(progress, {
        toValue: 1,
        duration: ACTIVATION_TIME,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          handleActivation();
        }
      });
    };

    const handlePressOut = () => {
      if (disabled) return; // Prevent interaction when disabled
      setIsPressing(false);
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const handleActivation = () => {
      if (disabled) return; // Prevent activation when disabled
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Vibration.vibrate([0, 500, 200, 500]); // Vibrate pattern
      onActivate();
      // Reset progress after activation
      progress.setValue(0);
      setIsPressing(false);
    };

    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    });

    const backgroundColor = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [disabled ? COLORS.textSecondary : COLORS.primary, disabled ? COLORS.textSecondary : "#D32F2F"], // Darker red when pressing
    });

    return (
      <View style={styles.container}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.buttonWrapper}
          accessibilityLabel="Emergency SOS Button"
          accessibilityHint="Double tap and hold for 3 seconds to send emergency message"
          accessibilityRole="button"
          disabled={disabled} // Pass disabled prop to Pressable
          accessibilityState={{ disabled: disabled || false, busy: isPressing }}
        >
          <Animated.View
            style={[
              styles.button,
              {
                transform: [{ scale }],
                backgroundColor,
              },
            ]}
          >
            <Text style={styles.sosText}>505</Text>
            <Text style={styles.subText}>SOS</Text>
          </Animated.View>
        </Pressable>
        {isPressing && (
          <Text style={styles.instructionText}>
            Keep holding to activate...
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    borderRadius: LAYOUT.emergencyButtonSize / 2,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  button: {
    width: LAYOUT.emergencyButtonSize,
    height: LAYOUT.emergencyButtonSize,
    borderRadius: LAYOUT.emergencyButtonSize / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  sosText: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: "bold",
    color: COLORS.white,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", // Digital look
  },
  subText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "600",
    color: COLORS.white,
    marginTop: -5,
  },
  instructionText: {
    marginTop: 16,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.m,
  },
});
