import React from 'react';
import { View, Image, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
// import * as mime from 'react-native-mime-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ButtonGlobal from '@/components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import { BASE_URL } from '@/constant';

export default function RecapKyc() {
  const router = useRouter();
  const { front, back, selfie, type } = useLocalSearchParams();

  // Ensure params are always strings
  const frontStr = Array.isArray(front) ? front[0] : front;
  const backStr = Array.isArray(back) ? back[0] : back;
  const selfieStr = Array.isArray(selfie) ? selfie[0] : selfie;
  const typeStr = Array.isArray(type) ? type[0] : type;
  
  const getMimeType = (uri: string) => {
    const extension = uri.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'heic':
        return 'image/heic';
      default:
        return 'application/octet-stream';
    }
  };

  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const userData = await AsyncStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.phone) {
        Alert.alert("Erreur", "Numéro de téléphone introuvable.");
        return;
      }

      formData.append('phone', user.phone); // Très important pour le backend

      if (frontStr) {
        formData.append('docFront', {
          uri: frontStr,
          name: 'doc_front.jpg',
          type: getMimeType(frontStr) || 'image/jpeg',
        } as any);
      }

      if (typeStr !== 'passeport' && backStr) {
        formData.append('docBack', {
          uri: backStr,
          name: 'doc_back.jpg',
          type: getMimeType(backStr) || 'image/jpeg',
        } as any);
      }

      if (selfieStr) {
        formData.append('selfie', {
          uri: selfieStr,
          name: 'selfie.jpg',
          type: getMimeType(selfieStr) || 'image/jpeg',
        } as any);
      }

      console.log('sending formData:', FormData);

      const response = await axios.post(`${BASE_URL}/api/user/upload-kyc`, FormData);

      console.log('response', response);
      console.log('response data', response.data);

      if (response.status === 200) {
        Alert.alert("Succès", "Vérification KYC envoyée.");
        router.push('/dashboard/home');
      }
      
    } catch (error: any) {
      console.error("Erreur envoi KYC :", error);
      console.log("Erreur soumise :", error?.response?.data);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi de la vérification KYC.");
    }
  };

  return (
    <View style={styles.container}>
      <TitleGlobal>Récapitulatif de votre vérification</TitleGlobal>
      {frontStr && <Image source={{ uri: frontStr }} style={styles.image} />}
      {backStr && typeStr !== 'passeport' && <Image source={{ uri: backStr }} style={styles.image} />}
      {selfieStr && <Image source={{ uri: selfieStr }} style={styles.image} />}

      <TextGlobal style={{ marginTop: 10 }}>
        Type de pièce : {typeStr}
      </TextGlobal>

      <ButtonGlobal label="Soumettre" onPress={handleSubmit} disabled={false} variant="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    marginVertical: 10,
    borderRadius: 10,
  },
});
