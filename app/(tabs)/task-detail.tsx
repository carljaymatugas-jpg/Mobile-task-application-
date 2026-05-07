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
      case "finished": return "#166534"; // Hunter Green
      case "ongoing": return "#B45309";  // Burnt Amber
      default: return "#991B1B";         // Madder Red
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#27272A" />
        <Text style={styles.backText}>RETURN_TO_ARCHIVE</Text>
      </Pressable>

      <Text style={styles.title}>FILE_DECRYPTION</Text>

      <ScrollView contentContainerStyle={styles.documentBody}>
        <View style={styles.headerStamp}>
          <Text style={styles.stampText}>CONFIDENTIAL</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>REFERENCE_ID</Text>
          <Text style={styles.value}>#REC_{id}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>SUBJECT_IDENTITY</Text>
          <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.label}>LOGGED_DETAILS</Text>
          <Text style={[styles.value, styles.description]}>
            {description || "NO_DESCRIPTION_FILED"}
          </Text>
        </View>

        <View style={styles.statusSection}>
          <Text style={styles.label}>CURRENT_STATUS</Text>
          <View style={[styles.statusBadge, { borderColor: getStatusColor(status) }]}>
            <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
              {status ? status.toUpperCase() : "PENDING"}
            </Text>
          </View>
        </View>
        
        <View style={styles.footerLine} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF0", // Vintage Paper
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backText: {
    color: "#27272A",
    fontSize: 11,
    fontWeight: "900",
    marginLeft: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#27272A",
    marginBottom: 30,
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  documentBody: {
    backgroundColor: "#FDFCF0",
    borderWidth: 2,
    borderColor: "#27272A",
    borderRadius: 2,
    padding: 24,
    minHeight: 400,
    // Hard offset shadow
    shadowColor: "#27272A",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 5,
  },
  headerStamp: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderWidth: 1.5,
    borderColor: "rgba(153, 27, 27, 0.4)",
    padding: 4,
    transform: [{ rotate: '15deg' }],
  },
  stampText: {
    fontSize: 8,
    fontWeight: "900",
    color: "rgba(153, 27, 27, 0.4)",
  },
  dataRow: {
    marginBottom: 28,
  },
  label: {
    fontSize: 10,
    fontWeight: "900",
    color: "#B45309", // Burnt Amber
    marginBottom: 6,
    letterSpacing: 1.5,
  },
  value: {
    fontSize: 18,
    color: "#27272A",
    fontWeight: "800",
  },
  description: {
    fontSize: 15,
    color: "#52525B",
    lineHeight: 22,
    fontStyle: 'italic', // Vintage handwritten note feel
  },
  statusSection: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 0, // Sharp corners
    backgroundColor: 'transparent',
  },
  statusText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  footerLine: {
    height: 1,
    backgroundColor: "#E4E4E7",
    marginTop: 20,
    width: '40%',
  }
});