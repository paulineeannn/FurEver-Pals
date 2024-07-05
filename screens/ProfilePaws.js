import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar'; 
import config from './config.js';

export default function ProfilePaws({ navigation, route }) {
  const { username } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(route.name);

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
      const response = await fetch(`http://${config.ipAddress}:8000/user-details?username=${username}`, {
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

  const fetchPetInfo = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/user-details?username=${username}`, {
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

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', fetchUserInfo);

    return () => {
      unsubscribeFocus();
      setUserInfo(null);  
    };
  }, [navigation]);

  if (!userInfo) {
    return <ActivityIndicator />;
  }

  const { firstname, middlename, lastname, birthday } = userInfo;
  const trimmedBirthday = birthday.substring(0, birthday.length - 9);

  const pets = [
    { 
      name: 'Khaki', 
      sex: 'Male', 
      location: 'Hagonoy', 
      age: '2 years', 
      image: require('../assets/dog-1.jpg') 
    },
    { 
      name: 'Bongbong', 
      sex: 'Male', 
      location: 'Abulalas', 
      age: '1 year', 
      image: require('../assets/dog-2.jpg') 
    }
  ];

  return (
    <View style={styles.screen}>
        <ScrollView style={styles.Container}>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout}> 
              <Image 
              source={require('../assets/button-logout.png')}
              resizeMode="cover">
              </Image>
            </TouchableOpacity>
          </View>
          <View style={styles.AccountContainer}>
            <Image style={styles.imageProfile} source={require('../assets/profile-placeholder.png')}></Image>

            <View style={styles.AccountInfoContainer}>
              <Text style={styles.textName}>{`${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`}</Text>
              <Text style={styles.textUsername}>{username}</Text>
            </View>

            <View style={styles.ProfileNavContainer}>
              <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationActive, styles.textPaws]}  onPress={() => navigation.navigate('ProfilePaws')}>Paws</Text></TouchableOpacity>
              <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationInactive]}  onPress={() => navigation.navigate('ProfileInfo', { username })}>Info</Text></TouchableOpacity>
            </View>
          </View>

        <View style={styles.PawsContainer}>
            <View style={styles.PawsContainerContent}>
              <View style={styles.containerGallery}>
              {pets.map((pet, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.containerPetGallery}
                  onPress={() =>
                    navigation.navigate('ViewAdopt', {
                      navigation: navigation,
                      route: route,
                      name: pet.name,
                      sex: pet.sex,
                      location: pet.location,
                      age: pet.age,
                      description: pet.description,
                      image: pet.image
                    })
                  }
                >
                  <Image style={styles.galleryImg} source={pet.image} resizeMode="cover" />
                  <View style={styles.galleryLine}>
                    <View style={styles.galleryInfo}>
                      <Text style={styles.petName}>{pet.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
        </View>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                <View style={styles.buttonRow}>
                  <Pressable
                    style={[styles.button, styles.buttonConfirm]}
                    onPress={handleConfirmLogout}>
                    <Text style={styles.textStyle}>Confirm</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleCancelLogout}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <BottomNavigationBar navigation={navigation} route={route}/>
    </View>
  );
}


const styles = StyleSheet.create({
    screen: {
        height: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF',
        },

    Container: {
        height: '100%',
        marginTop: 50,
    },
    logoutContainer: {
        width: '97%',
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 10
    },
    AccountContainer: {
        height: '31%',
        flexDirection: 'column',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 0,
    },
    imageProfile: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        width: 160, 
        height: 160, 
        aspectRatio: 1
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#6A2D2B'
    },
    textUsername: {
        fontSize: 17,
        color: '#A38277'
    },
    AccountInfoContainer: {
        height: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
    },
    ProfileNavContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textNavigation: {
        fontSize: 18,
    },
    textNavigationActive: {
        color: '#6A2D2B',
        fontWeight: 'bold'
    },
    textNavigationInactive: {
        color: '#A38277',
        fontWeight: 500,
    },
    textPaws: {
        marginRight: 100,
    },
    PawsContainer: {
        backgroundColor: '#F9EBD8',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50,
    }, 
    PawsContainerContent: {
      paddingBottom: '50%',
      marginTop: '3%'
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      marginBottom: 10,
      paddingVertical: 7,
      borderRadius: 10,
      backgroundColor: '#725144',
    },
    addButtonText: {
      fontSize: 14,
      color: 'white',
    }, 
    containerGallery: {
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    containerPetGallery: {
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      margin: 7,
    },
    galleryImg: {
      width: 160, 
      height: 160, 
      aspectRatio: 1,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    galleryLine: {
        flexDirection: 'column',
        margin: 4,
        marginBottom: 14
    },  
    galleryInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 2
      },
      petName: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 3,
        color: '#6A2D2B',
        marginLeft: 5
      },
    iconImage: {
        width: 17,
        height: 17,
        marginRight: 5,
        marginLeft: 5
    },
    
    logoutContainer: {
        width: '97%',
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: 130,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#A38277',
    },
    buttonConfirm: {
        backgroundColor: '#6A2D2B',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
    });
