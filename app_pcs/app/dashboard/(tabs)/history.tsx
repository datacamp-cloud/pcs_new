import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const transactions = [
  {
    id: '1',
    title: 'Recharge Orange Money',
    description: 'Recharge de 100 FCFA sur le compte Orange Money +2250707115744',
    amount: -100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '2',
    title: "Envoie d'argent",
    description: 'Envoi de 100 FCFA à +2250707115744',
    amount: 100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '3',
    title: 'Recharge Wave Money',
    description: 'Recharge de 100 FCFA sur le compte Wave Money +2250707115744',
    amount: -100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '4',
    title: "Envoie d'argent",
    description: 'Envoi de 100 FCFA à +2250707115744',
    amount: 100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '5',
    title: 'Recharge Moon Money',
    description: 'Recharge de 100 FCFA sur le compte Moon Money +2250707115744',
    amount: -100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '6',
    title: "Envoie d'argent",
    description: 'Envoi de 100 FCFA à +2250707115744',
    amount: 100,
    date: '13-03-2025',
    time: '15:45',
  },
  {
    id: '7',
    title: 'Recharge Mtn Money',
    description: 'Recharge de 100 FCFA sur le compte Mtn Money +2250707115744',
    amount: -100,
    date: '13-03-2025',
    time: '15:45',
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#000" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Historique du compte</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color="#aaa" style={styles.searchIcon} />
          <TextInput
            placeholder="Cherchez une transaction"
            style={styles.searchInput}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionText}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDescription}>{item.description}</Text>
            </View>
            <View style={styles.transactionMeta}>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.amount > 0 ? '#00C88F' : '#F44336' },
                ]}
              >
                {item.amount > 0 ? '+' : ''}
                {item.amount} FCFA
              </Text>
              <Text style={styles.transactionDate}>{item.date}  {item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#19203D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E93F69',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  transactionText: {
    flex: 1,
    paddingRight: 10,
  },
  transactionTitle: {
    fontWeight: 'bold',
    color: '#19203D',
  },
  transactionDescription: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  transactionMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
});
