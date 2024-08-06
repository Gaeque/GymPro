
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../theme";

type Props = {
  title: string;
  onPress: () => void;
};

const SecondaryButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.styleButton}
      activeOpacity={0.8}
    >
      <Text style={styles.styleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  styleButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 54,
    borderRadius: 4,
    backgroundColor: "transparent",
    borderColor: theme.colors.cyano1,
    borderWidth: 1,
  },
  styleText: {
    fontSize: theme.fontSizes.lg,
    paddingTop: 4,
    color: theme.colors.white,
    fontFamily: theme.fonts.regular.body,
  },
});

export default SecondaryButton;
