import { StatusBar } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import Loading from "./src/components/Loading";
import { Routes } from "./src/routes";

import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </PaperProvider>
  );
}
