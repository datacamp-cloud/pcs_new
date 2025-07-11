import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import ButtonGlobal from '@/components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';

export default function SelfieScreen() {
  const [selfie, setSelfie] = useState<string | null>(null);
  const router = useRouter();

  const pickSelfie = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission requise', 'Autorisez l’accès à la caméra pour continuer.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelfie(result.assets[0].uri);
    }
  };

  const handleContinue = () => {

    if (!selfie) {
      Alert.alert('Erreur', 'Veuillez prendre un selfie avant de continuer.');
      return;
    }

    // Tu peux stocker l’image ou l’envoyer à l’API ici avant de passer à l’étape suivante
    router.push('/dashboard/verify/recap');
};

  return (
    <View style={styles.container}>
      <TitleGlobal style={styles.title}>Prenez un selfie</TitleGlobal>
      <TextGlobal style={styles.description}>
        Veuillez prendre un selfie clair pour vérifier votre identité.
      </TextGlobal>

      <View style={styles.imageContainer}>
        {selfie ? (
          <Image source={{ uri: selfie }} style={styles.image} />
        ) : (
          <TextGlobal style={styles.placeholder}>Aucun selfie pris</TextGlobal>
        )}
      </View>

      <ButtonGlobal
        label="Prendre un selfie"
        variant="primary"
        onPress={pickSelfie}
        disabled={false}
      />

      <ButtonGlobal
        label="Continuer"
        variant="secondary"
        onPress={handleContinue}
        disabled={!selfie}
        style={{ marginTop: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#E93F69',
  },
  placeholder: {
    color: '#aaa',
    fontSize: 16,
  },
});
