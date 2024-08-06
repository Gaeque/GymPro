import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import theme from "../theme";

type Props = {
  name: string;
  isFirst?: boolean;
  isActive: boolean;
  onPress: () => void;
};

const Group = ({ name, isFirst, isActive, onPress }: Props) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  return (
    <View>
    <TouchableOpacity
      style={[
        styles.styleButton,
        isFirst ? { marginLeft: 22 } : null,
        {
          borderColor: isActive ? theme.colors.cyano2 : "transparent",
        },
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Text style={{ color: theme.colors.white, textTransform: "uppercase" }}>
        {name}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  styleButton: {
    marginTop: 20,
    marginRight: 10,
    height : 40,
    width: 88,
    backgroundColor: theme.colors.gray600,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
});

export default Group;
