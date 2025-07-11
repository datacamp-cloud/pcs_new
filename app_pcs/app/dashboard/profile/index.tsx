import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TitleGlobal from '@/components/TitleGlobal';
import TextGlobal from '@/components/textGlobal';
import { BASE_URL } from '@/constant';
import useUser from '@/hooks/useUser';


export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#E93F69" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loading}>
        <TextGlobal>Impossible de charger les informations utilisateur.</TextGlobal>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#19203D" />
        </TouchableOpacity>
        <TitleGlobal style={styles.title}>
            Mes informations{'\n'}
          <TitleGlobal style={styles.titleBold}>Personnelles</TitleGlobal>
        </TitleGlobal>
        <View style={{ width: 24 }} />
      </View>

      {/* Photo + nom */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.image || 'https://randomuser.me/api/portraits/men/91.jpg' }}
          style={styles.avatar}
        />
        <TextGlobal bold={true} style={styles.name}>
          {user.firstName} {user.lastName}
        </TextGlobal>
        <View style={styles.badge}>
          <TextGlobal style={styles.badgeText}>{user.status || 'Freemium'}</TextGlobal>
        </View>
      </View>

      {/* Informations */}
      <InfoItem icon="call-outline" label="Téléphone" value={user.phone} />
      <InfoItem icon="mail-outline" label="Email" value={user.email} />
      <InfoItem 
        icon="calendar-outline" 
        label="Date de naissance" 
        value={
          user.birthday 
            ? new Date(user.birthday).toLocaleDateString('fr-FR') 
            : 'Non renseignée'
        } />
      <InfoItem icon="male-female-outline" label="Genre" value={user.gender || 'Non renseigné'} />
      <InfoItem icon="location-outline" label="Lieu d'habitation" value={user.address?.toUpperCase() || 'Non précisé'} />
    </ScrollView>
  );
}

const InfoItem = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <>
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color="#19203D" style={styles.icon} />
      <View>
        <TextGlobal style={styles.label}>{label}</TextGlobal>
        <TextGlobal bold={true} style={styles.value}>{value}</TextGlobal>
      </View>
    </View>
    <View style={styles.separator} />
  </>
);

const code = '#041145';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    color: code,
  },
  titleBold: {
    color: code,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: code,
    marginBottom: 6,
  },
  badge: {
    borderWidth: 1,
    borderColor: code,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: code,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  icon: {
    marginTop: 3,
  },
  label: {
    color: code,
    fontSize: 13,
  },
  value: {
    fontSize: 14,
    color: code,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
});
