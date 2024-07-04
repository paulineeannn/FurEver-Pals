import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Pressable, TouchableOpacity, navigation,  Alert, Linking} from 'react-native';
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
                { name: 'ProfileInfo', params: { username } },
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

            <Pressable style={styles.button}  onPress={handleSignIn}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>


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


const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1, // Makes the image cover the whole screen
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: '20%',
    marginBottom: '15%',
  },
  formContainer: {
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,

  },
  headingForm: {
    marginTop: '10%',
    fontSize: 25,
    marginBottom: 5,
    color: '#662B2B',
    fontWeight: 'bold'
  },
  subheadingForm: {
    fontSize: 15,
    marginBottom: 50,
    color: '#7F7F7F',
  },
  labelText: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
    color: '#7F7F7F',
  },
  flexLeftAlign : {
    width: '75%',
  },
  textInput: {
    fontSize: 15,
    padding: 12,
    width: '75%',
    backgroundColor: '#E8DFDD',
    borderRadius: 15,
    marginBottom: 15,
  },
  textInputPassword: {
    fontSize: 15,
    padding: 12,
    width: '75%',
    backgroundColor: '#E8DFDD',
    borderRadius: 15,
    marginBottom: 15,
    marginBottom: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#725144',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  containerOneLineText: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  textPlain: {
    fontSize: 13,
    color: '#7F7F7F',
  },
  createAccountText: {
    fontSize: 13,
    color: '#725144',
  
  },
  iconPassword: {
    height: 20,
    position: 'absolute',
    bottom: 60,
    left: 105
  }

});