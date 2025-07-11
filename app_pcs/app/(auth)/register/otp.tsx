import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import {BASE_URL} from '@/constant';

import CustomKeypad from '@/components/CustomKeypads';

import ButtonGlobal from '@/components/ButtonGlobal';
import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function VerifOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [phone, setPhone] = useState('');

  useEffect(() => {
    const getPhone = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.phone) {
            setPhone(parsed.phone);
          }
        }
      } catch (e) {
        console.error('Erreur récupération téléphone:', e);
      }
    };
    getPhone();
  }, []);

  const handleKeyPress = (value: string) => {
    const nextIndex = otp.findIndex(d => d === '');
    if (nextIndex !== -1) {
      const newOtp = [...otp];
      newOtp[nextIndex] = value;
      setOtp(newOtp);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleDelete = () => {
    const lastIndex = [...otp].reverse().findIndex(d => d !== '');
    if (lastIndex !== -1) {
      const indexToClear = 5 - lastIndex;
      const newOtp = [...otp];
      newOtp[indexToClear] = '';
      setOtp(newOtp);
      inputRefs.current[indexToClear]?.focus();
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError("L'OTP doit contenir exactement 6 chiffres.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        phone,
        otp: otpCode,
      });

      setLoading(false);

      if (response.status === 200) {
        setError('');

        const { user, token } = response.data;

        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);


        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: 'OTP vérifié avec succès 👌',
        });

        setTimeout(() => {
          router.push('/register/infoUser');
        }, 1500);
      }

    } catch (error: any) {
      setLoading(false);
      const msg = error?.response?.data?.message || "Erreur lors de la vérification de l'OTP.";
      console.error('Erreur lors de la vérification de l\'OTP :', msg);

      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: msg,
      });

      setError(msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={{position: "absolute", left: 15, top: 50}}>
        <Ionicons name="arrow-back-outline" size={24} onPress={() => router.back()}/>
      </View> */}
      <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: "center", 
          marginVertical: 60
          }}>
        <TitleGlobal style={{ fontSize: 20, marginLeft: 15, textAlign: "center",   }}>
          Saisissez le code reçu par SMS
        </TitleGlobal>
      </View>
      

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            maxLength={1}
            autoFocus={index === 0}
            textAlign="center"
            ref={ref => { inputRefs.current[index] = ref; }}
          />
        ))}
      </View>

      <View style={{ marginVertical: 40 }}>
        <CustomKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>

      <ButtonGlobal 
        variant='primary' 
        label={loading ? 'Vérification...' : 'Vérifier OTP'} 
        onPress={handleVerifyOtp} 
        disabled={loading} 
        style={{width: 300}} 
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
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 27.5,
    marginHorizontal: 5,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  
  otpInputFilled: {
    borderColor: '#4CAF50',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
