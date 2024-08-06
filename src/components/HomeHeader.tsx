import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../theme";
import AvatarImage from "./AvatarImage"; 
import { useAuth } from "../hooks/useAuth";

const HomeHeader = () => {

  const { user, signOut } = useAuth();

  return (
    <View style={styles.headerContainer}>
      <AvatarImage size={60}/>

      <View style={styles.textContainer}>
        <Text style={{ color: theme.colors.gray200 }}>Olá,</Text>
        <Text
          style={{ color: theme.colors.white, fontSize: theme.fontSizes.xl }}
        >
          {user.name}
        </Text>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={signOut}>
        <MaterialIcons name="logout" size={24} color={theme.colors.white}  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingTop: 8, 
  },
  textContainer: {
    flex: 1, 
    marginLeft: 12, 
  },
  iconContainer: {
    marginLeft: "auto", 
    paddingRight: 10
  },
});

export default HomeHeader;
