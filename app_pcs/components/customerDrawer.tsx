import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUser from '@/hooks/useUser'; // ⬅️ ton hook personnalisé

export default function CustomDrawerContent() {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      router.replace('/onboard/accueil');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    const { firstName = '', lastName = '' } = user;
    return (firstName[0] || '') + (lastName[0] || '');
  };

  const MenuItem = ({
    label,
    icon,
    endIcon,
    badge,
    onPress,
  }: {
    label: string;
    icon: JSX.Element;
    endIcon?: JSX.Element;
    badge?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.iconCircle}>{icon}</View>
        <Text style={styles.menuText}>{label}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {endIcon && endIcon}
    </TouchableOpacity>
  );

  const color = '#19203D';
  const iconSize = 18;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials().toUpperCase()}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.phone}>{user?.phone}</Text>
        </View>
        <View style={styles.freemiumBadge}>
          <Text style={styles.freemiumText}>
            {user?.status || 'Freemium'}
          </Text>
        </View>
      </View>

      {/* Menu */}
      <ScrollView style={styles.menuSection}>
        <MenuItem
          label="Vérifier mon compte"
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={iconSize}
              color={color}
            />
          }
          badge="non vérifié"
          onPress={() => router.push('/dashboard/verify/info')}
        />
        <MenuItem
          label="Informations personnelles"
          icon={
            <Ionicons
              name="phone-portrait-outline"
              size={iconSize}
              color={color}
            />
          }
          onPress={() => router.push('/dashboard/profile')}
        />
        <MenuItem
          label="Chercher un point de vente"
          icon={
            <Ionicons name="storefront-outline" size={iconSize} color={color} />
          }
          onPress={() => router.push('/dashboard/locations')}
        />
        <MenuItem
          label="Paramètres"
          icon={
            <Ionicons name="settings-outline" size={iconSize} color={color} />
          }
          endIcon={
            <Ionicons
              name="chevron-forward"
              size={iconSize}
              color={color}
            />
          }
        />
        <MenuItem
          label="Tarifs"
          icon={
            <Ionicons name="pricetag-outline" size={iconSize} color={color} />
          }
        />
        <MenuItem
          label="Aide et assistance"
          icon={
            <Ionicons name="headset-outline" size={iconSize} color={color} />
          }
          onPress={() => router.push('/dashboard/help')}
        />
        <MenuItem
          label="À propos de nous"
          icon={
            <Ionicons
              name="information-circle-outline"
              size={iconSize}
              color={color}
            />
          }
          endIcon={
            <Ionicons
              name="chevron-forward"
              size={iconSize}
              color={color}
            />
          }
        />
      </ScrollView>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#19203D',
    borderRadius: 50,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#19203D',
  },
  phone: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  freemiumBadge: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  freemiumText: {
    color: '#E93F69',
    fontWeight: 'bold',
    fontSize: 12,
  },
  menuSection: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#19203D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#19203D',
  },
  badge: {
    marginLeft: 8,
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#E93F69',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
