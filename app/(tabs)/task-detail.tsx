import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function TaskDetail() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "finished": return "#10B981"; // Bio-Green
      case "ongoing": return "#00F0FF";  // Neon Cyan
      default: return "#FF003C";         // Cyber Pink
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#00F0FF" />
        <Text style={styles.backText}>RETURN_TO_BASE</Text>
      </Pressable>

      <Text style={styles.title}>DATA_DECRYPT</Text>

      <ScrollView contentContainerStyle={styles.terminal}>
        <View style={styles.dataRow}>
          <Text style={styles.label}>OBJECT_ID</Text>
          <Text style={styles.value}>#HEX_{id}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>CORE_IDENTITY</Text>
          <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>LOG_DETAILS</Text>
          <Text style={[styles.value, styles.description]}>
            {description || "NO_DATA_ENTRY_FOUND"}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.label}>PROCESS_STATUS</Text>
          <View style={[styles.statusBadge, { borderColor: getStatusColor(status) }]}>
            <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
              {status ? status.toUpperCase() : "PENDING"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backText: {
    color: "#00F0FF",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#00F0FF",
    marginBottom: 30,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 240, 255, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  terminal: {
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 4,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#FF003C", // Cyber Pink vertical accent
  },
  dataRow: {
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FF003C",
    marginBottom: 6,
    letterSpacing: 1.5,
  },
  value: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    color: "#94A3B8",
    lineHeight: 22,
  },
  statusRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 20,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
});