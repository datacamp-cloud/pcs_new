import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '@/constant';

import TextGlobal from '@/components/textGlobal';
import InputGlobal from '@/components/InputGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';

export default function InfoUser() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'m' | 'f' | null>(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [borderColor, setBorderColor] = useState('#ccc');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getPhoneFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed.phone) setPhone(parsed.phone);
        }

      } catch (error) {
        console.error('Erreur lecture numéro:', error);
      }
    };
    getPhoneFromStorage();
  }, []);

  const handleIdentity = async () => {
    
    if (!gender || !firstName || !lastName || !address || !birthDate || !email) {
      Alert.alert('Tous les champs sont requis.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-identity`, {
        phone,
        gender,
        firstName,
        lastName,
        address,
        email,
        birthday: birthDate,
      });

      console.log('Réponse backend:', response.data);

      if (response.status === 200) {
        router.push({
          pathname: '/register/recapInfo',
          params: {
            phone,
            gender,
            firstName,
            lastName,
            address,
            email,
            birthday: birthDate,
          },
        });
      } else {
        setError(response.data.message);
        setBorderColor('red');
      }
    } catch (error) {
      setShowModal(true);
      if (axios.isAxiosError(error)) {
        console.error('Erreur API:', error.response?.data || error.message);
      } else {
        console.error('Erreur API:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} onPress={() => router.back()} />
      </View> */}

      <TitleGlobal style={styles.title}>Mon identité</TitleGlobal>

      <TextGlobal style={styles.label}>Genre *</TextGlobal>
      <View style={styles.genderContainer}>
        <Pressable
          style={[styles.checkbox, gender === 'm' && styles.checkboxSelected]}
          onPress={() => setGender('m')}
        >
          <TextGlobal>m.</TextGlobal>
        </Pressable>
        <Pressable
          style={[styles.checkbox, gender === 'f' && styles.checkboxSelected]}
          onPress={() => setGender('f')}
        >
          <TextGlobal>mme</TextGlobal>
        </Pressable>
      </View>

      <InputGlobal placeholder="Nom de famille *" value={lastName} onChangeText={setLastName} />
      <InputGlobal placeholder="Prénoms *" value={firstName} onChangeText={setFirstName} />
      <InputGlobal placeholder="Email *" defaultValue='@gmail.com' value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputGlobal placeholder="Date de naissance (AAAA-MM-JJ) *" value={birthDate} onChangeText={setBirthDate} />
      <InputGlobal placeholder="Adresse (quartier ou ville) *" value={address} onChangeText={setAddress} />

      <ButtonGlobal onPress={handleIdentity} label="Suivant" variant="primary" disabled={false} />
      <ButtonGlobal onPress={() => router.back()} label="Retour" variant="secondary" disabled={false} />
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
  header: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    gap: 15,
  },
  checkbox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
  },
  checkboxSelected: {
    backgroundColor: '#32d49b',
    borderColor: '#32d49b',
  },
  dateInput: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
});
