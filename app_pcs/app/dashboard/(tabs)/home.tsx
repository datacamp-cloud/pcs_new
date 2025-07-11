import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, ScrollView, Image, Pressable, Animated} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import  BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import useUser from '@/hooks/useUser';

import TextGlobal from '@/components/textGlobal';
import TitleGlobal from '@/components/TitleGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const size = 25;
  const [scrollingValue] = useState(new Animated.Value(0));
  const [showBalance, setShowBalance] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '50%'], []);
  const [showKycPrompt, setShowKycPrompt] = useState(false);

  const actions = [
  { 
    image: require('../../../assets/images/Dashboard/envoyer.png'), 
    label: "Envoyer de l'argent",
    onPress: () => {
      router.push('/dashboard/transfert');
    }
  },
  { 
    image: require('../../../assets/images/Dashboard/Retrait.png'), 
    label: "Retirer de l'argent",
    onPress: () => {
      router.push('/dashboard/transfert');
    }
  },
  { 
    image: require('../../../assets/images/Dashboard/Facture.png'), 
    label: "Payer ma facture",
    onPress: () => {
      router.push('/dashboard/transfert');
    }
  },
  { 
    image: require('../../../assets/images/Dashboard/Airtime.png'), 
    label: "Acheter du crédit",
    onPress: () => {
      router.push('/dashboard/transfert');
    }
  },
];

  useEffect(() => {
    const checkKyc = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.isIdentityVerified) {
          setShowKycPrompt(true);
        }
      }
    };
    checkKyc();
  }, []);

  const { user, loading } = useUser();

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollingValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [scrollingValue]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={['#E93F69', '#EA534D', '#EE7528']}
            style={styles.gradientHeader}
          >
            <View style={styles.header}>
              <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" size={28} color="#fff" />
              </Pressable>
              <Image
                source={require('../../../assets/images/logo_square_512.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Ionicons name="notifications" size={size} color="#fff" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -40 }}>
              <TextGlobal bold={false} style={{ color: "white", marginLeft: 20, fontSize: 16 }}>
                Bonjour, {user?.firstName || 'Utilisateur'}
              </TextGlobal>
              <TouchableOpacity style={styles.freemiumBadge}>
                <TextGlobal style={styles.freemiumText}>
                  {user?.status || 'Freemium'}
                </TextGlobal>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Balance Section */}
          <View style={styles.balanceContainer}>
            <View style={styles.balanceBox}>
              <View>
                <TextGlobal bold={true} style={styles.balanceLabel}>Mon solde</TextGlobal>
                <View style={styles.amountContainer}>
                  <TextGlobal style={styles.hiddenBalance}>
                    {showBalance ? user?.solde : '*****'}
                  </TextGlobal>
                  <TextGlobal style={styles.fcfaText}> F CFA</TextGlobal>
                  <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                    <Ionicons
                      name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                      size={16}
                      color="#0A0A0A"
                      style={{ marginLeft: 8 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.plusButton} onPress={() => router.push('/dashboard/recharger/rech')}>
                <Ionicons name="add" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Actions */}
          <View style={styles.mainButtonsContainer}>
            {actions.map((item, index) => (
              <View key={index} style={styles.mainButtonWrapper}>
                <TouchableOpacity style={styles.mainButton} onPress={item.onPress}>
                  <Image source={item.image} style={styles.iconImage} resizeMode="contain" />
                </TouchableOpacity>
                <TextGlobal style={styles.mainButtonText}>{item.label}</TextGlobal>
              </View>
            ))}
          </View>

          {/* Banner */}
          <View style={styles.banner}>
            <TextGlobal style={styles.bannerText}>
              Devenez membre <TextGlobal style={{ fontWeight: 'bold' }}>PREMIUM</TextGlobal>
            </TextGlobal>
            <TouchableOpacity style={styles.bannerButton}>
              <TextGlobal style={styles.bannerButtonText}>C&apos;EST PARTI !</TextGlobal>
            </TouchableOpacity>
          </View>

          {/* Latest Operations */}
          <View style={styles.operationsContainer}>
            <TitleGlobal style={styles.operationsTitle}>Dernières opérations</TitleGlobal>
            <TouchableOpacity onPress={() => router.push('./history')}>
              <TextGlobal style={styles.viewMore}>Voir plus</TextGlobal>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* BottomSheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          handleIndicatorStyle={{ backgroundColor: '#ccc' }}
        >
          <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
            <TitleGlobal>Ajouter une carte ?</TitleGlobal>

            <TouchableOpacity style={styles.modalItem}>
              <View style={styles.modalRow}>
                <TextGlobal style={styles.modalText}>Votre carte actuelle ?</TextGlobal>
                <Ionicons name="information-circle-outline" size={18} color="#19203D" />
              </View>
              <Ionicons name="chevron-forward" size={20} color="#19203D" />
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity style={styles.modalItem}>
              <View style={styles.modalRow}>
                <TextGlobal style={styles.modalText}>Acheter une carte ?</TextGlobal>
                <Ionicons name="information-circle-outline" size={18} color="#19203D" />
              </View>
              <Ionicons name="chevron-forward" size={20} color="#19203D" />
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientHeader: {
    paddingBottom: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 200,
  },
  freemiumBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    marginLeft: 130,
    marginTop:-10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
  },
  freemiumText: {
    fontWeight: 'bold',
    color: '#E93F69',
  },
  balanceContainer: {
    marginTop: -50,
    paddingHorizontal: 20,
  },
  balanceBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#999',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  hiddenBalance: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  fcfaText: {
    marginLeft: 6,
    fontSize: 16,
    // fontWeight: '600',
  },
  plusButton: {
    backgroundColor: '#E93F69',
    height: 100,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // bouttons actions rapides et principales
  mainButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  mainButtonWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  mainButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  mainButtonText: {
    fontSize: 11,
    textAlign: 'center',
   
  },
  iconImage: {
    width: 24,
    height: 24,
  },

  //
  banner: {
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    backgroundColor: '#007bff11',
    borderRadius: 15,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  operationsContainer: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  operationsTitle: {
    fontSize: 20,
  },
  viewMore: {
    fontSize: 13,
    fontWeight: 'bold',
    // borderColor: 'black',
    // borderRadius: 15,
  },
  footer: {
    padding: 20,
  },

// modal styles "ajouter une carte"
bottomSheetContent: {
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 40,
  borderRadius: 100,
  // borderColor: '#E6E9F0',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#19203D',
  marginBottom: 25,
},
modalItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 15,
},
modalRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
modalText: {
  fontSize: 15,
  color: '#19203D',
  fontWeight: '500',
},
modalDivider: {
  height: 1,
  backgroundColor: '#E6E9F0',
  marginVertical: 2,
},

// popup kyc
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#19203D',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  later: {
    color: '#E93F69',
    marginTop: 15,
    fontWeight: '600',
  },
});

