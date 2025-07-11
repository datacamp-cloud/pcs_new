import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: "Comment créer un compte PCS XPRESS ?",
    answer: "Téléchargez l'application, puis suivez les étapes d'inscription avec votre numéro de téléphone.",
  },
  {
    question: "Comment recharger mon compte ?",
    answer: "Cliquez sur 'Recharger', sélectionnez l'opérateur mobile et suivez les instructions.",
  },
  {
    question: "Que faire en cas de transaction échouée ?",
    answer: "Contactez le support avec les détails de la transaction pour assistance.",
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#19203D" />
        </TouchableOpacity>
        <TitleGlobal style={styles.headerTitle}>Aide et assistance</TitleGlobal>
        <View style={{ width: 24 }} />
      </View>

      {/* Contact rapide */}
      <View style={styles.contactBox}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#E93F69" />
        <TextGlobal style={styles.contactText}>Besoin d’aide ? Contactez-nous au support@pcsxpress.ci</TextGlobal>
      </View>

      {/* FAQ */}
      <TitleGlobal style={styles.faqTitle}>Foire aux questions</TitleGlobal>
      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleFaq(index)} style={styles.faqQuestionRow}>
            <TextGlobal style={styles.faqQuestion} bold={true} >{item.question}</TextGlobal>
            <Ionicons
              name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#19203D"
            />
          </TouchableOpacity>
          {activeIndex === index && <TextGlobal style={styles.faqAnswer}>{item.answer}</TextGlobal>}
        </View>
      ))}

      {/* Contact button */}
      <TouchableOpacity style={styles.contactButton}>
        <TextGlobal style={styles.contactButtonText}>Contacter le support</TextGlobal>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#19203D',
  },
  contactBox: {
    backgroundColor: '#FDECEC',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  contactText: {
    flex: 1,
    color: '#19203D',
    fontSize: 14,
  },
  faqTitle: {
    fontSize: 20,
    color: '#19203D',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  faqItem: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    color: '#19203D',
    flex: 1,
    fontSize: 14,
  },
  faqAnswer: {
    marginTop: 8,
    color: '#444',
    fontSize: 13,
    lineHeight: 18,
  },
  contactButton: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#E93F69',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
