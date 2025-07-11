// import { createDrawerNavigator} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../components/customerDrawer';
import { Alert } from 'react-native';
import React from 'react';

export default function DashboardLayout() {

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerTitle: 'Mon Compte',
      }}
    >
      <Drawer.Screen name="home" options={{ title: 'Accueil' }} />
      <Drawer.Screen name="history" options={{ title: 'Historique' }} />
      <Drawer.Screen name="transfert" options={{ title: 'Transfert' }} />
      <Drawer.Screen name="recharge" options={{ title: 'Recharge' }} />
      
    </Drawer>
  );
}
