import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';
import { Ionicons } from '@expo/vector-icons';

const steps = [
  {
    id: 1,
    image: require('@/assets/images/banks/1_choixbank.jpg'),
    text: 'Choisir la banque du versement.',
  },
  {
    id: 2,
    image: require('@/assets/images/banks/2_montant.jpg'),
    text: 'Effectuer le versement à la banque.',
  },
  {
    id: 3,
    image: require('@/assets/images/banks/3_versement.jpg'),
    text: 'Saisir le montant du versement.',
  },
  {
    id: 4,
    image: require('@/assets/images/banks/4_upload.jpg'),
    text: 'Joindre le bordereau de versement et terminer.',
  },
];

export default function RechargeSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/dashboard/recharger/select-bank');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:0, marginBottom: 20,  }}>
        <Ionicons style={{justifyContent: 'flex-start', marginRight: 10}} name="chevron-back" size={26} color="#19203D" onPress={() => { router.back()}} />
        <TitleGlobal style={{ textAlign: 'center' }}>Recharger mon compte</TitleGlobal>
      </View>
      <TextGlobal style={styles.description}>
        Recharger votre compte PCS en effectuant un versement d&apos;espèces sur l&apos;un de nos comptes bancaires.
      </TextGlobal>

      <Image source={steps[currentStep].image} style={styles.image} resizeMode="contain" />
      <TextGlobal style={styles.stepText}>{steps[currentStep].text}</TextGlobal>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {steps.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentStep === i ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => router.push('/dashboard/recharger/select-bank')}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
        <ButtonGlobal
          label="Suivant"
          onPress={handleNext}
          variant="primary"
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 400,
    marginVertical: 20,
  },
  stepText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  dotActive: {
    backgroundColor: '#E93F69',
  },
  dotInactive: {
    backgroundColor: '#E0E0E0',
  },
  buttons: {
    alignItems: 'center',
    gap: 20,
  },
  skipText: {
    color: '#E93F69',
    fontSize: 16,
    marginBottom: 10,
  },
});
