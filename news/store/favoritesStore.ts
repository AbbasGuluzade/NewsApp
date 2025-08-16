import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "@/api/getNews";

interface FavoritesState {
    favorites: Article[];
    addFavorite: (article: Article) => void;
    removeFavorite: (url: string) => void;
    isFavorite: (url: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (article) =>
                set((state) => {
                    if (state.favorites.find((fav) => fav.webUrl === article.webUrl)) {
                        return state; // already in favorites
                    }
                    return { favorites: [...state.favorites, article] };
                }),
            removeFavorite: (url) =>
                set((state) => ({
                    favorites: state.favorites.filter((fav) => fav.webUrl !== url),
                })),
            isFavorite: (url) =>
                !!get().favorites.find((fav) => fav.webUrl === url),
        }),
        {
            name: "favorites-storage", // key in AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
