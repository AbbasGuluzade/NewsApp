import React, { useState, useEffect, useCallback, useRef } from "react";
import {View, FlatList, ActivityIndicator, Text, Image, TouchableOpacity, Button} from "react-native";
import { fetchNews, Article } from "@/api/getNews";
import { ArticleCard}  from "@/components/ArticleCard";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ThemeToggle from "@/components/ToggleThemeButton";

export default function HomeScreen() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

    const listRef =useRef<FlatList<Article>>(null);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 500); // show button after ~500px
    };
    const scrollToTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

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




    <View style={{ flex: 1, marginTop: 40 }}>
            <ThemeToggle />
            <FlatList
                data={articles}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                onScroll={handleScroll}
                removeClippedSubviews={true}
                initialNumToRender={10}
                ref={listRef}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />

            {showScrollTop && (
                <ScrollToTopButton           onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}

                />
            )}
        </View>
    );
}
