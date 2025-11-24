import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Lighter background
    alignItems: 'center',
    justifyContent: 'flex-start', // Align to top for better content flow
    padding: 20,
    paddingTop: 60, // More top padding for status bar
  },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: '600', // Medium bold
    color: '#333',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 45, // Slightly taller input
    borderColor: '#ccc', // Lighter border
    borderWidth: 1,
    borderRadius: 8, // Slightly more rounded corners
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
  },
  randomWord: {
    fontSize: 20, // Slightly larger random word
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 25,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textArea: {
    width: '100%',
    height: 180, // Slightly smaller text area
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  savedFilesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
  },
  fileList: {
    width: '100%',
    maxHeight: 180, // Adjusted height
    borderColor: '#eee', // Lighter border for list
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  fileItem: {
    paddingVertical: 12, // More vertical padding
    paddingHorizontal: 15,
    borderBottomColor: '#f0f0f0', // Lighter separator
    borderBottomWidth: 1,
  },
});
