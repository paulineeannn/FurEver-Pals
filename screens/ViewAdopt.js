/**
 * PROGRAM TITLE:
 * View Adopt Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     It displays detailed information about a specific pet, enabling users to view pet details and navigate to the adoption form if they are interested in adopting the pet.
 * 
 * DATE WRITTEN:
 *     June 28, 2024
 * 
 * DATE REVISED:
 *     January 24, 2025
 * 
 * PURPOSE:
 *     The purpose of this screen is to present a detailed view of a pet's information, including its image, name, age, sex, location, and description. 
 *     It also navigates the user to the adoption form if they are interested in adopting the pet. 
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     This application utilizes React state and props to effectively manage and display pet information. React Navigation facilitates seamless navigation 
 *     between screens, enabling a smooth user experience. Furthermore, conditional rendering is implemented to dynamically control access to the adoption form, ensuring that 
 *     only authorized users can submit adoption requests.
 */

import React from 'react';
import styles from '../styles/ViewAdoptStyles';

import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViewAdopt({ route }) {
  const { current_username, owner_username, name, age, sex, location, description, image } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Display pet image */}
      <View style={styles.containerImage}>
        <Image style={styles.petImage} source={{ uri: image }} resizeMode="cover" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.detailContainer}>
          {/* Pet name and sex */}
          <View style={[styles.lineName, styles.marginLeft]}>
            <Image style={styles.iconAdopt} source={require('../assets/icon-adopt.png')} />
            <Text style={[styles.valueName]}>{name}</Text>
          </View>
          <Text style={[styles.valueSex, styles.marginLeft]}>{sex ? sex : null}</Text>

          {/* Location and age details */}
          <View style={styles.containerTwo}>
            <View style={styles.containerDetailsTwo}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{location}</Text>
            </View>

            <View style={styles.containerDetailsTwo}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{age ? age : 'Unknown'}</Text>
            </View>
          </View>

          {/* Description */}
          {description ? (
            <>
              <Text style={[styles.marginLeft, styles.descriptionHeading]}>Description</Text>
              <Text style={[styles.value, styles.marginLeft, styles.description]}>{description}</Text>
            </>
          ) : null}

          {/* Adoption button */}
          {current_username !== owner_username ? (
            <View style={styles.center}>
              <TouchableOpacity style={styles.buttonAdopt} onPress={() => navigation.navigate('AdoptionForm', route)}>
                <Text style={styles.buttonTextLarge}>Adopt Me</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
