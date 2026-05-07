import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("INITIALIZATION_ERROR", "Failed to sync archives.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.serialNumber}>REF_NO: 2026-05-06</Text>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TASK_OS</Text>
          <View style={styles.divider} />
        </View>
        
        <Text style={styles.subtitle}>OFFICIAL_RECORD_SYSTEM</Text>

        <Pressable style={styles.button} onPress={() => router.push("/tasks")}>
          <Text style={styles.buttonText}>ACCESS_REGISTRY</Text>
        </Pressable>

        <Text style={styles.footer}>// PROPERTY OF DATA ADMINISTRATION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF0", // Vintage Paper
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    width: '100%',
    padding: 30,
    borderWidth: 2,
    borderColor: "#27272A", // Charcoal border
  },
  serialNumber: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309", // Burnt Amber
    letterSpacing: 2,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#27272A",
    textAlign: "center",
    letterSpacing: -2,
  },
  divider: {
    height: 4,
    width: 80,
    backgroundColor: "#27272A",
    marginTop: -5,
  },
  subtitle: {
    fontSize: 12,
    color: "#71717A", // Muted Slate
    marginBottom: 60,
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: 3,
  },
  button: {
    backgroundColor: "#27272A",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 2,
    // Flat offset shadow instead of soft elevation
    shadowColor: "#27272A",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 8,
  },
  buttonText: {
    color: "#FDFCF0",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
  },
  footer: {
    position: 'absolute',
    bottom: -100,
    fontSize: 9,
    fontWeight: "700",
    color: "#A1A1AA",
    letterSpacing: 1,
  }
});