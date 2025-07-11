import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'disabled';
  label: string; // This will be used as the button text
  disabled: boolean;
}

export default function ButtonGlobal({ onPress, style, textStyle, variant = 'primary', label, disabled }: Props) {

  const isPrimary = variant === 'primary';
  const isDisabled = variant === 'disabled';

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Ne rien faire si désactivé
      style={[
        styles.button,
        variant === 'primary'
          ? styles.primary
          : variant === 'secondary'
          ? styles.secondary
          : styles.disabled,
        disabled && { opacity: 0.6 }, // assombrir si désactivé
        style,
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary'
            ? styles.textPrimary
            : variant === 'secondary'
            ? styles.textSecondary
            : styles.textDisabled,
          disabled && { color: '#BDBDBD' },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 5,
    width: "100%",
  },
  primary: {
    backgroundColor: '#E93F69',
  },
  secondary: {
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderColor: '#E93F69',
  },
  disabled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#BDBDBD',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: '#E93F69',
  },
  textDisabled: {
    color: '#BDBDBD',
  },
});
