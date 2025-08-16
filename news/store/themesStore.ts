import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: "light",
    setTheme: (theme) => {
        AsyncStorage.setItem("theme", theme);
        set({ theme });
    },
    toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        AsyncStorage.setItem("theme", newTheme);
        set({ theme: newTheme });
    },
}));

// load persisted theme on app start
AsyncStorage.getItem("theme").then((saved) => {
    if (saved === "dark" || saved === "light") {
        useThemeStore.getState().setTheme(saved);
    }
});
