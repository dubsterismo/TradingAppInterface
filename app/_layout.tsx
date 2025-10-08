// ROOT LAYOUT
import { Stack, useRouter, useSegments, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const isLoggedIn = !!token;

        // Determine if user is on the login screen
        const inAuthGroup = segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'notFound'; // PAGES WHICH ARENT AUTOMATICALLY REDIRECTED

        if (!isLoggedIn && !inAuthGroup) {
          router.replace('/login'); // only redirect if NOT already on login
        } else if (isLoggedIn && inAuthGroup) {
          router.replace('/'); // if logged in but still on login, redirect to home
        }
      } catch (e) {
        console.error('Error checking login:', e);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [segments]); // rerun when route changes

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
