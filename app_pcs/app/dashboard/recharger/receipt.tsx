import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';

import RecapModal from '@/components/modals/RecapModal';
import SuccessModal from '@/components/modals/SuccessModal';

import { bankReferences } from '@/hooks/bankData';

export default function ReceiptUpload() {
  const router = useRouter();
  const { bank, amount } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const bankName = Array.isArray(bank) ? bank[0] : bank;
  const data = bankReferences[bankName || ''];

  const handleImagePick = async (source: 'camera' | 'library') => {
    const permission = source === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission refusée');
      return;
    }

    const result = await (source === 'camera'
      ? ImagePicker.launchCameraAsync()
      : ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        }));

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }

    setModalVisible(false);
  };

  const handleRecapConfirm = () => {
    setShowRecapModal(false);
    setShowSuccessModal(true);
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.push('/dashboard/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons name="chevron-back" size={26} color="#19203D" onPress={() => router.back()} />
        <TitleGlobal>Recharger mon compte</TitleGlobal>
      </View>

      {/* Étape */}
      <View style={styles.stepContainer}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>4</Text>
        </View>
        <View>
          <TextGlobal bold={true}>Votre bordereau</TextGlobal>
        </View>
      </View>

      {/* Boîte d'upload */}
      <View style={styles.uploadBox}>
        <TextGlobal bold={true}>Joindre le bordereau</TextGlobal>
        <TextGlobal style={styles.hint}>2 Mo max. format .jpg .png .pdf</TextGlobal>

        <TouchableOpacity style={styles.uploadArea} onPress={() => setModalVisible(true)}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          ) : (
            <TextGlobal style={styles.uploadText}>Joindre</TextGlobal>
          )}
        </TouchableOpacity>
      </View>

      <ButtonGlobal
        label="Continuer"
        onPress={() => setShowRecapModal(true)}
        disabled={!selectedImage}
        style={{ marginTop: 20 }}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImagePick('library')}
            >
              <Ionicons name="image-outline" size={24} />
              <TextGlobal>Insérer une photo</TextGlobal>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImagePick('camera')}
            >
              <Ionicons name="camera-outline" size={24} />
              <TextGlobal>Prendre une photo</TextGlobal>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <TextGlobal style={{ color: '#E93F69' }}>Annuler</TextGlobal>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Recap Modal */}
      <RecapModal
        visible={showRecapModal}
        onClose={() => setShowRecapModal(false)}
        onContinue={handleRecapConfirm}
        bank={String(data)}
        logo={data['logo'] || require('@/assets/images/logo_square_512.png')}
        type='bank'
        amount={Array.isArray(amount) ? amount[0] : amount}
        fees={0}
        // NetAmount={amount - fees}
      />

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        onDone={handleFinish}
        onClose={() => setShowSuccessModal(false)}       
      />
    </ScrollView>
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
    marginBottom: 50,
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
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 50,
    borderRadius: 12,
    alignItems: 'center',
  },
  hint: {
    fontSize: 13,
    color: '#999',
    marginBottom: 10,
  },
  uploadArea: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#E93F69',
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  modalText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    justifyContent: 'center',
  },
});
