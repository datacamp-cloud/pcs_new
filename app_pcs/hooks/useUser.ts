import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '@/constant'


export default function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const token = await AsyncStorage.getItem('token');
          if (!token) return;

          const res = await axios.get(`${BASE_URL}/api/users/user-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res.data);
          await AsyncStorage.setItem('user', JSON.stringify(res.data));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Erreur chargement user:', error.response?.data || error.message);
        } else if (error instanceof Error) {
          console.error('Erreur chargement user:', error.message);
        } else {
          console.error('Erreur chargement user:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
