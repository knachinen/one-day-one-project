// src/styles/AppStyles.js

import { StyleSheet } from "react-native";

// 💡 [수정] 밝은 배경의 흑백 미니멀리즘 팔레트
export const Colors = {
  primary: "#000000", // Black for primary action text/icons
  primaryBackground: "#FFFFFF", // White for primary action buttons (Contrasting with borders)

  // Main background (거의 흰색)
  background: "#F9F9F9",
  // Surfaces (카드, 입력 필드 등 - 순수한 흰색)
  surface: "#FFFFFF",

  // Text colors
  text: "#222222", // Very dark gray/black for main text
  textSecondary: "#A0A0A0", // Lighter gray for secondary text/placeholders

  // Borders and Dividers
  border: "#E0E0E0", // Very light gray border
  // Shadow (미묘한 깊이감을 위해)
  shadow: "#B0B0B0",
};

export const styles = StyleSheet.create({
  // -------------------------
  // 1. 컨테이너 & 레이아웃
  // -------------------------
  container: {
    flex: 1,
    backgroundColor: Colors.background, // 💡 밝은 배경
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  // -------------------------
  // 2. 타이포그래피
  // -------------------------
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text, // 💡 어두운 텍스트
    marginBottom: 35,
    textAlign: "left",
    width: "100%",
  },
  randomWord: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text, // 💡 어두운 텍스트
    marginVertical: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  // -------------------------
  // 3. 폼 요소 (Input, TextArea)
  // -------------------------
  input: {
    width: "100%",
    height: 48,
    borderColor: Colors.border, // 💡 옅은 회색 테두리
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: Colors.surface, // 💡 흰색 서페이스 배경
    fontSize: 16,
    color: Colors.text, // 💡 어두운 텍스트
  },
  textArea: {
    width: "100%",
    height: 160,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6,
    padding: 15,
    marginBottom: 30,
    backgroundColor: Colors.surface, // 💡 흰색 서페이스 배경
    fontSize: 16,
    color: Colors.text, // 💡 어두운 텍스트
  },

  // -------------------------
  // 4. 저장된 파일 목록
  // -------------------------
  savedFilesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text, // 💡 어두운 텍스트
    marginTop: 25,
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
  },
  fileListContainer: {
    width: "100%",
    maxHeight: 200,
    backgroundColor: Colors.surface, // 💡 흰색 서페이스 배경
    borderRadius: 8,
    // 💡 그림자: 밝은 배경에서는 그림자를 옅게 적용
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  fileItem: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    backgroundColor: Colors.surface, // 💡 흰색 서페이스 배경
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileItemText: {
    fontSize: 15,
    color: Colors.text, // 💡 어두운 텍스트
    fontWeight: "500",
  },

  // -------------------------
  // 5. 로딩 오버레이
  // -------------------------
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background, // 💡 밝은 배경
    paddingTop: 0,
  },
});
