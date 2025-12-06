import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export const PermissionScreen = () => {
  const navigation = useNavigation<any>();
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    try {
      const result = await PermissionsAndroid.check(
        "android.permission.READ_LOGS" as any
      );
      if (result) {
        setHasPermission(true);
        navigation.replace("Main");
      } else {
        setHasPermission(false);
        Alert.alert(
          "Permission Denied",
          "The 'READ_LOGS' permission is not granted. Please run the ADB command on your PC to grant the permission, then try again."
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ADB Permission Required</Text>
      <Text style={styles.instruction}>Run this command on your PC:</Text>
      <Text style={styles.code}>
        adb shell pm grant com.logstream.app android.permission.READ_LOGS
      </Text>
      <Button title="Check Permission" onPress={checkPermission} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  instruction: { fontSize: 16, marginBottom: 10 },
  code: {
    backgroundColor: "#eee",
    padding: 10,
    marginBottom: 20,
    fontFamily: "monospace",
  },
});
