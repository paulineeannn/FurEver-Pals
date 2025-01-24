import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const BottomNavigationBar = ({ navigation, route }) => {
  const { username } = route.params;

  const handleNavigate = (routeName) => {
    navigation.navigate(routeName, { username });
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#A38277', paddingVertical: 15, paddingBottom: 20}}>
      
      <TouchableOpacity
        onPress={() => handleNavigate('Dashboard')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Dashboard' ? 1 : 0.5, 1 : 0.5
        }}
      >
        <Image source={require('../assets/icon_dashboard.png')} style={{ tintColor: '#FFFFFF' }} />
        {/* <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Dashboard</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigate('Community')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Community' ? 1 : 0.5, 1 : 0.5
        }}
      >
        <Image source={require('../assets/icon_forum.png')} style={{ tintColor: '#FFFFFF' }} />
        {/* <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Community</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigate('Profile')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Profile' || route.name === 'ProfilePaws' ? 1 : 0.5, 1 : 0.5,
        }}
      >
        <Image source={require('../assets/icon_profile.png')} style={{ tintColor: '#FFFFFF' }} />
        {/* <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;

