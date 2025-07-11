import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkIfOnboardingSeen = async () => {
      const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeen === 'true') {
        router.replace('/onboard/accueil');
      } else {
        setLoading(false);
      }
    };
    checkIfOnboardingSeen();
  }, []);

  const handleNext = async () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/onboard/accueil');
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/onboard/accueil');
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#E93F69', '#EA534D', '#EE7528']} style={styles.container}>
      <View style={styles.content}>
        {renderScreen(currentIndex)}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <TextGlobal style={styles.skip} bold={true}>Passer</TextGlobal>
        </TouchableOpacity>

        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <TextGlobal style={styles.next} bold={false}>Suivant</TextGlobal>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// Ton renderScreen reste tel quel, ou tu l’extrais comme fonction :
const renderScreen = (currentIndex: number) => {
  switch (currentIndex) {
    case 0:
      return (
        <>
          <Image source={require('../assets/images/1-Intro/logo.png')} style={styles.imageTop} />
          <Image source={require('../assets/images/1-Intro/compte_perso.png')} style={styles.imageCenter} />
          <View style={styles.block}>
            <TitleGlobal style={styles.title}>1 COMPTE</TitleGlobal>
            <TextGlobal style={styles.subTilte}>
              "Un compte, sans banque, sans contrainte." 
            </TextGlobal>
          </View>
        </>
      );
    case 1:
      return (
        <>
          <Image source={require('../assets/images/1-Intro/logo.png')} style={styles.imageTop} />
          <Image source={require('../assets/images/1-Intro/carte.png')} style={styles.imageCenter} />
          <View style={styles.block}>
            <TitleGlobal style={styles.title}>1 CARTE</TitleGlobal>
            <TextGlobal style={styles.subTilte}>
              "Une carte Mastercard, partout, sans limites."
            </TextGlobal>
          </View>
        </>
      );
    case 2:
      return (
        <>
          <Image source={require('../assets/images/1-Intro/logo.png')} style={styles.imageTop} />
          <Image source={require('../assets/images/1-Intro/iban.png')} style={styles.imageCenter} />
          <View style={styles.block}>
            <TitleGlobal style={styles.title}>1 IBAN</TitleGlobal>
            <TextGlobal style={styles.subTilte}>
              "Un IBAN personnel, pour tous vos paiements."
            </TextGlobal>
          </View>
        </>
      );
    default:
      return null;
  }
};


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  imageTop: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
    position: "absolute",
    top: 0,
  },
  imageCenter: {
    width: 400,
    height: 250,
    resizeMode: 'contain',
    position: "absolute",
    top:250,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  block: {
    justifyContent: "center", 
    position: "absolute", 
    bottom: 100
  },
  loading: {
    flex: 1,
    backgroundColor: '#E93F69',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#fff", textAlign: "center", fontSize: 28
  },
  subTilte: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  skip: { color: '#fff', fontSize: 16, },
  next: { color: '#fff', fontSize: 16,  },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
});
