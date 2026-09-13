import { useState } from 'react';
import { styles } from '../constants/_styles'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleLogin = async () => { 
    const { data,error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    else router.replace('./');
    console.log('Login:',email)
  };

  // TEMPORARY DEV LOGIN ROUTE
  const handleDevLogin = async () => {
    await AsyncStorage.setItem('userToken', 'dev-token');
    await AsyncStorage.setItem('user', JSON.stringify({ id: 'dev-user',email}));

    router.replace('./(tabs)/index');
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
        New here? <Text style={styles.link} onPress={() => router.replace('./register')}>Register</Text>
      </Text>
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
}