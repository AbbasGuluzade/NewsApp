import React from "react";
import { View, FlatList, Text } from "react-native";
import { useFavoritesStore } from "@/store/favoritesStore";
import { ArticleCard } from "@/components/ArticleCard";

export default function FavoritesScreen() {
    const { favorites } = useFavoritesStore();

    if (favorites.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No favorites yet!</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => `${item.webUrl}-${index}`}
                renderItem={({ item }) => <ArticleCard article={item} />}
            />
        </View>
    );
}
