import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';
import InputGlobal from '@/components/InputGlobal';

import { bankReferences } from '@/hooks/bankData';

export default function BankInstructions() {
  const router = useRouter();
  const { bank } = useLocalSearchParams();

  const bankName = Array.isArray(bank) ? bank[0] : bank;
  const data = bankReferences[bankName || ''];

  if (!data) return <TextGlobal>Aucune information disponible pour cette banque.</TextGlobal>;

  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Ionicons name="chevron-back" size={26} color="#19203D" onPress={() => router.back()} />
            <TitleGlobal style={styles.headerTitle}>Recharger mon compte</TitleGlobal>
        </View> 
        <View style={styles.stepContainer}>
            <TextGlobal style={styles.stepNumber}>2</TextGlobal>
            <View>
                <TextGlobal style={styles.stepTitle}>Versement d&apos;espèces</TextGlobal>
                <TextGlobal style={styles.stepSubtitle}>Utilisez ces références pour votre versement</TextGlobal>
            </View>     
        </View>
        
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {data?.logo && (
            <Image
                source={data.logo}
                style={{ width: 180, height: 100, resizeMode: 'contain' }}
            />
        )}
      </View>

      <View style={styles.box}>
        <TextGlobal style={styles.label}>Nom du compte</TextGlobal>
        <InputGlobal style={styles.value}>{data.accountName}</InputGlobal>

        <View style={styles.row}>
          <View style={styles.smallBox}>
            <TextGlobal style={styles.label}>Code banque</TextGlobal>
            <InputGlobal style={styles.value}>{data.codeBanque}</InputGlobal>
          </View>
          <View style={styles.smallBox}>
            <TextGlobal style={styles.label}>Code guichet</TextGlobal>
            <InputGlobal style={styles.value}>{data.codeGuichet}</InputGlobal>
          </View>
        </View>

        <TextGlobal style={styles.label}>N° de compte</TextGlobal>
        <InputGlobal style={styles.value}>{data.numeroCompte}</InputGlobal>

        <TextGlobal style={styles.label}>Clé RIB</TextGlobal>
        <InputGlobal style={styles.value}>{data.cleRib}</InputGlobal>
      </View>

      <ButtonGlobal
        label="Continuer"
        variant="primary"
        disabled={false}
        onPress={() => router.push({ pathname: '/dashboard/recharger/amount', params: { bank: bankName } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
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
  title: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  instruction: {
    marginBottom: 20,
    fontSize: 14,
    color: '#555',
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#19203D',
  },
  box: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#19203D',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 10,
  },
  smallBox: {
    flex: 1,
  },
});
