import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex 1 h-full">
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00f5a0",
          },
          tabBarStyle: {
            backgroundColor: "#00f5a0",
          },
          tabBarActiveTintColor: "#2700ff",
          tabBarInactiveTintColor: "#1d0e17",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            tabBarLabel: "Opções",
            title: "Opções",
            tabBarIcon: ({ color }) => (
              <Feather name="list" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
