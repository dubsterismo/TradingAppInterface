import { View, Text } from 'react-native';
import { useRouter} from 'expo-router';
import { styles } from './constants/_styles';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Oops! Not Found</Text>
        <Text style={styles.link} onPress={() => router.replace('/')}>Back to Home</Text>
      </View>
    </>
  );
}
