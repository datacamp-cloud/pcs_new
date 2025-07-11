import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';

export default function RechargeMain() {
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
        <TextGlobal style={styles.label}>PCS XPRESS </TextGlobal>
        <TextGlobal style={styles.badge}>Gratuit</TextGlobal>        
        <Ionicons style={{justifyContent: 'flex-end', }} name="chevron-forward" size={26} color="#fff" onPress={() => { router.back()}} />
      </TouchableOpacity>

      <TextGlobal style={[styles.subtitle, { marginTop: 20 }]}>Mobile money</TextGlobal>
      {[
        { name: 'ORANGE MONEY', color: '#000', logo: require('@/assets/images/Payments/orange.png') },
        { name: 'WAVE', color: '#00BFFF', logo: require('@/assets/images/Payments/wave.png') },
        { name: 'MOOV MONEY', color: '#0077CC', logo: require('@/assets/images/Payments/moov_money.png') },
        { name: 'MTN MONEY', color: '#FFCC00', logo: require('@/assets/images/Payments/mtn_money.png') },
      ].map((item, index) => (
        <TouchableOpacity key={index} style={[styles.option, { backgroundColor: item.color }]}
          onPress={() =>
            router.push({
              pathname: '/dashboard/recharger/mobile_money/mobile-amount',
              params: {
                operator: item.name,
                logo: Image.resolveAssetSource(item.logo).uri, // pour transmettre l'image
              },
            })
          }
        >
          <Image source={item.logo} style={styles.logo} />
          <TextGlobal style={[styles.label, { color: '#fff' }]}>{item.name}</TextGlobal>
          <TextGlobal style={[styles.badge, { backgroundColor: '#fff', color: '#89C8AA' }]}>1.5 %</TextGlobal>
          <Ionicons style={{justifyContent: 'flex-start', marginRight: 10}} name="chevron-forward" size={26} color="#fff" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flex:1,
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
