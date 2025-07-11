import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';

export default function RechargeHomeMain() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="#19203D" onPress={() => router.back()} />
        <TitleGlobal style={{ textAlign: 'center' }}>Recharger mon compte</TitleGlobal>
      </View>
      
      <TextGlobal style={styles.title}>Faire un dépôt via</TextGlobal>
      <TextGlobal style={styles.subtitle}>Versement d&apos;espèces</TextGlobal>

      <TouchableOpacity
        style={[styles.option, { backgroundColor: '#ea1b25' }]}
        onPress={() => router.push('/dashboard/recharger/steps')}
      >
        <Image source={require('@/assets/images/1-Intro/logo.png')} resizeMode='contain' style={styles.logo} />
        <TextGlobal style={styles.label}>Rechargement PCS </TextGlobal>
        <TextGlobal style={styles.badge}>Gratuit</TextGlobal>        
        <Ionicons style={{justifyContent: 'flex-end', }} name="chevron-forward" size={26} color="#fff" onPress={() => { router.back()}} />
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
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
  title: {
    marginBottom: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 19,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  logo: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 15,
    flex: 1,
    marginLeft: 13,
    color: '#fff',
  },
  badge: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#89c8aa',
    borderRadius: 20,
    color: '#fff',
  },
});
