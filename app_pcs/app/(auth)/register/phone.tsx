import React, { useState, useRef } from 'react';
import { View, Image, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '@/constant';

import PhoneInput from 'react-native-phone-number-input';

import TextGlobal from '../../../components/textGlobal';
import ButtonGlobal from '../../../components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import normalizePhone from '@/utils/normalizePhone'; // Assuming you have a utility function for phone normalization

export default function Phone() {
  const [phone, setPhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const wordTop =
    "Il vous suffit de saisir votre numéro de téléphone pour vous connecter ou créer un compte";

  // const normalizePhone = (num: string): string => {
  //   // Supprime +225 ou 00225, espaces, tirets, etc.@
  //   return num.replace(/^(\+225|00225)/, '').replace(/\D/g, '');
  // };

  const handleSubmit = async () => {
    try {
      const cleanPhone = normalizePhone(formattedValue.trim());
      const response = await axios.post(`${BASE_URL}/api/auth/saved-phone`, {
        phone: cleanPhone,
      });

      console.log("✅ BACKEND RESPONSE:", response.data);

      await AsyncStorage.setItem('user', JSON.stringify({ phone: cleanPhone }));

      router.push(`/register/pin?phone=${cleanPhone}`);
    } catch (error) {
      const err = error as any;
      console.error('Erreur:', err?.response?.data || err.message);
      setError(err.response?.data?.message || 'Une erreur est survenue.');
      setShowModal(true);
    }
  };

  const isPhoneValid = phoneInput.current?.isValidNumber(formattedValue);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="arrow-back-outline" size={24} onPress={() => router.back()} />
        <TitleGlobal style={{ fontSize: 24, marginLeft: 100, textAlign: "center" }}>S'inscrire</TitleGlobal>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 50 }}>
        <Image
          source={require("../../../assets/images/2-Sign_up/CreationCompte.png")}
          style={{ resizeMode: "contain", width: 150 }}
        />
        <TextGlobal style={{ textAlign: "center", fontWeight: "500", fontSize: 18, padding: 25 }}>
          {wordTop}
        </TextGlobal>
      </View>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phone}
        defaultCode="CI"
        layout="first"
        onChangeText={setPhone}
        onChangeFormattedText={setFormattedValue}
        withShadow
        autoFocus
        containerStyle={{ width: "100%", borderRadius: 10, marginVertical: 30 }}
        textContainerStyle={{ paddingVertical: 10, borderRadius: 10 }}
      />
      <TextGlobal style={{ textAlign: "center", fontSize: 18, fontWeight: "500", marginVertical: 20 }}>
        En utilisant notre application mobile, vous acceptez notre politique de confidentialité
        et nos conditions d&apos;utilisation
      </TextGlobal>

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

      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <ButtonGlobal
          label="Continuer"
          onPress={handleSubmit}
          disabled={!isPhoneValid}
          variant={isPhoneValid ? "primary" : "disabled"}
        />
        <ButtonGlobal
          label="Retour"
          onPress={() => router.back()}
          variant="secondary"
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
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
