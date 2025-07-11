// Button.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export default function Button({onPress, title}: ButtonProps) {
  return (
    <Pressable style={styles.addCardButton} onPress={onPress}>
      <Text style={styles.addCardButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addCardButton: {
    backgroundColor: '#E93F69',
    padding: 15,
    margin: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  addCardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


