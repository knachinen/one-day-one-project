import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { PDFScreen } from './src/screens/PDFScreen';

export default function App() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {pdfUri ? (
        <PDFScreen uri={pdfUri} onBack={() => setPdfUri(null)} />
      ) : (
        <HomeScreen onPickDocument={setPdfUri} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
