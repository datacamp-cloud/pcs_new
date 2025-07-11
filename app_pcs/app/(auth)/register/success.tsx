/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

import TitleGlobal from '@/components/TitleGlobal'


export default function success() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
        router.replace('/onboard/accueil')
        }, 3000) // Redirection après 3 secondes

        return () => clearTimeout(timeout)
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/2-Sign_up/succes.png')} resizeMode='contain' style={{width: 200}}/>
            <TitleGlobal >
                Votre compte a été créé avec succès ! Vous allez être redirigé vers la page de connexion.
            </TitleGlobal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        color: '#041145',
    }
})