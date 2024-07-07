import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';
import config from './config.js';

export default function Dashboard({ navigation, route }) {
  const { username } = route.params;
  const [currentRoute, setCurrentRoute] = useState(route.name);
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/all-pets`);
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }
      const data = await response.json();
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
        <TextInput style={styles.textInput} placeholder="Search"  />
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
                style={styles.containerPetGallery}
                onPress={() =>
                  navigation.navigate('ViewAdopt', {
                    navigation: navigation,
                    route: route,
                    name: pet.pet_name,
                    location: pet.location,
                    image: `data:image/jpeg;base64,${pet.pet_photo}`
                  })
                }
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9EBD8',
  },
  container: {
    flex: 1,
    marginTop: 0,
    height: '79%',
  },
  header: {
    backgroundColor: '#A38277',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  textInput: {
    fontSize: 18,
    padding: 10,
    flex: 1,
    color: '#6A2D2B',
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    width: '60%',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 20
  },
  buttonAddAdopt: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#FBAA5A',
    borderRadius: 12,
    width: '12%',
    marginRight: 17,
    marginLeft: 6
  },
  textAdd: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6A2D2B',
    textAlign: 'center'
  },
  contentGallery: {
    marginBottom: '10%'
  },
  containerGallery: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12
  },
  containerPetGallery: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 7,
  },
  galleryImg: {
    width: 170, 
    height: 170, 
    aspectRatio: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  galleryLine: {
    flexDirection: 'column',
    margin: 4,
    marginBottom: 14
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
    width: 14,
    height: 14,
    marginRight: 3,
    marginLeft: 5,
  },
  dashboardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 2
  }
});