import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from '@/constants/_styles'
import { useRouter } from 'expo-router';
import { supabase } from "@/utils/supabase";

type StockChipProps = {
  symbol: string,
  price: number,
  onPress?: () => void;
};

type StockData = {
  symbol: string,
  price: number,
};

const StockChip = ({ symbol, price, onPress }: StockChipProps) => (
  <TouchableOpacity style={styles.chip} onPress={onPress}>
    <Text style={styles.chipText}>{symbol}</Text>
    <Text style={styles.chipText}>${price.toFixed(2)}</Text>
  </TouchableOpacity>
)

export default function Home() {
  const router = useRouter();
  const [user,setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data:listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) router.push('../login');
    });

    return () => listener.subscription.unsubscribe();
  },[]);

  const handleLogout = async() => {
    await supabase.auth.signOut();
  };

  if (!user) return <Text>Loading...</Text>

  const [stocks,setStocks] = useState<StockData[]>([]);

  const fetchStocks = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/home_page");
          const json: StockData[] = await response.json();
          setStocks(json);
        } 
        catch (error) {
          console.error("Error fetching stocks:", error);
        }
    };

  useEffect(() => {
    fetchStocks();


    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerLeft}>
        <Text style={styles.headerText}>My Stocks</Text>
      </View>

      {/* Horizontal stock chips */}
      <View style={styles.chipContainer}>
        <FlatList
          data={stocks}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <StockChip symbol={item.symbol} price={item.price} onPress={() => console.log(item.symbol)} />
          )}
        />
      </View>
      

      <View style={styles.middle}>
        <Text style={styles.title}>Welcome back {user.email} !</Text>
        <Text style={styles.link} onPress={() => router.replace('./monitorStocks')}>Look at stocks</Text>
      </View>


      <View style={styles.bottom}>

      </View>
      
    </SafeAreaView>
  );
}