// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { CommonActions } from '@react-navigation/native';
// import { Text, Image } from 'react-native';

// import ProfileInfo from './ProfileInfo';
// import Dashboard from './Dashboard';
// import Community from './Community';

// const Tab = createBottomTabNavigator();

// const BottomNavigationBar = ({ navigation, route }) => {
//   const { username } = route.params;

//   const handleNavigate = (routeName) => {
//     if (currentRoute !== routeName) {
//       setCurrentRoute(routeName);
//       navigation.navigate(routeName);
//     }
//   };
  
//   return (
//     <Tab.Navigator
//       initialRouteName={route.name}
//       screenOptions={({ route }) => ({
//         tabBarStyle: { backgroundColor: '#A38277' },
//         height: '12%',
//       })}
//     >
//       <Tab.Screen
//         name="Dashboard"
//         component={Dashboard}
//         initialParams={{ username }}
//         listeners={{
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'Dashboard', params: { username } }],
//               })
//             );
//           },
//         }}
//         options={{
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? '#D1D1D1' : '#FFFFFF', fontSize: 11 }}>
//               Post pet
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={require('../assets/icon_dashboard.png')}
//               style={{ tintColor: focused ? '#D1D1D1' : '#FFFFFF' }}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Community"
//         component={Community}
//         initialParams={{ username }}
//         listeners={{
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'Community', params: { username } }],
//               })
//             );
//           },
//         }}
//         options={{
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? '#D1D1D1' : '#FFFFFF', fontSize: 11 }}>
//               Community
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={require('../assets/icon_Community.png')}
//               style={{ tintColor: focused ? '#D1D1D1' : '#FFFFFF' }}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="ProfileInfo"
//         component={ProfileInfo}
//         initialParams={{ username }}
//         listeners={{
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'ProfileInfo', params: { username } }],
//               })
//             );
//           },
//         }}
//         options={{
//           tabBarLabel: ({ focused }) => (
//             <Text style={{ color: focused ? '#D1D1D1' : '#FFFFFF', fontSize: 11 }}>
//               Profile
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={require('../assets/icon_profile.png')}
//               style={{ tintColor: focused ? '#D1D1D1' : '#FFFFFF' }}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomNavigationBar;

import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const BottomNavigationBar = ({ navigation, route }) => {
  const { username } = route.params;

  const handleNavigate = (routeName) => {
    navigation.navigate(routeName, { username });
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#A38277' }}>
      
      <TouchableOpacity
        onPress={() => handleNavigate('Dashboard')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Dashboard' ? 0.5 : 1, 0.5 : 1
        }}
      >
        <Image source={require('../assets/icon_dashboard.png')} style={{ tintColor: '#FFFFFF' }} />
        <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigate('Community')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'Community' ? 0.5 : 1, 0.5 : 1
        }}
      >
        <Image source={require('../assets/icon_forum.png')} style={{ tintColor: '#FFFFFF' }} />
        <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Community</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigate('ProfileInfo')}
        style={{
          alignItems: 'center',
          opacity: route.name === 'ProfileInfo' ? 0.5 : 1, 0.5 : 1
        }}
      >
        <Image source={require('../assets/icon_profile.png')} style={{ tintColor: '#FFFFFF' }} />
        <Text style={{ color: '#FFFFFF', fontSize: 11 }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;

