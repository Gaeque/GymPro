import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    green700: "#00875F",
    green500: "#00B37E",
    gray700: "#121214",
    gray600: "#202024",
    gray500: "#29292E",
    gray400: "#323238",
    gray300: "#7C7C8A",
    gray200: "#C4C4CC",
    gray100: "#E1E1E6",
    red: "#F75A68",
    white: "#FFFFFF",
    cyano: "#00FFFF",
    cyano1: "#008080",
    cyano2: "#00b8b8"

  },
  fonts: {
    regular: {
      heading: "Roboto_400Regular",
      body: "Roboto_700Bold",
    }
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
};

export default theme;
