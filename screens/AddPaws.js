import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import config from './config.js';

export default function AddPaws({ navigation, route }) {
  // const navigation = useNavigation();

  // const route = useRoute();
  const [selectedUri, setSelectedUri] = useState(null);
  const { username } = route.params;
  const [file, setFile] = useState(null); // Stores the selected image URI 
  const [error, setError] = useState(null); // Stores any error message 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' }
  ]);

  // Function to pick an image from the device's media library 
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
      setSelectedUri(selectedUri);
      setFile(selectedUri);
      setError(null);
      console.log("File updated:", selectedUri);
    }
  }
};

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [complete_address, setcomplete_address] = useState('');

  const handleAddPaws = async () => {
    const user = {
      username: route.params.username,
      name: name.trim() || null, 
      age: parseInt(age) || null, 
      sex: value,
      complete_address: complete_address.trim() || null,
      fur_pic: selectedUri,
    };

    try {
      const response = await fetch(`http://${config.ipAddress}:8000/add-pet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Added successfully');
        navigation.navigate('ProfilePaws', { username });
        console.log("successful");
      } else {
        const errorData = await response.json(); // Try to get error details from response
        Alert.alert(
          'Error',
          'Registration failed: ' + (errorData.detail || 'An unknown error occurred')
        );
        console.error("Registration failed:", errorData || response.statusText); // Log more detailed error
      }
    } catch (error) {
      console.error('Error:', error); // Log the original error
      Alert.alert('Error', 'An error occurred during registration');
      console.log("Network or server error:", error); // Log network/server-related error
    }
    
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ContainerContent}>
        <Text style={styles.TextHeading}>Pet Profile</Text>
        <Text style={styles.TextSubheading}>Personal Information</Text>
        <View style={styles.horizontalLine}></View>
        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Name*</Text>
        </View>
        <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)} />

        <View style={[styles.flexLeftAlign, styles.marginTop]}>
          <Text style={styles.labelTextInput}>Complete Address</Text>
          {/* <Text style={styles.labelTextFormat}>Format: Unit, Building Name, House Number, Street, Barangay, City, Region, Zip Code</Text> */}
        </View>
        <TextInput style={styles.textInput} value={complete_address} onChangeText={text => setcomplete_address(text)} />

        <View style={styles.flexLeftAlign}>
          <Text style={styles.labelTextInput}>Fur Pic*</Text>
        </View>

        <View style={styles.formTwoColumns}>
          <View style={[styles.flexColumn, styles.marginRight]}>
            <Text style={styles.labelTextInput}>Age</Text>
            <TextInput style={[styles.textInputHalf, styles.marginRight, styles.inputAge]} value={age} onChangeText={text => setAge(text)} />
          </View>

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

        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.buttonUploadPicture} onPress={pickImage}>
            {file ? (
              <Image style={styles.imgProfile} source={{ uri: file }} resizeMode="cover" />
            ) : (
              <Image
                style={styles.imgProfile}
                source={require('../assets/pet-upload.png')}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonContainer}>
          <Pressable style={styles.button} onPress={handleAddPaws}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#F9EBD8',
  },
  ContainerContent: {
    marginTop: 50,
    width: '85%',
    margin: 'auto'
  },
  horizontalLine: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#A38277',
    marginBottom: 20,
  },
  TextHeading: {
    fontSize: 25,
    color: "#6A2D2B",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextSubheading: {
    fontSize: 20,
    color: "#6A2D2B",
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  labelTextInput: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
    color: '#A38277',
  },
  inputAge: {
    height: 49
  },
  dropdown: {
    backgroundColor: '#F9EBD8',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2,
    paddingBottom: 0
  },
  labelTextFormat: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'left',
    color: '#A38277',
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  textInputHalf: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  pickerContainer: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    marginBottom: 15,
    borderColor: '#6A2D2B',
    borderWidth: 2
  },
  formTwoColumns: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    top: 174
  },
  marginTop: {
    marginTop: 80
  },
  flexColumn: {
    flexDirection: 'column',
    width: 155
  },
  marginRight: {
    marginRight: 15
  },
  uploadContainer: {
    alignItems: 'center',
    borderRadius: 20
  },
  buttonUploadPicture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProfile: {
    width: 240,
    height: 240,
    aspectRatio: 1,
    borderRadius: 20
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginBottom: 50,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#725144',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
