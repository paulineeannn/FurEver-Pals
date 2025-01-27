/**
 * PROGRAM TITLE:
 *     Adoption Form
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     It allows users to fill out and submit a pet adoption form by providing required personal details and adoption plans. 
 * 
 * DATE WRITTEN:
 *     June 30, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     The form collects user details, adoption plans, and proof of identity. It also validates the data and sends it to the server for processing.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     This component utilizes React state hooks to effectively manage form inputs, image uploads, and the visibility 
 *     of confirmation and success modals. The fetch API is employed to transmit user data to the server via a POST request. 
 */

import React, { useState } from 'react';
import styles from '../styles/AdoptionFormStyles';

import {Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, Linking, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

// Error Messages Constants
const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Sorry, we need camera roll permission to upload images.',
  REGISTRATION_FAILED: 'Registration failed: ',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  GENERAL_ERROR: 'An error occurred during registration.',
};

export default function AdoptionForm({ route }) {
  const { username } = route.params;  
  const navigation = useNavigation();

  // State variables
  const [selectedUri, setSelectedUri] = useState(null);
  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [careResponsibility, setCareResponsibility] = useState('');
  const [petCarePlan, setPetCarePlan] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [reasonForAdoption, setReasonForAdoption] = useState('');

  // Function to pick an image from the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      // If permission is denied, show an alert
      Alert.alert(
        'Permission Denied',
        ERROR_MESSAGES.PERMISSION_DENIED,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    } else {
      // Launch the image library and get the selected image
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,  
        aspect: [1, 1],      
      });

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setSelectedUri(selectedUri);
        setFile(selectedUri);
        console.log('File updated:', selectedUri);
      }
    }
  };
  // Function to handle form submission
  const handleAddPaws = async () => {
    const user = {
      username: username,
      name: name.trim() || null,
      age: parseInt(age) || null,
      sex: value,
      complete_address: completeAddress.trim() || null,
      fur_pic: selectedUri,
      occupation: occupation.trim() || null,
      care_responsibility: careResponsibility.trim() || null,
      pet_care_plan: petCarePlan.trim() || null,
      clinic_name: clinicName.trim() || null,
      reason_for_adoption: reasonForAdoption.trim() || null,
    };

    try {
      const response = await fetch('http://192.168.5.116:8000/add-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessModalVisible(true); // Show success modal on successful submission
      } else {
        const errorData = await response.json();
        Alert.alert('Error', ERROR_MESSAGES.REGISTRATION_FAILED + (errorData.detail || ERROR_MESSAGES.UNKNOWN_ERROR));
        console.error('Registration failed:', errorData || response.statusText);
      }
    } catch (error) {
      console.error('Error:', error); // Log the original error
      Alert.alert('Error', ERROR_MESSAGES.GENERAL_ERROR);
      console.log('Network or server error:', error);
    }
  };

  // Confirm submission and navigate to the dashboard
  const handleSuccessConfirm = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Dashboard', { username: username });
  };

  // Modal confirmation functions
  const confirmSubmission = () => {
    setModalVisible(false);
    setSuccessModalVisible(true);
  };

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContainerHeading}>
        <Text style={styles.TextHeading}>Pet Adoption Application Form</Text>
      </View>

      <View style={styles.ContainerContent}>
        <Text style={styles.TextSubheading}>Personal Information</Text>
        <View style={styles.horizontalLine} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name*</Text>
        </View>
        <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Address</Text>
        </View>
        <TextInput style={styles.textInput} value={completeAddress} onChangeText={text => setCompleteAddress(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Occupation or Source of Income</Text>
        </View>
        <TextInput style={styles.textInput} value={occupation} onChangeText={text => setOccupation(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Who will be responsible for the pet’s care?</Text>
        </View>
        <TextInput style={styles.textInput} value={careResponsibility} onChangeText={text => setCareResponsibility(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>How do you plan to care for the pet? (e.g., feeding, grooming)</Text>
        </View>
        <TextInput style={[styles.textInput, styles.inputParagraph]} multiline={true} numberOfLines={5} value={petCarePlan} onChangeText={text => setPetCarePlan(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name of the clinic you intend to bring the pet.</Text>
        </View>
        <TextInput style={styles.textInput} value={clinicName} onChangeText={text => setClinicName(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>What are your reasons for adopting a pet?</Text>
        </View>
        <TextInput style={[styles.textInput, styles.inputParagraph]} multiline={true} numberOfLines={5} value={reasonForAdoption} onChangeText={text => setReasonForAdoption(text)} />


        <Text style={styles.labelTextInput}>Proof of Identity*</Text>
        <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
          <Image
            style={styles.imgProfile}
            source={file ? { uri: file } : require('../assets/id-upload.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Submit Form</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to submit the form?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmSubmission}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Form submitted successfully!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleSuccessConfirm}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
