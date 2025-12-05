import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export const sendEmergencySMS = async (
  phoneNumber: string,
  message: string
) => {
  const separator = Platform.OS === "ios" ? "&" : "?";
  const url = `sms:${phoneNumber}${separator}body=${encodeURIComponent(
    message
  )}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("SMS not supported");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
};

export const callEmergencyNumber = async (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Phone calls not supported");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
};

export const generateEmergencyMessage = (
  coords: { latitude: number; longitude: number } | null,
  address: string | null
) => {
  let message = "SOS! I need help!\n";

  if (coords) {
    message += `\nMy Location: https://www.google.com/maps/@${coords.latitude},${coords.longitude},15z`;
    message += `\nLat: ${coords.latitude}, Lon: ${coords.longitude}`;
  }

  if (address) {
    message += `\nApprox. Address: ${address}`;
  }
  return message;
};

export const sendEmergencyWebhook = async (
  coords: { latitude: number; longitude: number } | null,
  address: string | null
) => {
  const discordWebhookUrl = await AsyncStorage.getItem("discordWebhookUrl");

  if (!discordWebhookUrl) {
    console.warn(
      "Discord webhook URL is not configured in settings. Skipping webhook."
    );
    return;
  }

  let messageContent = "SOS! Emergency alert from QuickLine App!\n";
  if (coords) {
    messageContent += `Location: https://www.google.com/maps/@${coords.latitude},${coords.longitude},15z\n`;
    messageContent += `Lat: ${coords.latitude}, Lon: ${coords.longitude}\n`;
  }
  if (address) {
    messageContent += `Approx. Address: ${address}\n`;
  }
  messageContent += `Timestamp: ${new Date().toLocaleString()}`;

  const discordPayload = {
    content: `@here ${messageContent}`, // @here to ping everyone in the channel
    username: "QuickLine Emergency Bot",
    // avatar_url: "YOUR_BOT_AVATAR_URL_HERE", // Optional: replace with a URL to an avatar image
  };

  console.log("Sending Discord webhook with payload:", discordPayload);

  try {
    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Discord API responded with status ${response.status}: ${errorData}`
      );
    }

    console.log("Emergency Discord webhook sent successfully.");
  } catch (error) {
    console.error("Failed to send emergency Discord webhook:", error);
  }
};
