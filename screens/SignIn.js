import React, { useState } from 'react';
import styles from '../styles/SignInStyles';

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, ImageBackground, TouchableOpacity, navigation,  Alert, Linking} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import config from './config.js';

export default function SignIn() {
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordIconSource = isPasswordVisible
    ? require('../assets/icon-show.png') 
    : require('../assets/icon-hide.png'); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


      const handleSignIn = async () => {
        const user = {
          username,
          password,
        };
        try {
          const response = await fetch(`http://${config.ipAddress}:8000/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            
          });

          if (response.ok) {
            const data = await response.json();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Profile', params: { username } },
                ],
              })
            );
          } else {
          const errorData = await response.json();
          Alert.alert(
            'Error',
            'Sign in failed: ' + (errorData.message || 'An unknown error occurred')
          );
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred during sign in');
      }
    };


  return (
      <ImageBackground
        source={require('../assets/homebackground.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {<Image source={require('../assets/logo.png')} style={styles.logo} />}

          <View style={styles.formContainer}>
            <Text style={styles.headingForm}>Log In</Text>
            <Text style={styles.subheadingForm}>Sign in to continue.</Text>

            <View style={styles.flexLeftAlign}>
              <Text style={styles.labelText}>Username</Text>
            </View>
            <TextInput style={styles.textInput} placeholder="Enter Username" value={username} onChangeText={text => setUsername(text)} />

            <View style={styles.flexLeftAlign}>
              <Text style={styles.labelText}>Password</Text> 
            </View>

            <TextInput style={styles.textInputPassword} placeholder="Enter Password" secureTextEntry={isPasswordVisible}  value={password} onChangeText={text => setPassword(text)}/>
            
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image style={styles.iconPassword} source={passwordIconSource} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}  onPress={handleSignIn}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>


            <View style={styles.containerOneLineText}>
              <Text style={styles.textPlain}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.createAccountText}>Create a new account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
  );
}