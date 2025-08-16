import React from "react";
import { Button } from "react-native";
import { useThemeStore } from "@/store/themesStore";

export default function ThemeToggle() {
    const { toggleTheme, theme } = useThemeStore();

    return (
        <Button
            title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            onPress={toggleTheme}
        />
    );
};
