import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";

type Props = {
    onPress: () => void;
};

export default function ScrollToTopButton({ onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="chevron-up" size={24} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 10,
        borderRadius: 25,
        backgroundColor: "#247f39",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});
