import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Article } from "@/api/getNews";
import {Ionicons} from "@expo/vector-icons";

import { useThemeStore } from "../store/themesStore";
import { Colors } from "../constants/Colors";

import { useRouter } from "expo-router";


interface Props {
    article: Article;
}

export const ArticleCard = React.memo(function ArticleCard({ article }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(article.webUrl);

  const { theme } = useThemeStore();
  const currentTheme = theme === "light" ? Colors.light : Colors.dark;


  const router = useRouter();

  return (
    <TouchableOpacity style={{ backgroundColor: currentTheme.background, padding: 10, borderBottomWidth: 1 }}
                      onPress={() =>
                        router.push(
                          `/screens/NewsDetailScreen?serializedArticle=${encodeURIComponent(
                            JSON.stringify(article)
                          )}`
                        )
                      }

    >
      <Text style={{ fontWeight: "bold", color: currentTheme.text }}>{article.webTitle}</Text>
      <Text style={{ color: currentTheme.text }}>{article.fields?.trailText}</Text>
      <Image source={{ uri: article.fields?.thumbnail }} style={{ width: "100%", height: 200, marginVertical: 10 }} />
      <TouchableOpacity
        onPress={() =>
          favorite ? removeFavorite(article.webUrl) : addFavorite(article)
        }
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={40}
          color={currentTheme.icon}
          style={{ marginTop: 5, padding: 6, borderRadius: 4, alignSelf: "flex-end" }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});


const styles = {
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    title: {
        fontWeight: "bold",
    },
    description: {
        marginVertical: 5,
    },
    image: {
        width: "100%",
        height: 200,
        marginVertical: 10,
    },
    favoriteButton: {
        marginTop: 5,
        padding: 6,
        borderRadius: 4,
        alignSelf: "flex-end",
    },
}
