import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";

import theme from "../theme";
import Loading from "../components/Loading";

export function Routes() {
  const { colors } = theme;
  const { user, isLoadingUserStorageData } = useAuth();


  if(isLoadingUserStorageData) {
    return <Loading  />
  }


  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.gray700,
        },
      }}
    >
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
