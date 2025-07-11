import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import ButtonGlobal from '@/components/ButtonGlobal';

// const { width, height } = Dimensions.get("window");
export default function accueil() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E93F69', '#EA534D', '#EE7528']} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/1-Intro/logo.png")} style={styles.logo}/>
        </View>      
        <View style={styles.cardContainer}>
          <Image source={require("../../assets/images/1-Intro/card.png")} style={styles.card}/>
        </View>
        <View style={styles.picto}>
          <Image source={require("../../assets/images/1-Intro/LeftMan.png")} style={[styles.character, styles.leftMan]}/>
          <Image source={require("../../assets/images/1-Intro/MiddleGirl.png")} style={[styles.character, styles.middleGirl]}/>
          <Image source={require("../../assets/images/1-Intro/RightMan.png")} style={[styles.character, styles.rightMan]}/>
        </View>
        <View style={styles.leftCloud}>
          <Image source={require("../../assets/images/1-Intro/LeftCloud.png")} style= {styles.piCloud}/>
        </View>
        <View style={styles.whiteBg}>
          <Image source={require("../../assets/images/1-Intro/back_white.png")} style= {{ width: '100%' }}/>
        </View>
        <View style={styles.button}>
          <ButtonGlobal
            disabled={false}
            style={styles.buttonPrimary}
            onPress={() => router.push("../(auth)/register/phone")}
            variant='primary'
            label='Créer un compte'
          />
          <ButtonGlobal
            // textStyle={styles.buttonTextSecondary}
            style={styles.buttonSecondary}
            onPress={() => router.push("../(auth)/login/login")}
            disabled={false}
            variant='secondary'
            label='Se connecter'
          />
        </View>
      </LinearGradient>
      <View style={
        { 
          zIndex: 10, 
          marginBottom: 20, 
          alignItems: "center", 
          justifyContent: "center"
        }}>
          <Ionicons name="chevron-up-outline" size={24} color="#2B2532"/>
        <TouchableOpacity
        onPress={() => router.push("../(auth)/help")}
        >
            <TextGlobal bold={false} style={{color: "#E93F69", textAlign: "center", fontSize: 16}}>Aide et assistance</TextGlobal> 
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 100,
    width: 200,
    height: 30,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  cardContainer: {
    marginTop: 25,
  },
  card: {
    marginTop: 50,
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  picto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "fixed"
  },
  
  whiteBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '120%',
    height: 430, // ajuste selon la taille de ton image
    zIndex: 1,
    transform: [{ rotate: '9deg' }] ,
  },

  character: {
    resizeMode: "contain",
    width: 110,
    height: 250,
    marginHorizontal: -20,
    marginVertical: -30
  },

  leftMan: {
    width: 145,
    height: 250,
    marginTop: 10,
    left: 10
  },
  middleGirl: {
    marginTop: 100,
    left: -18,
  },
  rightMan: {
    marginTop: 50,
    left: -10,
  },

  leftCloud: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: 60,
    marginBottom: 175,
    left: -200,
  },
  rightCloud: {
    
  },
  piCloud: {
    resizeMode: "contain",
    height: 25
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  buttonPrimary: { 
    borderRadius: 50, 
    backgroundColor: "#E93F69", 
    zIndex: 10, 
    padding: 15, 
    width: 300,
    margin: 10
  },
  buttonTextPrimary: {
    color: "white", 
    textAlign: "center", 
    fontSize: 18
  },
  buttonSecondary: { 
    borderRadius: 50, 
    backgroundColor: "transparent", 
    zIndex: 10, 
    padding: 15, 
    width: 300, 
    borderWidth: 1.5, 
    borderColor: "#E93F69",
  },
  buttonTextSecondary: {
    color: "#E93F69",  
    textAlign: "center", 
    fontSize: 18, 
  }
})