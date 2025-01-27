/**
 * PROGRAM TITLE:
 *     Bottom Navigation Bar
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This component is provides quick navigation options between screens in the app.
 * 
 * DATE WRITTEN:
 *     May 12, 2024
 * 
 * DATE REVISED:
 *     July 5, 2024
 * 
 * PURPOSE:
 *     This component renders a bottom navigation bar with icons that allow users to navigate between the Dashboard, Community, and Profile screens.

 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The `username` is extracted from the route parameters and passed to the navigation methods to maintain the user's context.
 *     The navigation between screens is done using the `handleNavigate` function, which ensures the correct screen is displayed.
 *     Conditional rendering is used to adjust the opacity of the active screen’s icon, providing visual feedback.
 */

import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const BottomNavigationBar = ({ navigation, route }) => {
  // Extracting the username from route params
  const { username } = route.params;

  // Function to handle navigation between screens
  const handleNavigate = (routeName) => {
    navigation.navigate(routeName, { username });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#A38277',
        paddingVertical: 15,
        paddingBottom: 20
      }}
    >
      {/* Dashboard Button */}
      <TouchableOpacity
        onPress={() => handleNavigate('Dashboard')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Dashboard' ? 1 : 0.5
        }}
      >
        <Image source={require('../assets/icon_dashboard.png')} style={{ tintColor: '#FFFFFF' }} />
      </TouchableOpacity>

      {/* Community Button */}
      <TouchableOpacity
        onPress={() => handleNavigate('Community')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Community' ? 1 : 0.5
        }}
      >
        <Image source={require('../assets/icon_forum.png')} style={{ tintColor: '#FFFFFF' }} />
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => handleNavigate('Profile')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Profile' || route.name === 'ProfilePaws' ? 1 : 0.5
        }}
      >
        <Image source={require('../assets/icon_profile.png')} style={{ tintColor: '#FFFFFF' }} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;