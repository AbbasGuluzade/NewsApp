import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useThemeStore } from "@/store/themesStore";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Article } from "@/api/getNews";

export default function NewsDetailScreen() {
  const { serializedArticle } = useLocalSearchParams<{ serializedArticle: string }>();
  const article: Article = JSON.parse(serializedArticle);

  const { theme } = useThemeStore();
  const currentTheme = theme === "light" ? Colors.light : Colors.dark;

  const router = useRouter();

  const openInBrowser = () => {
    Linking.openURL(article.webUrl);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Stack.Screen options={{  title: 'Details',
        headerStyle: {
          backgroundColor: '#fff',
        }, }} />

      <Text style={[styles.title, { color: currentTheme.text }]}>{article.webTitle}</Text>
      {article.fields?.thumbnail && (
        <Image source={{ uri: article.fields.thumbnail }} style={styles.image} />
      )}
      <Text style={[styles.body, { color: currentTheme.text }]}>
        {article.fields?.body || article.fields?.trailText}
      </Text>

      <TouchableOpacity
        style={[styles.linkButton, { backgroundColor: currentTheme.tabBackground }]}
        onPress={openInBrowser}
      >
        <Text style={{ color: currentTheme.textSelected, fontWeight: "600" }}>Read Full Article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 16,
    borderRadius: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
