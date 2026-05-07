import { deleteTask, getTask } from '@/lib/database';
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTask = () => {
    try {
      const data = getTask();
      setTasks(data);
    } catch (error) {
      Alert.alert("REGISTRY_ERROR", "Failed to retrieve local records.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert("DISCARD_RECORD", "Permanently remove this entry from the ledger?", [
      { text: "ABORT", style: "cancel" },
      {
        text: "CONFIRM",
        style: "destructive",
        onPress: () => {
          try {
            deleteTask(id);
            loadTask();
          } catch (error) {
            Alert.alert("ERROR", "Manual deletion failed.");
          }
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "finished": return "#166534"; // Hunter Green
      case "ongoing": return "#B45309";  // Burnt Amber
      default: return "#991B1B";         // Madder Red
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTIVE_REGISTRY</Text>

      <Pressable style={styles.addButton} onPress={() => router.push("/add-tasks")}>
        <Text style={styles.addButtonText}>[+] NEW_FILE_ENTRY</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>NO_RECORDS_FOUND</Text>
          <Text style={styles.emptySubtext}>System awaiting initial data entry.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, { borderColor: getStatusColor(item.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.taskDescription} numberOfLines={2}>
                {item.description || "NO_SUPPLEMENTAL_DATA_PROVIDED"}
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/task-detail",
                      params: { id: item.id, title: item.title, description: item.description, status: item.status }
                    })}>
                  <Text style={styles.detailButtonText}>OPEN_FILE</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>ERASE</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF0", // Vintage Paper
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#27272A", // Charcoal
    marginTop: 40,
    marginBottom: 25,
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  addButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#27272A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignSelf: "flex-start",
    marginBottom: 30,
    // Hard offset shadow
    shadowColor: "#27272A",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 0,
    elevation: 3,
  },
  addButtonText: {
    color: "#27272A",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#FDFCF0",
    padding: 18,
    borderRadius: 2,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#27272A",
    borderLeftWidth: 6, // Thick status-colored accent line
    // Hard shadow for "ledger" feel
    shadowColor: "#27272A",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#27272A",
    flex: 1,
    marginRight: 10,
    letterSpacing: 0.5,
  },
  statusBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: "#52525B",
    lineHeight: 20,
    marginBottom: 22,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E7",
    paddingTop: 15,
  },
  detailButton: {
    flex: 2,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#27272A",
    paddingVertical: 12,
    borderRadius: 2,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#27272A",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 2,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#991B1B", // Madder Red
    fontWeight: "900",
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#A1A1AA",
    letterSpacing: 2,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 12,
    color: "#D4D4D8",
    letterSpacing: 1,
  },
});