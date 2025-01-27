/**
 * PROGRAM TITLE:
 *     Sign-In Screen
 * 
 * PROGRAMMER/S:
 *     Pauline Ann P. Bautista (User Interface)
 *     Ashley Sheine N. Jugueta (Backend/DB Connection)
 * 
 * WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
 *     It allows users to log into their accounts to access the platform's features.
 * 
 * DATE WRITTEN:
 *     May 11, 2024
 * 
 * DATE REVISED:
 *     January 25, 2025
 * 
 * PURPOSE:
 *     This Sign-In screen is to authenticate users by verifying their login credentials. Upon successful sign-in, 
 *     users gain access to the main features of the app. 
 *     
 * DATA STRUCTURES, ALGORITHMS, AND CONTROL:
 *     This screen utilizes state variables to manage the username, password, and password visibility status. 
 *     It facilitates user authentication by sending an HTTP POST request to the server to validate credentials. 
 *     React's useState hook plays a crucial role in managing the application's state, while the useEffect hook handles any side effects. 
 */


import React, { useState, useEffect } from 'react';
import styles from '../styles/SignInStyles';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import config from './config.js';

// Error Message Constants
const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Sorry, we need camera roll permission to upload images.',
  CLIENT_ERROR: 'Failed to post pet:',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  NETWORK_ERROR: 'Please check your internet connection and try again.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  SIGN_IN_FAILED: 'Username and Password does not match.',
  SIGN_IN_ERROR: 'An error occurred during sign in',
};

export default function SignIn() {
  // State initialization
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Clear the form when the screen is focused (navigation happens)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUsername('');
      setPassword('');
    });

    return unsubscribe; // Cleanup on unmount
  }, [navigation]);

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Password icon source based on visibility
  const passwordIconSource = isPasswordVisible
    ? require('../assets/icon-show.png')
    : require('../assets/icon-hide.png');

  // Handle user sign-in
  const handleSignIn = async () => {
    const user = { username, password };

    try {
      const response = await fetch(`http://${config.ipAddress}:8000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Dashboard', params: { username } }],
          })
        );
      } else {
        const errorData = await response.json();
        Alert.alert(
          'Sign In Failed',
          ERROR_MESSAGES.SIGN_IN_FAILED
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', ERROR_MESSAGES.SIGN_IN_ERROR);
    }
  };

  // UI rendering
  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.formContainer}>
          <Text style={styles.headingForm}>Log In</Text>
          <Text style={styles.subheadingForm}>Sign in to continue.</Text>

          {/* Username input field */}
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelText}>Username</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Password input field */}
          <View style={styles.flexLeftAlign}>
            <Text style={styles.labelText}>Password</Text>
          </View>
          <TextInput
            style={styles.textInputPassword}
            placeholder="Enter Password"
            secureTextEntry={isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          
          {/* Password visibility toggle */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image style={styles.iconPassword} source={passwordIconSource} />
          </TouchableOpacity>

          {/* Sign-in button */}
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {/* Sign-up navigation */}
          <View style={styles.containerOneLineText}>
            <Text style={styles.textPlain}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.createAccountText}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Status bar */}
      <StatusBar style="auto" />
    </ImageBackground>
  );
}