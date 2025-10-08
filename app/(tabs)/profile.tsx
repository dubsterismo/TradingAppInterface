import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../constants/_styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.removeItem('user');

        router.replace('/login');
        console.log('Logging out.');
    }
    catch(error){
        console.error('Logout error:',error);
        Alert.alert('Error','Could not log out. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.dangerLink}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}