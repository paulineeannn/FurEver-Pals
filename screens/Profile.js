/**
 * PROGRAM TITLE:
 *     User Profile Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This screen displays the user profile, including personal information and pet details.
 * 
 * DATE WRITTEN:
 *     May 12, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     It fetches and displays the user's personal details and pets for adoption. The user can navigate between tabs to view personal information or their pets. 
 *     This screen also allows users to log out or navigate to edit their profile information.

 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     It uses state variables to store the user info, active tab, pets list, and modal visibility. It fetches data using `fetch()` to retrieve user 
 *     information and pets. Conditional rendering is used to display different sections (Info, Paws) based on the active tab.
 */

import React, { useState, useEffect } from 'react';
import styles from '../styles/ProfileStyles';

import { Text, View, Image, Modal, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar'; 
import config from './config.js';

const ERROR_MESSAGES = {
  FETCH_USER_INFO_EMPTY_DATA: 'Empty response data',
  FETCH_USER_INFO_FAILED: 'Failed to fetch user info. Status:',
  FETCH_USER_INFO_ERROR: 'Error fetching user info:',
  FETCH_PETS_NOT_FOUND: 'No pets found for this user.',
  FETCH_PETS_FAILED: 'Failed to fetch pets. Status:',
  FETCH_PETS_ERROR: 'Error fetching pets:',
};

export default function Profile({ navigation, route }) {
  // Extracting username from route parameters
  const { username } = route.params;

  // State variables
  const [currentRoute, setCurrentRoute] = useState(route.name);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('Info');
  const [pets, setPets] = useState([]);

  // Logout handler
  const handleLogout = () => {
    setModalVisible(true);
  };

  // Confirm logout
  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigation.navigate('SignIn');
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setModalVisible(false);
  };

  // Fetch user information from server
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/user-details/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setUserInfo(data);
        } else {
          console.error(ERROR_MESSAGES.FETCH_USER_INFO_EMPTY_DATA);
        }
      } else {
        console.error(`${ERROR_MESSAGES.FETCH_USER_INFO_FAILED} ${response.status}`);
      }
    } catch (error) {
      console.error(`${ERROR_MESSAGES.FETCH_USER_INFO_ERROR} ${error}`);
    }
  };

  // Fetch user pets from server
  const fetchPets = async () => {
    try {
      const url = `http://${config.ipAddress}:8000/user-pets/${username}`;
      console.log('Fetching pets with URL:', url);

      const response = await fetch(url);
      if (response.status === 404) {
        console.log(ERROR_MESSAGES.FETCH_PETS_NOT_FOUND);
        setPets([]);
        return;
      }
      if (!response.ok) {
        throw new Error(`${ERROR_MESSAGES.FETCH_PETS_FAILED} ${response.status}`);
      }

      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error(`${ERROR_MESSAGES.FETCH_PETS_ERROR} ${error.message}`);
    }
  };

  // Hook to fetch data when the screen is focused
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      fetchUserInfo();
      fetchPets();
    });

    return () => {
      unsubscribeFocus();
      setUserInfo(null);
      setPets([]);
    };
  }, [navigation]);

  // If user data is not loaded yet, show loading indicator
  if (!userInfo) {
    return <ActivityIndicator />;
  }

  // Destructure user information from the userInfo object
  const {
    firstname, 
    middlename, 
    lastname, 
    birthday, 
    mobilenum, 
    address, 
    pet_knowledge, 
    stable_living, 
    flex_time_sched, 
    environment, 
    profile_photo
  } = userInfo;
  
  // Format the birthday to a more readable string
  const trimmedBirthday = birthday.substring(0, 10);  
  const dateObject = new Date(trimmedBirthday); 
  const formattedBirthday = dateObject.toLocaleDateString("en-US", {  // Format the date as 'Month Day, Year'
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const characteristics = {
    'Pet Knowledge': pet_knowledge,
    'Stable Living': stable_living,
    'Flexible Time Schedule': flex_time_sched,
    'Environment': environment,
  };

  // Function to calculate the width percentage based on the value provided in user's characteristics
  const calculateWidth = (value) => {
    return `${(value / 5) * 100}%`; 
  };


  // Reusable Profile Navigation Tabs Component
  const ProfileNavTabs = ({ activeTab, setActiveTab }) => (
    <View style={styles.profileNavContainer}>
      {/* Loop through the tab names and create a TouchableOpacity for each */}
      {['Paws', 'Info'].map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
          <Text
            style={[
              styles.textNavigation,
              activeTab === tab ? styles.textNavigationActive : styles.textNavigationInactive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Reusable Pet Knowledge Section Component
  // Displays a list of characteristics with progress bars based on values
  const CharacteristicsSection = ({ characteristics }) => {
    return (
      <View style={styles.characteristicsContainer}>
        <Text style={styles.sectionLabel}>Characteristics</Text>
        <View style={styles.horizontalLine}></View>
        {Object.entries(characteristics).map(([label, value]) => (
          <View key={label}>
            <Text style={styles.infoLabelChar}>{label}:</Text>
            <View style={styles.outerBar}>
              <View style={[styles.innerBar, { width: calculateWidth(value) }]}></View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Main UI Rendering
  return (
    <View style={styles.screen}>
      {/* Logout button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Image source={require('../assets/button-logout.png')} resizeMode="cover" />
        </TouchableOpacity>
      </View>
  
      {/* Scrollable content */}
      <ScrollView style={styles.Container}>
        <View style={styles.accountContainer}>
          {/* Display user profile photo */}
          <Image style={styles.imageProfile} source={{ uri: `data:image/jpeg;base64,${profile_photo}` }} />
          <View style={styles.accountInfoContainer}>
            {/* Display user name and username */}
            <Text style={styles.textName}>{`${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`}</Text>
            <Text style={styles.textUsername}>{username}</Text>
          </View>
  
          {/* Profile navigation tabs */}
          <ProfileNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
  
        {/* Display different content based on the active tab */}
        {activeTab === 'Info' ? (
          <View style={styles.containerProfile}>
            <View style={styles.containerProfileContent}>
              <View style={styles.containerInfo}>
                {/* Personal info section with edit button */}
                <View style={styles.personalHeadingContainer}>
                  <Text style={[styles.sectionLabel, styles.labelPersonal]}>Personal</Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', { username })}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}></View>
  
                {/* Display user info */}
                <View style={styles.infoTable}>
                  <View style={styles.infoColumn1}>
                    <Text style={styles.infoLabel}>Birthday:</Text>
                    <Text style={styles.infoLabel}>Mobile Number:</Text>
                    <Text style={styles.infoLabel}>City:</Text>
                  </View>
                  <View style={styles.infoColumn2}>
                    <Text style={styles.infoAnswer}>{formattedBirthday}</Text>
                    <Text style={styles.infoAnswer}>{mobilenum}</Text>
                    <Text style={styles.infoAnswer}>{address}</Text>
                  </View>
                </View>
  
                {/* Characteristics Section */}
                <CharacteristicsSection characteristics={characteristics} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.containerProfile}>
            <View style={styles.containerProfileContent}>
              <View style={styles.containerPaws}>
                {/* If no pets are listed */}
                {pets.length === 0 ? (
                  <View style={styles.containerEmptyPaws}>
                    <Text style={styles.noPetsText}>You haven’t listed any pets for adoption yet!</Text>
                    <TouchableOpacity style={styles.buttonAddAdopt} onPress={() => navigation.navigate('AddAdopt', { username })}>
                      <Text style={styles.textAdd}>Post pet</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Display pets in gallery format
                  <View style={styles.postedPetsContainer}>
                    {pets.map((pet, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.containerPetGallery}
                        onPress={() =>
                          navigation.navigate('ViewAdopt', {
                            username: pet.username,
                            navigation: navigation,
                            route: route,
                            name: pet.pet_name,
                            age: pet.pet_age,
                            sex: pet.sex,
                            location: pet.location,
                            description: pet.description,
                            image: `data:image/jpeg;base64,${pet.pet_photo}`,
                          })
                        }
                      >
                        <Image style={styles.galleryImg} source={{ uri: `data:image/jpeg;base64,${pet.pet_photo}` }} resizeMode="cover" />
                        <View style={styles.galleryLine}>
                          <View style={styles.galleryInfo}>
                            <Text style={styles.petName}>{pet.pet_name}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
  
        {/* Modal for logout confirmation */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                <View style={styles.buttonRow}>
                  {/* Confirm logout button */}
                  <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={handleConfirmLogout}>
                    <Text style={styles.textStyle}>Confirm</Text>
                  </TouchableOpacity>
                  {/* Cancel logout button */}
                  <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleCancelLogout}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
  
      {/* Bottom Navigation Bar */}
      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
}  