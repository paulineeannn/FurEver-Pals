import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import BottomNavigationBar from './BottomNavigationBar'; 


export default function Dashboard({ navigation, route }) {
  const { username } = route.params;
  const [currentRoute, setCurrentRoute] = useState(route.name);

  const handleNavigate = (routeName) => {
    if (currentRoute !== routeName) {
      setCurrentRoute(routeName);
      navigation.navigate(routeName);
    }
  };

    const pets = [
      { 
        name: 'Khaki', 
        sex: 'Male', 
        location: 'Hagonoy', 
        age: '2 years', 
        description: 'Khaki is a friendly dog who loves to play and is very affectionate with people. He enjoys outdoor activities and is always ready for a game of fetch.', 
        image: require('../assets/dog-1.jpg') 
      },
      { 
        name: 'Bongbong', 
        sex: 'Male', 
        location: 'Abulalas', 
        age: '1 year', 
        description: 'Bongbong is a playful dog with lots of energy. He loves to run around and is very social with other dogs and people. He is also very intelligent and learns new tricks quickly.', 
        image: require('../assets/dog-2.jpg') 
      },
      { 
        name: 'Muningning', 
        sex: 'Female', 
        location: 'Bocaue', 
        age: '3 years', 
        description: 'Muningning is a calm and gentle cat. She enjoys lounging in the sun and getting belly rubs. She is very affectionate and loves to purr while being petted.', 
        image: require('../assets/cat-1.jpg') 
      },
      { 
        name: 'Yohan', 
        sex: 'Male', 
        location: 'Malolos', 
        age: '4 years', 
        description: 'Yohan is an energetic dog who loves to run and play. He is very active and would be great for someone who enjoys outdoor activities. He is also very loyal and protective of his family.', 
        image: require('../assets/dog-3.jpg') 
      },
      { 
        name: 'Snow', 
        sex: 'Female', 
        location: 'Sta. Mesa', 
        age: '1.5 years', 
        description: 'Snow is an affectionate cat who loves to cuddle. She is very friendly and gets along well with other pets. She enjoys playing with toys and is very curious about her surroundings.', 
        image: require('../assets/cat-2.jpg') 
      },
      { 
        name: 'Bantay', 
        sex: 'Male', 
        location: 'Cubao', 
        age: '5 years', 
        description: 'Bantay is a loyal dog who is very protective of his family. He is calm and well-behaved, and enjoys relaxing at home. He is very affectionate and loves to be petted.', 
        image: require('../assets/dog-4.jpg') 
      },
      { 
        name: 'Toffee', 
        sex: 'Female', 
        location: 'Nasugbu', 
        age: '2 years', 
        description: 'Toffee is a curious cat who loves to explore her surroundings. She is very playful and enjoys chasing after toys. She is also very affectionate and loves to be around people.', 
        image: require('../assets/cat-3.jpg') 
      },
      { 
        name: 'Puti', 
        sex: 'Female', 
        location: 'Bacoor', 
        age: '2.5 years', 
        description: 'Puti is a gentle cat who loves to be petted. She is very calm and enjoys lounging around the house. She gets along well with other pets and is very affectionate with people.', 
        image: require('../assets/cat-4.jpg') 
      },
      { 
        name: 'Blacky', 
        sex: 'Male', 
        location: 'Maui', 
        age: '3 years', 
        description: 'Blacky is a brave cat who is very protective of his family. He is very curious and enjoys exploring his surroundings. He is also very affectionate and loves to be petted.', 
        image: require('../assets/cat-5.jpg') 
      },
      { 
        name: 'Tilapia', 
        sex: 'Female', 
        location: 'El Pueblo', 
        age: '4 years', 
        description: 'Tilapia is a relaxed cat who enjoys lounging around the house. She is very calm and gentle, and gets along well with other pets. She is also very affectionate and loves to be petted.', 
        image: require('../assets/cat-6.jpg') 
      }
    ];
    


  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TextInput style={styles.textInput} placeholder="Search"  />
        <TouchableOpacity style={styles.buttonAddAdopt} onPress={() => navigation.navigate('AddAdopt', { username })}>
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>

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
                <View style={styles.dashboardInfo}>
                  <Text style={styles.petName}>{pet.name}</Text>
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
