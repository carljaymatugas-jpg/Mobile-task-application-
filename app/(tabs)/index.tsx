import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("SYSTEM_CRITICAL", "Database initialization failure.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.glitchContainer}>
          <Text style={styles.title}>TASK_OS</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        <Text style={styles.subtitle}>// SYSTEM STATUS: OPERATIONAL</Text>

        <Pressable 
          style={styles.button} 
          onPress={() => router.push("/tasks")}
        >
          <Text style={styles.buttonText}>ACCESS_LOGS</Text>
        </Pressable>
        
        <Text style={styles.versionTag}>V.3.0.1-STABLE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B", // Consistent Deep Zinc
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    width: '100%',
  },
  glitchContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 8,
    textAlign: "center",
    textShadowColor: "rgba(255, 0, 60, 0.8)", // Cyber Pink shadow
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 1,
  },
  titleUnderline: {
    height: 4,
    width: 60,
    backgroundColor: "#00F0FF", // Neon Cyan
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#00F0FF",
    marginBottom: 60,
    textAlign: "center",
    letterSpacing: 2,
    fontWeight: "600",
    opacity: 0.8,
  },
  button: {
    backgroundColor: "transparent",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 4, // Angular geometry
    borderWidth: 2,
    borderColor: "#00F0FF",
    // Glow effect
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: "#00F0FF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 3,
  },
  versionTag: {
    position: 'absolute',
    bottom: -150,
    fontSize: 10,
    color: "#27272A",
    fontWeight: "700",
    letterSpacing: 1,
  }
});