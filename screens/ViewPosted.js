import React from 'react';
import { ScrollView, Text, StyleSheet, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViewPosted({ route }) {
  const { name, sex, location, age, description, image } = route.params;
  const navigation = useNavigation();
  const { username } = route.params;
  console.log(age);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImage}>
      <Image style={styles.petImage} source={{ uri: image }} resizeMode="cover" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.detailContainer}>
          <View style={[styles.lineName, styles.marginLeft]}>
            <Image style={styles.iconAdopt} source={require('../assets/icon-adopt.png')} />
            <Text style={[styles.valueName]}>{name}</Text>
          </View>
          <Text style={[styles.valueSex, styles.marginLeft]}>{sex}</Text>

          <View style={styles.containerTwo}>
            <View style={styles.containerDetailsTwo}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{location}</Text>
            </View>

            <View style={styles.containerDetailsTwo}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{age}</Text>
            </View>
          </View>

          <Text style={[styles.value, styles.marginLeft]}>{description}</Text>
          </View>
        </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9EBD8',
  },
  content: {
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  containerImage: {
    display: 'flex',
    width: '100%',
    height: 400,
  },
  petImage: {
    width: '100%',
    height: 400,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 5
  },
  lineName: {
    display: 'flex',
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 5,
  },
  valuesFirst: {
    width: '50%'
  },
  buttonAdopt: {
    backgroundColor: '#FBAA5A',
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,

  },
  iconAdopt: {
    marginTop: 5
  },
  containerTwo: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10
  },
  containerDetailsTwo: {
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#6A2D2B',
    marginTop: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A2D2B',
    textAlign: 'center',
    marginLeft: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20,
    color: '#6A2D2B',
  },
  value: {
    flex: 1,
    color: '#6A2D2B',
    fontSize: 17,
  },
  valueName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#6A2D2B',
    marginLeft: 5
  },
  valueSex: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#B38E83'
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }

});