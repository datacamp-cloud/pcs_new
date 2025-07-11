// components/TextGlobal.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface Props extends TextProps {
  bold?: boolean;
  children: React.ReactNode;
}

// Ajout de React.forwardRef pour autoriser l'utilisation de `ref`
// eslint-disable-next-line react/display-name
const TextGlobal = React.forwardRef<Text, Props>(({ children, style, bold = false, ...rest }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.regular, bold && styles.bold, style]}
      {...rest}
    >
      {children}
    </Text>
  );
});

export default TextGlobal;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#041145',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#041145',
  },
  
});
