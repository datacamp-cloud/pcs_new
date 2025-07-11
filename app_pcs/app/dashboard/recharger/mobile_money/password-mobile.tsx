import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonGlobal from '@/components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';

export default function PasswordVerification() {
  const router = useRouter();
  const { operator, logo, amount, frais, net } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      if (!password) return Alert.alert('Erreur', 'Veuillez saisir votre mot de passe.');

      setLoading(true);

      const userData = await AsyncStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.phone) return Alert.alert('Erreur', 'Utilisateur introuvable.');

      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/verify-pin`, {
        phone: user.phone,
        confirmCode: password,
      });

      if (response.data.success) {
        router.push({
          pathname: '/dashboard/recharger/mobile_money/success',
          params: { operator, logo, amount, frais, net },
        });
      }
    } catch (error: any) {
      Alert.alert('Échec', error?.response?.data?.message || 'Mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#19203D"
            onPress={() => router.back()}
          />
          <TitleGlobal>Recharger mon compte</TitleGlobal>
        </View>

        <TextGlobal style={styles.instruction}>
          Pour confirmer le rechargement, veuillez saisir votre mot de passe PCS Xpress.
        </TextGlobal>

        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <ButtonGlobal
          label="Confirmer"
          onPress={handleConfirm}
          disabled={loading || !password}
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    gap: 30,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
});
