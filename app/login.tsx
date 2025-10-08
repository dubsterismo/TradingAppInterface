import { useState } from 'react';
import { styles } from './constants/_styles'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => { // REPLACED WITH NOT FOUND PAGE TEMPORARILY
    // console.log('Logging in with:', email, password);
    // // Replace this with real authentication later
    // if (email && password) {
    //     await AsyncStorage.setItem('userToken', 'dummy-token');
    //     router.replace('/'); // redirect to home after login
    // } else {
    //     alert('Please enter valid credentials');
    // }
    router.push('/notFound');
  };

  // TEMPORARY DEV LOGIN ROUTE
  const handleDevLogin = async () => {
    await AsyncStorage.setItem('userToken', 'dev-token');
    await AsyncStorage.setItem('user', JSON.stringify({ id: 'dev-user',email}));

    router.replace('/');
    console.log('Developer login.');
  }

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDevLogin}>
        <Text style={styles.buttonText}>Developer Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        New here? <Text style={styles.link} onPress={() => router.push('/register')}>Register</Text>
      </Text>
    </View>
  );
}