import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useShareIntent } from 'expo-share-intent';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { convertToMarkdown } from './src/utils/converter';
import { navigate } from './src/navigation/AppNavigator';

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
      console.log('Deep Link Received:', event.url);

      // Manual URL parsing for better reliability
      try {
        const url = event.url;

        // Check if it's a convert URL
        if (url.includes('markify://convert?html=')) {
          // Extract HTML parameter manually
          const htmlStart = url.indexOf('html=') + 5;
          const encodedHtml = url.substring(htmlStart);
          const html = decodeURIComponent(encodedHtml);

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
                  text: 'View',
                  onPress: () => {
                    console.log('Navigating to Editor with markdown length:', markdown.length);
                    // Navigate to Editor with converted markdown
                    setTimeout(() => {
                      navigate('Editor', { title, content: markdown });
                    }, 100);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
          } catch (error) {
            console.error('Conversion error:', error);
            Alert.alert('Error', 'Failed to convert HTML to Markdown');
          }
        }
      } catch (error) {
        console.error('Deep link parsing error:', error);
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      console.log('Initial URL:', url);
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
