import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import theme from "../theme";

type Props = {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({ title, onPress, isLoading = false }) => {
  return (
    <TouchableOpacity style={styles.styleButton} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.white} />
      ) : (
        <Text style={styles.styleText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  styleButton: {
    marginTop: 14,
    width: "80%",
    height: 54,
    borderRadius: 4,
    backgroundColor: theme.colors.cyano2,
    justifyContent: "center",
    alignItems: "center",
  },
  styleText: {
    fontSize: theme.fontSizes.lg,
    padding: 8,
    color: "#000",
    fontFamily: theme.fonts.regular.body,
  },
});

export default Button;
