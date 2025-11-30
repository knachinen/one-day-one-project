import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { JournalService } from '@/database/journalService';
import { getDailyPrompt } from '@/utils/promptSelector';
import { useAutoSave } from '@/hooks/useAutoSave';
import { EmotionTag, Journal } from '@/types';

import { QuestionCard } from '@/components/QuestionCard';
import { AnswerInput } from '@/components/AnswerInput';
import { EmotionPicker } from '@/components/EmotionPicker';
import { CompletionModal } from '@/components/CompletionModal';

export default function JournalScreen() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState(new Date());

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [emotionTag, setEmotionTag] = useState<EmotionTag | null>(null);
  const [showModal, setShowModal] = useState(false);

  const dateString = format(date, 'yyyy-MM-dd');

  useAutoSave(answers, emotionTag, dateString);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      setDate(new Date());

      // 1. Get Daily Questions
      const prompt = getDailyPrompt(new Date());
      setQuestions(prompt.questions);

      // 2. Check DB for existing journal
      const existingJournal = await JournalService.getJournalByDate(todayStr);

      if (existingJournal) {
        setAnswers(existingJournal.answers);
        setEmotionTag(existingJournal.emotionTag);
        setCompleted(true);
      } else {
        // 3. Check for draft
        const draftJson = await AsyncStorage.getItem(`draft_${todayStr}`);
        if (draftJson) {
          const draft = JSON.parse(draftJson);
          setAnswers(draft.answers);
          setEmotionTag(draft.emotionTag);
        } else {
          setAnswers(['', '', '']);
          setEmotionTag(null);
        }
        setCompleted(false);
      }
    } catch (error) {
      console.error('Failed to load journal data:', error);
      Alert.alert('오류', '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleAnswerChange = (text: string, index: number) => {
    if (completed) return;
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!emotionTag) {
      Alert.alert('알림', '오늘의 감정을 선택해주세요.');
      return;
    }

    if (answers.some(a => a.trim().length === 0)) {
      Alert.alert('알림', '모든 질문에 답변해주세요.');
      return;
    }

    try {
      await JournalService.saveJournal({
        date: dateString,
        emotionTag,
        questions,
        answers,
      });

      // Clear draft
      await AsyncStorage.removeItem(`draft_${dateString}`);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setCompleted(true);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to save journal:', error);
      Alert.alert('오류', '저장에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.date}>{format(date, 'M월 d일 EEEE')}</Text>
          <Text style={styles.title}>오늘의 성찰</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 기분은 어떠신가요?</Text>
          <EmotionPicker
            selected={emotionTag}
            onSelect={completed ? () => { } : setEmotionTag}
          />
        </View>

        <View style={styles.section}>
          {questions.map((q, index) => (
            <View key={index} style={styles.questionContainer}>
              <QuestionCard question={q} index={index} />
              <AnswerInput
                value={answers[index]}
                onChangeText={(text) => handleAnswerChange(text, index)}
                placeholder="여기에 답변을 작성하세요..."
                editable={!completed}
              />
            </View>
          ))}
        </View>

        {!completed && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>오늘 하루 기록하기</Text>
          </TouchableOpacity>
        )}

        {completed && (
          <View style={styles.completedMessage}>
            <Text style={styles.completedText}>
              오늘의 기록이 완료되었습니다.{'\n'}내일 또 만나요! 🌙
            </Text>
          </View>
        )}
      </ScrollView>

      <CompletionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  date: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  title: {
    ...Typography.title,
    color: Colors.text.primary,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    ...Typography.heading,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  submitButtonText: {
    ...Typography.heading,
    color: 'white',
    fontSize: 18,
  },
  completedMessage: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginTop: 10,
  },
  completedText: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.text.secondary,
  },
});
