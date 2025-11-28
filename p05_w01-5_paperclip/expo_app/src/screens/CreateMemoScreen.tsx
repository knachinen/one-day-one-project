
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageService } from '../services/storage';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function CreateMemoScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto-focus input on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      await StorageService.createMemo({
        content: content.trim(),
        tags: tags,
      });
      // Optional: Add haptic feedback here
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save memo', error);
      // Show error toast
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveBtn, !content.trim() && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!content.trim()}
          >
            <Text style={[styles.saveBtnText, !content.trim() && styles.saveBtnTextDisabled]}>Done</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />

        <View style={styles.tagSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagList}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tagChip} onPress={() => handleRemoveTag(tag)}>
                <Text style={styles.tagText}>#{tag}</Text>
                <Ionicons name="close-circle" size={14} color={theme.colors.textSecondary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.tagInputContainer}>
            <Ionicons name="pricetag-outline" size={20} color={theme.colors.textSecondary} style={styles.tagIcon} />
            <TextInput
              style={styles.tagInput}
              placeholder="Add tag..."
              placeholderTextColor={theme.colors.textSecondary}
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
              returnKeyType="done"
            />
            {tagInput.length > 0 && (
              <TouchableOpacity onPress={handleAddTag}>
                <Ionicons name="add-circle" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
  closeBtn: { padding: theme.spacing.xs },
  saveBtn: { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.md, backgroundColor: theme.colors.primary, borderRadius: 16 },
  saveBtnDisabled: { backgroundColor: theme.colors.surface },
  saveBtnText: { color: theme.colors.onPrimary, fontWeight: '600' },
  saveBtnTextDisabled: { color: theme.colors.textSecondary },
  input: { flex: 1, fontSize: theme.typography.fontSizeMedium, color: theme.colors.textPrimary, lineHeight: 24 },
  tagSection: { borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: theme.spacing.sm },
  tagList: { flexDirection: 'row', marginBottom: theme.spacing.sm, maxHeight: 40 },
  tagChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8 },
  tagText: { fontSize: 12, color: theme.colors.textPrimary },
  tagInputContainer: { flexDirection: 'row', alignItems: 'center' },
  tagIcon: { marginRight: 8 },
  tagInput: { flex: 1, height: 40, color: theme.colors.textPrimary },
});

