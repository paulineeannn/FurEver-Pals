import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfilePaws() {
  const navigation = useNavigation();
  const route = useRoute();

  const { username } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("logged in successfully");

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

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={require('../assets/button-logout.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.AccountContainer}>
        <Image style={styles.imageProfile} source={require('../assets/profile-placeholder.png')} />
        <View style={styles.AccountInfoContainer}>
          {/* Display the user's full name and username */}
          <Text style={styles.textName}>Chachacha Peña</Text>
          <Text style={styles.textUsername}>{username}</Text>
        </View>

        <View style={styles.ProfileNavContainer}>
          <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationActive, styles.textPaws]}  onPress={() => navigation.navigate('ProfilePaws')}>Paws</Text></TouchableOpacity>
          <TouchableOpacity><Text style={[styles.textNavigation, styles.textNavigationInactive]}  onPress={() => navigation.navigate('ProfileInfo', { username })}>Info</Text></TouchableOpacity>
        </View>
      </View>
 

      <View style={styles.PawsContainer}>
        <View style={styles.PawsContainerContent}>
          <View style={styles.HeaderRow}>
            <Text style={styles.PalsHeading}>Fur Pals</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPaws', { username: username })}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>


      <View style={styles.containerGallery}>
        <View style={styles.containerPetGallery}>
          <Image style={styles.galleryImg} source={require('../assets/pet-placeholder.png')} resizeMode="cover"/>
          <View style={styles.galleryLine}>
            <Image style={styles.iconImage} source={require('../assets/icon-name.png')} resizeMode="cover"/>
            <Text>Pet Name</Text>
          </View>

          {/* <View style={styles.galleryLine}>
          <Image style={styles.iconImage} source={require('../assets/icon-location.png')} resizeMode="cover"/>
            <Text>Address</Text>
          </View> */}
        </View>

        <View style={styles.containerPetGallery}>
          <Image style={styles.galleryImg} source={require('../assets/pet-placeholder.png')} resizeMode="cover"/>
          <View style={styles.galleryLine}>
            <Image style={styles.iconImage} source={require('../assets/icon-name.png')} resizeMode="cover"/>
            <Text>Pet Name</Text>
          </View>
        </View>


        <View style={styles.containerPetGallery}>
          <Image style={styles.galleryImg} source={require('../assets/pet-placeholder.png')} resizeMode="cover"/>
          <View style={styles.galleryLine}>
            <Image style={styles.iconImage} source={require('../assets/icon-name.png')} resizeMode="cover"/>
            <Text>Pet Name</Text>
          </View>


        </View>


        <View style={styles.containerPetGallery}>
          <Image style={styles.galleryImg} source={require('../assets/pet-placeholder.png')} resizeMode="cover"/>
          <View style={styles.galleryLine}>
            <Image style={styles.iconImage} source={require('../assets/icon-name.png')} resizeMode="cover"/>
            <Text>Pet Name</Text>
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

  );
}


const styles = StyleSheet.create({
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
  }, 
  PawsContainerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '50%',
  },
  HeaderRow: {
    flexDirection: 'row',
    marginTop: 20
  },
  PalsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A2D2B',
    paddingRight: 130,
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
    flexDirection: 'row',
    margin: 4,
    marginBottom: 14
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
