import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text, Image, TouchableOpacity } from "react-native";
import { fetchNews, Article } from "@/api/getNews";
import { ArticleCard}  from "@/components/ArticleCard";

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
        <ArticleCard
            article={item}
        />
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
