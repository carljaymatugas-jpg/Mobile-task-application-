import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B45309", // Burnt Orange/Amber
        tabBarInactiveTintColor: "#71717A", // Muted Slate
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#FDFCF0' }} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ARCHIVE",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "REGISTRY",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-tasks"
        options={{
          title: "NEW_ENTRY",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.centerIcon}>
               <Ionicons name="pencil" size={24} color="#FDFCF0" />
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
    backgroundColor: "#FDFCF0", // Aged Paper Cream
    borderTopWidth: 4,
    borderTopColor: "#27272A", // Thick Charcoal border
    // Flat offset shadow (looks like a physical card)
    shadowColor: "#27272A",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  centerIcon: {
    width: 46,
    height: 46,
    borderRadius: 2, // Sharp, industrial corners
    backgroundColor: "#27272A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // Rotated for a "diamond" vintage badge look
    transform: [{ rotate: '45deg' }],
  }
});