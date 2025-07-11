import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
// import Ionicons from '@expo/vector-icons/Ionicons'; // Pour la navigation
import axios from 'axios';
import {BASE_URL} from '@/constant';

import CustomKeypad from '@/components/CustomKeypads';

import TextGlobal from '../../../components/textGlobal';
// import InputGlobal from '../../../components/InputGlobal';
import ButtonGlobal from '../../../components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetPin() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [borderColor, setBorderColor] = useState('#ccc');

  const router = useRouter();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleKeyPress = (value: string) => {
    const nextIndex = pin.findIndex(d => d === '');
    if (nextIndex !== -1) {
      const newPin = [...pin];
      newPin[nextIndex] = value;
      setPin(newPin);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleDelete = () => {
    const lastIndex = [...pin].reverse().findIndex(d => d !== '');
    if (lastIndex !== -1) {
      const indexToClear = 3 - lastIndex;
      const newPin = [...pin];
      newPin[indexToClear] = '';
      setPin(newPin);
      inputRefs.current[indexToClear]?.focus();
    }
  };

  const handlePinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSetPin = async () => {
    const pinCode = pin.join('');

    if (pinCode.length !== 4) {
      setError('Le code PIN doit contenir exactement 4 chiffres.');
      setBorderColor('red');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const parsed = userData ? JSON.parse(userData) : null;
      const phone = parsed?.phone;

      if (!phone) {
        setError('Numéro de téléphone introuvable.');
        return;
      }

      console.log('Envoi du code PIN:', { phone, pinCode });

      const response = await axios.post(`${BASE_URL}/api/auth/set-pin`, {
        phone,
        code: pinCode,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Réponse API:', response.data);

      if (response.status === 200) {
        setError('');
        setBorderColor('green');

        // Ajoute/Met à jour les infos dans AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify({ ...parsed, phone }));

        setTimeout(() => {
          router.push('/register/pinConfirm');
        }, 500);
      }
    } catch (error: any) {
      console.error('Erreur API:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Une erreur est survenue.');
      setBorderColor('red');
    }
  };


const isCodeValid = pin.concat();
const word = "Choisissez un code à 4 chiffres sûr et facile à retenir pour sécuriser votre compte "

  return (
    <View style={styles.container}>
      
      <View style={{ marginTop: 60, alignItems: 'center' }}>
        
        <TitleGlobal style={styles.title}>Créer votre code secret</TitleGlobal>
        <TextGlobal style={styles.subtitle}>
          Choisissez un code à 4 chiffres qui est facile à retenir pour sécuriser votre compte
        </TextGlobal>

      </View>

      {/* PIN Input */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.pinInput, { borderColor }]}
            secureTextEntry
            value={digit}
            onChangeText={(value) => handlePinChange(value, index)}
            maxLength={1}
            autoFocus={index === 0}
            textAlign="center"
            ref={ref => { inputRefs.current[index] = ref; }}
          />
        ))}
      </View>

      {/* Pavé numérique */}
      <View style={{ marginVertical: 40 }}>
        <CustomKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>

      {/* Boutons */}
      <ButtonGlobal
        disabled={pin.join('').length < 4}
        variant={pin.join('').length === 4 ? "primary" : "disabled"}
        label="Valider"
        onPress={handleSetPin}
        style={{ width: 300 }}
      />
      <ButtonGlobal
        variant="secondary"
        label="Retour"
        onPress={() => router.back()}
        style={{ width: 300, marginTop: 20 }} disabled={false}      
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  pinInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 27.5,
    marginHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});