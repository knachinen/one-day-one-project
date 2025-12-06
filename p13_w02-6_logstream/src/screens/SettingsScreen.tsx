import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { File, Directory, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useLogStore } from "../store/useLogStore";

export const SettingsScreen = () => {
  const logs = useLogStore((state) => state.logs);
  const [filename, setFilename] = useState(
    `log-${new Date().toISOString().slice(0, 10)}.txt`
  );
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const getDocumentDirectory = () => {
    // Paths.document provides the base URI for the document directory
    return new Directory(Paths.document);
  };

  const loadFiles = async () => {
    try {
      const documentDir = getDocumentDirectory();

      // Check if the directory exists before listing its contents
      if (!documentDir.exists) {
        setFiles([]); // Directory doesn't exist, so no files
        return;
      }

      const filesAndFolders: string[] = [];
      for await (const item of documentDir.list()) {
        if (item instanceof File && item.name.endsWith(".txt")) {
          filesAndFolders.push(item.name);
        }
      }
      setFiles(filesAndFolders);
    } catch (e) {
      console.error(e);
      setFiles([]);
    }
  };

  const saveLogs = async () => {
    if (!filename) return;
    const documentDir = getDocumentDirectory();
    const logFile = new File(documentDir, filename);
    const content = logs
      .map((l) => `${l.timestamp} ${l.level}/${l.tag}: ${l.message}`)
      .join("\n");
    try {
      // Ensure the directory exists (handled by getDocumentDirectory implicitly)
      // Check if file exists, if so, delete it before creating to overwrite
      if (logFile.exists) {
        await logFile.delete();
      }
      await logFile.create();
      await logFile.write(content);
      Alert.alert("Saved", "Logs saved to " + filename);
      loadFiles();
    } catch (e) {
      console.error("Failed to save logs:", e);
      Alert.alert("Error", "Failed to save logs");
    }
  };

  const shareFile = async (name: string) => {
    const documentDir = getDocumentDirectory();
    const logFile = new File(documentDir, name);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(logFile.uri);
    } else {
      Alert.alert("Error", "Sharing is not available");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Save & Manage Logs</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Save Current Logs</Text>
        <TextInput
          style={styles.input}
          value={filename}
          onChangeText={setFilename}
          placeholder="filename.txt"
        />
        <TouchableOpacity style={styles.btn} onPress={saveLogs}>
          <Text style={styles.btnText}>Save to File ({logs.length} lines)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Saved Files</Text>
        <FlatList
          data={files}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>{item}</Text>
              <TouchableOpacity onPress={() => shareFile(item)}>
                <Text style={styles.action}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 10, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  fileName: { fontSize: 16 },
  action: { color: "#2196f3", fontWeight: "bold" },
});
