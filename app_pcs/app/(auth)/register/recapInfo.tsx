// recapInfo.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import {BASE_URL} from '@/constant';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecapInfo() {
  const router = useRouter();
  const {
    phone,
    gender,
    firstName,
    lastName,
    address,
    email,
    birthday,
  } = useLocalSearchParams();

  const handleRecap = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-identity`, {
        phone,
        gender,
        firstName,
        lastName,
        address,
        email,
        birthday,
      });

      console.log("✅ Réponse API:", response.data);

      if (response.status === 200) {
        // Enregistrement local du user + token s'ils sont présents dans la réponse
        if (response.data.user) {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              ...response.data.user,
              token: response.data.token ?? null,
            })
          );
        }

        router.replace('/register/success');
      } else {
        Alert.alert('Erreur', response.data.message || "Une erreur est survenue.");
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Erreur serveur.";
      console.error("❌ Erreur lors de la vérification:", errMsg);
      Alert.alert("Erreur", errMsg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleGlobal style={styles.title}>Récapitulatif</TitleGlobal>

      <TextGlobal style={styles.label}>Téléphone : {phone}</TextGlobal>
      <TextGlobal style={styles.label}>Genre : {gender === 'm' ? 'Homme' : 'Femme'}</TextGlobal>
      <TextGlobal style={styles.label}>Nom : {lastName}</TextGlobal>
      <TextGlobal style={styles.label}>Prénoms : {firstName}</TextGlobal>
      <TextGlobal style={styles.label}>Email : {email}</TextGlobal>
      <TextGlobal style={styles.label}>Date de naissance : {birthday}</TextGlobal>
      <TextGlobal style={styles.label}>Adresse : {address}</TextGlobal>

      <ButtonGlobal
        onPress={handleRecap}
        label="Confirmer"
        variant="primary"
        disabled={false}
      />
      <ButtonGlobal
        onPress={() => router.back()}
        label="Retour"
        variant="secondary"
        disabled={false}
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

