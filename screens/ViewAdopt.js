import React from 'react';
import styles from '../styles/ViewAdoptStyles';

import { ScrollView, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViewAdopt({ route }) {
  const { current_username, owner_username, name, age, sex, location, description, image } = route.params;
  const navigation = useNavigation();

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

          <Text style={[styles.marginLeft, styles.descriptionHeading]}>Description</Text>
          <Text style={[styles.value, styles.marginLeft, styles.description]}>{description}</Text>

        { current_username != owner_username ? (
            <View style={styles.center}>
            <TouchableOpacity style={styles.buttonAdopt} onPress={() => navigation.navigate('AdoptionForm', route)}>
                <Text style={styles.buttonTextLarge}>Adopt Me</Text>
              </TouchableOpacity>
          </View>) : null
        }
          </View>
      </View>
      
    </ScrollView>
  );
}