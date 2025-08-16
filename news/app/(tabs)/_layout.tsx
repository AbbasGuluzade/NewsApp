import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import {useThemeStore} from "@/store/themesStore";

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

    const { theme } = useThemeStore();
    const currentTheme = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: currentTheme.tabBackground,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
            color: currentTheme.textSelected,
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: currentTheme.background,
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'News',
          tabBarIcon: ({ color }) =>
              <Ionicons name="newspaper-outline" size={28} color={currentTheme.icon} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) =>
              <Ionicons name="heart" size={28} color={currentTheme.icon} />,
        }}
      />
    </Tabs>
  );
}
