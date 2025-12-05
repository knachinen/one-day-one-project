import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Switch, // Import Switch
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveProfileToDB, getProfileFromDB } from "../utils/db";
import { COLORS, SPACING, FONT_SIZE } from "../constants/theme";
import * as Crypto from "expo-crypto";

export const ProfileScreen = () => {
  const [medicalInfo, setMedicalInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState("");
  // New states for communication preferences
  const [useCall, setUseCall] = useState(true);
  const [useSms, setUseSms] = useState(true);
  const [useDiscordWebhook, setUseDiscordWebhook] = useState(false); // Default to false

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

      // Load communication preferences
      const storedUseCall = await AsyncStorage.getItem("useCall");
      if (storedUseCall !== null) setUseCall(JSON.parse(storedUseCall));
      const storedUseSms = await AsyncStorage.getItem("useSms");
      if (storedUseSms !== null) setUseSms(JSON.parse(storedUseSms));
      const storedUseDiscordWebhook = await AsyncStorage.getItem("useDiscordWebhook");
      if (storedUseDiscordWebhook !== null) setUseDiscordWebhook(JSON.parse(storedUseDiscordWebhook));

    } catch (error) {
      console.error("Failed to load profile or settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveProfileToDB(medicalInfo);
      // Save Discord webhook URL
      await AsyncStorage.setItem("discordWebhookUrl", discordWebhookUrl.trim());
      // Save communication preferences
      await AsyncStorage.setItem("useCall", JSON.stringify(useCall));
      await AsyncStorage.setItem("useSms", JSON.stringify(useSms));
      await AsyncStorage.setItem("useDiscordWebhook", JSON.stringify(useDiscordWebhook));

      Alert.alert("Success", "Profile and settings saved.");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile or settings.");
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
            style={styles.input}
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

          {/* Communication Preferences */}
          <Text style={[styles.label, styles.sectionTitle]}>Communication Preferences</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Use Emergency Call</Text>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={useCall ? COLORS.white : COLORS.white}
              onValueChange={setUseCall}
              value={useCall}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Use SMS Message</Text>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={useSms ? COLORS.white : COLORS.white}
              onValueChange={setUseSms}
              value={useSms}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Use Discord Webhook</Text>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={useDiscordWebhook ? COLORS.white : COLORS.white}
              onValueChange={setUseDiscordWebhook}
              value={useDiscordWebhook}
            />
          </View>


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
    backgroundColor: COLORS.textSecondary,
    padding: SPACING.m,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  clearWebhookButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.m,
  },
  // New styles for communication preferences
  sectionTitle: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.m,
    fontSize: FONT_SIZE.l,
    fontWeight: 'bold',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  preferenceText: {
    fontSize: FONT_SIZE.m,
    color: COLORS.text,
  },
});
