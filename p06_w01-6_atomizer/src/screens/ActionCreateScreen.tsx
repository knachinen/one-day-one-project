import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity, // Import TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack"; // Import StackScreenProps
import { RootStackParamList } from "../navigation/AppNavigator"; // Import RootStackParamList
import { useRealm, useQuery } from "@realm/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BSON } from "realm";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "../components";
import { Colors } from "../constants/colors";
import { Typography, Spacing } from "../constants/typography";
import { useGoal, useActionLogic } from "../hooks";

type ActionCreateScreenProps = {
  navigation: StackScreenProps<RootStackParamList, "ActionCreate">['navigation'];
  goalId: string;
  onActionCreated: () => void;
}; // Update prop type

export const ActionCreateScreen: React.FC<ActionCreateScreenProps> = ({
  navigation,
  goalId, // Accept goalId directly as a prop
  onActionCreated, // Accept onActionCreated directly as a prop
}) => {

  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState(
    new Date(Date.now() + 60000)
  ); // 1분 후
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { createAction, loading, error, setError } = useActionLogic();

  // 현재 목표 가져오기
  const currentGoal = useGoal(goalId);

  const handleCreateAction = React.useCallback(() => {
    createAction(goalId, description, reminderTime, onActionCreated);
  }, [createAction, goalId, description, reminderTime, onActionCreated]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.goalTitle}>목표: {currentGoal?.title}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("GoalSelection")}
                style={styles.changeGoalButton}
              >
                <Text style={styles.changeGoalButtonText}>목표 변경</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>
              이 목표를 위한 다음 10초 행동은 무엇인가요?
            </Text>
          </View>

          {/* 입력 폼 */}
          <View style={styles.form}>
            <Input
              label="10초 행동+"
              placeholder="예: 책 펼치기, 운동복 입기"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setError("");
              }}
              error={error}
              autoFocusOnMount
              maxLength={100}
              multiline
              numberOfLines={3}
            />

            {/* 리마인더 시간 설정 */}
            <View style={styles.reminderSection}>
              <Text style={styles.label}>리마인더 시간</Text>
              <Button
                title={`${formatTime(reminderTime)}에 알림`}
                onPress={() => setShowTimePicker(true)}
                variant="secondary"
              />
            </View>

            {showTimePicker && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    setReminderTime(selectedDate);
                  }
                }}
              />
            )}
          </View>

          {/* 버튼 */}
          <View style={styles.buttonContainer}>
            <Button
              title="10초 행동 시작하기"
              onPress={handleCreateAction}
              disabled={!description.trim() || loading}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerContent: {
    // New style for header content
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  goalTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    // marginBottom: Spacing.sm, // Removed from here, moved to headerContent
  },
  changeGoalButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.textSecondary,
    borderRadius: 5,
  },
  changeGoalButtonText: {
    color: Colors.background,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  reminderSection: {
    marginTop: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});
