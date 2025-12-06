import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList, FlashListRef } from "@shopify/flash-list";
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

  const listRef = useRef<FlashListRef<LogEntry>>(null);
  const scrollMetricsRef = useRef<{
    layoutMeasurement: { width: number; height: number };
    contentOffset: { x: number; y: number };
    contentSize: { width: number; height: number };
  } | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  const insets = useSafeAreaInsets();

  const checkScrollPosition = useCallback((
    layoutMeasurement: { width: number; height: number },
    contentOffset: { x: number; y: number },
    contentSize: { width: number; height: number }
  ) => {
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom) {
      setShowScrollToBottomButton(false);
    } else {
      setShowScrollToBottomButton(true);
    }
  }, []);

  const handleScrollBeginDrag = useCallback(() => {
    setIsUserScrolling(true);
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 500);
  }, []);

  const handleScroll = useCallback((
    layoutMeasurement: { width: number; height: number },
    contentOffset: { x: number; y: number },
    contentSize: { width: number; height: number }
  ) => {
    scrollMetricsRef.current = { layoutMeasurement, contentOffset, contentSize }; // Store metrics
    checkScrollPosition(layoutMeasurement, contentOffset, contentSize);
  }, [checkScrollPosition]);

  // Effect to update button visibility when logs change (without scrolling automatically)
  useEffect(() => {
    if (scrollMetricsRef.current && logs.length > 0) {
      const { layoutMeasurement, contentOffset, contentSize } = scrollMetricsRef.current;
      checkScrollPosition(layoutMeasurement, contentOffset, contentSize);
    }
  }, [logs.length, checkScrollPosition]);

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
    setShowScrollToBottomButton(false);
    setIsUserScrolling(false);
  }, []);

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
            <Text
              style={isCapturing ? styles.btnStopText : styles.btnStartText}
            >
              {isCapturing ? "Stop" : "Start"}
            </Text>
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
          ref={listRef}
          data={logs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemType={(item) => "row"}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (!event || !event.nativeEvent) {
                return;
            }
            const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
            scrollMetricsRef.current = { layoutMeasurement, contentOffset, contentSize }; // Store metrics
            handleScroll(layoutMeasurement, contentOffset, contentSize);
          }}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
        />
      </View>

      {showScrollToBottomButton && (
        <TouchableOpacity style={[styles.scrollToBottomBtn, { bottom: insets.bottom + 20 }]} onPress={scrollToBottom}>
          <Text style={styles.scrollToBottomBtnText}>↓</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    color: "#000",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  controls: { flexDirection: "row" },
  button: {
    padding: 8,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    marginLeft: 5,
  },
  btnStart: { backgroundColor: "#1a1a1a" },
  btnStop: { backgroundColor: "#c62828" },
  btnText: { color: "#000", fontWeight: "bold" },
  btnStartText: { color: "#fff" },
  btnStopText: { color: "#fff" },
  listContainer: { flex: 1, paddingHorizontal: 5 },
  logRow: { paddingVertical: 2 },
  logText: { color: "#333333", fontFamily: "monospace", fontSize: 12 },
  scrollToBottomBtn: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollToBottomBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
