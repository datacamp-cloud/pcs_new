import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ButtonGlobal from '@/components/ButtonGlobal';
import TextGlobal from '@/components/textGlobal';

import { bankReferences } from '@/hooks/bankData';
import TitleGlobal from '@/components/TitleGlobal';
import { Ionicons } from '@expo/vector-icons';

export default function AmountStep() {
  const router = useRouter();
  const { bank } = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const inputRef = useRef<TextInput>(null);

  const fraisTimbrage = 0;
  const fraisRecharge = 0;

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const parseAmount = (value: string) => {
    const raw = value.replace(/\D/g, '');
    return raw ? parseInt(raw) : 0;
  };

  const formatAmount = (value: string) => {
    const num = parseAmount(value);
    return num.toLocaleString('fr-FR').replace(/\s/g, '.');
  };

  const handleChange = (text: string) => {
    setAmount(formatAmount(text));
  };

  const numericAmount = parseAmount(amount);
  const rechargeAmount = Math.max(numericAmount - fraisTimbrage, 0);

  const handleContinue = () => {
    if (numericAmount >= 10000) {
      router.push({
        pathname: '/dashboard/recharger/receipt',
        params: { bank: bank as string, amount: numericAmount.toString() },
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="chevron-back" size={26} color="#19203D" onPress={() => router.back()} />
          <TitleGlobal>Recharger mon compte</TitleGlobal>
        </View>

        {/* Step */}
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View>
            <TextGlobal bold={true}>Saisir le montant</TextGlobal>
            <TextGlobal style={styles.stepSubtitle}>Minimum 10.000F CFA</TextGlobal>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Votre carte PCS sera rechargée après vérification de votre versement. Cela peut prendre
            jusqu&apos;à 72h jours ouvrés.
          </Text>
        </View>

        {/* Montant du versement */}
        <View style={styles.amountBox}>
          <TextGlobal style={styles.boxTitle}>Montant du versement</TextGlobal>
          <View style={styles.amountInputBox}>
            <TextInput
              ref={inputRef}
              placeholder="0.000"
              value={amount}
              onChangeText={handleChange}
              keyboardType="numeric"
              style={styles.inputAmount}
            />
            <TextGlobal >F CFA</TextGlobal>
          </View>
          <TextGlobal style={styles.subFees}>
            100 FCFA de frais de timbres seront déduits du montant versé
          </TextGlobal>
        </View>

        {/* Montant à recharger */}
        <View style={styles.amountBox}>
          <TextGlobal style={styles.boxTitle}>Montant à recharger</TextGlobal>
          <View style={styles.amountInputBox}>
            <TextGlobal bold={true} style={styles.inputAmount}>
              {rechargeAmount > 0 ? rechargeAmount.toLocaleString('fr-FR').replace(/\s/g, '.') : '0.000'}
            </TextGlobal>
            <TextGlobal>F CFA</TextGlobal>
          </View>
          <TextGlobal style={styles.feesLine}>Frais :- {fraisRecharge} FCFA</TextGlobal>
        </View>

        <ButtonGlobal
          label="Continuer"
          onPress={handleContinue}
          disabled={numericAmount < 10000}
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    gap: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    gap: 10,
    justifyContent: 'center',
  },
  stepCircle: {
    backgroundColor: '#19203D',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    color: '#19203D',
  },
  stepSubtitle: {
    fontSize: 13,
    color: '#777',
  },
  noticeBox: {
    backgroundColor: '#e6f0ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  noticeText: {
    color: '#19203D',
    fontSize: 13,
    textAlign: 'center',
  },
  amountBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  boxTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amountInputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 6,
  },
  inputAmount: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
  },

  subFees: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    marginTop: 10,
  },
  feesLine: {
    textAlign: 'center',
    fontSize: 13,
    color: '#00c78c',
    marginTop: 10,
  },
});