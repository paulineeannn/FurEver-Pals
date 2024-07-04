import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar'; 
import config from './config.js';

export default function ProfileInfo({ navigation, route }) {
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
  console.log("Profile Info page opened for", username);

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

  const { firstname, middlename, lastname, birthday, mobilenum, address, pet_knowledge, stable_living, flex_time_sched, environment } = userInfo;
  const trimmedBirthday = birthday.substring(0, birthday.length - 9);

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
      <ScrollView style={styles.container}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require('../assets/button-logout.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.accountContainer}>
          <Image style={styles.imageProfile} source={require('../assets/profile-placeholder.png')} />
          <View style={styles.accountInfoContainer}>
            <Text style={styles.textName}>{`${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`}</Text>
            <Text style={styles.textUsername}>{username}</Text>
          </View>
          <View style={styles.profileNavContainer}>
            <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationInactive, styles.textPaws]} onPress={() => navigation.navigate('ProfilePaws', { username })}>Paws</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationActive]} onPress={() => navigation.navigate('ProfileInfo')}>Info</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.personalContainer}>
          <View style={styles.personalContainerContent}>
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
            <View style={styles.characteristicsContainer}>
              <Text style={styles.sectionLabel}>Characteristics</Text>
              <View style={styles.horizontalLine}></View>
              <View>
                <Text style={styles.infoLabelChar}>Pet Knowledge:</Text>
                <View style={styles.outerBar}>
                  <View style={[styles.innerBar, { width: calculateWidth(pet_knowledge) },]}>
                  </View>
                </View>
              </View>
              <Text style={styles.infoLabelChar}>Stable Living:</Text>
              <View style={styles.outerBar}>
                <View style={[styles.innerBar, { width: calculateWidth(stable_living) },]}>
                </View>
              </View>
              <Text style={styles.infoLabelChar}>Flexible Time Schedule:</Text>
              <View style={styles.outerBar}>
                <View style={[styles.innerBar, { width: calculateWidth(flex_time_sched) },]}>
                </View>
              </View>
              <Text style={styles.infoLabelChar}>Environment:</Text>
              <View style={styles.outerBar}>
                <View style={[styles.innerBar, { width: calculateWidth(environment) },]}>
                </View>
              </View>
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
  container: {
    height: '79%',
    marginTop: 50,
  },
  logoutContainer: {
    width: '97%',
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 10
  },
  accountContainer: {
    height: '31%',
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 0
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
    fontSize: 25,
    color: '#6A2D2B',
    fontWeight: 'bold'
  },
  textUsername: {
    fontSize: 17,
    color: '#A38277'
  },
  accountInfoContainer: {
    height: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  profileNavContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textNavigation: {
    fontSize: 18,
  },
  textNavigationActive: {
    fontWeight: 'bold',
    color: '#6A2D2B',
  },
  textNavigationInactive: {
    color: '#A38277',
    fontWeight: 'bold',
  },
  textPaws: {
    marginRight: 100,
  },
  personalContainer: {
    backgroundColor: '#F9EBD8',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  personalContainerContent: {
    width: '80%',
    height: '100%',
    marginTop: 10,
    flexDirection: 'column',
    paddingBottom: '50%',
  }, 
  personalHeadingContainer: {
    flexDirection: 'row',
    marginTop: 25
  },
  sectionLabel: {
    fontSize: 21,
    color: '#6A2D2B',
    height: 30,
    textTransform: 'uppercase',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  labelPersonal: {
    width: '69%'
  },
  horizontalLine: {
    borderWidth: 0.7,
    width: '100%',
    borderColor:'#CEBCB6',
    marginBottom:10,
  }, 
  editButton: {
    width: '20%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#725144",
    borderRadius: 8,
    marginLeft: 35,
    marginBottom: 0,
    marginTop: 2
  }, 
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  infoTable: {
    flexDirection: 'row',
    marginBottom: 30
  },
  infoColumn1: {
    width: '40%'
  },
  infoColumn2: {
    width: '60%'
  },
  infoLabel: {
    color: "#6A2D2B",
    marginBottom: 15,
    fontWeight: 'bold'
  },
  infoAnswer: {
    marginBottom: 15,
    color: '#6A2D2B'
  },
  infoLabelChar: {
    color: "#6A2D2B",
    marginBottom: 5
  },
  outerBar: {
    backgroundColor: '#725144',
    width: '100%',
    height: 27,
    borderRadius: 15, // Optional rounded corners
    marginBottom: 10
  },
  innerBar: {
    backgroundColor: '#A38277',
    width: '50%',
    height: '100%',
    borderRadius: 15
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