import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useThemeStore } from "@/store/themesStore";
import { Colors } from "@/constants/Colors";

export default function ThemeToggle() {
    const { toggleTheme, theme } = useThemeStore();
    const currentTheme = theme === "light" ? Colors.dark : Colors.light;

    return (
        <TouchableOpacity style={{backgroundColor: currentTheme.background ,...styles.button}} onPress={toggleTheme}>
          <Text style={{color: currentTheme.text, ...styles.text}}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      paddingHorizontal: 12,
      marginBottom: 12,
      paddingVertical: 12,
      alignSelf: "center",
      marginTop: 10,
    },
    text: {
        fontWeight: "600",
    },
});

