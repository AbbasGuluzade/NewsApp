import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text, Image, TouchableOpacity } from "react-native";
import { fetchNews, Article } from "@/api/getNews";

export default function HomeScreen() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalResults, setTotalResults] = useState<number>(0);

    const loadNews = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        const { articles: newArticles, totalResults } = await fetchNews(page);
        setTotalResults(totalResults);

        setArticles((prev) => {
            const ids = new Set(prev.map((a) => a.id));
            const uniqueNew = newArticles.filter((a) => !ids.has(a.id));
            return [...prev, ...uniqueNew];
        });

        setLoading(false);
    }, [page]);

    useEffect(() => {
        loadNews();
    }, [page]);

    const loadMore = () => {
        if (articles.length < totalResults && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    const renderItem = ({ item }: { item: Article }) => (
        <TouchableOpacity style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.webTitle}</Text>
            {item.fields?.thumbnail && (
                <Image
                    source={{ uri: item.fields.thumbnail }}
                    style={{ width: "100%", height: 200, marginVertical: 8 }}
                    resizeMode="cover"
                />
            )}
            <Text>{item.fields?.trailText}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={articles}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />
        </View>
    );
}
