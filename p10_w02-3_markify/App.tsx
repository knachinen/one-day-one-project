import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useShareIntent } from 'expo-share-intent';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { convertToMarkdown } from './src/utils/converter';

export default function App() {
  const { hasShareIntent, shareIntent, resetShareIntent, error } = useShareIntent();

  useEffect(() => {
    console.log('Share Intent State:', { hasShareIntent, shareIntent, error });

    if (hasShareIntent && shareIntent) {
      // Handle shared URL
      const url = shareIntent.webUrl || shareIntent.text;
      console.log('Extracted URL:', url);

      if (url) {
        // Add delay for Android to ensure Alert shows
        setTimeout(() => {
          Alert.alert(
            'Shared URL Detected',
            `URL: ${url}\n\nThis will be converted to Markdown.`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // TODO: Navigate to Editor with converted content
                  resetShareIntent();
                },
              },
            ]
          );
        }, 500);
      } else {
        console.log('No URL found in shareIntent');
      }
    }

    if (error) {
      console.error('Share intent error:', error);
      Alert.alert('Share Error', typeof error === 'string' ? error : 'Unknown error');
    }
  }, [hasShareIntent, shareIntent, error]);

  // Handle deep link from bookmarklet
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { queryParams } = Linking.parse(event.url);

      if (queryParams?.html) {
        const html = decodeURIComponent(queryParams.html as string);
        console.log('Received HTML from bookmarklet, length:', html.length);

        try {
          const titleMatch = html.match(/<title>(.*?)<\/title>/i);
          const title = titleMatch ? titleMatch[1] : 'Bookmarklet Content';
          const markdown = convertToMarkdown(html);

          Alert.alert(
            'HTML Received',
            `Title: ${title}\nHTML Length: ${html.length}\n\nConverted to Markdown!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // TODO: Navigate to Editor with markdown
                  console.log('Markdown length:', markdown.length);
                },
              },
            ]
          );
        } catch (error) {
          console.error('Conversion error:', error);
          Alert.alert('Error', 'Failed to convert HTML to Markdown');
        }
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
