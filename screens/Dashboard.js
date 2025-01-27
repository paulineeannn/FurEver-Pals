/**
 * PROGRAM TITLE:
 *     Dashboard Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This screen displays a list of pets available for adoption.
 * 
 * DATE WRITTEN:
 *     June 28, 2024
 * 
 * DATE REVISED:
 *     January 25, 2025
 * 
 * PURPOSE:
 *     It fetches a list of pets available for adoption and displays them in a gallery format. It also includes a pull-to-refresh 
 *     functionality to reload the list of pets. 

 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     It uses state variables to store pets, the current route, refreshing status, and the alignment of the pet gallery. 
 *     The app also uses `useEffect` to fetch data initially and `useFocusEffect` to refetch data whenever the screen is focused. 
 *     Network requests are made using `fetch()` to get data from the server, and conditional rendering is applied based on the pet list's length for gallery alignment.
 */

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import styles from '../styles/DashboardStyles';

import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';
import config from './config.js';

// Error Messages Constants
const ERROR_MESSAGES = {
  FETCH_PETS_FAILED: 'Failed to fetch pets. Please try again later.',
};

export default function Dashboard({ navigation, route }) {
  // Extract username from route parameters
  const { username } = route.params;

  // State variables
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOdd, setIsOdd] = useState(true);

  // Fetch pets data on component mount and when the screen is focused
  useEffect(() => {
    fetchPets();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [])
  );

  // Fetch pets from the server
  const fetchPets = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/all-pets`);
      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.FETCH_PETS_FAILED);
      }
      const data = await response.json();
      setIsOdd(data.length % 2 !== 0);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  // Refresh the pet list
  const onRefresh = () => {
    setRefreshing(true);
    fetchPets().then(() => setRefreshing(false));
  };

  // UI rendering
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* Header Section */}
        <View style={styles.blocker}></View>
        <Text style={styles.headerText}>Pets for Adoption</Text>
        <TouchableOpacity style={styles.buttonAddAdopt} onPress={() => navigation.navigate('AddAdopt', { username })}>
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Pet Gallery */}
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

      {/* Bottom Navigation Bar */}
      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
}