import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { saveProfileToDB, getProfileFromDB } from "../utils/db";
import { COLORS, SPACING, FONT_SIZE } from "../constants/theme";
import * as Crypto from "expo-crypto";

export const ProfileScreen = () => {
  const [medicalInfo, setMedicalInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState(""); // New state for webhook URL

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getProfileFromDB();
      if (profile) {
        setMedicalInfo(profile.medicalInfo);
      }
      // Load Discord webhook URL
      const storedWebhookUrl = await AsyncStorage.getItem("discordWebhookUrl");
      if (storedWebhookUrl) setDiscordWebhookUrl(storedWebhookUrl);
    } catch (error) {
      console.error("Failed to load profile or webhook URL", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveProfileToDB(medicalInfo);
      // Save Discord webhook URL
      await AsyncStorage.setItem("discordWebhookUrl", discordWebhookUrl.trim());
      Alert.alert("Success", "Medical profile and webhook URL saved.");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile or webhook URL.");
    }
  };

  const handleClearWebhookUrl = async () => {
    Alert.alert(
      "Clear Webhook URL",
      "Are you sure you want to remove the Discord webhook URL?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("discordWebhookUrl");
            setDiscordWebhookUrl("");
            Alert.alert("Cleared", "Discord webhook URL has been removed.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Information</Text>
          <Text style={styles.subtitle}>
            This information will be stored locally and encrypted.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Medical Conditions / Allergies / Blood Type
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Type your medical info here..."
            value={medicalInfo}
            onChangeText={setMedicalInfo}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Discord Webhook URL Input */}
          <Text style={styles.label}>Discord Webhook URL (Optional)</Text>
          <TextInput
            style={styles.input} // Reusing input style
            placeholder="Enter Discord Webhook URL"
            value={discordWebhookUrl}
            onChangeText={setDiscordWebhookUrl}
            keyboardType="url"
            autoCapitalize="none"
          />
          <Pressable
            style={styles.clearWebhookButton}
            onPress={handleClearWebhookUrl}
          >
            <Text style={styles.clearWebhookButtonText}>Clear Webhook URL</Text>
          </Pressable>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.m,
  },
  header: {
    marginBottom: SPACING.l,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZE.m,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  form: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: FONT_SIZE.m,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    fontSize: FONT_SIZE.m,
    height: 150,
  },
  input: {
    // Added for webhook URL input
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    fontSize: FONT_SIZE.m,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.m,
  },
  clearWebhookButton: {
    // New style for clear button
    backgroundColor: COLORS.textSecondary,
    padding: SPACING.m,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  clearWebhookButtonText: {
    // New style for clear button text
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.m,
  },
});
