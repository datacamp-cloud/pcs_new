/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRouter, Link, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import {BASE_URL} from '@/constant'

import TextGlobal from '@/components/textGlobal'
import ButtonGlobal from '@/components/ButtonGlobal'
import InputGlobal from '@/components/InputGlobal'
import TitleGlobal from '@/components/TitleGlobal'

export default function identity() {

  const {phone} = useLocalSearchParams();
  const router = useRouter();
  const [borderColor, setBorderColor] = React.useState('#ccc'); // couleur par défaut
  const [error, setError] = React.useState('');

  const firstWord = "Pour utiliser pleinement les toutes les fonctionnaltés de votre compte PCS XPRESS, vous devez vérifier votre identité.";
  const secondWord = "Le processus de vérification d'identité nous permet de sécuriser l'application et de lutter contre les fraudes";


  const handlePass = async () => {
    try {
      const cleanPhone = phone?.toString().trim();
  
      const response = await axios.post(`${BASE_URL}/api/auth/pass-identity`, {
        phone: cleanPhone,
      });
  
      if (response.status === 200) {
        router.push(`/register/infoUser?phone=${cleanPhone}`);
      } else {
        setError(response.data.message);
      
      }
    } catch (error) {
      console.error("Erreur lors du passage d'identité :", error);
      setError("Erreur inattendue.");
      
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <TitleGlobal style={{textAlign: "center", justifyContent: "center"}}> Vérifier mon identité </TitleGlobal>
      </View>

      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Image source={require('../../../assets/images/2-Sign_up/Verif_Identite.png')}/>
      </View>
    
      <View style={styles.words}>
        <TextGlobal style={{textAlign: "center"}}> {firstWord} </TextGlobal>
        <TextGlobal style={{textAlign: "center"}}> {secondWord} </TextGlobal>
      </View>
      
      <ButtonGlobal disabled= {false}variant='primary' label='Valider' onPress={handlePass} style={{width: 300}}/>

      
      <Link href="../../dashboard/home" asChild>
        <TextGlobal bold={false} style={{ color: '#E27396', textDecorationLine: 'underline' }}>
          Faire cette étape plus tard
        </TextGlobal>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 20,
  },
  words : {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  }
})