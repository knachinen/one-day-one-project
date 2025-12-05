import React, { useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EmergencyButton } from "../components/EmergencyButton";
import { useLocation } from "../hooks/useLocation";
import {
  sendEmergencySMS,
  callEmergencyNumber,
  generateEmergencyMessage,
  sendEmergencyWebhook,
} from "../utils/communication";
import { useContactStore } from "../store/useContactStore";
import { COLORS, SPACING, FONT_SIZE, LAYOUT } from "../constants/theme";

export const MainScreen = () => {
  const navigation = useNavigation<any>();
  const { coords, address, loading, error, accuracy, refreshLocation } =
    useLocation();
  const { contacts, loadContacts } = useContactStore();

  // Ref to hold latest location to avoid re-creating handleEmergencyActivate
  const locationRef = useRef({ coords, address });

  useEffect(() => {
    locationRef.current = { coords, address };
  }, [coords, address]);

  useEffect(() => {
    loadContacts();
  }, []);

  const handleEmergencyActivate = useCallback(() => {
    const { coords: currentCoords, address: currentAddress } =
      locationRef.current;
    console.log(
      "Emergency Activate - Coords:",
      currentCoords,
      "Address:",
      currentAddress
    );
    const message = generateEmergencyMessage(currentCoords, currentAddress);

    // Send webhook notification (async, no need to await and block UI)
    sendEmergencyWebhook(currentCoords, currentAddress);

    // Send to all contacts (using contacts from closure is fine as it updates less frequently,
    // or we could use a ref for contacts too if needed, but let's stick to location optimization first)
    if (contacts.length === 0) {
      // Fallback if no contacts
      const TEST_NUMBER = "01000000000";
      sendEmergencySMS(TEST_NUMBER, message);
    } else {
      // For MVP, let's send to the first contact
      //   sendEmergencySMS(contacts[0].phone, message);
    }
  }, [contacts]); // Re-create only if contacts change

  const handleCallContact = (phone: string) => {
    callEmergencyNumber(phone);
  };

  const navigateToSettings = () => {
    navigation.navigate("Contacts"); // For now, settings icon goes to Contacts
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>긴급 요청</Text>
        <Pressable style={styles.settingsButton} onPress={navigateToSettings}>
          <Ionicons
            name="settings-sharp"
            size={24}
            color={COLORS.textSecondary}
          />
        </Pressable>
      </View>

      {/* Location Status */}
      <View style={styles.locationContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={24} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={refreshLocation} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.locationText}>
              {address || "위치를 찾는 중..."}
            </Text>
            <Text
              style={[
                styles.accuracyText,
                { color: accuracy === "high" ? COLORS.success : COLORS.error },
              ]}
            >
              {accuracy === "high"
                ? "정확도 높음"
                : "정확도 낮음 (GPS 신호 약함)"}
            </Text>
          </>
        )}
      </View>

      {/* Emergency Button */}
      <View style={styles.centerContainer}>
        <EmergencyButton onActivate={handleEmergencyActivate} />
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        {contacts.length > 0 ? (
          contacts.slice(0, 2).map((contact, index) => (
            <React.Fragment key={contact.id}>
              <Pressable
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: index === 0 ? COLORS.police : COLORS.fire,
                  },
                ]}
                onPress={() => handleCallContact(contact.phone)}
                accessibilityLabel={`Call ${contact.name}`}
                accessibilityHint={`Double tap to call ${contact.name} at ${contact.phone}`}
                accessibilityRole="button"
              >
                <Ionicons
                  name="call"
                  size={24}
                  color={COLORS.white}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionButtonText}>{contact.name}</Text>
              </Pressable>
              {index === 0 && contacts.length > 1 && (
                <View style={{ width: SPACING.m }} />
              )}
            </React.Fragment>
          ))
        ) : (
          <Pressable
            style={[
              styles.actionButton,
              { backgroundColor: COLORS.textSecondary },
            ]}
            onPress={navigateToSettings}
            accessibilityLabel="Add Emergency Contact"
            accessibilityHint="Double tap to go to settings and add contacts"
            accessibilityRole="button"
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={COLORS.white}
              style={styles.actionIcon}
            />
            <Text style={styles.actionButtonText}>연락처 추가</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.m,
    position: "relative",
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
    color: COLORS.text,
  },
  settingsButton: {
    position: "absolute",
    right: SPACING.m,
    padding: SPACING.s,
  },
  locationContainer: {
    alignItems: "center",
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
    minHeight: 80, // Prevent layout jump
    justifyContent: "center",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.m,
    textAlign: "center",
    marginVertical: SPACING.s,
  },
  retryButton: {
    padding: SPACING.s,
  },
  retryText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: FONT_SIZE.l,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  accuracyText: {
    fontSize: FONT_SIZE.s,
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.xl,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    height: LAYOUT.actionButtonHeight,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    marginRight: SPACING.s,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.l,
    fontWeight: "600",
  },
});
