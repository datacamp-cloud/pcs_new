// components/SuccessConfirmationModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Image } from 'react-native';
import ButtonGlobal from '@/components/ButtonGlobal';
import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: () => void;
}

export default function SuccessConfirmationModal({ visible, onClose, onDone }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('@/assets/images/2-Sign_up/succes.png')} // à remplacer par ton image de confirmation
            style={{ width: 80, height: 80, marginBottom: 15 }}
            resizeMode="contain"
          />
          <TitleGlobal style={{ marginBottom: 10 }}>Demande envoyée</TitleGlobal>
          <TextGlobal style={{ textAlign: 'center', marginBottom: 20 }}>
            Votre demande de rechargement a été soumise avec succès. Elle sera traitée dans les plus brefs délais.
          </TextGlobal>

          <ButtonGlobal
            label="Terminer"
            onPress={onDone}
            variant="primary"
            disabled={false}
            style={{ width: '100%' }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    alignItems: 'center',
  },
});
