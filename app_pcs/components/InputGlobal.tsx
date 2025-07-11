// components/InputGlobal.tsx
import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  rounded?: boolean;
}

export default function InputGlobal({ style, rounded = true, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, rounded && styles.rounded, style]}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 10,
    margin: "auto",
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontFamily: 'Montserrat',
    color: '#000',
    // elevation: 25,
  },
  rounded: {
    borderRadius: 50,
  },
});
