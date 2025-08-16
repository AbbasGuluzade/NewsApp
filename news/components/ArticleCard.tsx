import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Article } from "@/api/getNews";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    article: Article;
}

export function ArticleCard({ article }: Props) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    const favorite = isFavorite(article.webUrl);

    return (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontWeight: "bold" }}>{article.webTitle}</Text>
            <Text>{article.fields?.trailText}</Text>
            <Image source={{ uri: article.fields?.thumbnail }} style={{ width: "100%", height: 200, marginVertical: 10 }} />
            <TouchableOpacity>
                
                <Ionicons name={favorite ? "heart" : "heart-outline"} size={40} color="red"
                          onPress={() =>
                              favorite ? removeFavorite(article.webUrl) : addFavorite(article)
                          }
                          style={{
                              marginTop: 5,
                              padding: 6,
                              borderRadius: 4,
                              alignSelf: "flex-end"
                          }}
                >

                </Ionicons>

            </TouchableOpacity>
        </View>
    );
}
