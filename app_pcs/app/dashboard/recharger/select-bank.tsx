import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';

const banks = [
  { name: 'Banque Atlantique', logo: require('../../../assets/images/banks/baci.png') },
  { name: 'BNI', logo: require('../../../assets/images/banks/bni.png') },
  { name: 'Ecobank', logo: require('../../../assets/images/banks/ecobank.png') },
  { name: 'NSIA Banque', logo: require('../../../assets/images/banks/nsia.jpg') },
  { name: 'Société Générale', logo: require('../../../assets/images/banks/societegenerale.png') },
];

export default function SelectBank() {
  const router = useRouter();

  const handleBankSelect = (bankName: string) => {
    router.push({
      pathname: '/dashboard/recharger/instruction',
      params: { bank: bankName },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header @*/}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="#19203D" onPress={() => router.back()} />
        <TitleGlobal style={styles.headerTitle}>Recharger mon compte</TitleGlobal>
      </View>

      {/* Step Info */}
      <View style={styles.stepContainer}>
        <TextGlobal style={styles.stepNumber}>1</TextGlobal>
        <View>
          <TextGlobal style={styles.stepTitle}>Choisir la banque</TextGlobal>
          <TextGlobal style={styles.stepSubtitle}>Sélectionner une banque pour le versement</TextGlobal>
        </View>
      </View>

      {/* Grid des banques */}
      <View style={styles.grid}>
        {banks.map((bank, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleBankSelect(bank.name)}>
            <Image source={bank.logo} style={styles.logo} resizeMode="contain" />
            <TextGlobal style={styles.bankName}>{bank.name}</TextGlobal>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    textAlign: 'center',
    marginRight: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
  },
  stepNumber: {
    backgroundColor: '#19203D',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#19203D',
  },
  stepSubtitle: {
    fontSize: 14,
    // color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
    boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 10,
  },
  bankName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#19203D',
  },
});