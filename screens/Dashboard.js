import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import styles from '../styles/DashboardStyles';

import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';
import config from './config.js';

export default function Dashboard({ navigation, route }) {
  const { username } = route.params;
  const [currentRoute, setCurrentRoute] = useState(route.name);
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOdd, setIsOdd] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Fetch pets whenever the screen is focused
      fetchPets();
    }, [])
  );

  const fetchPets = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/all-pets`);
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }
      const data = await response.json();
      setIsOdd(data.length % 2 !== 0);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleNavigate = (routeName) => {
    if (currentRoute !== routeName) {
      setCurrentRoute(routeName);
      navigation.navigate(routeName);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPets().then(() => setRefreshing(false));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* <TextInput style={styles.textInput} placeholder="Search"  /> */}
        <View style={styles.blocker}></View>
        <Text style={styles.headerText}>Pets for Adoption</Text>
        <TouchableOpacity style={styles.buttonAddAdopt} onPress={() => navigation.navigate('AddAdopt', { username })}>
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.contentGallery}>
          <View style={styles.containerGallery}>
            {pets.map((pet, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.containerPetGallery, isOdd ? styles.LeftAligned : styles.Centered]}
                onPress={() => {
                  navigation.navigate('ViewAdopt', {
                    navigation: navigation,
                    route: route,
                    current_username: username,
                    owner_username: pet.username,
                    name: pet.pet_name,
                    age: pet.pet_age,
                    sex: pet.sex,
                    location: pet.location,
                    description: pet.description,
                    image: `data:image/jpeg;base64,${pet.pet_photo}`
                  });
                }}
              >
                <Image style={styles.galleryImg} source={{ uri: `data:image/jpeg;base64,${pet.pet_photo}` }} resizeMode="cover" />
                <View style={styles.galleryLine}>
                  <View style={styles.dashboardInfo}>
                    <Text style={styles.petName}>{pet.pet_name}</Text>
                  </View>
                  <View style={styles.dashboardInfo}>
                    <Image style={styles.iconImage} source={require('../assets/icon-location.png')} resizeMode="cover" />
                    <Text>{pet.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
}
