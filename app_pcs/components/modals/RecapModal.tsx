// components/modals/OperationRecapModal.tsx
import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import TextGlobal from '../textGlobal';
import ButtonGlobal from '../ButtonGlobal';

interface Props {
  visible: boolean;
  onClose: () => void;
  onContinue: () => void;
  type: 'bank' | 'mobile_money';
  bank: string;
  logo: any;
  amount: string;
  fees?: number;
  NetAmount?: number;
}

const recapTexts = {
  bank: {
    title: "Récapitulatif de l'opération",
    description: "Vous avez initié le rechargement de votre compte PCS Xpress via versement d'espèces",
  },
  mobile_money: {
    title: "Récapitulatif de l'opération",
    description: "Vous avez initié le rechargement de votre compte PCS Xpress via mobile money",
  },
};

export default function RecapModal({
  visible,
  onClose,
  onContinue,
  type = 'bank',
  bank,
  logo,
  amount,
  fees = 0,
  NetAmount,
}: Props) {
  const text = recapTexts[type];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TextGlobal style={styles.title}>{text.title}</TextGlobal>
          <TextGlobal style={styles.subtitle}>{text.description}</TextGlobal>

          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <View style={styles.details}>
            <TextGlobal>Versement : <TextGlobal bold>{amount} F CFA</TextGlobal></TextGlobal>
            <TextGlobal>Frais : <TextGlobal bold>{fees} F CFA</TextGlobal></TextGlobal>
            <TextGlobal style={styles.total}>Montant à recharger : <TextGlobal bold>{NetAmount} F CFA</TextGlobal></TextGlobal>
          </View>

          <ButtonGlobal 
            label="Continuer" 
            onPress={onContinue} 
            style={{ marginTop: 15 }} 
            disabled={false} 
          />
          <ButtonGlobal 
            label="Annuler" 
            onPress={onClose} 
            variant="secondary" 
            style={{ marginTop: 10 }} 
            disabled={false} 
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 60,
    marginBottom: 20,
  },
  details: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  total: {
    color: '#E93F69',
  },
});
