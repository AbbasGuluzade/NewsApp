import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { fetchNews, Article } from "@/api/getNews"; // Adjust the import path as necessary

export default function HomeScreen() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadNews = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const { articles: newArticles, totalResults } = await fetchNews(page);
            setArticles((prev) => [...prev, ...newArticles]);

            if (articles.length + newArticles.length >= totalResults) {
                setHasMore(false);
            } else {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, articles.length]);

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={articles}
                keyExtractor={(item, index) => `${item.url}-${index}`}
                renderItem={({ item }) => (
                    <Text style={{ marginVertical: 10 }}>{item.title}</Text>
                )}
                onEndReached={loadNews}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" /> : null
                }
            />
        </View>
    );
}
