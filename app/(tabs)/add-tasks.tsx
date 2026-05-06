import { router } from "expo-router";
import { addTask } from '@/lib/database';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Pressable, ScrollView } from 'react-native';

const statusOptions = ["pending", "ongoing", "finished"];

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("pending");
    };

    const handleSave = () => {
        try {
            if (!title.trim()) {
                throw new Error("ENTRY FAILED: Title required");
            }

            addTask(title.trim(), description.trim(), status);
            Alert.alert("SYSTEM UPDATE", `Task "${title}" initialized.`);
            resetForm();
            router.back();
        } catch (error: any) {
            Alert.alert("ERROR", error.message || "Connection lost");
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>INITIALIZE_TASK</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>CORE_TITLE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input task identity..."
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#4B5563"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>DESCRIPTION_LOG</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter secondary data..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholderTextColor="#4B5563"
                />
            </View>

            <Text style={styles.label}>PRIORITY_STATUS</Text>
            <View style={styles.statusContainer}>
                {statusOptions.map((option) => (
                    <Pressable
                        key={option}
                        style={[
                            styles.statusButton,
                            status === option && styles.statusButtonActive,
                        ]}
                        onPress={() => setStatus(option)}
                    >
                        <Text
                            style={[
                                styles.statusButtonText,
                                status === option && styles.statusButtonTextActive,
                            ]}
                        >
                            {option.toUpperCase()}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>UPLOAD_TO_DATABASE</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#09090B", // Match RootLayout background
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "900",
        color: "#00F0FF", // Neon Cyan
        marginBottom: 30,
        marginTop: 40,
        letterSpacing: 2,
        textShadowColor: "rgba(0, 240, 255, 0.4)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    inputWrapper: {
        marginBottom: 25,
    },
    label: {
        fontSize: 12,
        fontWeight: "800",
        color: "#FF003C", // Cyber Pink
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: "#18181B",
        borderWidth: 1,
        borderColor: "#27272A",
        borderRadius: 4, // More angular for cyberpunk feel
        padding: 16,
        fontSize: 16,
        color: "#FFFFFF",
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    statusContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 40,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#27272A",
        backgroundColor: "#18181B",
        alignItems: "center",
    },
    statusButtonActive: {
        backgroundColor: "rgba(0, 240, 255, 0.1)",
        borderColor: "#00F0FF",
    },
    statusButtonText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#4B5563",
    },
    statusButtonTextActive: {
        color: "#00F0FF",
    },
    saveButton: {
        backgroundColor: "#00F0FF",
        paddingVertical: 18,
        borderRadius: 4,
        alignItems: "center",
        shadowColor: "#00F0FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    saveButtonText: {
        color: "#09090B",
        fontSize: 14,
        fontWeight: "900",
        letterSpacing: 2,
    },
});