import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00F0FF", // Neon Cyan
        tabBarInactiveTintColor: "#4B5563", // Muted Gray
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#09090B' }} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HUB",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "LOGS",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="terminal-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-tasks"
        options={{
          title: "SYNC",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.centerIcon}>
               <Ionicons name="add" size={32} color="#09090B" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="task-detail"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    paddingBottom: 25,
    paddingTop: 10,
    backgroundColor: "#09090B",
    borderTopWidth: 2,
    borderTopColor: "#FF003C", // Cyber Pink accent line
    // Glow effect
    shadowColor: "#FF003C",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  centerIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#00F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // Add a box-shadow/glow for the center button
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  }
});