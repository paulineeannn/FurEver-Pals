/**
 * PROGRAM TITLE:
 *     Sign-Up Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     It handles the user registration process, allowing new users to create an account by providing their personal and account information.
 * 
 * DATE WRITTEN:
 *     May 11, 2024
 * 
 * DATE REVISED:
 *     January 26, 2025
 * 
 * PURPOSE:
 *     This enables users to register by filling in required account information, personal details, and characteristics. 
 *     Once all the information is gathered, the app sends a POST request with the registration data to the server. 
 *    
 * 
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     This leverages React state and useState hooks to dynamically handle form data. 
 *     Profile image uploads are facilitated through Base64 encoding, while DatePicker component is integrated for birthday selection. 
 *     Furthermore, the registration process is completed by utilizing the fetch() method to send POST requests containing the gathered 
 *     registration data to the server.
 */

import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import { DatePicker } from 'react-native-woodpicker';

import config from './config.js';
import styles from '../styles/SignUpStyles';

// Constants
const PLACEHOLDER_IMAGE = require('../assets/profile-placeholder2.png');
const ICON_SHOW = require('../assets/icon-show.png');
const ICON_HIDE = require('../assets/icon-hide.png');
const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Sorry, we need camera roll permission to upload images.',
  REGISTRATION_FAILED: 'Registration failed.',
  NETWORK_ERROR: 'Network error or server is down.',
  SUCCESS_REGISTRATION: 'Registration successful',
};

export default function SignUp() {
  const navigation = useNavigation();
  
  // State variables
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Get password icon based on visibility state
  const passwordIconSource = isPasswordVisible ? ICON_SHOW : ICON_HIDE;

  // Handle image picking from the device
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission status:', status);

    if (status !== 'granted') {
      Alert.alert('Permission Denied', ERROR_MESSAGES.PERMISSION_DENIED, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,  
        aspect: [1, 1],      
      });
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFile(selectedUri);
        setErrorMessage(null);
      }
    }
  };

  // Handle sign up process
  const handleSignUp = async () => {
    try {
      const base64data = await encodeImageToBase64(file);
      const user = createUserObject(base64data);

      const response = await fetch(`http://${config.ipAddress}:8000/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Alert.alert('Success', ERROR_MESSAGES.SUCCESS_REGISTRATION);
        navigation.navigate('SignIn');
      } else {
        const errorData = await response.json();
        const message = errorData?.detail?.map((err) => err.msg).join(', ') || ERROR_MESSAGES.REGISTRATION_FAILED;
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(ERROR_MESSAGES.NETWORK_ERROR);
    }
  };

  // Encode image to base64 format
  const encodeImageToBase64 = async (imageUri) => {
    let base64data;
    if (!imageUri) {
      const response = await fetch(Image.resolveAssetSource(PLACEHOLDER_IMAGE).uri);
      base64data = await fetchImageBase64(response);
    } else {
      const response = await fetch(imageUri);
      base64data = await fetchImageBase64(response);
    }
    return base64data;
  };

  // Convert image to base64 format
  const fetchImageBase64 = async (response) => {
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Create user object for registration
  const createUserObject = (base64data) => ({
    username,
    email,
    password,
    firstname,
    middlename,
    lastname,
    birthday: birthday ? birthday.toISOString().split('T')[0] : null,
    mobilenum,
    address,
    pet_knowledge: petKnowledge,
    stable_living: stableLiving,
    flex_time_sched: flexTimeSched,
    environment,
    profile_photo: base64data,
  });

  // Handle birthday text formatting
  const handleText = () => birthday ? birthday.toDateString() : 'Select date';

  // Handle error message close
  const handleCloseError = () => {
    setErrorMessage(null);
  };

  // UI rendering
  return (
    <ScrollView style={styles.Container}>
      {/* Error Message Modal */}
      {errorMessage ? (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={handleCloseError}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
  
      {/* Upload Profile Picture */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
          {file ? (
            <Image style={styles.imgProfile} source={{ uri: file }} resizeMode="cover" />
          ) : (
            <Image
              style={styles.imgProfile}
              source={require('../assets/profile-placeholder2.png')}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      </View>
  
      {/* Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.formContainerContent}>
          
          {/* Account Information Section */}
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Account Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Username*</Text>
          </View>
          <TextInput style={styles.textInput} value={username} onChangeText={text => setUsername(text)} />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Email*</Text>
          </View>
          <TextInput style={styles.textInput} value={email} onChangeText={text => setEmail(text)} />
  
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Password*</Text>
          </View>
          <TextInput style={styles.textInput} secureTextEntry={isPasswordVisible} value={password} onChangeText={text => setPassword(text)} />
  
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image style={styles.iconPassword} source={passwordIconSource} />
          </TouchableOpacity>
  
          {/* Personal Information Section */}
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Personal Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>
  
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
  
          <View style={styles.formTwoColumns}>
            <View style={[styles.flexColumn, styles.marginRight]}>
              <Text style={styles.labelTextInput}>Last Name*</Text>
              <TextInput style={styles.textInputHalf} value={lastname} onChangeText={text => setLastname(text)} />
            </View>
  
            <View style={[styles.flexColumn, styles.containerBirthday]}>
              <Text style={styles.labelTextInput}>Birthday*</Text>
              <DatePicker
                value={birthday}
                onDateChange={setBirthday}
                style={styles.birthdayPicker}
                containerStyle={styles.containerPicker}
                title=""
                text={handleText()}
                isNullable={false}
                textInputStyle={styles.birthdayInput}
                maximumDate={new Date(Date.now())}
                iosMode="date"
                iosDisplay="inline"
              />
            </View>
          </View>
  
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
  
          {/* Sign Up Button */}
          <View style={styles.CenterContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
  
          {/* Login Redirect */}
          <View style={styles.containerOneLineText}>
            <Text style={styles.textPlain}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.logInText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}  