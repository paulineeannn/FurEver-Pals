import React, { useState, useEffect } from 'react';
import styles from '../styles/SignUpStyles';

import { Text, View, Image, TextInput, Pressable, navigation, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from "expo-image-picker";
import config from './config.js';

export default function SignUp() {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordIconSource = isPasswordVisible
    ? require('../assets/icon-show.png') 
    : require('../assets/icon-hide.png'); 

  const handleCloseError = () => {
    setErrorMessage(null); // Hide the error message when Close is clicked
  };

  const [file, setFile] = useState(null);   // Stores the selected image URI 
  const [errorMessage, setErrorMessage] = useState(null); // Stores any error message 

  // Function to pick an image from  the device's media library 
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    console.log('Permission status:', status);

    if (status !== 'granted') { // If permission is denied, show an alert 
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permission to upload images.',
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
    } else { // Launch the image library and get the selected image 
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFile(selectedUri);
        setErrorMessage(null);
        console.log("File updated:", selectedUri);
      }
    }
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [mobilenum, setMobilenum] = useState('');
  const [address, setAddress] = useState('');
  const [petKnowledge, setPetKnowledge] = useState(0);
  const [stableLiving, setStableLiving] = useState(0);
  const [flexTimeSched, setFlexTimeSched] = useState(0);
  const [environment, setEnvironment] = useState(0);

  const handleSignUp = async () => {
    const user = {
      username,
      email,
      password,
      firstname,
      middlename,
      lastname,
      birthday,
      mobilenum,
      address,
      pet_knowledge: petKnowledge,
      stable_living: stableLiving,
      flex_time_sched: flexTimeSched,
      environment: environment,
    };


    try {
      const response = await fetch(`http://${config.ipAddress}:8000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('SignIn');
        console.log("successful");
      } else {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          // Extract the error message from the response
          const message = errorData.detail.map((err) => err.msg).join(', ');
          setErrorMessage(message); // Store the error message
        } else {
          setErrorMessage('An unknown error occurred.');
        }
        setErrorMessage('Registration failed:', errorData);
        console.info("Aaaaaaaaaaaaaa", errorMessage);
        console.error("Registration failed" || response.statusText);
        // console.error("Registration failed:", errorData || response.statusText); // Log more detailed error
      }
    } catch (error) {
      console.error('Error:', error); // Log the original error
      // Alert.alert('Error', 'An error occurred during registration');
      console.log("Network or server error:", error); // Log network/server-related error
      setErrorMessage('Network error or server is down.');
    }
  };

  return (
    <ScrollView style={styles.Container}>
      {errorMessage ? (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={styles.buttonClose}
                onPress={handleCloseError}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}

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

      {/* make the form scrollable --------------------------------------------------------------- */}
      <View style={styles.formContainer}>
        <View style={styles.formContainerContent}>
          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Account Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Username*</Text>
          </View>
          <TextInput style={styles.textInput} value={username} onChangeText={text => setUsername(text)}/>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Email*</Text>
          </View>
          <TextInput style={styles.textInput}  value={email} onChangeText={text => setEmail(text)}/>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Password*</Text>
          </View>
          <TextInput style={styles.textInput}  secureTextEntry={isPasswordVisible}  value={password} onChangeText={text => setPassword(text)}/>

          <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image style={styles.iconPassword} source={passwordIconSource} />
            </TouchableOpacity>

          

        {/* Personal Information --------------------------------------------------------------- */}

          <View style={styles.formHeadingContainer}>
            <Text style={styles.formHeading}>Personal Information</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.formTwoColumns}>
          <View style={[styles.flexColumn, style=styles.marginRight]}>
              <Text style={styles.labelTextInput}>First Name*</Text>
              <TextInput style={styles.textInputHalf}  value={firstname} onChangeText={text => setFirstname(text)}/>
            </View>

            <View style={styles.flexColumn}>
              <Text style={styles.labelTextInput}>Middle Name</Text>
              <TextInput style={styles.textInputHalf}  value={middlename} onChangeText={text => setMiddlename(text)}/>
            </View>
          </View>


          <View style={styles.formTwoColumns}>
          <View style={[styles.flexColumn, style=styles.marginRight]}>
              <Text style={styles.labelTextInput}>Last Name*</Text>
              <TextInput style={styles.textInputHalf}  value={lastname} onChangeText={text => setLastname(text)}/>
            </View>

            <View style={styles.flexColumn}>
              <Text style={styles.labelTextInput}>Birthday*</Text>
              <TextInput style={styles.textInputHalf} placeholder='YYYY-MM-DD'  value={birthday} onChangeText={text => setBirthday(text)}/>
            </View>
          </View>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Mobile Number*</Text>
          </View>
          <TextInput style={styles.textInput}  value={mobilenum} onChangeText={text => setMobilenum(text)}/>

          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelTextInput}>Address*</Text>
          </View>
          <TextInput style={styles.textInput}  value={address} onChangeText={text => setAddress(text)}/>

          {/* Characteristics --------------------------------------------------------------- */}    

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
          
          <View style={styles.CenterContainer}>
            <Pressable style={styles.button}  onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>


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