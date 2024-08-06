import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import theme from "../theme";

const Input = ({ disabled, ...rest }: TextInputProps & { disabled?: boolean }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      mode="outlined"
      style={[
        styles.inputStyles,
        disabled ? styles.disabledInput : null,
        {
          borderColor: isFocused ? theme.colors.cyano1 : theme.colors.gray400,
        }
      ]}
      theme={{
        colors: {
          primary: isFocused ? theme.colors.cyano1 : theme.colors.gray400,
        },
      }}
      textColor={theme.colors.white}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    backgroundColor: theme.colors.gray700,
    width: "80%",
    padding: 2,
    fontSize: theme.fontSizes.md,
    marginBottom: 10,
    borderRadius: 10
  },
  disabledInput: {
    backgroundColor: theme.colors.gray600,
    borderRadius: 10
  }
});

export default Input;
