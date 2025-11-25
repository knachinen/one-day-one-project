import { StyleSheet } from "react-native";

// Mimicking Eva Design System Light Theme Colors
const Colors = {
  primary: "#3366FF",
  background: "#F2F4F7", // A slightly off-white for background
  surface: "#FFFFFF", // White for cards/inputs
  text: "#222B45", // Dark text
  textLight: "#8F9BB3", // Lighter text for placeholders/secondary info
  border: "#E4E9F2", // Light border
  gray500: "#8F9BB3", // Medium gray
  gray300: "#C5CEE0", // Lighter gray
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Lighter background
    alignItems: "center",
    justifyContent: "flex-start", // Align to top for better content flow
    padding: 20,
    paddingTop: 60, // More top padding for status bar
  },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: "600", // Medium bold
    color: Colors.text,
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 45, // Slightly taller input
    borderColor: Colors.border, // Lighter border
    borderWidth: 1,
    borderRadius: 8, // Slightly more rounded corners
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: Colors.surface, // White background for inputs
    fontSize: 16,
    color: Colors.text,
  },
  randomWord: {
    fontSize: 20, // Slightly larger random word
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 25,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  textArea: {
    width: "100%",
    height: 180, // Slightly smaller text area
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: Colors.surface,
    fontSize: 16,
    color: Colors.text,
  },
  savedFilesTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginTop: 25,
    marginBottom: 15,
  },
  fileList: {
    width: "100%",
    maxHeight: 180, // Adjusted height
    borderColor: Colors.border, // Lighter border for list
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    marginBottom: 20,
  },
  fileItem: {
    paddingVertical: 12, // More vertical padding
    paddingHorizontal: 15,
    borderBottomColor: Colors.border, // Lighter separator
    borderBottomWidth: 1,
  },
  loadingOverlay: {
    // 1. flex: 1을 사용하여 부모(Layout)의 전체 공간을 차지하게 합니다.
    flex: 1,
    // 2. justifyContent와 alignItems를 사용하여 자식 요소(Spinner, Text)를 중앙에 배치합니다.
    justifyContent: "center",
    alignItems: "center",
    // (선택 사항) 로딩 중 배경색을 명확히 하고 싶다면 배경색 지정
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 0, // 컨테이너에 이미 paddingTop이 있다면, 오버레이에서는 제거
  },
});
