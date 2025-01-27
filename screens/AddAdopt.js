/**
 * PROGRAM TITLE:
 *     Add Pets for Adoption Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     Facilitates posting pets for adoption by allowing users to provide pet details, including name, age, 
 *     gender, location, description, and a photo.
 * 
 * DATE WRITTEN:
 *     June 27, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     Gathers necessary details about pets from users and sends this data to the server via a POST request with a JSON 
 *     payload to create an adoption post. 
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     Uses React Native's useState hooks to manage form inputs, image previews, and error messages. 
 *     Utilizes Base64 encoding for image uploads and implements conditional rendering for displaying content dynamically.
 */

import React, { useState, useEffect } from 'react';
import styles from '../styles/AddAdoptStyles';

import { Text, View, Image, TextInput, TouchableOpacity, Alert, Linking, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import config from './config.js';

// Error Message Constants
const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Sorry, we need camera roll permission to upload images.',
  CLIENT_ERROR: 'Failed to post pet:',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  NETWORK_ERROR: 'Please check your internet connection and try again.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
};

export default function AddAdopt() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  // State Variables
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' }
  ]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [complete_address, setcomplete_address] = useState('');
  const [description, set_description] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Function to pick an image from the device's media library 
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', ERROR_MESSAGES.PERMISSION_DENIED, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,  
      aspect: [1, 1],      
    });
    if (!result.canceled && result.assets.length > 0) {
      setFile(result.assets[0].uri);
    }
  };

  // Confirm Submission
  const confirmSubmission = async () => {
    if (!name || !file) {
      Alert.alert('Error', 'Please provide a name and upload a photo.');
      return;
    }

    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        const payload = {
          username,
          pet_name: name,
          pet_age: age ? parseInt(age, 10) : null,
          sex: value,
          location: address,
          description,
          pet_photo: base64data,
        };

        await postAdoptionData(payload);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      Alert.alert('Error', `${ERROR_MESSAGES.UNEXPECTED_ERROR} ${error.message}`);
    }
  };

  // Post Data to Server
  const postAdoptionData = async (payload) => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/add-pet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        handleServerError(response);
        return;
      }

      setSuccessModalVisible(true);
    } catch (error) {
      const isNetworkError = error.message.includes('Network request failed');
      Alert.alert('Error', isNetworkError ? ERROR_MESSAGES.NETWORK_ERROR : error.message);
    }
  };

  // Handle Server Errors
  const handleServerError = async (response) => {
    if (response.status >= 400 && response.status < 500) {
      const errorData = await response.json();
      Alert.alert('Client Error', `${ERROR_MESSAGES.CLIENT_ERROR} ${JSON.stringify(errorData)}`);
    } else {
      Alert.alert('Server Error', ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const handleAddPaws = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Dashboard', { ...route.params });
  };

  // UI rendering
  return (
    <FlatList
      style={styles.Container}
      data={[]} 
      renderItem={() => null} 
      keyExtractor={(item, index) => index.toString()} 
      ListHeaderComponent={
        <>
          {/* Header Section */}
          <View style={styles.ContainerHeading}>
            <Text style={styles.TextHeading}>Post Pet</Text>
          </View>
  
          {/* Pet Information Form */}
          <View style={styles.ContainerContent}>
            <Text style={styles.TextSubheading}>Pet Information</Text>
            <View style={styles.horizontalLine}></View>
  
            {/* Name Input */}
            <View style={styles.flexLeftAlign}>
              <Text style={styles.labelTextInput}>Name*</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
  
            {/* Age and Sex Inputs */}
            <View style={styles.formTwoColumns}>
              {/* Age Input */}
              <View style={[styles.flexColumn, styles.marginRight]}>
                <Text style={styles.labelTextInput}>Age</Text>
                <TextInput
                  style={[styles.textInputHalf, styles.marginRight, styles.inputAge]}
                  value={age}
                  onChangeText={setAge}
                />
              </View>
  
              {/* Sex Dropdown */}
              <View style={styles.flexColumn}>
                <Text style={styles.labelTextInput}>Sex</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.dropdown}
                />
              </View>
            </View>
  
            {/* Location Input */}
            <View style={[styles.flexLeftAlign, styles.marginTop]}>
              <Text style={styles.labelTextInput}>Location*</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={complete_address}
              onChangeText={setcomplete_address}
            />
  
            {/* Description Input */}
            <View style={[styles.flexLeftAlign]}>
              <Text style={styles.labelTextInput}>Description</Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.inputParagraph]}
              multiline={true}
              numberOfLines={15}
              onChangeText={set_description}
            />
  
            {/* Image Upload Section */}
            <View style={styles.flexLeftAlign}>
              <Text style={styles.labelTextInput}>Fur Pic*</Text>
            </View>
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={styles.buttonUploadPicture}
                onPress={pickImage}
              >
                {file ? (
                  <Image
                    style={styles.imgProfile}
                    source={{ uri: file }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    style={styles.imgProfile}
                    source={require('../assets/pet-upload.png')}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
            </View>
  
            {/* Submit Button */}
            <View style={styles.ButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={confirmSubmission}>
                <Text style={styles.buttonText}>Post for Adoption</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Success Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={() => setSuccessModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Pet posted successfully!</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={handleAddPaws}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      }
    />
  );
}  