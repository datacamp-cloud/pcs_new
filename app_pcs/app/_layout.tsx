// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import useCustomFonts from '../hooks/useCustomFonts';
import React from 'react';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync(); // Empêche le splash de se cacher tout seul

export default function LayoutApp() {
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Cache le splash une fois les polices chargées
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />


      {/* 👇 Ceci est crucial pour que les toasts s'affichent */}
      <Toast />
    </>
  );
}
