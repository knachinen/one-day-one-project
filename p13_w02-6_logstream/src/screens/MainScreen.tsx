import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useLogStore } from "../store/useLogStore";
import { LogEntry } from "../utils/logParser";
import { useNavigation } from "@react-navigation/native";

const LogItem = React.memo(
  ({
    item,
    onPress,
  }: {
    item: LogEntry;
    onPress: (item: LogEntry) => void;
  }) => {
    const color =
      item.level === "E" || item.level === "F"
        ? "#ff5252"
        : item.level === "W"
        ? "#ffab40"
        : item.level === "D"
        ? "#448aff"
        : "#69f0ae";

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.logRow}>
          <Text style={styles.logText}>
            <Text style={{ color }}>
              {item.level}/{item.tag}:{" "}
            </Text>
            {item.message.slice(0, 100)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export const MainScreen = () => {
  const navigation = useNavigation<any>();
  const logs = useLogStore((state) => state.logs);
  const isCapturing = useLogStore((state) => state.isCapturing);
  const setCapturing = useLogStore((state) => state.setCapturing);
  const clearLogs = useLogStore((state) => state.clearLogs);

  const onLogPress = useCallback(
    (item: LogEntry) => {
      navigation.navigate("LogDetail", { log: item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: LogEntry }) => (
      <LogItem item={item} onPress={onLogPress} />
    ),
    [onLogPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.search} placeholder="Search logs..." />
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.button,
              isCapturing ? styles.btnStop : styles.btnStart,
            ]}
            onPress={() => setCapturing(!isCapturing)}
          >
            <Text style={styles.btnText}>{isCapturing ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearLogs}>
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={logs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemType={(item) => "row"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e" },
  header: {
    padding: 10,
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    backgroundColor: "#3d3d3d",
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  controls: { flexDirection: "row" },
  button: {
    padding: 8,
    backgroundColor: "#555",
    borderRadius: 5,
    marginLeft: 5,
  },
  btnStart: { backgroundColor: "#2e7d32" },
  btnStop: { backgroundColor: "#c62828" },
  btnText: { color: "#fff", fontWeight: "bold" },
  listContainer: { flex: 1, paddingHorizontal: 5 },
  logRow: { paddingVertical: 2 },
  logText: { color: "#bbb", fontFamily: "monospace", fontSize: 12 },
});
