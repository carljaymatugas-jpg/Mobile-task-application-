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
                throw new Error("REGISTRY_ERROR: Title required");
            }

            addTask(title.trim(), description.trim(), status);
            Alert.alert("RECORD SAVED", `Entry "${title}" logged successfully.`);
            resetForm();
            router.back();
        } catch (error: any) {
            Alert.alert("SYSTEM_ERROR", error.message || "Archive failure");
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>NEW_LOG_ENTRY</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>IDENTIFIER_TITLE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter subject identity..."
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#A1A1AA"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>SUPPLEMENTAL_DATA</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Provide detailed description..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholderTextColor="#A1A1AA"
                />
            </View>

            <Text style={styles.label}>CLASSIFICATION</Text>
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
                <Text style={styles.saveButtonText}>COMMIT_TO_REGISTRY</Text>
            </Pressable>
        </ScrollView>
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
        marginBottom: 35,
        marginTop: 40,
        letterSpacing: 1,
        textDecorationLine: 'underline',
    },
    inputWrapper: {
        marginBottom: 25,
    },
    label: {
        fontSize: 11,
        fontWeight: "900",
        color: "#B45309", // Burnt Amber
        marginBottom: 8,
        letterSpacing: 1.5,
    },
    input: {
        backgroundColor: "transparent",
        borderBottomWidth: 3, // Thick bottom border like a ledger line
        borderColor: "#27272A",
        padding: 12,
        fontSize: 16,
        color: "#27272A",
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    statusContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 45,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: "#E4E4E7",
        backgroundColor: "#FDFCF0",
        alignItems: "center",
    },
    statusButtonActive: {
        backgroundColor: "#27272A",
        borderColor: "#27272A",
    },
    statusButtonText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#71717A",
    },
    statusButtonTextActive: {
        color: "#FDFCF0",
    },
    saveButton: {
        backgroundColor: "#27272A",
        paddingVertical: 20,
        borderRadius: 2,
        alignItems: "center",
        // Flat offset shadow
        shadowColor: "#27272A",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 5,
    },
    saveButtonText: {
        color: "#FDFCF0",
        fontSize: 14,
        fontWeight: "900",
        letterSpacing: 2,
    },
});