import React, { useState, useEffect } from 'react';
import styles from '../styles/ProfileStyles';

import { Text, View, Image, Modal, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar'; 
import config from './config.js';

export default function Profile({ navigation, route }) {
  const { username } = route.params;
  const [currentRoute, setCurrentRoute] = useState(route.name);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('Info')
  const [pets, setPets] = useState([]);

  const handleNavigate = (routeName) => {
    if (currentRoute !== routeName) {
      setCurrentRoute(routeName);
      navigation.navigate(routeName);
    }
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigation.navigate('SignIn');
  };

  const handleCancelLogout = () => {
    setModalVisible(false);
  };

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
          console.error('Empty response data');
        }
      } else {
        console.error('Failed to fetch user info. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchPets = async () => {
    try {
      const url = `http://${config.ipAddress}:8000/user-pets/${username}`;
      console.log('Fetching pets with URL:', url);
  
      const response = await fetch(url);
      if (response.status === 404) {
        console.log('No pets found for this user.');
        setPets([]);
        return;
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch pets. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error.message);
    }
  };  

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

  if (!userInfo) {
    return <ActivityIndicator />;
  }

  const { firstname, middlename, lastname, birthday, mobilenum, address, pet_knowledge, stable_living, flex_time_sched, environment, profile_photo } = userInfo;
  
  const trimmedBirthday = birthday.substring(0, 10);

  const calculateWidth = (value) => {
    switch (value) {
      case 1:
        return '20%';
      case 2:
        return '40%';
      case 3:
        return '60%';
      case 4:
        return '80%';
      case 5:
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require('../assets/button-logout.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.Container}>
        <View style={styles.accountContainer}>
          <Image style={styles.imageProfile} source={{ uri: `data:image/jpeg;base64,${profile_photo}` }} />
          <View style={styles.accountInfoContainer}>
            <Text style={styles.textName}>{`${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`}</Text>
            <Text style={styles.textUsername}>{username}</Text>
          </View>
          <View style={styles.profileNavContainer}>
            <TouchableOpacity>
                <Text
                  style={[styles.textNavigation, activeTab === 'Paws' ? styles.textNavigationActive : styles.textNavigationInactive,]}
                  onPress={() => setActiveTab('Paws')} 
                >
                  Paws
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[styles.textNavigation, activeTab === 'Info' ? styles.textNavigationActive : styles.textNavigationInactive,]}
                  onPress={() => setActiveTab('Info')} 
                >
                  Info
                </Text>
              </TouchableOpacity>
          </View>
        </View>
        {activeTab === 'Info' ? (
          <View style={styles.containerProfile}>
            <View style={styles.containerProfileContent}>
              {/* Personal Info Section */}
              <View style={styles.containerInfo}>
                <View style={styles.personalHeadingContainer}>
                <Text style={[styles.sectionLabel, styles.labelPersonal]}>Personal</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', { username })}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalLine}></View>
              <View style={styles.infoTable}>
                <View style={styles.infoColumn1}>
                  <Text style={styles.infoLabel}>Birthday:</Text>
                  <Text style={styles.infoLabel}>Mobile Number:</Text>
                  <Text style={styles.infoLabel}>City:</Text>
                </View>
                <View style={styles.infoColumn2}>
                  <Text style={styles.infoAnswer}>{trimmedBirthday}</Text>
                  <Text style={styles.infoAnswer}>{mobilenum}</Text>
                  <Text style={styles.infoAnswer}>{address}</Text>
                </View>
              </View>
              {/* Characteristics Section */}
              <View style={styles.characteristicsContainer}>
                <Text style={styles.sectionLabel}>Characteristics</Text>
                <View style={styles.horizontalLine}></View>
                <View>
                  <Text style={styles.infoLabelChar}>Pet Knowledge:</Text>
                  <View style={styles.outerBar}>
                    <View style={[styles.innerBar, { width: calculateWidth(pet_knowledge) },]}></View>
                  </View>
                </View>
                <Text style={styles.infoLabelChar}>Stable Living:</Text>
                <View style={styles.outerBar}>
                  <View style={[styles.innerBar, { width: calculateWidth(stable_living) },]}></View>
                </View>
                <Text style={styles.infoLabelChar}>Flexible Time Schedule:</Text>
                <View style={styles.outerBar}>
                  <View style={[styles.innerBar, { width: calculateWidth(flex_time_sched) },]}></View>
                </View>
                <Text style={styles.infoLabelChar}>Environment:</Text>
                <View style={styles.outerBar}>
                  <View style={[styles.innerBar, { width: calculateWidth(environment) },]}></View>
                </View>
              </View>
              
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.containerProfile}>
  <View style={styles.containerProfileContent}>
    <View style={styles.containerPaws}>
      {pets.length === 0 ? (
        <View style={styles.containerEmptyPaws}>
          <Text style={styles.noPetsText}>You haven’t listed any pets for adoption yet!</Text>
          <TouchableOpacity style={styles.buttonAddAdopt} onPress={() => navigation.navigate('AddAdopt', { username })}>
            <Text style={styles.textAdd}>Post pet</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonConfirm]}
                    onPress={handleConfirmLogout}
                  >
                    <Text style={styles.textStyle}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleCancelLogout}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <BottomNavigationBar navigation={navigation} route={route} />
    </View>
  );
}