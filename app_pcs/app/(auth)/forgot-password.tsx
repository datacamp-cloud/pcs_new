import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ForgotPassword</Text>
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
        color: "blue",
    }
});