import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import ButtonGlobal from '@/components/ButtonGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';

import RecapModal from '@/components/modals/RecapModal';
import { bankReferences } from '@/hooks/bankData';

import useUser from '@/hooks/useUser';

export default function MobileAmountStep() {
  const router = useRouter();
  const { operator, logo } = useLocalSearchParams();
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user, loading } = useUser();

  const [amount, setAmount] = useState('');
  const frais = Math.round((parseInt(amount || '0') * 1.5) / 100);
  const montantNet = parseInt(amount || '0') - frais;

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const handleRecapConfirm = () => {
    setShowRecapModal(false);
    setShowSuccessModal(true);
    router.push('/dashboard/recharger/mobile_money/mobile-amount');
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.push('/dashboard/home');
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#19203D"
            onPress={() => router.back()}
          />
          <TitleGlobal>Recharger mon compte</TitleGlobal>
        </View>

        {/* Opérateur */}
        <View style={styles.card}>
          <TextGlobal style={styles.sectionTitle}>Opérateur sélectionné</TextGlobal>
          <View style={styles.operatorRow}>
            <Image source={{ uri: Array.isArray(logo) ? logo[0] : logo || '' }} style={styles.logo} resizeMode="contain" />
            <TextGlobal style={styles.operatorName}>{operator}</TextGlobal>
          </View>

          {/* Compte à créditer */}
          <View style={styles.accountRow}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/91.jpg' }}
              style={styles.avatar}
            />
            <View>
              <TextGlobal bold>{user?.firstName} {user?.lastName}</TextGlobal>
              <TextGlobal style={{ color: '#00c78c' }}>{user?.solde}</TextGlobal>
            </View>
          </View>

          {/* Montant */}
          <View style={styles.amountInputWrapper}>
            <TextInput
              ref={inputRef}
              placeholder="0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.amountInput}
            />
            <TextGlobal style={styles.currencyText}>F CFA</TextGlobal>
          </View>
        </View>

        <ButtonGlobal
          label="Suivant"
          onPress={() => setShowRecapModal(true)}
          disabled={parseInt(amount) < 100}
          style={{ marginTop: 30 }}
        />

        {/* Recap Modal */}
        <RecapModal
            visible={showRecapModal}
            onClose={() => setShowRecapModal(false)}
            onContinue={handleRecapConfirm}
            type="mobile_money"
            bank={Array.isArray(operator) ? operator[0] : operator || ''}
            logo={{ uri: logo }}
            amount={amount}
            fees={frais}
            NetAmount={montantNet}
        />

        {/* Success Modal
        <RecapModal
          visible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onContinue={handleFinish}
          type="success"
          title="Opération réussie"
          description="Votre compte a été rechargé avec succès."
          icon="checkmark-circle"
        /> */}

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
    marginBottom: 30,
    gap: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  operatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  operatorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 40,
    paddingVertical: 10,
    marginTop: 10,
  },
  amountInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  currencyText: {
    marginRight: 20,
    fontSize: 16,
  },
});
