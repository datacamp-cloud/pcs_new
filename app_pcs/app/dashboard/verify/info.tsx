import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

import ButtonGlobal from '@/components/ButtonGlobal'
import TextGlobal from '@/components/textGlobal'
import TitleGlobal from '@/components/TitleGlobal'

export default function Info() {
  const router = useRouter()
  const word = "Le processus de vérification d'identité nous permet de sécuriser l'application et de lutter contre les fraudes."

  return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TitleGlobal style={styles.title}>VérifieR mon compte</TitleGlobal>
          <Image
            source={require('../../../assets/images/2-Sign_up/verif.png')}
            style={styles.image}
            resizeMode="contain"
          />          
          <TextGlobal style={styles.description}>
            {word}
          </TextGlobal>
        </View>
        
        <View style={styles.bottomSection}>
          <ButtonGlobal
            label="Continuer"
            onPress={() => router.push('/dashboard/verify/selectDoc')}
            variant="primary"
            disabled={false}
          />
          <ButtonGlobal
            label="Annuler"
            onPress={() => router.back()}
            variant="secondary"
            style={{ marginTop: 20 }}
            disabled={false}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
    gap: 80,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
  },
  bottomSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
})
