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
      Alert.alert("SYSTEM_ERROR", "Failed to sync local data.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert("DESTRUCTION_PROTOCOL", "Permanently delete this entry?", [
      { text: "ABORT", style: "cancel" },
      {
        text: "CONFIRM",
        style: "destructive",
        onPress: () => {
          try {
            deleteTask(id);
            loadTask();
          } catch (error) {
            Alert.alert("ERASE_FAILURE", "Data integrity maintained.");
          }
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "finished": return "#10B981"; // Bio-Green
      case "ongoing": return "#00F0FF";  // Neon Cyan
      default: return "#FF003C";         // Cyber Pink
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTIVE_LOGS</Text>

      <Pressable style={styles.addButton} onPress={() => router.push("/add-tasks")}>
        <Text style={styles.addButtonText}>[+] NEW_ENTRY</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>NO_ACTIVE_TASKS</Text>
          <Text style={styles.emptySubtext}>Initialize system for operation.</Text>
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
                {item.description || "NO_DESCRIPTION_DATA"}
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/task-detail",
                      params: { id: item.id, title: item.title, description: item.description, status: item.status }
                    })}>
                  <Text style={styles.detailButtonText}>DECRYPT</Text>
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
    backgroundColor: "#09090B",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#00F0FF",
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 240, 255, 0.4)",
    textShadowRadius: 10,
  },
  addButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00F0FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 30,
    shadowColor: "#00F0FF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  addButtonText: {
    color: "#00F0FF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#18181B",
    padding: 18,
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    borderLeftWidth: 4, // Status-colored accent line
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
    letterSpacing: 0.5,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 20,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    flex: 2,
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#00F0FF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#00F0FF",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "rgba(255, 0, 60, 0.1)",
    borderWidth: 1,
    borderColor: "#FF003C",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FF003C",
    fontWeight: "900",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#27272A",
    letterSpacing: 2,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 12,
    color: "#4B5563",
    letterSpacing: 1,
  },
});