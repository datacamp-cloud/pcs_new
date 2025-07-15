import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import {BASE_URL} from '@/constant';
import CustomKeypad from '@/components/CustomKeypads';

import TextGlobal from '../../../components/textGlobal';
import ButtonGlobal from '../../../components/ButtonGlobal';
import InputGlobal from '../../../components/InputGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function VerifyPin() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [borderColor, setBorderColor] = useState('#ccc'); // couleur par défaut
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

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

  const handleSubmit = async () => {
    setLoading(true);
    const pinCode = pin.join('');

    if (pinCode.length !== 4) {
      setError('Le code PIN doit contenir 4 chiffres.');
      setBorderColor('red');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-pin`, {
        phone,
        confirmCode: pinCode,
      });

      if (response.status === 200 && response.data.success) {

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

        setError('');
        setBorderColor('green'); // code correct valide
        setPin(['', '', '', '']);
        inputRefs.current[0]?.focus();

        router.push('/dashboard/home');
        
      } else {

        setError(response.data.message || 'Code PIN incorrect.');
        setBorderColor('red');

      }
    } catch (error) {

      const err = error as any;  
      console.error(err.response?.data || err);
      setError('Erreur lors de la vérification. Veuillez réessayer.');
      // setBorderColor('red');

    }finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 60, alignItems: 'center' }}>
        <TitleGlobal style={styles.title}>Vérifier votre code secret</TitleGlobal>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => { inputRefs.current[index] = ref; }}
            style={[styles.pinInput, {borderColor}]}
            // keyboardType="number-pad"
            secureTextEntry
            maxLength={1}
            onChangeText={(value) => handleChange(value, index)}
            // onKeyPress={() => handleKeyPress(index)}
            value={digit}
            textAlign="center"
            autoFocus={index === 0}
            editable={true}
            showSoftInputOnFocus={false}
            pointerEvents="auto"
          />
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
        <CustomKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>

      <ButtonGlobal 
        label={loading ? "Chargement..." : "Valider"} 
        onPress={handleSubmit} 
        disabled={pin.join('').length < 4} 
      />
      <ButtonGlobal
        variant="secondary"
        label="Retour"
        onPress={() => router.back()}
        style={{ width: 300, marginTop: 20}} disabled={false}      
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
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  pinContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 20
  },
  pinInput: {
    width: 55,
    height: 80,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
});
