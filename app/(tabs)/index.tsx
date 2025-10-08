import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../constants/_styles'
import { useRouter } from 'expo-router';
import { fetchData } from '../services/api';

export default function Home() {
  const router = useRouter();

  // const [stock, setStock] = useState<any>(null);

  // useEffect(() => {
  //   fetchStock("AAPL").then(setStock);
  // }, []);

  // if (!stock) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(stock)}</Text> */}
      <Text style={styles.title}>Welcome !</Text>
    </View>
  );
}