/* eslint-disable @typescript-eslint/array-type */
import React, { useRef, useState } from 'react';
import { View, TextInput, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import {BASE_URL} from '@/constant';

import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import CustomKeypad from '@/components/CustomKeypads';
import useUser from '@/hooks/useUser';


export default function ConfirmPassword() {
  const [confirmCode, setConfirmCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [borderColor, setBorderColor] = useState('#ccc');
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [showModal, setShowModal] = useState(false);
  
  // const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {user, } = useUser();


  const handleKeyPress = (value: string) => {
    const nextIndex = confirmCode.findIndex(d => d === '');
    if (nextIndex !== -1) {
      const newConfPin = [...confirmCode];
      newConfPin[nextIndex] = value;
      setConfirmCode(newConfPin);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleDelete = () => {
    const lastIndex = [...confirmCode].reverse().findIndex(d => d !== '');
    if (lastIndex !== -1) {
      const indexToClear = 3 - lastIndex;
      const newConfPin = [...confirmCode];
      newConfPin[indexToClear] = '';
      setConfirmCode(newConfPin);
      inputRefs.current[indexToClear]?.focus();
    }
  };


  const handleConfirmPassword = async () => {
    const pinCode = confirmCode.join('');

    if (pinCode.length < 4) {
      setError('Le mot de passe doit contenir au moins 4 chiffres.');
      return;
    }

    try {

      const response = await axios.post(`${BASE_URL}/api/auth/verify-pin`, {
        phone: user.phone,
        confirmCode: pinCode,
      });

      console.log('Réponse:', response.data);

      if (response.status === 200) {
        setError('');
        setBorderColor('green');
        router.push(`/register/otp`);
      } else {
        setError(response.data.message);
      }

    } catch (error) {

      const err = error as any;
      setError(err.response?.data?.message || 'Une erreur est survenue.');
      setShowModal(true);
      setBorderColor('red');

    }
  };

  const isCodeValid = confirmCode.concat();
  const word = "Répétez le code à 4 chiffres que vous avez choisi pour sécuriser votre compte "

  return (
    <View style={styles.container}>

      <View style={{ marginTop: 60, alignItems: 'center' }}>
        <TitleGlobal style={styles.title}>Confirmer votre code secret</TitleGlobal>
        <TextGlobal style={styles.subtitle}>
          Répétez le code à 4 chiffres que vous avez choisi pour sécuriser votre compte
        </TextGlobal>
      </View>

      
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
        >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TitleGlobal>Erreur !!</TitleGlobal>
            <TextGlobal>{error}</TextGlobal>
            <ButtonGlobal
              label="Fermer"
              onPress={() => setShowModal(false)}
              variant="primary"
              disabled={false}
            />
          </View>
        </View>
      </Modal>

      
      <View style={styles.pinContainer} >
      {confirmCode.map((digit, index) => (
            <TextInput
              key={index}
              secureTextEntry
              style={[styles.pinInput, {borderColor}]}
              value={digit}
              onChangeText={(value) => {
                const updatedCode = [...confirmCode];
                updatedCode[index] = value;
                setConfirmCode(updatedCode);
              }}
              maxLength={1}
              autoFocus={index === 0}
              textAlign="center"
              id={`pin-input-${index}`}
              editable={false}
              showSoftInputOnFocus={false}
              pointerEvents="none"
            />
        ))}
      </View>

      <View style={{ marginVertical: 40 }}>
        <CustomKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>

      <ButtonGlobal 
        disabled={true ? confirmCode.join('').length < 4 : false}  
        variant={isCodeValid ? "primary" : "disabled"} 
        label="Valider"
        onPress={handleConfirmPassword} 
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
    title: {
    fontSize: 26,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
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
      color: '#041145',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 30,
      borderRadius: 15,
      alignItems: "center",
      width: "80%",
    },
  });
