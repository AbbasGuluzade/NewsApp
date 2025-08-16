/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
      textSelected: '#247f39',
    background: '#fff',
    tint: tintColorLight,
      icon: '#247f39',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
      tabBackground: '#FFDC32',
      navbarText: '#247f39'
  },
  dark: {
    text: '#ECEDEE',
      textSelected: '#FFDC32',
    background: '#151718',
    tint: tintColorDark,
      icon: '#FFDC32',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
        tabBackground: '#247f39',
      navbarText: '#FFDC32'
  },
};
