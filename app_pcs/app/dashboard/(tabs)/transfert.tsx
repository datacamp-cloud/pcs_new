import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (

    <View style={styles.container}>
      <Text style={styles.text}>TRANSFERT</Text>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      textAlign: "center",
      color: 'blue'
    }
})