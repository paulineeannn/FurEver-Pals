import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ProfileInfo from './screens/ProfileInfo';
import EditProfile from './screens/EditProfile';
import ProfilePaws from './screens/ProfilePaws';
import AddPaws from './screens/AddPaws';
import Dashboard from './screens/Dashboard';
import ViewAdopt from './screens/ViewAdopt';
import Community from './screens/Community';
import AddAdopt from './screens/AddAdopt';
import AdoptionForm from './screens/AdoptionForm';
import BottomNavigationBar from './screens/BottomNavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ProfilePaws" component={ProfilePaws} />
        <Stack.Screen name="AddPaws" component={AddPaws} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ViewAdopt" component={ViewAdopt} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="AddAdopt" component={AddAdopt} />
        <Stack.Screen name="AdoptionForm" component={AdoptionForm} />
        <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
