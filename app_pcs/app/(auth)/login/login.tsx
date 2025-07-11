import { View, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import {BASE_URL} from '@/constant';

import PhoneInput from 'react-native-phone-number-input';

import TextGlobal from '../../../components/textGlobal';
import ButtonGlobal from '../../../components/ButtonGlobal';

export default function LoginScreen() {
  const router = useRouter();
  const phoneInput = useRef<PhoneInput>(null);
  const [phone, setPhone] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const handleLogin = async () => {
    try {

      console.log("Numéro envoyé :", formattedValue.trim());

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          phone: formattedValue.trim(),
        })
      });

      const data = await response.json();
      console.log("response:",data)

      if (response.ok) {
        console.log("Redirection vers :", `/login/verifyCode?phone=${encodeURIComponent(formattedValue.trim())}`);
        router.push(`/login/verifyCode?phone=${encodeURIComponent(formattedValue.trim())}`);
      } else {
        Alert.alert(data.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur serveur.');
    }
  };

  const isPhoneValid = phoneInput.current?.isValidNumber(phone);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#E93F69', '#EA534D', '#EE7528']} style={styles.gradient}>


        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/images/1-Intro/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.cardContainer}>
          <Image source={require("../../../assets/images/1-Intro/card.png")} style={styles.card} />
        </View>

        <View style={styles.picto}>
          <Image source={require("../../../assets/images/1-Intro/LeftMan.png")} style={[styles.character, styles.leftMan]} />
          <Image source={require("../../../assets/images/1-Intro/MiddleGirl.png")} style={[styles.character, styles.middleGirl]} />
          <Image source={require("../../../assets/images/1-Intro/RightMan.png")} style={[styles.character, styles.rightMan]} />
        </View>

        <View style={styles.leftCloud}>
          <Image source={require("../../../assets/images/1-Intro/LeftCloud.png")} />
        </View>

        <View style={styles.whiteBg}>
          <Image source={require("../../../assets/images/1-Intro/back_white.png")} style={{ width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40 }} />
        </View>

        <View style={{ justifyContent: 'space-around', marginVertical: 20, zIndex: 10, alignItems: 'center' }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="CI"
            layout="first"
            onChangeText={setPhone}
            onChangeFormattedText={setFormattedValue}
            withShadow
            autoFocus
            containerStyle={{ width: 300, borderRadius: 10, marginVertical: 20 }}
            textContainerStyle={{ paddingVertical: 5, borderRadius: 10 }}
          />

          <ButtonGlobal
            label="Connexion"
            variant={isPhoneValid ? 'primary' : 'disabled'}
            onPress={handleLogin}
            disabled={!isPhoneValid}
            style={{ zIndex: 10, width: 300, marginHorizontal: 50 }}
          />

          <ButtonGlobal
            label="Annuler"
            variant='secondary'
            onPress={() => router.back()}
            disabled={false}
            style={{ zIndex: 10, width: 300, marginHorizontal: 50 }}
          />
        </View>
      </LinearGradient>

      <View style={{ zIndex: 10, marginBottom: 20, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="chevron-up-outline" size={24} color="#2B2532" />
        <TouchableOpacity
        onPress={() => router.push("../(auth)/help")}
        >
          <TextGlobal bold={false} style={{color: "#E93F69", textAlign: "center", fontSize: 16}}>Aide et assistance</TextGlobal> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 35,
    width: 200,
    height: 30,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  cardContainer: {
    marginTop: 25,
  },
  card: {
    marginTop: 50,
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  picto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "fixed",
  },
  leftMan: {
    width: 145,
    height: 250,
    left: 10,
    marginTop: 5,
  },
  middleGirl: {
    marginTop: 100,
    left: -18,
  },
  rightMan: {
    marginTop: 50,
    left: -10,
  },
  leftCloud: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: 60,
    marginBottom: 175,
    left: -200,
  },
  whiteBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '120%',
    height: 500,
    zIndex: 1,
    transform: [{ rotate: '9deg' }],
    
   
  },
  character: {
    resizeMode: "contain",
    width: 110,
    height: 250,
    marginHorizontal: -20,
    marginVertical: -50,
  },
});