import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';

interface CenterProps extends ViewProps {
  style?: ViewStyle;
  flex?: number;
  flexDirection?: 'row' | 'column';
  backgroundColor?: string;
}

const Center: React.FC<CenterProps> = ({
  children,
  style,
  flex,
  flexDirection,
  backgroundColor,
  ...rest
}) => {
  const containerStyle = [
    styles.container,
    { flex, flexDirection, backgroundColor },
    style,
  ];

  return (
    <View style={containerStyle} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
});

export default Center;
