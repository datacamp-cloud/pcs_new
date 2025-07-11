import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
}

export default function CustomKeypad({ onKeyPress, onDelete }: Props) {
  const [shuffledKeys, setShuffledKeys] = useState<string[]>([]);

  useEffect(() => {
    generateRandomKeys();
  }, []);

  const generateRandomKeys = () => {
    const digits = ['0','1','2','3','4','5','6','7','8','9'];
    const shuffled = digits.sort(() => Math.random() - 0.5);
    setShuffledKeys(shuffled);
  };

  const getGrid = () => {
    const grid = [];
    for (let i = 0; i < 9; i += 3) {
      grid.push(shuffledKeys.slice(i, i + 3));
    }
    return grid;
  };

  const grid = getGrid();

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Pressable key={key} onPress={() => onKeyPress(key)} style={styles.key}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}

      {/* Dernière ligne : vide | 0 | delete */}
      <View style={styles.row}>
        <View style={[styles.key, { backgroundColor: 'transparent' }]} />
        
        <Pressable onPress={() => onKeyPress(shuffledKeys[9])} style={styles.key}>
          <Text style={styles.keyText}>{shuffledKeys[9]}</Text>
        </Pressable>

        <Pressable onPress={onDelete} style={styles.key}>
          <Ionicons name="backspace-outline" size={24} color="#000" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#222',
    fontWeight: 'bold',
  },
});
