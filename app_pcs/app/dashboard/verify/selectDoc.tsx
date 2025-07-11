import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';

const documents = [
  { 
    label: 'Carte nationale d\'identité', 
    value: 'cni', 
    icon: require('../../../assets/images/cards/cni.png') 
  },
  { 
    label: 'Passeport', 
    value: 'passeport', 
    icon: require('../../../assets/images/cards/passport.png') 
  },
  { 
    label: 'Permis de conduire', 
    value: 'permis', 
    icon: require('../../../assets/images/cards/permis_de_conduire.png') 
  },
  { 
    label: 'Titre de séjour', 
    value: 'sejour', 
    icon: require('../../../assets/images/cards/titre_de_sejour.png') 
  },
];

export default function SelectDocument() {
  const router = useRouter();

  const handleSelect = (type: string) => {
    router.push(`/dashboard/verify/idScan?type=${type}`);
    console.log(`Document sélectionné : ${type}`);
  };

  return (
    <View style={styles.container}> 
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#19203D" />
          </TouchableOpacity>
          <TitleGlobal style={styles.title}>Quel document souhaitez-vous utiliser ?</TitleGlobal>
      </View>
      

      {documents.map((doc, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handleSelect(doc.value)}>
          <Image source={doc.icon} style={styles.icon} resizeMode="contain" />
          <TextGlobal style={styles.label}>{doc.label}</TextGlobal>
        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E9F0',
    backgroundColor: '#F9FAFC',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    color: '#19203D',
  },
});
