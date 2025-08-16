import React from "react";
import { View, FlatList, Text } from "react-native";
import { useFavoritesStore } from "@/store/favoritesStore";
import { ArticleCard } from "@/components/ArticleCard";
import {useThemeStore} from "@/store/themesStore";
import {Colors} from "@/constants/Colors";
import ThemeToggle from "@/components/ToggleThemeButton";

export default function FavoritesScreen() {
    const { favorites } = useFavoritesStore();


    const { theme } = useThemeStore();

  const currentTheme = theme === 'light' ? Colors.light : Colors.dark;

    if (favorites.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: currentTheme.background }}>
                <Text style={{color: currentTheme.text}}>No favorites yet!</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, paddingVertical: 40, backgroundColor: currentTheme.background }}>
          <ThemeToggle />
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => `${item.webUrl}-${index}`}
                renderItem={({ item }) => <ArticleCard article={item} />}
            />
        </View>
    );
}
