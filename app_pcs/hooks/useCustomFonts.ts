import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/MontserratAlternates-Bold.ttf'),
  });

  return fontsLoaded;
}
