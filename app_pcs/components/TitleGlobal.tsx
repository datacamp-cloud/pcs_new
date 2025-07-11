// components/TitleGlobal.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
}

export default function TitleGlobal({ children, style, ...rest }: Props) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#041145',
  },
});
