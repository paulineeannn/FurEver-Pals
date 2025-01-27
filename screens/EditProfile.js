/**
 * PROGRAM TITLE:
 *     Edit Profile Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     This screen allows users to edit their profile details, including personal information, email, phone number, and profile picture.
 * 
 * DATE WRITTEN:
 *     May 13, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     It provides users with the functionality to update their profile information such as email, password, and personal details. 
 *     The screen also allows users to select or upload a profile picture and save the updated information to the backend.
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     The app uses state variables to store form input values like email, first name, last name, etc., and to handle the profile picture selection. 
 *     It makes network requests using `fetch()` to retrieve and update user data. The `Slider` component is used for evaluating pet knowledge, 
 *     stable living, and flexible time schedule ratings. `DatePicker` is used for selecting the birthday.
 */

import React, { useState, useEffect } from 'react';
import styles from '../styles/EditProfileStyles';

import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';  
import { DatePicker } from 'react-native-woodpicker';

import config from './config.js';

// Error Messages Constants
const ERROR_MESSAGES = {
  FETCH_USER_FAILED: 'Failed to fetch user details. Please try again later.',
  UPDATE_USER_FAILED: 'Failed to update user details. Please try again.',
  IMAGE_PERMISSION_DENIED: 'Sorry, we need camera roll permission to upload images.',
  EMPTY_RESPONSE: 'No user data found.',
  UPDATE_FAILED: 'Update failed. Please check your input and try again.',
  GENERIC_ERROR: 'An unknown error occurred. Please try again later.',
};

export default function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [file, setFile] = useState(null);
  const [profile_photo, setProfilePhoto] = useState(null);  
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [mobilenum, setMobilenum] = useState('');
  const [address, setAddress] = useState('');
  const [petKnowledge, setPetKnowledge] = useState(0);
  const [stableLiving, setStableLiving] = useState(0);
  const [flexTimeSched, setFlexTimeSched] = useState(0);
  const [environment, setEnvironment] = useState(0);

  const handleText = () => 
    birthday
      ? birthday.toDateString()
      : "Select date";

  // Function to fetch user information from the backend
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://${config.ipAddress}:8000/user-details/${username}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setUserInfo(data);
          populateFields(data);
        } else {
          setError(ERROR_MESSAGES.EMPTY_RESPONSE);
        }
      } else {
        setError(ERROR_MESSAGES.FETCH_USER_FAILED);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError(ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  // Function to populate text fields with fetched user data
  const populateFields = (data) => {
    setEmail(data.email);
    setPassword(data.setPassword);
    setFirstname(data.firstname);
    setMiddlename(data.middlename);
    setLastname(data.lastname);
    setBirthday(data.birthday ? new Date(data.birthday) : null);
    setMobilenum(data.mobilenum);
    setAddress(data.address);
    setPetKnowledge(data.pet_knowledge);
    setStableLiving(data.stable_living);
    setFlexTimeSched(data.flex_time_sched);
    setEnvironment(data.environment);
    setProfilePhoto(data.profile_photo);  
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Function to pick and set a new profile image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        ERROR_MESSAGES.IMAGE_PERMISSION_DENIED,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,  
        aspect: [1, 1],      
      });
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFile(selectedUri);
        setError(null);

        // Convert selected image to base64
        const base64Image = await FileSystem.readAsStringAsync(selectedUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setProfilePhoto(base64Image);  
      }
    }
  };

  // Function to handle profile updates
  const handleEdit = async () => {
    const user = {
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      birthday: birthday.toISOString().split("T")[0],
      mobilenum,
      address,
      pet_knowledge: petKnowledge,
      stable_living: stableLiving,
      flex_time_sched: flexTimeSched,
      environment: environment,
      profile_photo: profile_photo,  
    };

    try {
      const response = await fetch(`http://${config.ipAddress}:8000/update-user-details/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Update successful');
        navigation.navigate('Profile', { username });
      } else {
        const errorData = await response.json();
        Alert.alert('Error', ERROR_MESSAGES.UPDATE_FAILED + ': ' + (errorData.detail || 'An unknown error occurred'));
        console.error("Update failed:", errorData || response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  // Display loading spinner while user info is being fetched
  if (!userInfo) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // UI rendering
  return (
    <ScrollView style={styles.Container}>
      {/* Profile Picture Upload Section */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
          {/* Display the selected image or placeholder if none exists */}
          {file || profile_photo ? (
            <Image style={styles.imgProfile} source={{ uri: `data:image/jpeg;base64,${profile_photo || file}` }} resizeMode="cover" />
          ) : (
            <Image
              style={styles.imgProfile}
              source={require('../assets/profile-placeholder2.png')} // Default placeholder image
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      </View>
  
      {/* Main Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.formContainerContent}>
          {/* Account Information Section */}
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Account Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>
  
          {/* Email Input Field */}
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Email*</Text>
          </View>
          <TextInput style={styles.textInput} value={email} onChangeText={text => setEmail(text)} />
  
          {/* Personal Information Section */}
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Personal Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>
  
          {/* First and Middle Name Fields */}
          <View style={styles.formTwoColumns}>
            <View style={[styles.flexColumn, styles.marginRight]}>
              <Text style={styles.labelTextInput}>First Name*</Text>
              <TextInput style={styles.textInputHalf} value={firstname} onChangeText={text => setFirstname(text)} />
            </View>
  
            <View style={styles.flexColumn}>
              <Text style={styles.labelTextInput}>Middle Name</Text>
              <TextInput style={styles.textInputHalf} value={middlename} onChangeText={text => setMiddlename(text)} />
            </View>
          </View>
  
          {/* Last Name and Birthday Fields */}
          <View style={styles.formTwoColumns}>
            <View style={[styles.flexColumn, styles.marginRight]}>
              <Text style={styles.labelTextInput}>Last Name*</Text>
              <TextInput style={styles.textInputHalf} value={lastname} onChangeText={text => setLastname(text)} />
            </View>
  
            <View style={[styles.flexColumn, styles.containerBirthday]}>
              <Text style={styles.labelTextInput}>Birthday*</Text>
              {/* Date Picker for Birthday */}
              <DatePicker
                value={birthday}
                onDateChange={setBirthday}
                style={styles.birthdayPicker}
                containerStyle={styles.containerPicker}
                title=""
                text={handleText()}
                isNullable={false}
                textInputStyle={styles.birthdayInput}
                maximumDate={new Date(Date.now())} // Ensures the selected date is not in the future
                iosMode="date"
                iosDisplay="inline"
              />
            </View>
          </View>
  
          {/* Mobile Number and Address Fields */}
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Mobile Number*</Text>
          </View>
          <TextInput style={styles.textInput} value={mobilenum} onChangeText={text => setMobilenum(text)} />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Address*</Text>
          </View>
          <TextInput style={styles.textInput} value={address} onChangeText={text => setAddress(text)} />
  
          {/* Characteristics Section */}
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Characteristics</Text>
            <View style={styles.horizontalLine}></View>
          </View>
  
          {/* Slider Inputs for Various Characteristics */}
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Pet Knowledge*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={petKnowledge}
            onValueChange={value => setPetKnowledge(value)}
          />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Stable Living*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={stableLiving}
            onValueChange={value => setStableLiving(value)}
          />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Flexible Time Schedule*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={flexTimeSched}
            onValueChange={value => setFlexTimeSched(value)}
          />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Environment*</Text>
          </View>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#E8DFDD"
            maximumTrackTintColor="#725144"
            value={environment}
            onValueChange={value => setEnvironment(value)}
          />
  
          {/* Update Button */}
          <View style={styles.CenterContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}  