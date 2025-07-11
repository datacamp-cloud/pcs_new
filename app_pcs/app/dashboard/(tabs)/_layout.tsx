import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
// import { Pressable } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

export default function TabsLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#E93F69',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recharge"
        options={{
          
          tabBarIcon: ({ color }) => (
            <Ionicons name="download-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfert"
        options={{
         
          tabBarIcon: ({ color }) => (
            <Ionicons name="swap-vertical-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
