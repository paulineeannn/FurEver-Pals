import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
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
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
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
