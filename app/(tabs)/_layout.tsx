// TABS LAYOUT
import { useRouter, useSegments, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const isLoggedIn = !!token;

        // Determine if user is on the login screen
        const inAuthGroup = segments[0] === 'login';

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
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#c6c7cc',
      headerShown: false 
      }}>
        
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }} 
      />

      <Tabs.Screen
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
          ),
        }} 
      />
    </Tabs>
  );
}
