import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { size } from "@shopify/react-native-skia";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="monitorStocks"
        options={{
            title: "My Stocks",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="analytics-outline" size={size} color={color} />
            ),
        }}>
      </Tabs.Screen>

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
