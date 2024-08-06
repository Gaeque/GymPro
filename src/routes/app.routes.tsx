import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Platform } from "react-native";

import HomeSvg from "../assets/home.svg";
import HistorySvg from "../assets/history.svg";
import ProfileSvg from "../assets/profile.svg";

import { Home } from "../screens/Home";
import { Exercise } from "../screens/Exercise";
import { Profile } from "../screens/Profile";
import { History } from "../screens/History";
import theme from "../theme";

type AppRoutes = {
  home: undefined;
  exercise: {exerciseId: string};
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.cyano,
        tabBarInactiveTintColor: theme.colors.cyano1,
        tabBarStyle: {
          backgroundColor: theme.colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: 30,
          paddingTop: 28,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width="30" height="30" />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width="30" height=" 30" />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width="30" height=" 30" />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
