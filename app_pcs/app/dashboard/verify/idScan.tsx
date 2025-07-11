import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';

export default function IdScan() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const pickImage = async (side: 'front' | 'back') => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission requise', 'Autorisez l\'accès à la caméra.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      side === 'front' ? setFrontImage(imageUri) : setBackImage(imageUri);
    }
  };

  const handleContinue = () => {
    if (!frontImage || (type !== 'passeport' && !backImage)) {
      Alert.alert('Information manquante', 'Veuillez scanner toutes les faces nécessaires.');
      return;
    }

    router.push({
      pathname: '/dashboard/verify/selfie',
      params: {
        type,
        front: frontImage,
        back: backImage || '',
      },
    });
  };

  return (
    <View style={styles.container}>
      <TitleGlobal style={styles.title}>Scannez votre {type === 'passeport' ? 'passeport' : 'document'}</TitleGlobal>

      <TextGlobal style={styles.instruction}>Prenez une photo du recto :</TextGlobal>
      <TouchableOpacity style={styles.imageBox} onPress={() => pickImage('front')}>
        {frontImage ? (
          <Image source={{ uri: frontImage }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.placeholder}>Appuyez pour scanner le recto</Text>
        )}
      </TouchableOpacity>

      {type !== 'passeport' && (
        <>
          <TextGlobal style={styles.instruction}>Prenez une photo du verso :</TextGlobal>
          <TouchableOpacity style={styles.imageBox} onPress={() => pickImage('back')}>
            {backImage ? (
              <Image source={{ uri: backImage }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.placeholder}>Appuyez pour scanner le verso</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <ButtonGlobal
        label="Continuer"
        onPress={handleContinue}
        disabled={!frontImage || (type !== 'passeport' && !backImage)}
        variant="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    marginVertical: 10,
  },
  imageBox: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
